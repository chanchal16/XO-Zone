"use client";
import React from "react";
import PlayerInfo from "./PlayerInfo";
import { useAppSelector } from "@/lib/hooks";

const RightSidebar = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { score, playerSymbol, aiSymbol } = singlePlayerState;
  return (
    <div className="my-20">
      <PlayerInfo
        className="!mb-0 justify-center"
        player={playerSymbol}
        bot={aiSymbol}
        avatarWidth={80}
        avatarHeight={80}
        labelClassName="!bg-minimal-gridLines !py-1"
      />
      <p className="text-minimal-accentC text-2xl text-center">
        {score.player} : {score.AI}
      </p>
    </div>
  );
};

export default RightSidebar;