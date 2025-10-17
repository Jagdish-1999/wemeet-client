"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Chat as ChatFromServer } from "@jagdish-1999/wemeet-socket-contracts";
import ToolTip from "./tool-tip";
import MessageHoverOptions from "./message-hover-options";

interface ChatPropTypes {
    chat: ChatFromServer;
    isCurrentUser: boolean;
    setInputMessageValue: (val: string) => void;
}

const Chat: React.FC<ChatPropTypes> = ({
    chat,
    isCurrentUser = false,
    setInputMessageValue,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const getTime = useCallback((dt: Date) => {
        const date = new Date(dt);
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return `${hour < 10 ? "0" + hour : hour}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    }, []);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView();
    }, [isCurrentUser]);

    return (
        <>
            {chat && (
                <div
                    ref={scrollRef}
                    className={cn(
                        `
                        font-semibold
                        w-full
                        flex
                        flex-col
                        py-2
                        items-end
                        `,
                        !isCurrentUser && "items-start"
                    )}
                >
                    <ToolTip
                        className="rounded-[2px]"
                        hideArrow={true}
                        isHoverable={false}
                        trigger={
                            <p
                                className={cn(
                                    `
                                    flex
                                    gap-2
                                    max-w-[60%]
                                    font-afacad
                                    font-[300]
                                    leading-4
                                    chat
                                    `,
                                    !isCurrentUser
                                        ? "received-chat"
                                        : "sended-chat"
                                )}
                            >
                                {chat?.deletedFrom?.includes?.("SENDER") &&
                                !isCurrentUser
                                    ? "This message was deleted."
                                    : chat.message}
                                <span
                                    className={`
                                        self-end
                                        justify-end
                                        font-[Afacad]
                                        text-[10px]
                                        text-muted-foreground
                                        font-semibold
                                        text-end
                                        ${isCurrentUser ? "pr-1" : "pl-1"}
                                        `}
                                >
                                    {getTime(chat.createdAt)}
                                </span>
                            </p>
                        }
                    >
                        <MessageHoverOptions
                            isCurrentUser={isCurrentUser}
                            chat={chat}
                            setInputMessageValue={setInputMessageValue}
                        />
                    </ToolTip>
                </div>
            )}
        </>
    );
};

export default Chat;
