import { EventNames } from "@/events/constants";
import { UserTypes } from "./user-list.types";
import { MessageTypes } from "./message.types";

/**
 * @TODO - Add every events response type to EventMap
 */
export default interface EventMap {
    [EventNames.USERS_LIST]: UserTypes[];
    [EventNames.MESSAGE_LIST]: MessageTypes[];
}

export interface AcknowledgeTypes {
    status: number;
    message: string;
    data: EventMap[keyof EventMap];
}

export interface EmitterType {
    <K extends keyof EventMap>(
        eventName: K,
        data: unknown,
        cb: (data: AcknowledgeTypes) => void
    ): void;
}
