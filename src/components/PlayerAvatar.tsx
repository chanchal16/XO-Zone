import {
  setBotAvatar,
  setPlayerAvatar,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppSelector } from "@/lib/hooks";
import { AvatarProp } from "@/types/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const PlayerAvatar = ({
  playerSymbol,
  avatarWidth,
  avatarHeight,
  type,
}: AvatarProp) => {
  const dispatch = useDispatch();
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { playerAvatar, botAvatar } = singlePlayerState;
  const avatarUrl = type === "player" ? playerAvatar : botAvatar;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !avatarUrl) {
      const fetchAvatar = async () => {
        try {
          const response = await fetch(
            `https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${playerSymbol}-${uuid()}&radius=15`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch avatar");
          }

          const svgText = await response.text();
          const encodedSvg = encodeURIComponent(svgText)
            .replace(/'/g, "%27")
            .replace(/"/g, "%22");
          const dataUri = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

          // Dispatch avatar to Redux store
          if (type === "player") {
            dispatch(setPlayerAvatar(dataUri));
          } else {
            dispatch(setBotAvatar(dataUri));
          }
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      };

      fetchAvatar();
    }
  }, [avatarUrl, playerSymbol, type, dispatch, hasMounted]);

  if (!hasMounted) return null; // Prevent rendering during SSR

  return (
    <div>
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt={`Avatar-${playerSymbol}`}
          width={avatarWidth ?? 100}
          height={avatarHeight ?? 100}
          className="border-[3px] border-white rounded-md"
        />
      )}
    </div>
  );
};

export default PlayerAvatar;
