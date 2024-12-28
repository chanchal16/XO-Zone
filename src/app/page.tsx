"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  selectSymbol,
  setInitialScores,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchScores } from "@/lib/api";
import { useEffect } from "react";
import { initializeSession } from "@/helpers/store-session";

export default function Home() {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const sessionId = initializeSession();
    const loadScores = async () => {
      const scores = await fetchScores(sessionId);
      if (scores) {
        dispatch(setInitialScores(scores));
      }
    };
    loadScores();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Choose your symbol</h1>
      <div className="flex gap-4">
        <Button
          variant={"default"}
          className="bg-purple-500 hover:bg-purple-700"
          onClick={() => dispatch(selectSymbol("X"))}
        >
          Choose X
        </Button>
        <Button
          variant={"default"}
          className="bg-yellow-500 hover:bg-yellow-700"
          onClick={() => dispatch(selectSymbol("O"))}
        >
          Choose O
        </Button>
      </div>
      {playerSymbol && (
        <div>
          <div className="text-lg mb-4">
            You are: {playerSymbol} | AI is: {aiSymbol}
          </div>

          <Button
            variant={"secondary"}
            className="bg-green-500 hover:bg-green-600"
            onClick={() => router.push("/game")}
          >
            Start Game
          </Button>
        </div>
      )}
    </div>
  );
}