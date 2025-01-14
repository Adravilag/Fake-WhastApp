import React, { useState } from 'react';
import { useSidebarContext } from '../../context/SidebarContext';
import { FaComments, FaPhoneAlt, FaArchive, FaCog, FaUser, FaBars } from 'react-icons/fa';
import './Sidebar.css';

// Definimos el tipo de los posibles ítems activos
type SidebarItem = 'chats' | 'calls' | 'archive' | 'settings' | 'profile';

export function Sidebar() {
    // Tipado del contexto del Sidebar
    const { isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void } = useSidebarContext();
    
    // Estado para gestionar el ítem activo, con tipado `SidebarItem`
    const [activeItem, setActiveItem] = useState<SidebarItem>('chats');

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* Botón de menú hamburguesa */}
            <button
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars />
            </button>

            {/* Menú superior */}
            <ul className="sidebar-menu">
                <li
                    className={`sidebar-item ${activeItem === 'chats' ? 'active' : ''}`}
                    onClick={() => setActiveItem('chats')}
                >
                    <FaComments className="sidebar-icon" />
                    {isOpen && <span className="sidebar-text">Chats</span>}
                </li>
                <li
                    className={`sidebar-item ${activeItem === 'calls' ? 'active' : ''}`}
                    onClick={() => setActiveItem('calls')}
                >
                    <FaPhoneAlt className="sidebar-icon" />
                    {isOpen && <span className="sidebar-text">Llamadas</span>}
                </li>
            </ul>

            {/* Separador entre menús */}
            <hr />

            {/* Menú inferior */}
            <div className="sidebar-footer-menu">
                <ul className="sidebar-menu">
                    <li
                        className={`sidebar-item ${activeItem === 'archive' ? 'active' : ''}`}
                        onClick={() => setActiveItem('archive')}
                    >
                        <FaArchive className="sidebar-icon" />
                        {isOpen && <span className="sidebar-text">Archivar Chats</span>}
                    </li>
                    <li
                        className={`sidebar-item ${activeItem === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveItem('settings')}
                    >
                        <FaCog className="sidebar-icon" />
                        {isOpen && <span className="sidebar-text">Configuración</span>}
                    </li>
                    <li
                        className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveItem('profile')}
                    >
                        <FaUser className="sidebar-icon" />
                        {isOpen && <span className="sidebar-text">Perfil</span>}
                    </li>
                </ul>

                {/* Separador final */}
                <hr />
            </div>

            {/* Imagen de perfil */}
            <div className="sidebar-footer">
                <img
                    className="profile-img"
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    alt="Profile"
                />
            </div>
        </div>
    );
}
