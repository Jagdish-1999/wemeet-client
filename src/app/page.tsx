"use client";

import { useCallback, useEffect, useState } from "react";
import Toast from "@/lib/toast";
import { User } from "@jagdish-1999/wemeet-socket-contracts";

import Navbar from "@/components/common/nav-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileView from "@/components/mobile-view";
import DesktopView from "@/components/desktop-view";
import useSocket from "@/hooks/use-socket";

export default function Home() {
    const isMobile = useIsMobile();
    const { socket, isConnected } = useSocket();
    const [userList, setUserList] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [searchedUser, setSearchedUser] = useState<User[] | null>(null);

    useEffect(() => {
        if (socket && isConnected) {
            socket.emit(
                "userList",
                { token: "", id: socket.user ? socket.user._id : "" },
                (data) => {
                    Toast.success(data.message);
                    setUserList(data.data);
                }
            );
        }

        return () => {
            socket?.off();
        };
    }, [socket, isConnected]);

    const setActiveUserHandler = useCallback((user: User) => {
        setActiveUser(user);
    }, []);

    const setSearchUserHandler = useCallback(
        (value: string) => {
            const matchedUsers = userList.filter((user) =>
                user.name.includes(value)
            );
            setSearchedUser(matchedUsers);
        },
        [userList]
    );

    return (
        <div className="flex flex-col h-full w-full">
            <Navbar />
            {userList.length > 0 && (
                <>
                    {isMobile ? (
                        <MobileView
                            activeUser={activeUser}
                            setActiveUserHandler={setActiveUserHandler}
                            setSearchUserHandler={setSearchUserHandler}
                            userList={
                                searchedUser != null ? searchedUser : userList
                            }
                        />
                    ) : (
                        <DesktopView
                            activeUser={activeUser}
                            setActiveUserHandler={setActiveUserHandler}
                            setSearchUserHandler={setSearchUserHandler}
                            userList={
                                searchedUser != null ? searchedUser : userList
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
}
