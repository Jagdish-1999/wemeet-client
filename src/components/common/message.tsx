"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageTypes } from "@/types/message.types";

interface MessagePropTypes {
    message: MessageTypes;
    isCurrentUser: boolean;
}

const Message: React.FC<MessagePropTypes> = ({
    message,
    isCurrentUser = false,
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
            {message && (
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
                            message
                            max-w-[60%]
                            font-afacad
                            font-[300]
                            `,
                            !isCurrentUser ? "incoming-message" : "sent-message"
                        )}
                    >
                        {message.message}
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
                            {getTime(message.timestamp)}
                            {/* Yesturday */}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default Message;
