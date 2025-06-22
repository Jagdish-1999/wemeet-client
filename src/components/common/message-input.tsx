"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessageInputPropTypes {
    test?: string;
}

const MessageInput: React.FC<MessageInputPropTypes> = () => {
    const isMobile = useIsMobile();

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

export default MessageInput;
