"use client";

import { GlobalSidebar } from "@/src/components/GlobalSidebar";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <GlobalSidebar />
        <SidebarInset>
          <main className="flex-1 overflow-auto">
            {/* Gradient orbs - dark mode only */}
            {/* <div className="dark:block hidden absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="dark:block hidden absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" /> */}

            <div className="container 2xl:max-w-[1680px] max-w-5xl mx-auto p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
