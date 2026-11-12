import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Shield, CheckCircle, AlertTriangle, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Integrity | AssignPro",
  description: "Our commitment to academic integrity and responsible AI use.",
};

export default function AcademicIntegrityPage() {
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
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Academic Integrity</h1>
              <p className="text-muted-foreground">Our commitment to responsible AI use in education</p>
            </div>
          </div>
        </div>

        {/* Core Principle */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold mb-2">Core Principle</h2>
                <p className="text-lg">
                  <strong>AssignPro is a learning and drafting support tool.</strong> You are solely responsible for
                  ensuring your use complies with your institution's academic integrity policies, honor codes,
                  and any applicable rules. The tool assists with structure, research, and refinement — not to
                  replace your own work or critical thinking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <section>
            <h2 className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-600" /> How AssignPro Supports Learning</h2>
            <ul>
              <li><strong>Structure first:</strong> The wizard guides you to define the assignment before any AI generation</li>
              <li><strong>Outline approval:</strong> You review and edit the AI-generated outline before drafting begins</li>
              <li><strong>Section-by-section:</strong> You control each section, with inline refine tools (expand, simplify, add evidence)</li>
              <li><strong>Learning Mode:</strong> Toggle explanations for why each section is structured that way, key concepts, and possible exam questions</li>
              <li><strong>Source grounding:</strong> Upload your own PDFs/URLs — the AI grounds content in your materials</li>
              <li><strong>Verification flags:</strong> Any uncertain citation is marked with <code className="bg-muted px-1 rounded">[verify before use]</code></li>
              <li><strong>No fabrication:</strong> The AI never invents fake sources, quotes, or statistics</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-600" /> Your Responsibilities</h2>
            <ol>
              <li><strong>Know your institution's policy:</strong> Rules on AI assistance vary — some require disclosure, some prohibit it</li>
              <li><strong>Review and personalize:</strong> Never submit AI output without substantial revision and your own critical analysis</li>
              <li><strong>Verify every citation:</strong> Check all sources, quotes, and statistics yourself</li>
              <li><strong>Disclose if required:</strong> If your institution requires AI disclosure, do so honestly</li>
              <li><strong>Use as a scaffold:</strong> Treat AssignPro output as a starting point, not a finished product</li>
            </ol>
          </section>

          <section>
            <h2 className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-600" /> What AssignPro Does NOT Do</h2>
            <ul>
              <li>❌ Write complete assignments for you to submit unchanged</li>
              <li>❌ Guarantee grades or passing marks</li>
              <li>❌ Replace the need to understand your subject matter</li>
              <li>❌ Provide legal/medical/financial advice</li>
              <li>❌ Guarantee citation accuracy — always verify</li>
              <li>❌ Bypass plagiarism detectors (and we don't try to)</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-yellow-600" /> Best Practices for Students</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Before Starting</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Read your assignment prompt carefully</li>
                    <li>• Check your syllabus for AI policies</li>
                    <li>• Gather your own sources first</li>
                    <li>• Define your own thesis/argument</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">While Using AssignPro</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Edit the outline to match your approach</li>
                    <li>• Rewrite AI drafts in your own voice</li>
                    <li>• Add your own examples & analysis</li>
                    <li>• Verify every citation manually</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Before Submitting</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Run through the Checks panel</li>
                    <li>• Compare against the rubric</li>
                    <li>• Ensure citations match required style</li>
                    <li>• Disclose AI use if required</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Learning Mode</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Enable "Explain as I go"</li>
                    <li>• Read the section rationale</li>
                    <li>• Study the key concepts</li>
                    <li>• Practice viva/exam questions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2>Institutional Policies</h2>
            <p>We encourage educators and institutions to:</p>
            <ul>
              <li>Define clear AI usage policies in syllabi</li>
              <li>Teach students how to use AI tools responsibly</li>
              <li>Focus assessment on process, not just final output</li>
              <li>Use AssignPro's Learning Mode as a teaching aid</li>
            </ul>
            <p>We're happy to discuss educational partnerships — contact <a href="mailto:education@assignpro.example" className="underline">education@assignpro.example</a></p>
          </section>

          <section>
            <h2>Our Commitment</h2>
            <ul>
              <li>We will never market AssignPro as a way to "cheat" or bypass learning</li>
              <li>We will continue building features that promote understanding (Learning Mode, explanations, verification flags)</li>
              <li>We will not store or use your content to train models</li>
              <li>We will be transparent about AI limitations</li>
            </ul>
          </section>
        </div>

        <Card className="mt-10 border-primary/30">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-bold mb-2">Questions about responsible use?</h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Email us at <a href="mailto:integrity@assignpro.example" className="underline">integrity@assignpro.example</a>
            </p>
            <Link href="/wizard" className="inline-flex items-center gap-2">
              <Button>
                <Sparkles className="h-4 w-4" />
                Start an Assignment Responsibly
              </Button>
            </Link>
          </CardContent>
        </Card>
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