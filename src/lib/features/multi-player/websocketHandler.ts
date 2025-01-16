import { PartySocket } from "partysocket";

let partySocket: PartySocket | null = null;

export const connectToRoom = (
  roomId: string,
  playerName: string,
  onMessage: (data: any) => void
) => {
  partySocket = new PartySocket({
    host: "localhost:1999", // Replace with your PartyKit domain
    room: roomId,
  });

  partySocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  partySocket.onopen = () => {
    console.log("Connected to room:", roomId);
    sendMessage({ type: "join", playerName });
  };

  partySocket.onclose = () => {
    console.log("Disconnected from room");
  };
};

export const sendMessage = (message: any) => {
  if (partySocket) {
    partySocket.send(JSON.stringify(message));
  }
};

export const disconnectFromRoom = () => {
  if (partySocket) {
    partySocket.close();
    partySocket = null;
  }
};
