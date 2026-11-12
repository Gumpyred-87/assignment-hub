"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth-provider";
import { toast } from "@/hooks/use-toast";
import {
  ChevronLeft, ChevronRight, Check, X, Sparkles,
  BookOpen, GraduationCap, FileText, Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  "Business & Management", "Computer Science", "Economics", "Psychology",
  "Biology", "Chemistry", "Physics", "Mathematics", "History", "Literature",
  "Philosophy", "Sociology", "Political Science", "Law", "Medicine",
  "Nursing", "Education", "Engineering", "Art & Design", "Other",
];

const assignmentTypes = [
  { value: "essay", label: "Essay", desc: "Argumentative, analytical, or expository" },
  { value: "research_paper", label: "Research Paper", desc: "Original research with literature review" },
  { value: "lab_report", label: "Lab Report", desc: "IMRaD structure for sciences" },
  { value: "case_study", label: "Case Study", desc: "Problem-solution analysis" },
  { value: "literature_review", label: "Literature Review", desc: "Synthesize existing research" },
  { value: "business_report", label: "Business Report", desc: "Professional business format" },
  { value: "presentation", label: "Presentation Outline", desc: "Slide deck structure" },
  { value: "reflection", label: "Reflection Paper", desc: "Personal learning reflection" },
  { value: "technical_report", label: "Technical Report", desc: "Engineering/technical documentation" },
  { value: "code_docs", label: "Code Documentation", desc: "Software project documentation" },
  { value: "thesis_proposal", label: "Thesis Proposal", desc: "Research proposal structure" },
  { value: "resume", label: "Resume/Cover Letter", desc: "Professional application docs" },
];

const levels = [
  { value: "high_school", label: "High School", desc: "Grades 9-12 / A-Levels" },
  { value: "undergraduate", label: "Undergraduate", desc: "Bachelor's degree level" },
  { value: "postgraduate", label: "Postgraduate", desc: "Master's degree level" },
  { value: "professional", label: "Professional", desc: "Workplace / continuing education" },
];

const tones = [
  { value: "formal", label: "Formal", desc: "Academic, objective, precise" },
  { value: "analytical", label: "Analytical", desc: "Critical, evidence-based reasoning" },
  { value: "simple", label: "Simple & Clear", desc: "Accessible, jargon-free" },
  { value: "persuasive", label: "Persuasive", desc: "Compelling, argument-driven" },
];

const citations = [
  { value: "apa", label: "APA 7th Edition", desc: "Author-Date (Social Sciences)" },
  { value: "mla", label: "MLA 9th Edition", desc: "Author-Page (Humanities)" },
  { value: "harvard", label: "Harvard", desc: "Author-Date (UK/Commonwealth)" },
  { value: "ieee", label: "IEEE", desc: "Numeric (Engineering/CS)" },
  { value: "chicago", label: "Chicago 17th", desc: "Notes-Biblio or Author-Date" },
];

const stepLabels = [
  { num: 1, label: "Details", icon: FileText },
  { num: 2, label: "Outline", icon: BookOpen },
  { num: 3, label: "Research", icon: Target },
  { num: 4, label: "Draft", icon: Sparkles },
];

