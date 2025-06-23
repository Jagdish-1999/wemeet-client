import { io, Socket } from "socket.io-client";
import EventMap, {
    AcknowledgeTypes,
    EmitterType,
} from "@/types/event-map.types";

let instance: Socket;
export class SocketWrapper {
    static socket: Socket;
    static userId: string | undefined;
    static emitter: EmitterType;
    static firedEvents: string[] = [];

    private static setEmitter() {
        SocketWrapper.emitter = <K extends keyof EventMap>(
            eventName: K,
            data: unknown = null,
            cb: (data: AcknowledgeTypes) => void
        ) => {
            // ? Storing all fired events to make debugging easy
            this.firedEvents.push(eventName as string);
            console.table(this.firedEvents);
            SocketWrapper.socket.emit(
                eventName as string,
                data,
                (response: AcknowledgeTypes) => {
                    if (cb && typeof cb === "function") {
                        cb(response);
                    }
                }
            );
        };
    }

    public static createInstance(userId: string): void {
        if (!instance) {
            SocketWrapper.setEmitter();
            SocketWrapper.userId = userId;
            console.log("[Created] Socket instance with userId:", userId);

            SocketWrapper.socket = io("http://localhost:8080", {
                query: { userId },
                transports: ["websocket"],
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });
            instance = SocketWrapper.socket;
        }
    }

    static getInstance(): Socket {
        return instance;
    }

    static getEmitter(): EmitterType {
        const socketInstance = SocketWrapper.getInstance();

        if (!socketInstance && !SocketWrapper.emitter) {
            console.warn("Socket is not initialized", socketInstance);
            return () => null;
        }

        return SocketWrapper.emitter;
    }
}
