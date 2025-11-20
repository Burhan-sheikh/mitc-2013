import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import {
  subscribeToAllChats,
  subscribeToUserChats,
  subscribeToChat,
  sendMessage as sendMessageRTDB,
  createChat as createChatRTDB,
  updateChatStatus,
} from '@lib/rtdb';

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const { currentUser, userRole } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to chats based on user role
  useEffect(() => {
    if (!currentUser) {
      setChats([]);
      setLoading(false);
      return;
    }

    let unsubscribe;

    if (userRole === 'admin') {
      // Admin sees all chats
      unsubscribe = subscribeToAllChats((chatList) => {
        setChats(chatList);
        setLoading(false);
      });
    } else {
      // Regular users see only their chats
      unsubscribe = subscribeToUserChats(currentUser.uid, (chatList) => {
        setChats(chatList);
        setLoading(false);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [currentUser, userRole]);

  // Subscribe to active chat messages
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    const unsubscribe = subscribeToChat(activeChat, (messageList) => {
      setMessages(messageList);
    });

    return () => unsubscribe && unsubscribe();
  }, [activeChat]);

  // Create new chat
  async function createChat(userId, adminId = null) {
    try {
      const chatId = await createChatRTDB(userId, adminId);
      setActiveChat(chatId);
      return chatId;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  // Send message
  async function sendMessage(message) {
    if (!activeChat || !currentUser) {
      throw new Error('No active chat or user not logged in');
    }

    try {
      await sendMessageRTDB(activeChat, message, currentUser.uid);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Update chat status (admin only)
  async function updateStatus(chatId, status) {
    if (userRole !== 'admin') {
      throw new Error('Only admins can update chat status');
    }

    try {
      await updateChatStatus(chatId, status);
    } catch (error) {
      console.error('Error updating chat status:', error);
      throw error;
    }
  }

  // Get unread count
  function getUnreadCount() {
    // TODO: Implement unread message tracking
    return 0;
  }

  const value = {
    chats,
    activeChat,
    messages,
    loading,
    setActiveChat,
    createChat,
    sendMessage,
    updateStatus,
    getUnreadCount,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
