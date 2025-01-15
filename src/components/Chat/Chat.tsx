import React, { useState, useRef, useEffect } from "react";
import { useContactContext } from "../../context/ContactContext";
import { useMessageContext } from "../../context/MessageContext";
import { useLocaleContext } from "../../context/LocaleContext";
import { Message } from "../Message/Message";
import { MessageType } from "../../interfaces/Message";
import { ContactType } from "../../interfaces/Contact";
import "./Chat.css";
import chatBackgroundImage from "../../assets/images/chat-background.jpg";

export function Chat() {
  const { selectedContact }: { selectedContact: ContactType | null } = useContactContext();
  const { addMessage } = useMessageContext();
  const [newMessage, setNewMessage] = useState<string>("");
  const { t } = useLocaleContext(); 

  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [selectedContact?.messages]);

  const handleSendMessage = () => {
    if (!selectedContact || newMessage.trim() === "") return;

    const msg: MessageType = {
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      sender: "Yo",
    };

    addMessage(selectedContact.id, msg);
    setNewMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // ✅ Definir el fondo dinámicamente
  const chatBackground = selectedContact
    ? {
        backgroundImage: `url(${chatBackgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "250px",
      }
    : {};

  return (
    <div className="chat-container" style={chatBackground}>
      {selectedContact ? (
        <>
          <div className="chat-header">
            <div className="header-avatar">
              <img src={selectedContact.profilePicture} alt="Avatar" />
            </div>
            <div className="header-info">
              <h2>{selectedContact.name}</h2>
              <p>{t(selectedContact.status)}</p>
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
              onKeyDown={handleKeyDown}
              placeholder={t("typeMessage")}
            />
            <button onClick={handleSendMessage}>{t("send")}</button>
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          <p>{t("noContactSelected")}</p>
        </div>
      )}
    </div>
  );
}
