import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          await prisma.user.update({
            where: { id: userId },
            data: { plan },
          });
          await prisma.subscription.upsert({
            where: { userId },
            update: { plan, status: "active", stripeId: session.subscription },
            create: { userId, plan, status: "active", stripeId: session.subscription },
          });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { id: customerId },
        });

        if (user) {
          const newPlan = subscription.status === "active" ? "pro" : "free";
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: newPlan },
          });
          await prisma.subscription.upsert({
            where: { userId: user.id },
            update: { plan: newPlan, status: subscription.status, stripeId: subscription.id },
            create: { userId: user.id, plan: newPlan, status: subscription.status, stripeId: subscription.id },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}