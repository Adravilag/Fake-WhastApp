// src/App.tsx
import { ChatProvider } from "./context/ChatContext";
import { ContactProvider } from "./context/ContactContext";
import { MessageProvider } from "./context/MessageContext";
import { SidebarProvider } from "./context/SidebarContext";
import { Contact } from "./components/Contact/Contact";
import { Chat } from "./components/Chat/Chat";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
    return (
      <SidebarProvider>
        <ContactProvider>
          <ChatProvider>
            <MessageProvider>
              <div style={{ display: "flex", height: "100vh" }}>
                {/* Sidebar ahora ocupa toda la altura */}
                <Sidebar />
                {/* Contactos */}
                <div style={{ flexBasis: "20%", borderRight: "1px solid #222222" }}>
                  <Contact />
                </div>
                {/* Área de Chat */}
                <div style={{ flexGrow: 1 }}>
                  <Chat />
                </div>
              </div>
            </MessageProvider>
          </ChatProvider>
        </ContactProvider>
      </SidebarProvider>
    );
  }

export default App;
