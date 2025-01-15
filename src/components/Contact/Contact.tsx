import React from "react";
import { useContactContext } from "../../context/ContactContext";
import "./Contact.css"; // Importa el archivo CSS
import { ContactType } from "../../interfaces/Contact"; // Importa el tipo de Contacto
import { useLocaleContext } from "../../context/LocaleContext";
import { useMessageContext } from "../../context/MessageContext";

export function Contact() {
  // Accede al contexto de contactos con tipado adecuado
  const { contacts, setSelectedContact } = useContactContext();

  // Accede al contexto de mensajes
  const { lastMessage } = useMessageContext(); // Asegúrate de que esta función esté definida
  const { t } = useLocaleContext();

  // Función para determinar la clase CSS basada en el estado del contacto
  const getStatusClass = (status: ContactType["status"]): string => {
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
      <h3 className="contact-title">{t("contact.title")}</h3>
      <ul className="contact-list">
        {contacts.map((contact) => {
          const lastMsg = lastMessage(contact.id);
          let formattedLastMessage = "";
          if (lastMsg) {
            const prefix =
              lastMsg.sender !== "Yo" ? `${contact.name}: ` : "Yo: ";
            const maxLength = 20;
            const remainingLength = maxLength - prefix.length;
            const messageText =
              lastMsg.text.length > remainingLength
                ? `${lastMsg.text.substring(0, remainingLength)}...`
                : lastMsg.text;
            formattedLastMessage = `${prefix}${messageText}`;
          }

          return (
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
                {/* Indicador de estado */}
                <div
                  className={`contact-status ${getStatusClass(contact.status)}`}
                />
              </div>
              {/* Información del contacto */}
              <div className="contact-info">
                <div className="contact-header">
                  <p className="contact-name">{contact.name}</p>
                  <span className="contact-time">
                    {lastMsg ? lastMsg.timestamp : ""}
                  </span>
                </div>
                <p className="contact-last-message">{formattedLastMessage}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
