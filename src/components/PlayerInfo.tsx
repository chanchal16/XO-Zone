import { IPlayer } from "@/types/type";
import React from "react";
import Image from "next/image";
import SymbolIcon from "./Symbol";

const PlayerInfo = ({
  player,
  bot,
  avatar,
  className,
  avatarWidth,
  avatarHeight,
  labelClassName,
}: IPlayer) => {
  return (
    <div className={`flex gap-16 text-lg mb-8 ${className}`}>
      <div className="flex flex-col items-center px-2 relative">
        <Image
          src={"https://api.multiavatar.com/Broomhilda.svg"}
          alt="avatar"
          width={avatarWidth ?? 100}
          height={avatarHeight ?? 100}
        />
        <span
          className={`${labelClassName} py-1.5 px-4 inline-flex items-center gap-2 absolute -bottom-3.5 bg-white text-minimal-accentC rounded-md text-sm`}
        >
          You {<SymbolIcon symbol={player} width={14} height={14} />}
        </span>
      </div>
      <div className="flex flex-col items-center relative">
        <Image
          src={"https://api.multiavatar.com/Skeleto.svg"}
          alt="bot"
          width={avatarWidth ?? 100}
          height={avatarHeight ?? 100}
        />
        <span
          className={`${labelClassName} py-1.5 px-4 inline-flex items-center gap-2 absolute -bottom-3.5 bg-white text-minimal-accentC rounded-md text-sm`}
        >
          Bot {<SymbolIcon symbol={bot} width={14} height={14} />}
        </span>
      </div>
    </div>
  );
};

export default PlayerInfo;