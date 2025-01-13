// src/components/Contact/Contact.jsx

import React from 'react';
import { useContactContext } from '../../context/ContactContext';
import './Contact.css'; // Importa el archivo CSS

export function Contact() {
    const { contacts, setSelectedContact } = useContactContext();

    const getStatus = (status) => {
        switch (status) {
            case "active":
                return "active";
            case "busy":
                return "busy";
            case "ausent":
                return "ausent";
            default:
                return "offline";
        }
    }

    return (
        <div className="contact-container">
            <h3 className="contact-title">Contacts</h3>
            <ul className="contact-list">
                {contacts.map((contact) => (
                    <li
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className="contact-item"
                    >
                        {/* Imagen de contacto */}
                        <div className="contact-avatar">
                            <img
                                src={contact.profilePicture}
                                alt={contact.name}
                                className="contact-image"
                            />
                            {/* Círculo de estado */}
                            <div
                                className={`contact-status ${getStatus(contact.status)}`}
                            />
                        </div>
                        {/* Información del contacto */}
                        <div className="contact-info">
                            <div className="contact-header">
                                <p className="contact-name">{contact.name}</p>
                                <span className="contact-time">{contact.lastMessageTime}</span>
                            </div>
                            <p className="contact-last-message">
                                {contact.lastMessage}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
