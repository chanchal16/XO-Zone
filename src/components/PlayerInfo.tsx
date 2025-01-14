"use client";
import { IPlayer } from "@/types/type";
import React from "react";
import SymbolIcon from "./Symbol";
import PlayerAvatar from "./PlayerAvatar";

const PlayerInfo = ({ player, bot, className, labelClassName }: IPlayer) => {
  return (
    <div className={`flex gap-16 text-lg mb-8 ${className}`}>
      <div className="flex flex-col items-center px-2 relative">
        <PlayerAvatar playerSymbol={player} type="player" />
        <span
          className={`${labelClassName} py-1.5 px-4 inline-flex items-center gap-2 absolute -bottom-3.5 bg-white
          text-minimal-accentC rounded-md text-xs md:text-sm`}
        >
          You {<SymbolIcon symbol={player} width={14} height={14} />}
        </span>
      </div>
      <div className="flex flex-col items-center relative">
        <PlayerAvatar playerSymbol={bot} type="bot" />
        <span
          className={`${labelClassName} py-1.5 px-4 inline-flex items-center gap-2 absolute -bottom-3.5 bg-white 
          text-minimal-accentC rounded-md text-xs md:text-sm`}
        >
          Bot {<SymbolIcon symbol={bot} width={14} height={14} />}
        </span>
      </div>
    </div>
  );
};

export default PlayerInfo;