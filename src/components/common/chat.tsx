"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChatFromServer } from "@jagdish-1999/socket-contracts";

interface ChatPropTypes {
    chat: ChatFromServer;
    isCurrentUser: boolean;
}

const Chat: React.FC<ChatPropTypes> = ({ chat, isCurrentUser = false }) => {
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
                    <p
                        className={cn(
                            `
                            flex
                            gap-2
                            max-w-[60%]
                            font-afacad
                            font-[300]
                            chat
                            `,
                            !isCurrentUser ? "received-chat" : "sended-chat"
                        )}
                    >
                        {chat.message}
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
                            {/* Yesturday */}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default Chat;
