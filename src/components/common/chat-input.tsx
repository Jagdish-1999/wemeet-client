"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import useSocket from "@/hooks/use-socket";
import { KeyboardEvent, SetStateAction, useCallback } from "react";
import { Chat, User } from "@jagdish-1999/socket-contracts";

interface ChatInputPropTypes {
    activeUser: User | null;
    setChatList: React.Dispatch<SetStateAction<Chat[]>>;
    inputMessage: string;
    setInputMessageValue: (val: string) => void;
}

const ChatInput: React.FC<ChatInputPropTypes> = ({
    activeUser,
    setChatList,
    inputMessage,
    setInputMessageValue,
}) => {
    const { socket } = useSocket();
    const isMobile = useIsMobile();

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();

            socket?.emit(
                "sendChat",
                {
                    senderId: socket.user ? socket.user._id : "",
                    receiverId: activeUser ? activeUser._id : "",
                    message: inputMessage,
                },
                (data) => {
                    setChatList((prev) =>
                        data.data ? [...prev, data.data] : prev
                    );
                    setInputMessageValue("");
                    console.log("Chat send", data);
                }
            );
        },

        [activeUser, setChatList, socket, inputMessage, setInputMessageValue]
    );

    return (
        <form
            action="#"
            className="
                relative
                bottom-0
                font-afacad
                px-2
                py-3
                bg-[var(--color-background)]
                w-full"
            onSubmit={handleSubmit}
        >
            {isMobile ? (
                <Input
                    name="message"
                    placeholder="Type a message..."
                    className="
                    w-full
                    h-full
                    ring-0
                    focus-visible:ring-0
                    border
                    rounded-full
                    px-6
                    py-3
                    sm:rounded-sm
                    sm:p-4"
                    value={inputMessage}
                    onChange={(evt) => setInputMessageValue(evt.target.value)}
                    onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) => {
                        if (evt.key === "Enter" && !evt.shiftKey)
                            handleSubmit(evt);
                    }}
                />
            ) : (
                <Textarea
                    rows={1}
                    role="textbox"
                    name="message"
                    data-gramm="false" //? Ignoring grammerly suggestion
                    placeholder="Type a message..."
                    className="
                        px-6
                        py-3
                        ring-0
                        focus-visible:ring-0
                        rounded-full
                        md:text-[16px]
                        resize-none
                        bottom-2
                        min-h-12
                        max-h-12
                        border
                        align-top"
                    value={inputMessage}
                    onChange={(evt) => setInputMessageValue(evt.target.value)}
                    onKeyDown={(evt: KeyboardEvent<HTMLTextAreaElement>) => {
                        if (evt.key === "Enter" && !evt.shiftKey)
                            handleSubmit(evt);
                    }}
                />
            )}
            <Button
                variant="ghost"
                type="submit"
                className="
                    rounded-full
                    cursor-pointer
                    absolute
                    right-3
                    top-[50%]
                    -translate-y-[50%]
                    bg-transparent
                    hover:bg-transparent
                    hover:translate-x-1
                    text-muted-foreground
                    "
            >
                <SendHorizonal />
            </Button>
        </form>
    );
};

export default ChatInput;
