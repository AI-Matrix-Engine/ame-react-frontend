// /src/lib/socket.ts
// import { io, Socket } from "socket.io-client";

// class SocketIOService {
//   private socket: Socket | null = null;

//   public init(authToken: string, userId: string): void {
//     if (!this.socket) {
//       this.socket = io(process.env.NEXT_PUBLIC_AIMATRIX_URL || 'https://dev-back.aimatrixengine.com/', {
//         // auth: {
//         //     token: authToken,
//         //     userId: userId
//         // }
//         // Do we need anything else here? Such as configurations here, e.g., auth tokens

//       });
//       this.socket.on("connect", () => console.log("Connected to Socket.IO server"));
//       this.socket.on("disconnect", () => console.log("Disconnected from Socket.IO server"));
//     }
//   }


//   public getSocket(): Socket | null {
//     return this.socket;
//   }

//   public disconnect(): void {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }
// }

// export const socketService = new SocketIOService();

'use client';

import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = 'https://aimatrix.ngrok.app/';

export const useSocketManager = (onNewResponse: (response: string) => void) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(
    (message: string) => {
      let newSocket = socket;
      if (!newSocket) {
        newSocket = io(URL, { autoConnect: false });
        setSocket(newSocket);
        newSocket.connect();

        newSocket.on('connect', () => {
          console.log('Connected to the Socket.IO server.');
        });

        newSocket.on('error', (error: any) =>
          console.error('Socket.IO error:', error),
        );
      }

      // Emit message upon request
      newSocket.emit('streaming_chat', {
        promptMessage: message,
        task: 'basic_chat',
        index: 1,
        uid: '1234567890',
      });

      newSocket.on('chat_response', (data: any) => {
        console.log('Received chunk:', data);
        if (data && typeof data === 'object' && 'data' in data) {
          onNewResponse(data.data); // Append the text from the 'data' field
        }
      });
    },
    [socket],
  );

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        console.log('Disconnected from the server.');
      }
    };
  }, [socket]);

  return connectSocket;
};