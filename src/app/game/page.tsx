"use client";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import { resetGame } from "@/lib/features/single-player/singlePlayerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const SinglePlayerGame = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { winner, score, isDraw } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuit = () => {
    dispatch(resetGame());
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-3 gap-2 w-60">
        <Board />
      </div>

      <div className="flex flex-col w-60">
        <h3 className="text-xl">Score</h3>
        <div className="flex w-40 justify-between text-gray-500 text-lg">
          <p>player: {score.player}</p>
          <p>AI: {score.AI}</p>
        </div>
      </div>

      {winner && (
        <h2 className="text-3xl">
          Winner is - <span className="text-amber-600">{winner}</span>
        </h2>
      )}
      {isDraw && <div className="text-center mt-4">It's a Draw!</div>}

      <Button variant={"destructive"} onClick={handleQuit}>
        Quit
      </Button>
    </div>
  );
};

export default SinglePlayerGame;
