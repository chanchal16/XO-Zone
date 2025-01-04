"use client";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import {
  resetGame,
  restartGame,
  selectDifficulty,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SinglePlayerGame = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { winner, isDraw } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleQuit = () => {
    dispatch(resetGame());
    router.push("/");
  };

  const handleChange = (value: any) => {
    dispatch(selectDifficulty(value));
  };

  return (
    <div className="flex flex-col items-center bg-minimal-playerO-100 text-minimal-textClr min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="self-start">
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
      <div className="grid grid-cols-3 p-6 w-72 bg-minimal-board rounded-lg">
        <Board />
      </div>

      {winner && (
        <h2 className="text-3xl">
          Winner is - <span className="text-amber-600">{winner}</span>
        </h2>
      )}
      {isDraw && <div className="text-center mt-4">It's a Draw!</div>}

      <div className="flex gap-6">
        <Button
          variant={"default"}
          className=" text-white font-semibold bg-minimal-accentC"
          onClick={() => dispatch(restartGame())}
        >
          Restart
        </Button>
        <Button
          variant={"destructive"}
          className="bg-minimal-playerO-200 text-black"
          onClick={handleQuit}
        >
          Quit
        </Button>
      </div>
    </div>
  );
};

export default SinglePlayerGame;