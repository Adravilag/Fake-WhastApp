import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatType, MessageType, MessageContextType } from "../interfaces/Message";

// Creamos el contexto con un valor indefinido inicialmente
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Proveedor del contexto con tipado
export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatType[]>([]);

    // Respuestas automáticas
    const randomReplies: string[] = [
        "¡Hola! ¿Cómo estás?",
        "Interesante, cuéntame más.",
        "¿En serio? Eso suena increíble.",
        "Lo pensaré y te aviso.",
        "¡Jajaja, qué gracioso!",
        "Eso es algo importante, gracias por compartirlo.",
    ];

    // Generar un retraso aleatorio entre 1s y 5s
    const getRandomDelay = (): number => Math.floor(Math.random() * 4000) + 1000;

    // Función para añadir un mensaje
    const addMessage = (contactId: number, newMsg: MessageType) => {
        setChats((prevChats: ChatType[]) => {
            const existingChatIndex = prevChats.findIndex(chat => chat.contactId === contactId);

            if (existingChatIndex === -1) {
                // Si no existe el chat, lo crea
                return [...prevChats, { contactId, messages: [newMsg] }];
            } else {
                // Si ya existe, actualiza el chat con el nuevo mensaje
                const updatedChats = [...prevChats];
                updatedChats[existingChatIndex] = {
                    ...updatedChats[existingChatIndex],
                    messages: [...updatedChats[existingChatIndex].messages, newMsg]
                };
                return updatedChats;
            }
        });

        // Auto-respuesta si el mensaje es enviado por el usuario
        if (newMsg.sender === "Yo") {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * randomReplies.length);
                const replyMsg: MessageType = {
                    text: randomReplies[randomIndex],
                    timestamp: new Date().toLocaleTimeString(),
                    sender: "Contacto"
                };

                setChats((prevChats: ChatType[]) => {
                    const existingChatIndex = prevChats.findIndex(chat => chat.contactId === contactId);
                    if (existingChatIndex !== -1) {
                        const updatedChats = [...prevChats];
                        updatedChats[existingChatIndex] = {
                            ...updatedChats[existingChatIndex],
                            messages: [...updatedChats[existingChatIndex].messages, replyMsg]
                        };
                        return updatedChats;
                    }
                    return prevChats;
                });
            }, getRandomDelay());
        }
    };

    const lastMessage = (contactId: number) => {
        const chat = chats.find(chat => chat.contactId === contactId);
        if (chat) {
            return chat.messages[chat.messages.length - 1];
        }
        return null;
    };

    return (
        <MessageContext.Provider value={{ chats, addMessage, lastMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

// Hook personalizado con tipado
export const useMessageContext = (): MessageContextType => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
};
