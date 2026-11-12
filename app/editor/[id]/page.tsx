"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth-provider";
import {
  ArrowLeft, FileText, Search, Zap, CheckCircle,
  Loader2, MessageSquare, Layers, Settings, Download
} from "lucide-react";

export default function EditorPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("editor");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
                <Zap className="h-6 w-6" /> AssignPro
              </Link>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:flex">
                <TabsList>
                  <TabsTrigger value="editor" className="px-3 py-1.5">
                    <FileText className="h-4 w-4 mr-1" /> Editor
                  </TabsTrigger>
                  <TabsTrigger value="outline" className="px-3 py-1.5">
                    <Layers className="h-4 w-4 mr-1" /> Outline
                  </TabsTrigger>
                  <TabsTrigger value="research" className="px-3 py-1.5">
                    <Search className="h-4 w-4 mr-1" /> Research
                  </TabsTrigger>
                  <TabsTrigger value="checks" className="px-3 py-1.5">
                    <CheckCircle className="h-4 w-4 mr-1" /> Checks
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="px-3 py-1.5">
                    <MessageSquare className="h-4 w-4 mr-1" /> AI Chat
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3 w-3" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Outline */}
        <aside className="hidden lg:block w-64 border-r border-border/50 bg-background/50 overflow-y-auto">
          <div className="p-4 border-b border-border/50">
            <h3 className="font-medium mb-3">Outline</h3>
            <div className="space-y-2 text-sm">
              {[
                "Introduction",
                "Literature Review",
                "Methodology",
                "Results",
                "Discussion",
                "Conclusion",
                "References",
              ].map((section, i) => (
                <button
                  key={section}
                  className={cn(
                    "w-full text-left p-2 rounded-lg transition-colors flex items-center gap-2",
                    i === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  )}
                >
                  <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
                  <span>{section}</span>
                  {i === 0 && <CheckCircle className="h-3 w-3 text-primary ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeTab === "editor" && (
            <div className="flex-1 flex flex-col p-8">
              <Card className="flex-1 max-w-3xl mx-auto w-full">
                <CardHeader>
                  <CardTitle>Editor Workspace (Coming Soon)</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 mx-auto text-primary/50 animate-spin mb-4" />
                    <h3 className="text-lg font-medium mb-2">Rich Text Editor with TipTap</h3>
                    <p className="text-muted-foreground mb-6">
                      Streaming AI drafting, inline actions, version history, and more.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground max-w-xs mx-auto">
                      <p>• Block-based editor (TipTap)</p>
                      <p>• Inline AI: Rewrite, Paraphrase, Fix grammar, Explain, Add evidence</p>
                      <p>• Version history with restore</p>
                      <p>• Export to DOCX, PDF, Markdown</p>
                      <p>• Auto-format title page, headings, references</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "outline" && (
            <div className="flex-1 p-8">
              <Card className="max-w-3xl mx-auto w-full">
                <CardHeader>
                  <CardTitle>AI Outline Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Generate structured outline with headings, sub-points, and word budgets.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "research" && (
            <div className="flex-1 p-8">
              <Card className="max-w-3xl mx-auto w-full">
                <CardHeader>
                  <CardTitle>Research Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Key concepts, arguments, counter-arguments, and verifiable sources.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "checks" && (
            <div className="flex-1 p-8">
              <Card className="max-w-3xl mx-auto w-full">
                <CardHeader>
                  <CardTitle>Quality Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Grammar, readability, word count vs target, rubric checklist, citation formatter.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="flex-1 p-8">
              <Card className="max-w-3xl mx-auto w-full">
                <CardHeader>
                  <CardTitle>AI Assistant Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Context-aware chat: "Explain this paragraph", "Strengthen my conclusion", etc.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Sidebar - AI Panel */}
        <aside className="hidden xl:block w-80 border-l border-border/50 bg-background/50 overflow-y-auto">
          <div className="p-4 border-b border-border/50">
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ask about your assignment, get help with any section.
            </p>
          </div>
          <div className="p-4 space-y-3">
            {[
              "Explain this section",
              "Strengthen my argument",
              "Add a counter-argument",
              "Simplify the language",
              "Add an example",
              "Check my citations",
            ].map((action) => (
              <Button key={action} variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                {action}
              </Button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

import { useState } from "react";
import { cn } from "@/lib/utils";