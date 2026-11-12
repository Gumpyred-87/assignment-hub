import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-28.acacia" as Stripe.LatestApiVersion,
  typescript: true,
});

export const PLANS = {
  free: { name: "Free", price: 0, projects: 3 },
  pro: { name: "Pro", price: 12, projects: Infinity },
  team: { name: "Team", price: 39, projects: Infinity },
} as const;

export type PlanKey = keyof typeof PLANS;