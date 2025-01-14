import React, { createContext, useContext, useState, ReactNode } from "react";
import { ContactType, ChatContextType } from "../interfaces/Chat";
import { MessageType } from "../interfaces/Message";

// Creamos el contexto con un valor inicial indefinido
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// 2. Proveedor del contexto con tipado
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>("John Doe");
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [messages, setMessages] = useState<MessageType[]>([]);

    return (
        <ChatContext.Provider
            value={{
                username,
                setUsername,
                contacts,
                setContacts,
                messages,
                setMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

// 3. Hook personalizado con tipado seguro
export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext debe usarse dentro de un ChatProvider");
    }
    return context;
};
