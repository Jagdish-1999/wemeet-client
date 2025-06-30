import {
    ClientToServerEventMap,
    ServerToClientEventMap,
} from "@jagdish-1999/socket-contracts";
import { Socket } from "socket.io-client";

export type TypedSocket = Socket<
    ServerToClientEventMap,
    ClientToServerEventMap
>;
