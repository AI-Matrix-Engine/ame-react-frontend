// /src/lib/socket.ts
import { io, Socket } from "socket.io-client";

class SocketIOService {
    private socket: Socket | null = null;

    public init(authToken: string, userId: string): void {
        if (!this.socket) {
            this.socket = io(process.env.NEXT_PUBLIC_AIMATRIX_URL || 'https://dev-back.aimatrixengine.com/', {
                // auth: {
                //     token: authToken,
                //     userId: userId
                // }
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

    public requestDataStream(streamType: string, uniqueId: string): void {
        if (!this.socket) {
            console.error("Socket not initialized");
            return;
        }

        const eventName = `${streamType}_${uniqueId}`;
        this.socket.emit('request_stream', { streamType, uniqueId });
        this.socket.on(eventName, (data: any) => {
            console.log(`Data for ${eventName}:`, data);
        });
    }
}

export const socketService = new SocketIOService();
