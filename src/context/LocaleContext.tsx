// src/context/LocaleContext.tsx
import React, { createContext, useContext, useState } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";

// Mapeo de traducciones
const messages: Record<string, Record<string, string>> = {
    es: es,
    en: en
};

type LocaleContextType = {
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: string) => string;
};

// Crear el contexto
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState("es");

    const t = (key: string) => {
        return messages[locale][key] || key;
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocaleContext.Provider>
    );
};

// Hook personalizado
export const useLocaleContext = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useLocaleContext must be used within a LocaleProvider");
    }
    return context;
};
