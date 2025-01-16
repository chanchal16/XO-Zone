"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import {
  setIsRoomCreator,
  setPlayerXName,
  setRoomId,
} from "@/lib/features/multi-player/multiPlayerSlice";
import { v4 as uuid } from "uuid";

const CreateRoom = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomIdState] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateRoom = () => {
    const generatedRoomId = uuid();
    setRoomIdState(generatedRoomId);
    dispatch(setRoomId(generatedRoomId));
    dispatch(setPlayerXName(playerName));
    dispatch(setIsRoomCreator(true));

    // Redirect to room
    router.push(`/multiplayer/room/${generatedRoomId}`);
  };

  return (
    <div>
      <h1>Create Room</h1>
      <input
        type="text"
        placeholder="Enter your name (playerX)"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default CreateRoom;