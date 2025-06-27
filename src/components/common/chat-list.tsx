"use client";

import { useEffect, useState } from "react";
import {
    AcknowledgeResponse,
    ChatFromServer,
    User,
} from "@jagdish-1999/socket-contracts";

import useSocket from "@/hooks/use-socket";
import Chat from "./chat";
import ChatInput from "./chat-input";

interface ChatListPropTypes {
    activeUser: User | null;
}

const MessageList: React.FC<ChatListPropTypes> = ({ activeUser }) => {
    const { socket } = useSocket();
    const [messageList, setMessageList] = useState<ChatFromServer[]>([]);

    useEffect(() => {
        socket?.emit(
            "chat:list",
            {
                senderId: socket.user ? socket.user._id : "",
                receiverId: activeUser ? activeUser._id : "",
            },
            (data: AcknowledgeResponse<ChatFromServer[]>) => {
                console.log(data);
                setMessageList(data.data);
            }
        );
    }, [socket, activeUser]);

    return (
        <div className="flex flex-col w-full flex-1 h-full overflow-y-auto">
            <div className="flex-1 h-full overflow-y-auto p-4 scrollbar-hidden">
                {messageList.map((chat) => (
                    <Chat
                        key={chat._id}
                        chat={chat}
                        isCurrentUser={activeUser?._id === chat?.senderId}
                    />
                ))}
            </div>
            <ChatInput />
        </div>
    );
};

export default MessageList;
