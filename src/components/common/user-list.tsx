"use client";

import React from "react";
import { User2 } from "lucide-react";

import { User } from "@jagdish-1999/socket-contracts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchInput from "./search-input";
import { cn } from "@/lib/utils";

interface UserListPropTypes {
    userList: User[];
    activeUser?: User | null;
    setActiveUserHandler: (user: User) => void;
    setSearchUserHandler: (value: string) => void;
}

const UserList: React.FC<UserListPropTypes> = ({
    userList,
    activeUser,
    setActiveUserHandler,
    setSearchUserHandler,
}) => {
    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-hidden">
            <div className="border-b p-2 py-4">
                <SearchInput setSearchUserHandler={setSearchUserHandler} />
            </div>
            {userList.map((user) => (
                <div
                    key={user._id}
                    className={cn(
                        `flex gap-4 items-center 
                        p-2 border-b cursor-pointer
                        transition-colors duration-150`,
                        activeUser?._id === user._id && "sm:text-cyan-400"
                    )}
                    onClick={() => {
                        setActiveUserHandler(user);
                    }}
                >
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src={"https://github.com/shadcn.png"}
                            //! @TODO - need to implement user avatar image
                            // src={`https://avatar.iran.liara.run/public/boy?username=${user.name}`}
                        />
                        <AvatarFallback>
                            <User2 className="p-1" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="font-[afacad] leading-5 w-[calc(100%-4rem)]">
                        <div className="flex items-center justify-between">
                            <p className="capitalize font-semibold">
                                {user.name}
                            </p>
                            {/* //! @TODO - need to implement last online status */}
                            <p className="text-xs text-emerald-500">
                                Yesturday
                            </p>
                        </div>
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                opacity-90
                                font-bold
                                text-muted-foreground"
                        >
                            {/* //! @TODO - need to implement current message in user list view */}
                            <p className="text-xs truncate w-3/4">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Eaque consectetur fugit in
                                soluta delectus quibusdam maxime sed obcaecati
                                atque iste?
                            </p>
                            {/* //! @TODO - need to implement unseen message count */}
                            <p
                                className="
                                    text-black
                                    flex
                                    justify-center
                                    items-center
                                    text-xs
                                    font-bold
                                    rounded-full
                                    w-5 h-5
                                    bg-green-600/80
                                    dark:bg-green-600"
                            >
                                5
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserList;
