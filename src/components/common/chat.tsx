"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Chat as ChatFromServer } from "@jagdish-1999/socket-contracts";
import ToolTip from "./tool-tip";
import { Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

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
                    <ToolTip
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
                                    chat
                                    `,
                                    !isCurrentUser
                                        ? "received-chat"
                                        : "sended-chat"
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
                        }
                    >
                        <div className="flex h-4 w-full gap-2">
                            <p className="flex items-center gap-1 cursor-pointer">
                                <Pencil size={15} />
                                <span>Edit</span>
                            </p>
                            <Separator
                                orientation="vertical"
                                // className="bg-tooltip-foreground h-auto"
                            />
                            <p className="flex items-center gap-1 cursor-pointer">
                                <Trash2 size={15} />
                                <span>Delete</span>
                            </p>
                        </div>
                    </ToolTip>
                </div>
            )}
        </>
    );
};

export default Chat;
