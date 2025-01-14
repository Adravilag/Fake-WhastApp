export type SenderType = "Yo" | "Contacto";

export interface MessageType {
    text: string;
    timestamp: string;
    sender: SenderType;
}

export interface ChatType {
    contactId: string;
    messages: MessageType[];
}

export interface MessageContextType {
    chats: ChatType[];
    addMessage: (contactId: string, newMsg: MessageType) => void;
}