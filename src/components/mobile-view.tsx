"use client";

import { User } from "@jagdish-1999/wemeet-socket-contracts";
import ChatList from "./common/chat-list";
import UserList from "./common/user-list";

export interface MobileViewPropTypes {
    userList: User[];
    activeUser: User | null;
    setActiveUserHandler: (user: User) => void;
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
                <ChatList activeUser={activeUser} />
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
