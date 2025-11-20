import Header from '@components/layout/Header';
import Sidebar from '@components/layout/Sidebar';
import ChatList from '@components/chat/ChatList';
import ChatWindow from '@components/chat/ChatWindow';
import { useState } from 'react';

export default function AdminChats() {
  const [activeChat, setActiveChat] = useState(null);
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 p-8 flex gap-8 overflow-y-auto">
          <div className="w-72">
            <h1 className="text-xl font-bold mb-4">Chats</h1>
            <ChatList onSelectChat={setActiveChat} />
          </div>
          <div className="flex-1">
            {activeChat ? (
              <ChatWindow chatId={activeChat} isAdmin onClose={()=>setActiveChat(null)}/>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">Select a chat to view</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
