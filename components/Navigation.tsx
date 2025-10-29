"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [loading, user, pathname, router]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  if (loading) {
    return (
      <nav className="flex justify-center gap-4 p-4 shadow-sm bg-white">
        <div className="animate-pulse">Loading...</div>
      </nav>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm bg-white">
      <div className="flex gap-4">
        <Link href="/">
          <Button
            variant={pathname === "/" ? "default" : "outline"}
            className={
              pathname === "/"
                ? "bg-black text-white hover:bg-black"
                : "hover:bg-gray-100"
            }
          >
            All Tasks
          </Button>
        </Link>

        <Link href="/add">
          <Button
            variant={pathname === "/add" ? "default" : "outline"}
            className={
              pathname === "/add"
                ? "bg-black text-white hover:bg-black"
                : "hover:bg-gray-100"
            }
          >
            Add Task
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, {user?.email?.split("@")[0] || "Guest"}
        </span>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </nav>
  );
}
