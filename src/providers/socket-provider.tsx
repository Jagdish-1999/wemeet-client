"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";

import { initSocket } from "@/lib/init-socket";
import useUser from "@/hooks/use-user";
import { TypedSocket } from "@/events/constants";

interface SocketProviderPropTypes {
    children: React.ReactNode;
}

interface SocketContextValue {
    socket: TypedSocket | null;
}

interface SocketContextValue {
    socket: TypedSocket | null;
    isConnected: boolean;
}

export const SocketContext = createContext<SocketContextValue | null>(null);

const SocketProvider: React.FC<SocketProviderPropTypes> = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const user = useUser();
    const socket = useMemo(() => initSocket(user), [user]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.connect();
        console.log("%c[Socket connected]", "color:green;font-weight:bold;");
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;

// const SocketProvider: React.FC<SocketProviderPropTypes> = ({ children }) => {
//     const user = useUser();
//     const socket = useMemo(() => initSocket(user), [user]);

//     useEffect(() => {
//         if (socket) {
//             socket.connect();

//             console.log(
//                 "%c[Socket Connected]",
//                 "color:green; font-weight:bold;"
//             );
//         }

//         return () => {
//             if (socket) {
//                 socket.disconnect();
//                 console.log(
//                     "%c[Socket Disconnected]",
//                     "color:red; font-weight:bold;"
//                 );
//             }
//         };
//     }, [socket]);

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;
