import { IPlayer } from "@/types/type";
import React from "react";
import Image from "next/image";

const PlayerInfo = ({ player, bot, avatar }: IPlayer) => {
  return (
    <div className="flex gap-12 text-lg mb-4">
      <div className="flex flex-col items-center">
        <Image
          src={"https://api.multiavatar.com/Broomhilda.svg"}
          alt="avatar"
          width={100}
          height={100}
        />
        <span className="p-2 bg-minimal-playerO-100 text-minimal-playerX-200 rounded-md text-sm">
          You are {player}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={"https://api.multiavatar.com/Skeleto.svg"}
          alt="bot"
          width={100}
          height={100}
        />
        <span className="p-2 bg-minimal-playerO-100 text-minimal-playerX-200 rounded-md text-sm">
          Bot is {bot}
        </span>
      </div>
    </div>
  );
};

export default PlayerInfo;
