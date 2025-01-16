// src/app/multiplayer/room/[roomId]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  setConnectionStatus,
  setPlayerOName,
} from "@/lib/features/multi-player/multiPlayerSlice";
import {
  connectToRoom,
  disconnectFromRoom,
  sendMessage,
} from "@/lib/features/multi-player/websocketHandler";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Room = () => {
  const params = useParams<{ roomId: string }>();
  const { roomId } = params;
  console.log("params", params);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const multiPlayerState = useAppSelector((state) => state.multiMode);
  const { playerX, playerO, isRoomCreator } = multiPlayerState;

  // useEffect(() => {
  //   if (!playerX) {
  //     router.push("/multiplayer/create-room"); // Redirect if no player name
  //     return;
  //   }
  //   connectToRoom(roomId, playerO, (data) => {
  //     console.log('data',data);

  //     if (data.type === "join") {
  //       dispatch(setPlayerOName(data.playerO));
  //     }
  //   });

  //   dispatch(setConnectionStatus("connected"));

  //   return () => {
  //     disconnectFromRoom();
  //     dispatch(setConnectionStatus("disconnected"));
  //   };
  // }, [roomId, playerO, dispatch, router]);

  useEffect(() => {
    if (!playerX && !playerO) {
      router.push("/multiplayer");
    }
  }, [playerX, playerO, router]);

  const startGame = () => {
    sendMessage({ type: "start", roomId });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1>Room: {roomId}</h1>
      <p>PlayerX: {playerX}</p>
      <p>PlayerO: {playerO}</p>
      {isRoomCreator && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default Room;