import React, { createContext, useContext, useState, ReactNode } from "react";
import { SidebarContextType } from "../interfaces/Sidebar";

// Creamos el contexto con un valor inicial indefinido
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// 2. Crear el provider con tipado seguro
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

// 3. Hook personalizado para consumir el contexto con tipado
export const useSidebarContext = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebarContext debe ser usado dentro de un SidebarProvider");
    }
    return context;
};
