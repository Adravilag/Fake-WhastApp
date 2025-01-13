import React from 'react';
import { ChatProvider } from './context/ChatContext';
import { ContactProvider } from './context/ContactContext';
import { MessageProvider } from './context/MessageContext';
import { Contact } from './components/Contact/Contact';
import { Chat } from './components/Chat/Chat';

function App() {
    return (
        <ContactProvider>
            <ChatProvider>
              <MessageProvider>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '20%', borderRight: '1px solid #ccc' }}>
                        <Contact />
                    </div>
                    <div style={{ width: '80%', padding: '10px' }}>
                        <Chat />
                    </div>
                </div>
                </MessageProvider>
            </ChatProvider>
        </ContactProvider>
    );
}

export default App;
