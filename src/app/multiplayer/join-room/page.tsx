// src/app/multiplayer/join-room/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setIsRoomCreator,
  setPlayerOName,
  setRoomId,
} from "@/lib/features/multi-player/multiPlayerSlice";
import { useState } from "react";

const JoinRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomIdState] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleJoinRoom = () => {
    dispatch(setRoomId(roomId));
    dispatch(setPlayerOName(playerName));
    dispatch(setIsRoomCreator(false));
    // Redirect to room
    router.push(`/multiplayer/room/${roomId}`);
  };

  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        placeholder="Enter your name (playerO)"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomIdState(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;