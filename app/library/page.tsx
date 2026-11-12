"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth-provider";
import {
  Search, FolderOpen, FileText, Upload, MoreHorizontal,
  ChevronRight, Edit, Trash2, Download, Eye, Copy,
  Filter, X
} from "lucide-react";
import { cn, fmtDate } from "@/lib/utils";

const mockProjects = [
  { id: "1", title: "Impact of Remote Work on Productivity", subject: "Business Management", type: "Research Paper", level: "Undergraduate", wordCount: 1500, status: "complete", updatedAt: "2025-01-15", sections: 6 },
  { id: "2", title: "Photosynthesis Rate in Aquatic Plants", subject: "Biology", type: "Lab Report", level: "High School", wordCount: 1200, status: "drafting", updatedAt: "2025-01-10", sections: 4 },
  { id: "3", title: "Social Media & Adolescent Mental Health", subject: "Psychology", type: "Literature Review", level: "Postgraduate", wordCount: 3000, status: "outline", updatedAt: "2025-01-08", sections: 8 },
];

const mockSources = [
  { id: "1", title: "Bloom et al. (2021) - Working from Home", type: "pdf", projectId: "1", createdAt: "2025-01-10" },
  { id: "2", title: "Choudhury et al. (2020) - Geography of Work", type: "url", projectId: "1", createdAt: "2025-01-10" },
  { id: "3", title: "Sample Essay - Business Management", type: "sample", projectId: "1", createdAt: "2025-01-09" },
];

export default function LibraryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [projects, setProjects] = useState(mockProjects);
  const [sources, setSources] = useState(mockSources);
  const [loading, setLoading] = useState(false);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    outline: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    drafting: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    complete: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const typeIcons: Record<string, React.ReactNode> = {
    pdf: <FileText className="h-4 w-4 text-red-500" />,
    url: <FileText className="h-4 w-4 text-blue-500" />,
    sample: <FileText className="h-4 w-4 text-green-500" />,
    text: <FileText className="h-4 w-4 text-gray-500" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <FolderOpen className="h-6 w-6" /> AssignPro
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link href="/wizard" className="text-sm text-muted-foreground hover:text-foreground">New Assignment</Link>
              <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
              <Link href="/library" className="text-sm font-medium text-foreground">Library</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Library</h1>
          <p className="text-muted-foreground mt-1">
            All your projects, uploaded sources, and sample files in one place.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="sources">
              <FileText className="h-4 w-4 mr-2" />
              Sources & Samples ({sources.length})
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="drafting">Drafting</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProjects.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {search || filterStatus !== "all" ? "No matching projects" : "No projects yet"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {search || filterStatus !== "all"
                      ? "Try adjusting your search or filter."
                      : "Start your first assignment to see it here."}
                  </p>
                  <Button asChild>
                    <Link href="/wizard">Create Project</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="group relative transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="pr-8">
                          <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {project.subject} · {project.type} · {project.level}
                          </CardDescription>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
                          statusColors[project.status as keyof typeof statusColors] || statusColors.draft
                        )}>
                          {project.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {fmtDate(project.updatedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          {project.sections} sections
                        </span>
                        {project.wordCount && (
                          <span className="flex items-center gap-1">
                            ~{project.wordCount.toLocaleString()} words
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Link href={`/editor/${project.id}`}>
                          <Button variant="default" size="sm" className="flex-1 gap-1">
                            <Edit className="h-3 w-3" /> Open Editor
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-9 w-9">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2" disabled>
                <Upload className="h-4 w-4" />
                Upload Source
              </Button>
            </div>

            {sources.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No sources yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload PDFs, paste URLs, or add sample assignments to ground your research.
                  </p>
                  <Button variant="outline" disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Source
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {sources.map((source) => (
                  <Card key={source.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-muted">
                          {typeIcons[source.type] || <FileText className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{source.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {source.type === "pdf" ? "PDF Document" :
                              source.type === "url" ? "Web URL" :
                              source.type === "sample" ? "Sample Assignment" : "Text"}
                            · Added {fmtDate(source.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-9 w-9">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-9 w-9">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-9 w-9">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}