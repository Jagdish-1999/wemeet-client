"use client";

import { useEffect, useState } from "react";
import MessageInput from "./message-input";
import Message from "./message";

import { UserTypes } from "@/types/user-list.types";
import useEmitter from "@/hooks/use-emitter";
import { EventNames } from "@/events/constants";
import { MessageTypes } from "@/types/message.types";
import Logger from "@/lib/log";

interface ChatListPropTypes {
    activeUser: UserTypes;
}

const ChatList: React.FC<ChatListPropTypes> = ({ activeUser }) => {
    const emitter = useEmitter();
    const [messageList, setMessageList] = useState<MessageTypes[]>([]);

    useEffect(() => {
        emitter(EventNames.MESSAGE_LIST, null, (data) => {
            Logger.log("MessageList", data);
            setMessageList(data.data as MessageTypes[]);
        });
    }, [emitter]);

    return (
        <div className="flex flex-col w-full flex-1 h-full overflow-y-auto">
            <div className="flex-1 h-full overflow-y-auto p-4 scrollbar-hidden">
                {messageList.map((message) => (
                    <Message
                        key={message._id}
                        message={message}
                        isCurrentUser={activeUser?._id === message?.senderId}
                    />
                ))}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatList;
