"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { selectSymbol } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import PlayerInfo from "@/components/PlayerInfo";
import { useState } from "react";

export default function Home() {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mode, setMode] = useState<string>("");

  return (
    <div className="flex flex-col items-center  bg-minimal-gridLines text-minimal-textClr min-h-screen sm:min-h-max p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-poppins)]">
      {!mode && (
        <>
          <h1 className="text-3xl font-semibold font-[family-name:var(--font-chewy)]">
            Choose a mode
          </h1>
          <div className="flex flex-col gap-8 ">
            <Button
              variant={"secondary"}
              className="bg-white text-base text-minimal-playerO-200 p-4 hover:text-white hover:bg-minimal-playerO-200"
              onClick={() => setMode("single")}
            >
              Single Player
            </Button>
            {/* <Button
              variant={"secondary"}
              className="bg-white text-base text-minimal-playerO-200 p-4 hover:font-semibold"
              onClick={() => setMode('multi')}
            >
              Multi Player
            </Button> */}
          </div>
        </>
      )}
      {mode === "single" && (
        <>
          <h1 className="text-3xl font-semibold font-[family-name:var(--font-chewy)]">
            Pick your side
          </h1>
          <div className="flex justify-between gap-12 ">
            <button
              className="bg-white border-2 rounded-full p-4 hover:border-minimal-playerX-200"
              onClick={() => dispatch(selectSymbol("X"))}
            >
              <Image src={"/x-mark.png"} alt="X-icon" width={48} height={48} />
            </button>
            <button
              className="bg-white border-2 rounded-full p-4 hover:border-minimal-playerX-200"
              onClick={() => dispatch(selectSymbol("O"))}
            >
              <Image src={"/blue-o.png"} alt="O-icon" width={52} height={52} />
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
        </>
      )}
    </div>
  );
}