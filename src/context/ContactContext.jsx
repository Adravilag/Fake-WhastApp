// src/context/ContactContext.jsx

import React, { createContext, useContext, useState } from "react";
import profile1 from "../assets/images/prof_1.png";
import profile2 from "../assets/images/prof_2.png";
import profile3 from "../assets/images/prof_3.png";
import profile4 from "../assets/images/prof_4.png";

// 1. Create a new context
const ContactContext = createContext();

// 2. Create a new provider
export function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+34 642 453 123",
      status: "active",
      profilePicture: profile1,
      messages: [],
    },
    {
      id: 2,
      name: "Jane Doe",
      phone: "+34 682 145 235",
      status: "busy",
      profilePicture: profile2,
      messages: [],
    },
    {
      id: 3,
      name: "John Smith",
      phone: "+34 681 125 244",
      status: "ausent",
      profilePicture: profile3,
      messages: [],
    },
    {
      id: 4,
      name: "Jane Smith",
      phone: "+34 621 194 424",
      status: "active",
      profilePicture: profile4,
      messages: [],
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  // Nueva función para actualizar mensajes correctamente
  const updateContactMessages = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setSelectedContact(updatedContact);
  };

  return (
    <ContactContext.Provider
      value={{ contacts, selectedContact, setSelectedContact, updateContactMessages }}
    >
      {children}
    </ContactContext.Provider>
  );
}

// 3. Create a custom hook for using the ContactContext
export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};
