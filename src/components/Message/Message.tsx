import React, { useEffect, useRef } from 'react';
import { useMessageContext } from '../../context/MessageContext';
import './Message.css';

// Definimos la interfaz para un mensaje individual
interface MessageType {
    text: string;
    timestamp: string;
    sender: string;
}

// Definimos las props del componente
interface MessageProps {
    contactId: string;
}

export function Message({ contactId }: MessageProps) {
    // Tipado para el contexto de mensajes
    const { chats }: { chats: { contactId: string; messages: MessageType[] }[] } = useMessageContext();
    const currentChat = chats.find(chat => chat.contactId === contactId);
    
    // Ref para el scroll automático tipada correctamente
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentChat?.messages.length]); // Se activa cuando cambia la cantidad de mensajes

    if (!currentChat) {
        return (
            <div className="no-chat-messages"/>
        );
    }

    return (
        <div className="chat-messages">
            {currentChat.messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message-bubble-container ${
                        msg.sender === 'Yo' ? 'me' : 'other'
                    }`}
                >
                    <div className="message-bubble">
                        <p className="message-text">{msg.text}</p>
                        <small className="message-timestamp">{msg.timestamp}</small>
                    </div>
                </div>
            ))}
            {/* Este div invisible asegura el desplazamiento al final */}
            <div ref={messagesEndRef}></div>
        </div>
    );
}
