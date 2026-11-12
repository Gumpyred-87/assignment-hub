"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Zap, Target, BookOpen, Brain, Shield, ArrowRight,
  ChevronRight, CheckCircle, Download, FileText,
  BarChart2, Layers, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: Zap, title: "AI-Powered Drafting", desc: "Generate outlines, draft sections, and refine content with streaming AI assistance" },
  { icon: Target, title: "Structure First", desc: "Step-by-step wizard builds a structured outline with word budgets before writing" },
  { icon: Brain, title: "Research Assistant", desc: "Suggest key concepts, arguments, counter-arguments, and verifiable sources" },
  { icon: BookOpen, title: "Citation Styles", desc: "APA 7, MLA 9, Harvard, IEEE, Chicago — auto-formatted references" },
  { icon: Shield, title: "Academic Integrity", desc: "Never fabricates sources. Flags uncertain citations. Learning mode explains structure" },
  { icon: Layers, title: "Rich Editor", desc: "TipTap-based workspace with outline sidebar, inline AI actions, and version history" },
];

const steps = [
  { n: "01", title: "Define", desc: "Fill in subject, topic, type, level, word count, citation style, and rubric" },
  { n: "02", title: "Outline", desc: "AI generates a structured outline — you edit, reorder, approve" },
  { n: "03", title: "Draft", desc: "Section-by-section streaming drafts with inline refine tools" },
];

const templates = [
  "Essay", "Research Paper", "Lab Report", "Case Study", "Literature Review",
  "Business Report", "Presentation Outline", "Reflection Paper",
  "Technical Report", "Code Documentation", "Thesis Proposal", "Resume/Cover Letter",
];

const pricing = [
  { name: "Free", price: 0, desc: "Try it out", features: ["3 projects/month", "Basic AI drafting", "DOCX export", "Standard templates"], cta: "Start Free" },
  { name: "Pro", price: 12, desc: "For serious students", features: ["Unlimited projects", "Advanced AI models", "All export formats", "Learning mode", "Priority support"], cta: "Go Pro", highlight: true },
  { name: "Team", price: 39, desc: "For groups & classes", features: ["Everything in Pro", "Shared workspaces", "Team templates", "Admin dashboard", "SSO (coming soon)"], cta: "Contact Sales" },
];

const faqs = [
  { q: "Is this considered cheating?", a: "AssignPro is a learning and drafting assistant. You're responsible for following your institution's academic integrity policy. The tool helps you structure, research, and refine — you own the final work." },
  { q: "Does it write the whole assignment for me?", a: "It drafts section by section with your guidance. You review, edit, and personalize each part. Learning mode explains why each section is structured that way." },
  { q: "Are the citations real?", a: "The AI suggests real, verifiable sources and marks any citation with '[verify before use]' if uncertain. It never invents fake references." },
  { q: "Can I use my own sources?", a: "Yes. Upload PDFs or paste URLs in the Research step — the AI grounds content in your materials." },
  { q: "What export formats are supported?", a: "DOCX, PDF, and Markdown. Title page, headings, and reference list are auto-formatted." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <Sparkles className="h-6 w-6" /> AssignPro
            </Link>
            <div className="flex items-center gap-4">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center animate-fade">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>New: Learning Mode — understand as you write</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Finish assignments faster, <br />
              <span className="gradient-text">with clarity</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Plan, research, draft, refine, and format academic and professional assignments end to end.
              From blank page to polished submission — with AI that explains its reasoning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Zap className="h-4 w-4" />
                  Start Free — No Card Required
                </Button>
              </Link>
              <Link href="#demo" className="flex items-center gap-2 text-primary hover:underline">
                <span>See the demo project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sample output preview */}
          <div className="mt-16 relative animate-slide">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl blur-2xl" />
            <Card className="relative overflow-hidden border-border/50 shadow-2xl">
              <CardHeader className="bg-muted/50 border-b border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </span>
                  sample-output.tsx
                </div>
                <CardTitle className="text-base font-medium">Business Management · Undergraduate · 1,500 words · APA 7</CardTitle>
                <CardDescription>Impact of Remote Work on Employee Productivity</CardDescription>
              </CardHeader>
              <CardContent className="p-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <h3 className="font-semibold mb-2">Introduction</h3>
                  <p className="text-muted-foreground mb-4">
                    The COVID-19 pandemic accelerated the adoption of remote work across industries...
                    <span className="text-primary font-medium"> (Bloom et al., 2021)</span>.
                  </p>
                  <h3 className="font-semibold mb-2">Literature Review</h3>
                  <p className="text-muted-foreground mb-4">
                    Early studies suggested productivity gains from eliminated commute time...
                    <span className="text-primary font-medium"> (Choudhury et al., 2020)</span>.
                    However, more recent longitudinal data indicates...
                  </p>
                  <h3 className="font-semibold mb-2">Methodology</h3>
                  <p className="text-muted-foreground mb-4">
                    A mixed-methods approach combining survey data (n=342) with semi-structured interviews...
                  </p>
                  <h3 className="font-semibold mb-2">Conclusion</h3>
                  <p className="text-muted-foreground mb-4">
                    Remote work's impact is nuanced: knowledge workers report stable or higher output...
                  </p>
                  <h3 className="font-semibold mb-2">References</h3>
                  <p className="text-xs text-muted-foreground">
                    Bloom, N., et al. (2021). <em>Working from home...</em> NBER Working Paper 28731.<br />
                    Choudhury, P., et al. (2020). <em>Geography of work...</em> Harvard Business School.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works in 3 steps</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From brief to polished submission — structured, guided, and transparent.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Card key={step.n} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-primary/20">{step.n}</div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for the full workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature designed around how assignments actually get done.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">12 assignment templates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pre-structured for every common type — or start from scratch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {templates.map((t) => (
              <Card key={t} className="text-center py-6 hover:border-primary/50 transition-colors cursor-default">
                <CardContent className="pt-6">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium">{t}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free. Upgrade when you need more. Cancel anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((p) => (
              <Card key={p.name} className={cn(
                "relative flex flex-col",
                p.highlight && "border-primary shadow-lg shadow-primary/10"
              )}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{p.name}</CardTitle>
                  <CardDescription>{p.desc}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${p.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button className="w-full" variant={p.highlight ? "default" : "outline"}>
                      {p.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="pt-6 pb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-medium shrink-0 mt-1">{i + 1}.</span>
                    <div>
                      <p className="font-medium">{faq.q}</p>
                      <p className="text-muted-foreground text-sm mt-1">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-semibold text-xl gradient-text">
                <Sparkles className="h-6 w-6" /> AssignPro
              </Link>
              <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                AI assignment assistant for students and professionals.
                Plan, research, draft, refine, and format — end to end.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/wizard" className="hover:text-foreground">New Assignment Wizard</Link></li>
                <li><Link href="/editor" className="hover:text-foreground">Editor Workspace</Link></li>
                <li><Link href="/templates" className="hover:text-foreground">Template Library</Link></li>
                <li><Link href="/library" className="hover:text-foreground">Project Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/academic-integrity" className="hover:text-foreground">Academic Integrity</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="/changelog" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AssignPro. Not affiliated with any educational institution.
            </p>
            <p className="text-sm text-muted-foreground">
              Tool for learning and drafting support. Users are responsible for following
              their institution's academic integrity policy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}