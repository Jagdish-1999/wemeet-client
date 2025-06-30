import "socket.io-client";
import { User } from "@jagdish-1999/socket-contracts";

declare module "socket.io-client" {
    interface Socket {
        user: User | null;
    }
}
