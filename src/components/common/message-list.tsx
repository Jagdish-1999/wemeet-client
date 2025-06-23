"use client";

import { useEffect, useState } from "react";
import MessageInput from "./message-input";
import Message from "./message";

import { UserTypes } from "@/types/user-list.types";
import { EventNames } from "@/events/constants";
import { MessageTypes } from "@/types/message.types";
import useEmitter from "@/hooks/use-emitter";

interface ChatListPropTypes {
    activeUser: UserTypes | null;
}

const MessageList: React.FC<ChatListPropTypes> = ({ activeUser }) => {
    const [messageList, setMessageList] = useState<MessageTypes[]>([]);
    const emitter = useEmitter();

    useEffect(() => {
        emitter(EventNames.MESSAGE_LIST, null, (data) => {
            setMessageList(data.data as MessageTypes[]);
        });
    }, [emitter, activeUser]);

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

export default MessageList;
