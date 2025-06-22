"use client";

import EventMap, { AcknowledgeTypes } from "@/types/event-map.types";
import { useSocket } from "./use-socket";

type EmitterType = <K extends keyof EventMap>(
    eventName: K,
    data: unknown,
    cb: (data: AcknowledgeTypes) => void
) => void;

let emitter: EmitterType;

const useEmitter = (): EmitterType => {
    const socket = useSocket();

    if (!socket) {
        console.error("Socket is not initialized");
        return () => null;
    }

    if (!emitter) {
        emitter = <EmitterType>(<K extends keyof EventMap>(
            eventName: K,
            data: unknown = null,
            cb: (data: AcknowledgeTypes) => void
        ) => {
            socket.emit(
                eventName as string,
                data,
                (response: AcknowledgeTypes) => {
                    if (cb && typeof cb === "function") {
                        cb(response);
                    }
                }
            );
        });
    }

    return emitter;
};

export default useEmitter;
