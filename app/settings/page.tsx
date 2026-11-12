"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth-provider";
import { toast } from "@/hooks/use-toast";
import { Sparkles, User, CreditCard, Shield, Moon, Sun, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || "", email: user.email });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile.name }),
      });
      if (res.ok) {
        toast({ title: "Profile updated", variant: "success" });
      } else {
        toast({ title: "Failed to update", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (password.new.length < 8) {
      toast({ title: "Password too short", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: password.current, new: password.new }),
      });
      if (res.ok) {
        toast({ title: "Password changed", variant: "success" });
        setPassword({ current: "", new: "", confirm: "" });
      } else {
        const data = await res.json();
        toast({ title: data.error || "Failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!user) return null;

  const planLabels = { free: "Free", pro: "Pro", team: "Team" };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-xl gradient-text">
              <Sparkles className="h-6 w-6" /> AssignPro
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link href="/wizard" className="text-sm text-muted-foreground hover:text-foreground">New Assignment</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account, billing, and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="h-4 w-4 mr-2" /> Billing</TabsTrigger>
            <TabsTrigger value="preferences"><Shield className="h-4 w-4 mr-2" /> Preferences</TabsTrigger>
            <TabsTrigger value="danger"><LogOut className="h-4 w-4 mr-2" /> Account</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your name and view your email</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Plan</Label>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium",
                        user.plan === "pro" && "bg-primary/10 text-primary",
                        user.plan === "team" && "bg-accent/10 text-accent",
                        user.plan === "free" && "bg-muted text-muted-foreground"
                      )}>
                        {planLabels[user.plan as keyof typeof planLabels] || user.plan}
                      </span>
                      {user.plan === "free" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/settings?upgrade=true">Upgrade</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                      minLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    />
                  </div>
                  <Button type="submit" disabled={loading} variant="outline">
                    {loading ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Manage your plan and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg border border-border bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {planLabels[user.plan as keyof typeof planLabels] || user.plan} —{${
                          user.plan === "free" ? "0" : user.plan === "pro" ? "12" : "39"
                        }}/month
                      </p>
                    </div>
                    {user.plan === "free" && (
                      <Button asChild variant="default">
                        <Link href="/api/billing/checkout?plan=pro">Upgrade to Pro</Link>
                      </Button>
                    )}
                    {user.plan === "pro" && (
                      <Button asChild variant="outline">
                        <Link href="/api/billing/checkout?plan=team">Upgrade to Team</Link>
                      </Button>
                    )}
                    {user.plan === "team" && (
                      <span className="text-sm text-green-600 dark:text-green-400">Team plan active</span>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Billing History</h4>
                  <p className="text-sm text-muted-foreground">
                    No billing history yet. Invoices will appear here after your first payment.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Payment Method</h4>
                  <p className="text-sm text-muted-foreground">
                    No payment method on file. Add one during checkout.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how AssignPro looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="w-24">
                      <Sun className="h-4 w-4 mr-1" /> Light
                    </Button>
                    <Button variant="outline" size="sm" className="w-24">
                      <Moon className="h-4 w-4 mr-1" /> Dark
                    </Button>
                    <Button variant="default" size="sm" className="w-24">
                      System
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Learning Mode</p>
                    <p className="text-sm text-muted-foreground">Show explanations as you write</p>
                  </div>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what emails you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Project updates", desc: "When AI completes a section" },
                  { label: "Weekly digest", desc: "Progress summary every Monday" },
                  { label: "Billing receipts", desc: "Invoice and payment confirmations" },
                  { label: "Product updates", desc: "New features and announcements" },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{n.label}</p>
                      <p className="text-sm text-muted-foreground">{n.desc}</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger zone */}
          <TabsContent value="danger">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data. This cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={() => alert("Delete account flow coming soon")}>
                      Delete Account
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sign Out</p>
                      <p className="text-sm text-muted-foreground">Sign out of your current session</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import Link from "next/link";