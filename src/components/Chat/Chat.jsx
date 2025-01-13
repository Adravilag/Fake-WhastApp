import React, { useState, useRef, useEffect } from "react";
import { useContactContext } from "../../context/ContactContext";
import { useMessageContext } from "../../context/MessageContext";
import { Message } from "../Message/Message";
import "./Chat.css";

export function Chat() {
  const { selectedContact } = useContactContext();
  const { addMessage } = useMessageContext();
  const [newMessage, setNewMessage] = useState("");

  // 1. Creamos un ref para el contenedor de mensajes
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // 2. Cuando cambian los mensajes de 'selectedContact', bajamos el scroll
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [selectedContact?.messages]);

  const handleSendMessage = () => {
    if (!selectedContact || newMessage.trim() === "") return;

    const msg = {
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      sender: "Yo",
    };
    addMessage(selectedContact.id, msg);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      {selectedContact ? (
        <>
          <div className="chat-header">
            <div className="header-avatar">
              <img src={selectedContact.profilePicture} alt="Avatar" />
            </div>
            <div className="header-info">
              <h2>{selectedContact.name}</h2>
              <p>{selectedContact.phone}</p>
            </div>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            <Message contactId={selectedContact.id} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </>
      ) : (
        <p>Selecciona un contacto para empezar a chatear.</p>
      )}
    </div>
  );
}
