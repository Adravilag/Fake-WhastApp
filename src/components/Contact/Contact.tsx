import React from 'react';
import { useContactContext } from '../../context/ContactContext';
import './Contact.css'; // Importa el archivo CSS
import { ContactType } from '../../interfaces/Contact'; // Importa el tipo de Contacto
import { useLocaleContext } from "../../context/LocaleContext";

export function Contact() {
    // Tipado correcto del contexto
    const { contacts, setSelectedContact }: { 
        contacts: ContactType[], 
        setSelectedContact: (contact: ContactType) => void 
    } = useContactContext();

    const { t } = useLocaleContext();

    // Función para retornar la clase CSS del estado
    const getStatus = (status: ContactType['status']): string => {
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
    };

    return (
        <div className="contact-container">
            <h3 className="contact-title">{t('contact.title')}</h3>
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