export default function WizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    customSubject: "",
    topic: "",
    type: "essay",
    level: "undergraduate",
    wordCount: 1500,
    pageCount: "",
    tone: "formal",
    citation: "apa",
    deadline: "",
    rubric: "",
    sampleFile: null as File | null,
  });

  useEffect(() => {
    const template = searchParams.get("template");
    if (template) {
      const typeMap: Record<string, string> = {
        "Essay": "essay",
        "Research Paper": "research_paper",
        "Lab Report": "lab_report",
        "Case Study": "case_study",
        "Literature Review": "literature_review",
        "Business Report": "business_report",
        "Presentation Outline": "presentation",
        "Reflection Paper": "reflection",
        "Technical Report": "technical_report",
        "Code Documentation": "code_docs",
        "Thesis Proposal": "thesis_proposal",
        "Resume/Cover Letter": "resume",
      };
      setFormData(prev => ({
        ...prev,
        type: typeMap[template] || "essay",
        subject: template.includes("Business") ? "Business & Management" : "",
      }));
    }
  }, [searchParams]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: formData.topic.slice(0, 100) || "Untitled Assignment",
        subject: formData.customSubject || formData.subject,
        topic: formData.topic,
        type: formData.type,
        level: formData.level,
        wordCount: formData.wordCount || undefined,
        tone: formData.tone,
        citation: formData.citation,
        deadline: formData.deadline || null,
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create project");
      const data = await res.json();

      if (formData.sampleFile) {
        // TODO: upload sample file
      }
      if (formData.rubric) {
        // TODO: save rubric
      }

      toast({ title: "Project created!", variant: "success" });
      router.push(`/editor/${data.project.id}`);
    } catch (err) {
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.subject && !formData.customSubject) {
        toast({ title: "Required", description: "Please select or enter a subject", variant: "destructive" });
        return;
      }
      if (!formData.topic.trim()) {
        toast({ title: "Required", description: "Please enter a topic or question", variant: "destructive" });
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <Sparkles className="h-6 w-6" /> AssignPro
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {stepLabels.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all",
                    step > s.num ? "bg-primary text-primary-foreground" :
                    step === s.num ? "bg-primary/10 text-primary border border-primary" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {step > s.num ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={cn("mt-1 text-xs font-medium", step >= s.num ? "text-foreground" : "text-muted-foreground")}>
                    {s.label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 rounded",
                    step > s.num ? "bg-primary" : "bg-border"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fade">
              <div>
                <h2 className="text-2xl font-bold mb-2">Assignment Details</h2>
                <p className="text-muted-foreground">Tell us about your assignment</p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Subject / Field</Label>
                    <Select value={formData.subject} onValueChange={(v) => handleChange("subject", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.subject === "Other" && (
                      <Input
                        placeholder="Enter custom subject"
                        value={formData.customSubject}
                        onChange={(e) => handleChange("customSubject", e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Topic or Question <span className="text-destructive">*</span></Label>
                    <Textarea
                      placeholder="e.g., Impact of remote work on employee productivity in tech companies"
                      value={formData.topic}
                      onChange={(e) => handleChange("topic", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Assignment Type</Label>
                      <Select value={formData.type} onValueChange={(v) => handleChange("type", v)}>
                        <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                        <SelectContent>
                          {assignmentTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              <div>
                                <p className="font-medium">{t.label}</p>
                                <p className="text-xs text-muted-foreground">{t.desc}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Level</Label>
                      <Select value={formData.level} onValueChange={(v) => handleChange("level", v)}>
                        <SelectTrigger><SelectValue placeholder="Select level..." /></SelectTrigger>
                        <SelectContent>
                          {levels.map((l) => (
                            <SelectItem key={l.value} value={l.value}>
                              <div>
                                <p className="font-medium">{l.label}</p>
                                <p className="text-xs text-muted-foreground">{l.desc}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Word Count</Label>
                      <Input
                        type="number"
                        value={formData.wordCount}
                        onChange={(e) => handleChange("wordCount", parseInt(e.target.value) || 0)}
                        min={100}
                        max={50000}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pages (optional)</Label>
                      <Input
                        type="number"
                        value={formData.pageCount}
                        onChange={(e) => handleChange("pageCount", e.target.value)}
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tone / Style</Label>
                      <Select value={formData.tone} onValueChange={(v) => handleChange("tone", v)}>
                        <SelectTrigger><SelectValue placeholder="Select tone..." /></SelectTrigger>
                        <SelectContent>
                          {tones.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              <div>
                                <p className="font-medium">{t.label}</p>
                                <p className="text-xs text-muted-foreground">{t.desc}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Citation Style</Label>
                      <Select value={formData.citation} onValueChange={(v) => handleChange("citation", v)}>
                        <SelectTrigger><SelectValue placeholder="Select citation..." /></SelectTrigger>
                        <SelectContent>
                          {citations.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              <div>
                                <p className="font-medium">{c.label}</p>
                                <p className="text-xs text-muted-foreground">{c.desc}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline (optional)</Label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Grading Rubric or Instructions (paste or upload)</Label>
                    <Textarea
                      placeholder="Paste rubric criteria, learning outcomes, or special instructions..."
                      value={formData.rubric}
                      onChange={(e) => handleChange("rubric", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sample Assignment (optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => handleChange("sampleFile", e.target.files?.[0] || null)}
                        className="hidden"
                        id="sample-upload"
                      />
                      <Label htmlFor="sample-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <span className="text-primary hover:underline">Click to upload PDF, DOCX, or TXT</span>
                          <p className="text-xs text-muted-foreground">AI will analyze structure, tone & formatting</p>
                        </div>
                      </Label>
                      {formData.sampleFile && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          Selected: {formData.sampleFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Outline (placeholder) */}
          {step === 2 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Outline Generation</h3>
                <p className="text-muted-foreground mb-6">
                  This step will generate a structured outline with headings, sub-points, and word budgets.
                  You can edit, reorder, add, or delete sections before continuing.
                </p>
                <Button onClick={nextStep} variant="outline">
                  Generate Outline (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Research (placeholder) */}
          {step === 3 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">Research Assistant</h3>
                <p className="text-muted-foreground mb-6">
                  Suggest key concepts, definitions, arguments, counter-arguments, and verifiable sources.
                  Upload PDFs or paste URLs to ground content in your materials.
                </p>
                <Button onClick={nextStep} variant="outline">
                  Continue to Drafting (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Draft (placeholder) */}
          {step === 4 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Section-by-Section Drafting</h3>
                <p className="text-muted-foreground mb-6">
                  Generate each section with streaming output. Per-section controls: Regenerate, Expand,
                  Shorten, Simplify, Make more academic, Add example, Add citation.
                </p>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? "Creating Project..." : "Create Project & Start Drafting"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="gap-1">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="gap-1">
                Create Project <Sparkles className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}