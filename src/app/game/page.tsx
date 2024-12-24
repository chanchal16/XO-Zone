"use client";
import Board from "@/components/Board";
import React from "react";

const SinglePlayerGame = () => {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-3 gap-2 w-60">
        <Board />
      </div>

      <div className="flex flex-col w-60">
        <h3 className="text-xl">Score</h3>
        <div className="flex w-40 justify-between text-gray-500 text-lg">
          <p>player: 0</p>
          <p>AI: 0</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerGame;