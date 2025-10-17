import { TypedSocket } from "@/events/constants";
import {
    ClientToServerEventMap,
    User,
} from "@jagdish-1999/wemeet-socket-contracts";
import { io } from "socket.io-client";

// Full monkey patch version — logs ALL emitted events automatically
export const attachSocketDebugLogger = (socket: TypedSocket) => {
    const originalEmit = socket.emit;

    socket.emit = function (
        event: keyof ClientToServerEventMap,
        ...args: Parameters<ClientToServerEventMap[typeof event]>
    ) {
        console.log(
            `%c[Socket Emit] %c${event}`,
            "color: green; font-weight: bold",
            "color: orange;"
        );
        return originalEmit.call(this, event, ...args);
    };

    // Optional: log all incoming events too (if needed)
    socket.onAny((event: keyof ClientToServerEventMap) => {
        console.log(
            `%c[Socket Receive] %c${event}`,
            "color: green; font-weight: bold",
            "color: #4169E1;"
        );
    });
};

let socketInstance: TypedSocket | null = null; //? Singleton socket instance

export const initSocket = (user: User | null): TypedSocket | null => {
    if (socketInstance) {
        socketInstance.on("connect_error", (err) => {
            console.error("%c[Socket Error]", "color:red;", err);
        });

        return socketInstance;
    }

    if (!socketInstance && user) {
        socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
            query: { userId: user?._id },
            transports: ["websocket"],
            autoConnect: false,
        });

        console.log("%c[Socket] Initialized", "color:green; font-weight:bold;");
        if (process.env.NODE_ENV === "development")
            attachSocketDebugLogger(socketInstance);
        if (socketInstance) socketInstance.user = user;
    }

    return socketInstance;
};
