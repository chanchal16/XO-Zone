"use client";
import PlayerInfo from "@/components/PlayerInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectDifficulty } from "@/lib/features/single-player/singlePlayerSlice";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { score, playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleChange = (value: any) => {
    dispatch(selectDifficulty(value));
  };

  return (
    <>
      <header className="header">Header</header>
      <aside className="sidebar-left px-4">
        {pathname === "/game" && (
          <div className="mt-8">
            <label className="block text-base font-medium leading-6 text-gray-900">
              Choose a Difficulty
            </label>
            <Select defaultValue="easy" onValueChange={handleChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </aside>
      <main className="main bg-minimal-gridLines">{children}</main>
      <aside className="sidebar-right px-3">
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
      <footer className="footer">Footer</footer>
    </>
  );
}