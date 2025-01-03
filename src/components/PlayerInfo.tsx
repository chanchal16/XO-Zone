import { IPlayer } from "@/types/type";
import React from "react";
import Image from "next/image";

const PlayerInfo = ({ player, bot, avatar }: IPlayer) => {
  return (
    <div className="flex gap-16 text-lg mb-8">
      <div className="flex flex-col items-center px-2 relative">
        <Image
          src={"https://api.multiavatar.com/Broomhilda.svg"}
          alt="avatar"
          width={100}
          height={100}
        />
        <span className="py-1.5 px-4 absolute -bottom-3.5 bg-minimal-playerX-100 text-minimal-accentC rounded-md text-sm">
          You are {player}
        </span>
      </div>
      <div className="flex flex-col items-center relative">
        <Image
          src={"https://api.multiavatar.com/Skeleto.svg"}
          alt="bot"
          width={100}
          height={100}
        />
        <span className="py-1.5 px-4 absolute -bottom-3.5 bg-minimal-playerX-100 text-minimal-accentC rounded-md text-sm">
          Bot is {bot}
        </span>
      </div>
    </div>
  );
};

export default PlayerInfo;