import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, Shield, FileText, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | AssignPro",
  description: "How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <Sparkles className="h-6 w-6" /> AssignPro
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us:</p>
            <ul>
              <li><strong>Account data:</strong> Name, email, password hash (if using email/password), Google OAuth profile</li>
              <li><strong>Assignment data:</strong> Project details, outlines, drafts, sources, rubrics, uploaded files</li>
              <li><strong>Usage data:</strong> Feature interactions, API calls, subscription status</li>
              <li><strong>Payment data:</strong> Processed by Stripe — we never see full card numbers</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Data</h2>
            <ul>
              <li>Provide and improve the AssignPro service</li>
              <li>Generate AI-assisted content using Anthropic's Claude API (your content is sent to Anthropic for processing)</li>
              <li>Manage subscriptions and billing via Stripe</li>
              <li>Send important account notifications (security, billing)</li>
              <li>Analyze usage patterns to improve the product (aggregated, anonymized)</li>
            </ul>
          </section>

          <section>
            <h2>3. AI Processing & Data Sharing</h2>
            <p>When you use AI features, your assignment context (topic, outline, drafts, sources) is sent to <strong>Anthropic's Claude API</strong> for processing. Anthropic's data handling is governed by their <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>. We do not use your data to train models.</p>
            <p>Payment processing is handled by <strong>Stripe</strong> — see their <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>.</p>
          </section>

          <section>
            <h2>4. Data Retention</h2>
            <ul>
              <li>Account data: Retained while your account is active</li>
              <li>Project data: Retained until you delete the project or account</li>
              <li>Usage logs: Retained for 12 months for analytics</li>
              <li>Deleted account data: Purged within 30 days</li>
            </ul>
          </section>

          <section>
            <h2>5. Your Rights (GDPR/CCPA)</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Object to processing</li>
            </ul>
            <p>Contact us at <a href="mailto:privacy@assignpro.example" className="underline">privacy@assignpro.example</a> to exercise these rights.</p>
          </section>

          <section>
            <h2>6. Security</h2>
            <ul>
              <li>Passwords hashed with bcrypt (cost factor 12)</li>
              <li>Sessions via secure, httpOnly cookies</li>
              <li>HTTPS enforced in production</li>
              <li>Database access restricted to application servers</li>
            </ul>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>AssignPro is not directed at children under 13. We do not knowingly collect data from children under 13.</p>
          </section>

          <section>
            <h2>8. Changes to This Policy</h2>
            <p>We may update this policy. Material changes will be communicated via email or in-app notification. Continued use constitutes acceptance.</p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>Questions? Email <a href="mailto:privacy@assignpro.example" className="underline">privacy@assignpro.example</a></p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 py-8 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2025 AssignPro. <Link href="/terms" className="underline hover:text-foreground">Terms</Link> ·{" "}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy</Link> ·{" "}
          <Link href="/academic-integrity" className="underline hover:text-foreground">Academic Integrity</Link>
        </div>
      </footer>
    </div>
  );
}