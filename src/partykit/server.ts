// // import {  } from "partykit/server";

// export default {
//     onConnect(party:any) {
//       console.log(`Client connected to room: ${party.room}`);

//       party.broadcast(JSON.stringify({ type: "system", message: "Welcome to the room!" }));

//       party.onMessage((client:any, message:any) => {
//         console.log(`Message received from client ${client.id}:`, message);
//         party.broadcast(message, { exclude: client }); // Broadcast to others except sender
//       });

//       party.onClose((client:any) => {
//         console.log(`Client disconnected: ${client.id}`);
//       });
//     },
//   };

// Room state to store player details
const roomState: Record<
  string,
  { playerX: string | null; playerO: string | null; clients: Set<WebSocket> }
> = {};

// Handle new WebSocket connections
export default {
  async onConnect(ws: any, roomId: string) {
    if (!roomState[roomId]) {
      roomState[roomId] = {
        playerX: null,
        playerO: null,
        clients: new Set(),
      };
    }

    roomState[roomId].clients.add(ws);

    ws.onclose = () => {
      roomState[roomId].clients.delete(ws);

      // Cleanup room if no players are left
      if (roomState[roomId].clients.size === 0) {
        delete roomState[roomId];
      }
    };
  },

  async onMessage(ws: any, roomId: string, data: any) {
    const message = JSON.parse(data);

    if (!roomState[roomId]) return;

    if (message.type === "join-room") {
      const { playerName } = message;

      // Assign playerX or playerO
      if (!roomState[roomId].playerX) {
        roomState[roomId].playerX = playerName;
        ws.send(
          JSON.stringify({
            type: "joined",
            role: "playerX",
          })
        );
      } else if (!roomState[roomId].playerO) {
        roomState[roomId].playerO = playerName;
        ws.send(
          JSON.stringify({
            type: "joined",
            role: "playerO",
          })
        );
      } else {
        // Room is full
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Room is full",
          })
        );
      }

      // Notify all clients in the room of the updated state
      broadcast(roomId, {
        type: "room-update",
        playerX: roomState[roomId].playerX,
        playerO: roomState[roomId].playerO,
      });
    }

    if (message.type === "chat") {
      // Broadcast chat messages to all clients in the room
      broadcast(roomId, {
        type: "chat",
        message: message.message,
      });
    }
  },
};

// Helper to broadcast messages to all clients in the room
function broadcast(roomId: string, message: any) {
  const room = roomState[roomId];
  if (!room) return;

  for (const client of room.clients) {
    client.send(JSON.stringify(message));
  }
}