"use client";
import Board from "@/components/Board";
import ResultModal from "@/components/ResultModal";
import { useAppSelector } from "@/lib/hooks";

import React from "react";

const SinglePlayerGame = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { winner, isDraw } = singlePlayerState; 

  return (
    <div className="flex flex-col items-center bg-minimal-playerO-100 text-minimal-textClr min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-poppins)]">
      <div className="grid grid-cols-3 p-6 w-72 bg-minimal-board rounded-lg">
        <Board />
      </div>

      <ResultModal />
      {isDraw && <div className="text-center mt-4">It's a Draw!</div>}
    </div>
  );
};

export default SinglePlayerGame;