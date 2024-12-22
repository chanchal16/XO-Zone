"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [symbol, setSymbol] = useState<string>("");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const selectSymbol = (symbol: string) => {
    setSymbol(symbol);
    console.log("clicked", symbol);
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

      <div className="grid grid-cols-3 gap-2 w-60">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="w-20 h-20 text-xl border border-gray-400 flex items-center justify-center"
            >
              {cell}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
