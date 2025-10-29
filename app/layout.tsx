"use client";

import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TodoProvider } from "@/context/TodoContext";
import Navigation from '@/components/Navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <TodoProvider>
            <Navigation />
            <main className="flex justify-center p-6">{children}</main>
          </TodoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
