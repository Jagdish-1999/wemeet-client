"use client";

import { useCallback } from "react";
import { EmitterType } from "@/types/event-map.types";
import { SocketWrapper } from "../lib/socket-wrapper";

const useEmitter = (): EmitterType => {
    const emitter = useCallback(() => SocketWrapper.getEmitter(), []);
    return emitter();
};

export default useEmitter;
