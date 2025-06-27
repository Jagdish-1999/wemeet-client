import "socket.io-client";
import { UserType } from "@jagdish-1999/socket-contracts";

declare module "socket.io-client" {
    interface Socket {
        user: UserType | null;
    }
}
