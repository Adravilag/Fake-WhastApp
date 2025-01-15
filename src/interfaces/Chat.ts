
import { MessageType } from "./Message";

export interface ChatType {
    contactId: number;
    messages: MessageType[];
}

export interface ContactType {
    id: number;
    name: string;
    profilePicture: string;
    status: "active" | "busy" | "ausent" | "offline";
}

export interface ChatContextType {
    username: string;
    setUsername: (username: string) => void;
    contacts: ContactType[];
    setContacts: (contacts: ContactType[]) => void;
    messages: MessageType[];
    setMessages: (messages: MessageType[]) => void;
}
