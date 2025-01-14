export interface MessageType {
    text: string;
    timestamp: string;
    sender: string;
}

export interface ContactType {
    id: number;
    name: string;
    phone: string;
    status: "active" | "busy" | "ausent";
    profilePicture: string;
    messages: MessageType[];
    lastMessageTime: string;
    lastMessage: string;
}

export interface ContactContextType {
    contacts: ContactType[];
    selectedContact: ContactType | null;
    setSelectedContact: (contact: ContactType | null) => void;
    updateContactMessages: (updatedContact: ContactType) => void;
}
