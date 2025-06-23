"use client";

import { UserType } from "@/types/user-list.types";
import MessageList from "./common/message-list";
import UserList from "./common/user-list";

export interface MobileViewPropTypes {
    userList: UserType[];
    activeUser: UserType | null;
    setActiveUserHandler: (user: UserType) => void;
    setSearchUserHandler: (value: string) => void;
}

const MobileView: React.FC<MobileViewPropTypes> = ({
    userList,
    activeUser,
    setActiveUserHandler,
    setSearchUserHandler,
}) => {
    return (
        <div className="w-full flex flex-1 h-full overflow-hidden">
            {activeUser ? (
                <MessageList activeUser={activeUser} />
            ) : (
                <div className="flex-1 w-full h-full overflow-hidden">
                    <UserList
                        userList={userList}
                        setActiveUserHandler={setActiveUserHandler}
                        setSearchUserHandler={setSearchUserHandler}
                    />
                </div>
            )}
        </div>
    );
};

export default MobileView;
