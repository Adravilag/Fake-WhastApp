// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LocaleProvider } from "./context/LocaleContext";
import "./styles/App.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <LocaleProvider>
            <App />
        </LocaleProvider>
    </React.StrictMode>
);
