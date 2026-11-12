import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Shield, FileText, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | AssignPro",
  description: "Terms and conditions for using AssignPro.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using AssignPro ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part, you may not use the Service.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>AssignPro is an AI-powered assignment assistant that helps students and professionals plan, research, draft, refine, and format academic and professional assignments. The Service uses Anthropic's Claude API to generate content suggestions, outlines, and drafts.</p>
          </section>

          <section>
            <h2>3. Academic Integrity — Important</h2>
            <div className="p-4 rounded-lg border border-amber-500/50 bg-amber-50 dark:bg-amber-900/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                    AssignPro is a learning and drafting support tool.
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    You are solely responsible for ensuring your use of AssignPro complies with your institution's academic integrity policies, honor codes, and any applicable rules. The tool is designed to assist with structure, research, and refinement — not to replace your own work or critical thinking.
                  </p>
                </div>
              </div>
            </div>
            <ul>
              <li>Do not submit AI-generated content as your own original work without substantial revision and personalization</li>
              <li>Always verify citations, quotes, and statistics — the AI flags uncertain content with "[verify before use]"</li>
              <li>Use Learning Mode to understand the reasoning behind each section</li>
              <li>Follow your institution's guidelines on AI assistance disclosure</li>
            </ul>
          </section>

          <section>
            <h2>4. User Accounts</h2>
            <ul>
              <li>You must provide accurate registration information</li>
              <li>You are responsible for maintaining password confidentiality</li>
              <li>You must be 13+ to use the Service (16+ in EU/UK)</li>
              <li>One account per person; no sharing credentials</li>
            </ul>
          </section>

          <section>
            <h2>5. Subscriptions & Billing</h2>
            <ul>
              <li>Free plan: 3 projects/month, basic features</li>
              <li>Pro/Team plans: Monthly recurring billing via Stripe</li>
              <li>Cancel anytime — access continues until period ends</li>
              <li>No refunds for partial months (except where required by law)</li>
              <li>Price changes: 30 days notice for existing subscribers</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <ul>
              <li>You retain ownership of content you create with AssignPro</li>
              <li>You grant us a license to process your content to provide the Service</li>
              <li>AssignPro's code, UI, and underlying technology remain our property</li>
              <li>AI-generated suggestions are provided for your use without warranty of originality</li>
            </ul>
          </section>

          <section>
            <h2>7. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for illegal activities</li>
              <li>Attempt to reverse-engineer or extract the AI models</li>
              <li>Generate harmful, hateful, or illegal content</li>
              <li>Overload the Service (rate limits apply)</li>
              <li>Share accounts or circumvent usage limits</li>
            </ul>
          </section>

          <section>
            <h2>8. Disclaimers</h2>
            <p><strong>The Service is provided "as is" without warranties of any kind.</strong> We do not warrant that:</p>
            <ul>
              <li>AI-generated content is accurate, complete, or original</li>
              <li>Citations are real or correctly formatted</li>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Results will meet your institution's requirements</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, AssignPro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, or goodwill. Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>We may suspend or terminate your access for violations of these Terms. You may delete your account at any time from Settings.</p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>These Terms are governed by the laws of Delaware, USA, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2>12. Changes</h2>
            <p>We may modify these Terms. Material changes will be communicated via email or in-app. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2>13. Contact</h2>
            <p>Questions? Email <a href="mailto:legal@assignpro.example" className="underline">legal@assignpro.example</a></p>
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