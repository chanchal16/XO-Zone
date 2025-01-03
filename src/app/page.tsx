"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { selectSymbol } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center  bg-minimal-gridLines text-minimal-textClr min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-poppins)]">
      <h1 className="text-3xl font-semibold font-[family-name:var(--font-chewy)]">
        Pick your side
      </h1>
      <div className="flex flex-col gap-8 ">
        <button
          className="bg-white rounded-full p-4"
          onClick={() => dispatch(selectSymbol("X"))}
        >
          <Image src={"/x-mark.png"} alt="X-icon" width={44} height={44} />
        </button>
        <button
          className="bg-white rounded-full p-4"
          onClick={() => dispatch(selectSymbol("O"))}
        >
          <Image src={"/blue-o.png"} alt="O-icon" width={48} height={48} />
        </button>
      </div>
      {playerSymbol && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <PlayerInfo player={playerSymbol} bot={aiSymbol} />
          <Button
            variant={"default"}
            className="bg-minimal-accentC rounded-md text-minimal-playerX-100 hover:bg-minimal-playerX-100 hover:text-minimal-accentC"
            onClick={() => router.push("/game")}
          >
            Start Game
          </Button>
        </div>
      )}
    </div>
  );
}