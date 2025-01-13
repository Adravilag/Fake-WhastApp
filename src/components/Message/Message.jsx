// Message.jsx
import React from 'react';
import { useMessageContext } from '../../context/MessageContext';
import './Message.css';

export function Message({ contactId }) {
  const { chats } = useMessageContext();
  const currentChat = chats.find(chat => chat.contactId === contactId);

  if (!currentChat) {
    return (
      <div className="chat-messages">
        <p>No hay mensajes para este contacto.</p>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {currentChat.messages.map((msg, index) => (
        // PRIMER contenedor (para alinear la burbuja)
        <div
          key={index}
          className={`message-bubble-container ${
            msg.sender === 'Yo' ? 'me' : 'other'
          }`}
        >
          {/* SEGUNDO contenedor (la burbuja en sí) */}
          <div className="message-bubble">
            <p className="message-text">{msg.text}</p>
            <small className="message-timestamp">{msg.timestamp}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
