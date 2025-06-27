import { Socket } from "socket.io-client";
import { EventMap } from "@jagdish-1999/socket-contracts";

export type TypedSocket = Socket<EventMap>;
