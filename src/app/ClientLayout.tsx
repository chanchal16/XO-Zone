"use client";
import PlayerInfo from "@/components/PlayerInfo";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { score, playerSymbol, aiSymbol } = singlePlayerState;
  const pathname = usePathname();

  return (
    <>
      <header className="header">Header</header>
      <aside className="sidebar-left">
        {pathname === "/game" && (
          <div className="my-20">
            <PlayerInfo
              className="!mb-0 justify-center"
              player={playerSymbol}
              bot={aiSymbol}
              avatarWidth={80}
              avatarHeight={80}
              labelClassName="!bg-minimal-gridLines !py-1"
            />
            <p className="text-minimal-accentC text-2xl text-center">
              {score.player} : {score.AI}
            </p>
          </div>
        )}
      </aside>
      <main className="main bg-minimal-gridLines">{children}</main>
      <aside className="sidebar-right">Right Sidebar</aside>
      <footer className="footer">Footer</footer>
    </>
  );
}