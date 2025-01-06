"use client";
import Board from "@/components/Board";
import ResultModal from "@/components/ResultModal";
import React from "react";

const SinglePlayerGame = () => {
  return (
    // min-h-screen
    <div className="flex flex-col items-center bg-minimal-playerO-100 text-minimal-textClr p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-poppins)]">
      <div className="grid grid-cols-3 p-6 w-80 bg-minimal-board rounded-lg">
        <Board />
      </div>
      <ResultModal />
    </div>
  );
};

export default SinglePlayerGame;