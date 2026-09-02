import React from "react";
import AdminSidebar from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      <AdminSidebar />
      <main className="min-w-0 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
