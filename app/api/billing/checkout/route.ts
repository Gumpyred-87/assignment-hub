import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return { userId: session.user.id, email: session.user.email, stripeId: session.user.id };
}

export async function GET(req: NextRequest) {
  const auth = await getUserId();
  if (!auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { searchParams } = new URL(req.url);
  const planKey = searchParams.get("plan") as keyof typeof PLANS;

  if (!planKey || !PLANS[planKey]) {
    return NextResponse.redirect(new URL("/settings?error=invalid_plan", req.url));
  }

  if (planKey === "free") {
    return NextResponse.redirect(new URL("/settings?error=cannot_downgrade", req.url));
  }

  try {
    const plan = PLANS[planKey];
    const priceId = process.env[`STRIPE_PRICE_${planKey.toUpperCase()}`];

    if (!priceId) {
      return NextResponse.redirect(new URL("/settings?error=price_not_configured", req.url));
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
      customer_email: auth.email,
      metadata: { userId: auth.userId, plan: planKey },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.redirect(new URL("/settings?error=checkout_failed", req.url));
  }
}