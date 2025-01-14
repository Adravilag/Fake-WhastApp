import React, { createContext, useContext, useState, ReactNode } from "react";
import profile1 from "../assets/images/prof_1.png";
import profile2 from "../assets/images/prof_2.png";
import profile3 from "../assets/images/prof_3.png";
import profile4 from "../assets/images/prof_4.png";
import { ContactType, ContactContextType} from "../interfaces/Contact";

// Creamos el contexto con un valor inicial indefinido
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// 2. Proveedor del contexto con tipado
export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<ContactType[]>([
        {
            id: 1,
            name: "John Doe",
            phone: "+34 642 453 123",
            status: "active",
            profilePicture: profile1,
            messages: [],
            lastMessage: "",
            lastMessageTime: "",
        },
        {
            id: 2,
            name: "Jane Doe",
            phone: "+34 682 145 235",
            status: "busy",
            profilePicture: profile2,
            messages: [],
            lastMessage: "",
            lastMessageTime: "",
        },
        {
            id: 3,
            name: "John Smith",
            phone: "+34 681 125 244",
            status: "ausent",
            profilePicture: profile3,
            messages: [],
            lastMessage: "",
            lastMessageTime: "",
        },
        {
            id: 4,
            name: "Jane Smith",
            phone: "+34 621 194 424",
            status: "active",
            profilePicture: profile4,
            messages: [],
            lastMessage: "",
            lastMessageTime: "",
        },
    ]);

    const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);

    // Función para actualizar los mensajes del contacto
    const updateContactMessages = (updatedContact: ContactType) => {
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
};

// 3. Hook personalizado para acceder al contexto con tipado
export const useContactContext = (): ContactContextType => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContactContext debe usarse dentro de un ContactProvider");
    }
    return context;
};
