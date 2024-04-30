// /src/lib/socket.ts
import { io, Socket } from "socket.io-client";

class SocketIOService {
    private socket: Socket | null = null;

    public init(): void {
        if (!this.socket) {
            this.socket = io("https://dev-back.aimatrixengine.com/", {

                // Do we need anything else here? Such as configurations here, e.g., auth tokens

            });
            this.socket.on("connect", () => console.log("Connected to Socket.IO server"));
            this.socket.on("disconnect", () => console.log("Disconnected from Socket.IO server"));
        }
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketIOService();
