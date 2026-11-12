"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  plan: string;
} | null;

const SessionContext = createContext<SessionUser>(null);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (active) setUser(data.user ?? null);
        }
      } catch {
        /* ignore */
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
  }, [pathname]);

  return (
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  );
}