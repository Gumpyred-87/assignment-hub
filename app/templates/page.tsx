"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth-provider";
import { Search, Filter, ChevronRight, BookOpen, FileText, Zap, Target, GraduationCap, Briefcase, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

const allTemplates = [
  { slug: "essay", name: "Essay", category: "Academic", icon: FileText, desc: "Standard academic essay with thesis, body, conclusion", types: ["Argumentative", "Analytical", "Expository", "Compare & Contrast"] },
  { slug: "research_paper", name: "Research Paper", category: "Academic", icon: BookOpen, desc: "Full research structure with literature review & methodology", types: ["Empirical", "Theoretical", "Systematic Review", "Meta-Analysis"] },
  { slug: "lab_report", name: "Lab Report", category: "Academic", icon: Zap, desc: "IMRaD structure for scientific experiments", types: ["Biology", "Chemistry", "Physics", "Engineering"] },
  { slug: "case_study", name: "Case Study", category: "Academic", icon: Target, desc: "Problem-solution analysis with real-world context", types: ["Business", "Psychology", "Medicine", "Education"] },
  { slug: "literature_review", name: "Literature Review", category: "Academic", icon: BookOpen, desc: "Synthesize and critique existing research", types: ["Narrative", "Systematic", "Scoping", "Thematic"] },
  { slug: "business_report", name: "Business Report", category: "Professional", icon: Briefcase, desc: "Professional business format with executive summary", types: ["Analytical", "Informational", "Progress", "Feasibility"] },
  { slug: "presentation", name: "Presentation Outline", category: "Professional", icon: PenTool, desc: "Slide deck structure with speaker notes", types: ["Pitch", "Academic", "Training", "Conference"] },
  { slug: "reflection", name: "Reflection Paper", category: "Academic", icon: GraduationCap, desc: "Personal learning reflection with critical analysis", types: ["Course", "Experiential", "Critical Incident", "Portfolio"] },
  { slug: "technical_report", name: "Technical Report", category: "Professional", icon: Zap, desc: "Engineering/technical documentation structure", types: ["Design", "Feasibility", "Test", "Maintenance"] },
  { slug: "code_docs", name: "Code Documentation", category: "Professional", icon: FileText, desc: "Software project documentation with examples", types: ["API", "User Guide", "Architecture", "README"] },
  { slug: "thesis_proposal", name: "Thesis Proposal", category: "Academic", icon: BookOpen, desc: "Research proposal with objectives & methodology", types: ["Master's", "PhD", "Grant", "Capstone"] },
  { slug: "resume", name: "Resume/Cover Letter", category: "Professional", icon: Briefcase, desc: "Professional application documents", types: ["Resume", "Cover Letter", "LinkedIn", "Portfolio"] },
];

const categories = ["All", "Academic", "Professional"];

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = allTemplates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (template: typeof allTemplates[0]) => {
    router.push(`/wizard?template=${encodeURIComponent(template.name)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <Zap className="h-6 w-6" /> AssignPro
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link href="/wizard" className="text-sm text-muted-foreground hover:text-foreground">New Assignment</Link>
              <Link href="/templates" className="text-sm font-medium text-foreground">Templates</Link>
              <Link href="/library" className="text-sm text-muted-foreground hover:text-foreground">Library</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Template Library</h1>
          <p className="text-muted-foreground mt-1">
            Choose a pre-structured template or start from scratch. Each template includes
            recommended sections, word budgets, and formatting for your assignment type.
          </p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <Card
              key={template.slug}
              onClick={() => handleSelect(template)}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-3 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
                      template.category === "Academic" && "bg-blue-100 dark:bg-blue-900/30",
                      template.category === "Professional" && "bg-purple-100 dark:bg-purple-900/30"
                    )}>
                      <template.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        template.category === "Academic" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                        template.category === "Professional" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      )}>
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{template.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.types.slice(0, 3).map((type) => (
                    <span key={type} className="px-2 py-0.5 text-xs rounded border border-border bg-muted">
                      {type}
                    </span>
                  ))}
                  {template.types.length > 3 && (
                    <span className="px-2 py-0.5 text-xs rounded border border-border bg-muted text-muted-foreground">
                      +{template.types.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 border-t border-border/50">
                <Button variant="outline" className="w-full" onClick={(e) => { e.stopPropagation(); handleSelect(template); }}>
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Start from scratch card */}
          <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center py-6">
              <div className="p-3 rounded-full bg-muted border border-border w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Start from Scratch</h3>
              <p className="text-sm text-muted-foreground mb-4">Build a custom assignment structure</p>
              <Button variant="outline" onClick={() => router.push("/wizard")}>
                Create Custom
              </Button>
            </CardContent>
          </Card>
        </div>

        {filtered.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

import { CardFooter } from "@/components/ui/card-footer";