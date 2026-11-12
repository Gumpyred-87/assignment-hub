"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth-provider";
import { useSession } from "@/components/session-provider";
import { toast } from "@/hooks/use-toast";
import {
  Plus, FileText, FolderOpen, Clock, TrendingUp,
  BookOpen, Zap, Settings, ChevronRight, MoreHorizontal,
  Eye, Edit, Trash2, Download, Copy
} from "lucide-react";
import { cn, fmtDate, getPlanLimits } from "@/lib/utils";

const quickTemplates = [
  { name: "Essay", icon: FileText, desc: "Standard academic essay" },
  { name: "Research Paper", icon: BookOpen, desc: "With literature review & methodology" },
  { name: "Lab Report", icon: Zap, desc: "IMRaD structure for sciences" },
  { name: "Case Study", icon: FolderOpen, desc: "Problem-solution analysis" },
  { name: "Literature Review", icon: BookOpen, desc: "Synthesize existing research" },
  { name: "Business Report", icon: TrendingUp, desc: "Professional business format" },
];

function ProjectCard({ project }: { project: any }) {
  const statusColors = {
    draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    outline: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    drafting: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    complete: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="mt-1">
              {project.subject} · {project.level} · {project.wordCount ? `${project.wordCount} words` : "No word count"}
            </CardDescription>
          </div>
          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", statusColors[project.status as keyof typeof statusColors] || statusColors.draft)}>
            {project.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">{fmtDate(project.updatedAt)}</span>
          <span className="flex items-center gap-1">{project.sections?.length || 0} sections</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/editor/${project.id}`}>
            <Button variant="default" size="sm" className="flex-1">
              <Edit className="h-3 w-3 mr-1" /> Continue
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="h-9 w-9">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const session = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState({ used: 0, limit: 3 });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function load() {
      try {
        const [projectsRes, usageRes] = await Promise.all([
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/usage", { cache: "no-store" }),
        ]);
        if (projectsRes.ok) {
          const data = await projectsRes.json();
          setProjects(data.projects || []);
        }
        if (usageRes.ok) {
          const data = await usageRes.json();
          setUsage(data);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (user) load();
  }, [user]);

  const handleNewProject = () => {
    router.push("/wizard");
  };

  const handleTemplateClick = (templateName: string) => {
    router.push(`/wizard?template=${encodeURIComponent(templateName)}`);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex h-12 w-24 items-center justify-center rounded-lg bg-muted" />
      </div>
    );
  }

  const planLimits = getPlanLimits(user.plan || "free");
  const usagePercent = planLimits.projectsPerMonth === Infinity
    ? 0
    : Math.min(100, (usage.used / planLimits.projectsPerMonth) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
                <Zap className="h-6 w-6" /> AssignPro
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
                <Link href="/wizard" className="text-sm text-muted-foreground hover:text-foreground">New Assignment</Link>
                <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</Link>
                <Link href="/library" className="text-sm text-muted-foreground hover:text-foreground">Library</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <div className="w-px h-6 bg-border" />
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="hidden sm:inline">{user.name || user.email}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome + Usage */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name || "there"}</h1>
              <p className="text-muted-foreground mt-1">
                {projects.length === 0
                  ? "Start your first assignment or pick a template below"
                  : `You have ${projects.length} project${projects.length !== 1 ? "s" : ""} in progress`}
              </p>
            </div>
            <Button onClick={handleNewProject} className="gap-2" size="lg">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          </div>

          {/* Usage meter */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Monthly Usage</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user.plan === "free" ? "Free" : user.plan === "pro" ? "Pro" : "Team"}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {planLimits.projectsPerMonth === Infinity
                    ? "Unlimited projects"
                    : `${usage.used} / ${planLimits.projectsPerMonth} projects`}
                </span>
              </div>
              <Progress value={usagePercent} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {planLimits.projectsPerMonth === Infinity
                  ? "Unlimited projects on your plan"
                  : `${planLimits.projectsPerMonth - usage.used} projects remaining this month`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick templates */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Quick start with a template</h2>
            <Link href="/templates" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTemplates.map((t) => (
              <Card
                key={t.name}
                onClick={() => handleTemplateClick(t.name)}
                className="cursor-pointer hover:border-primary/50 transition-colors group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent projects */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            {projects.length > 0 && (
              <Link href="/library" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your first assignment or pick a template above.
                </p>
                <Button onClick={handleNewProject} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}