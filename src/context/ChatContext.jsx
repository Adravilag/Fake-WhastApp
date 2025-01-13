import React, { createContext, useContext, useState } from "react";

// 1. Create a new context
const ChatContext = createContext();

// 2. Create a new provider
export function ChatProvider({ children }) {
  const [username, setUsername] = useState("John Doe");
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
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
}

// 3. Create a custom hook for using the ChatContext
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
