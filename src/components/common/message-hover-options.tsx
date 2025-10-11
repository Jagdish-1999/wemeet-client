import { Forward, Pencil, Reply, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import Toast from "@/lib/toast";
import { Fragment } from "react";
import useSocket from "@/hooks/use-socket";
import { TypedSocket } from "@/events/constants";
import { Chat } from "@jagdish-1999/socket-contracts";

interface MessageHoverOptionsType {
    isCurrentUser: boolean;
    chat: Chat;
    setInputMessageValue: (val: string) => void;
}

const ChatOptions = [
    {
        id: "reply",
        label: "Reply",
        icon: <Reply size={15} />,
    },
    {
        id: "forward",
        label: "Forward",
        icon: <Forward size={15} />,
    },
    {
        id: "edit",
        label: "Edit",
        icon: <Pencil size={15} />,
        hideOnSend: true,
        onClick: (
            chat: Chat,
            isCurrentUser: boolean,
            socket: TypedSocket | null,
            setInputMessageValue?: (val: string) => void
        ) => {
            if (isCurrentUser && setInputMessageValue) {
                setInputMessageValue(chat.message);
                Toast.warning("Edited");
                console.log("Edited");
            }
        },
    },
    {
        id: "delete",
        label: "Delete",
        icon: <Trash2 size={15} />,
        onClick: async (
            chat: Chat,
            isCurrentUser: boolean,
            socket: TypedSocket | null
        ) => {
            if (socket) {
                socket.emit(
                    "deleteChat",
                    {
                        id: chat._id,
                        isCurrentUser,
                    },
                    (res) => {
                        console.log("Response from server: ", res);
                        if (res) Toast.success("Deleted");
                    }
                );
            }
        },
    },
];

const MessageHoverOptions: React.FC<MessageHoverOptionsType> = ({
    isCurrentUser,
    chat,
    setInputMessageValue,
}) => {
    const { socket } = useSocket();
    return (
        <div className="flex flex-col h-full w-full gap-2 font-semibold">
            {ChatOptions.map((option, idx) =>
                isCurrentUser ? (
                    <Fragment key={option.label}>
                        <p
                            onClick={() =>
                                option?.onClick?.(
                                    chat,
                                    isCurrentUser,
                                    socket,
                                    setInputMessageValue
                                )
                            }
                            key={option.label}
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            {option.icon}
                            <span>{option.label}</span>
                        </p>
                        {idx !== ChatOptions.length - 1 && (
                            <Separator orientation="horizontal" />
                        )}
                    </Fragment>
                ) : (
                    !option.hideOnSend && (
                        <Fragment key={option.label}>
                            <p
                                onClick={() =>
                                    option?.onClick?.(
                                        chat,
                                        isCurrentUser,
                                        socket
                                    )
                                }
                                key={option.label}
                                className="flex items-center gap-1 cursor-pointer"
                            >
                                {option.icon}
                                <span>{option.label}</span>
                            </p>
                            {idx !== ChatOptions.length - 1 && (
                                <Separator orientation="horizontal" />
                            )}
                        </Fragment>
                    )
                )
            )}
        </div>
    );
};

export default MessageHoverOptions;
