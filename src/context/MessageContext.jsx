// src/context/MessageContext.jsx

import React, { createContext, useContext, useState } from "react";

// 1. Crear el nuevo contexto
const MessageContext = createContext();

// 2. Crear el provider
export function MessageProvider({ children }) {
    const [chats, setChats] = useState([]);

    const randomReplies = [
        "¡Hola! ¿Cómo estás?",
        "Interesante, cuéntame más.",
        "¿En serio? Eso suena increíble.",
        "Lo pensaré y te aviso.",
        "¡Jajaja, qué gracioso!",
        "Eso es algo importante, gracias por compartirlo."
    ];

    const getRandomDelay = () => Math.floor(Math.random() * 4000) + 1000;

    // Función para agregar un mensaje a un chat de un contacto específico
    const addMessage = (contactId, newMsg) => {
        setChats((prevChats) => {
            // Verificar si ya existe un chat para ese contactId
            const existingChatIndex = prevChats.findIndex(chat => chat.contactId === contactId);

            if (existingChatIndex === -1) {
                // Si no existe, crearlo
                return [
                    ...prevChats,
                    { contactId, messages: [newMsg] }
                ];
            } else {
                // Si sí existe, actualizarlo
                const updatedChats = [...prevChats];
                updatedChats[existingChatIndex] = {
                    ...updatedChats[existingChatIndex],
                    messages: [...updatedChats[existingChatIndex].messages, newMsg]
                };
                return updatedChats;
            }
        });

        // Si el sender es "Yo", iniciar auto-reply
        if (newMsg.sender === 'Yo') {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * randomReplies.length);
                const replyMsg = {
                    text: randomReplies[randomIndex],
                    timestamp: new Date().toLocaleTimeString(),
                    sender: "Contacto"
                };
                setChats((prevChats) => {
                    const existingChatIndex = prevChats.findIndex(chat => chat.contactId === contactId);
                    const updatedChats = [...prevChats];
                    updatedChats[existingChatIndex] = {
                        ...updatedChats[existingChatIndex],
                        messages: [...updatedChats[existingChatIndex].messages, replyMsg]
                    };
                    return updatedChats;
                });
            }, getRandomDelay());
        }

    };

    // Retornar el provider con el value que quieras exponer
    return (
        <MessageContext.Provider value={{ chats, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

// 3. Hook personalizado para consumir el contexto fácilmente
export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
};
