"use client";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [playerSymbol, setPlayerSymbol] = useState<string>("");
  const [aiSymbol, setAiSymbol] = useState<string>("");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [winner, setWinner] = useState(null);

  const selectSymbol = (symbol: string) => {
    setPlayerSymbol(symbol);
    setAiSymbol(symbol === "X" ? "O" : "X");
  };
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-4">
        <Button
          variant={"default"}
          className="bg-purple-500 hover:bg-purple-700"
          onClick={() => selectSymbol("X")}
        >
          Choose X
        </Button>
        <Button
          variant={"default"}
          className="bg-yellow-500 hover:bg-yellow-700"
          onClick={() => selectSymbol("O")}
        >
          Choose O
        </Button>
      </div>
      {playerSymbol && (
        <div className="text-lg mb-4">
          You are: {playerSymbol} | AI is: {aiSymbol}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 w-60">
        <Board
          board={board}
          winner={winner}
          playerSymbol={playerSymbol}
          aiSymbol={aiSymbol}
          setBoard={setBoard}
        />
      </div>
    </div>
  );
}