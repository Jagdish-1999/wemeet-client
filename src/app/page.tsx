"use client";

import { useCallback, useEffect, useState } from "react";

import useEmitter from "@/hooks/use-emitter";
import { EventNames } from "@/events/constants";
import Navbar from "@/components/common/nav-bar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileView from "@/components/mobile-view";
import DesktopView from "@/components/desktop-view";
import { UserTypes } from "@/types/user-list.types";
import useUser from "@/hooks/use-user";
import Logger from "@/lib/log";

export default function Home() {
    const user = useUser(); //? Logging user first time
    const emitter = useEmitter();
    const isMobile = useIsMobile();
    const [userList, setUserList] = useState<UserTypes[]>([]);
    const [activeUser, setActiveUser] = useState<UserTypes | null>(null);
    const [searchedUser, setSearchedUser] = useState<UserTypes[] | null>(null);

    useEffect(() => {
        if (!user) return;
        emitter(EventNames.USERS_LIST, null, (data) => {
            setUserList(data.data as UserTypes[]);
            Logger.log(data);
        });
    }, [emitter, user]);

    const setActiveUserHandler = useCallback((user: UserTypes) => {
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
