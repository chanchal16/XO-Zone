"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  selectDifficulty,
  resetGame,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const LeftSidebar = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { difficulty } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChange = (value: any) => {
    dispatch(selectDifficulty(value));
  };

  const handleBack = () => {
    dispatch(resetGame());
    router.push("/");
  };
  return (
    <div>
      <Button
        variant={"default"}
        className="text-minimal-gridLines mt-4"
        onClick={handleBack}
      >
        Back
      </Button>
      <div className="mt-8">
        <label className="block text-base font-medium leading-6 text-gray-900">
          Choose a Difficulty
        </label>
        <Select
          defaultValue={difficulty ?? "easy"}
          onValueChange={handleChange}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LeftSidebar;