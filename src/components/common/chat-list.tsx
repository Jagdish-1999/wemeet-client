"use client";

import { useEffect, useState } from "react";
import { Chat as ChatFromServer, User } from "@jagdish-1999/socket-contracts";

import useSocket from "@/hooks/use-socket";
import Chat from "./chat";
import ChatInput from "./chat-input";

interface ChatListPropTypes {
    activeUser: User | null;
}

const ChatList: React.FC<ChatListPropTypes> = ({ activeUser }) => {
    const { socket } = useSocket();
    const [chatList, setChatList] = useState<ChatFromServer[]>([]);

    useEffect(() => {
        if (activeUser?._id) {
            socket?.emit(
                "chatList",
                {
                    senderId: socket.user ? socket.user._id : "",
                    receiverId: activeUser?._id ? activeUser._id : "",
                },
                (data) => {
                    setChatList(data.data);
                }
            );
        }

        return () => {
            socket?.off();
        };
    }, [socket, activeUser?._id]);

    useEffect(() => {
        socket?.on("chatReceived", (data, cb) => {
            console.log("Chat received", data);
            setChatList((prev) => (data.data ? [...prev, data.data] : prev));
            if (cb) cb(true);
        });

        return () => {
            socket?.off();
        };
    }, [socket]);

    return (
        <div className="flex flex-col w-full flex-1 h-full overflow-y-auto">
            <div className="flex-1 h-full overflow-y-auto p-4 scrollbar-hidden">
                {chatList.map((chat) => (
                    <Chat
                        key={chat._id}
                        chat={chat}
                        isCurrentUser={activeUser?._id === chat?.receiverId}
                    />
                ))}
            </div>
            <ChatInput activeUser={activeUser} setChatList={setChatList} />
        </div>
    );
};

export default ChatList;
