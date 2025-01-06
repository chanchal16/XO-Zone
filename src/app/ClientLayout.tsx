"use client";
import { usePathname } from "next/navigation";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <header className="header">
        <h3 className="text-minimal-playerX-200 text-xl">XO-Zone</h3>
      </header>
      <aside className="sidebar-left px-4">
        {pathname === "/game" && <LeftSidebar />}
      </aside>
      <main className="main bg-minimal-gridLines">{children}</main>
      <aside className="sidebar-right px-3">
        {pathname === "/game" && <RightSidebar />}
      </aside>
      <footer className="footer">
        <p className="text-minimal-playerX-200 w-full">&lt;/&gt; by Chanchal</p>
      </footer>
    </>
  );
}