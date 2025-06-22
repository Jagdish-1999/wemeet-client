"use client";

import { useState } from "react";
import { io, Socket } from "socket.io-client";

let instance: Socket | null = null;

/**
 * Singleton wrapper for Socket.IO client to ensure a single instance is used throughout the application.
 * This prevents multiple connections to the server and maintains a consistent socket state.
 * Usage:
 * const socket = useSocket();
 * This hook will return the singleton instance of the socket.
 * The socket will automatically connect to the server at "http://localhost:8080".
 */

class SocketWrapper {
    socket: Socket | null = null;
    constructor() {
        this.socket = io("http://localhost:8080");
    }

    static getInstance(): Socket {
        if (!instance) {
            instance = new SocketWrapper().socket;
        }
        return instance!;
    }
}

/**
 *
 * @returns Socket.Io client instance.(Singleton instance)
 */
export const useSocket = () => {
    const [socket] = useState(() => SocketWrapper.getInstance());

    return socket;
};
