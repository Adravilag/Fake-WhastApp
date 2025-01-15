export type SenderType = "Yo" | "Contacto";

export interface MessageType {
    text: string;
    timestamp: string;
    sender: SenderType;
}

export interface ChatType {
    contactId: number;
    messages: MessageType[];
}

export interface MessageContextType {
    chats: ChatType[];
    addMessage: (contactId: number, newMsg: MessageType) => void;
    lastMessage: (contactId: number) => MessageType | null;
}