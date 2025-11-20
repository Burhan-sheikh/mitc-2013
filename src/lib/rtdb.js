import { ref, onValue, push, set, update, remove, query, orderByChild, equalTo } from 'firebase/database';
import { rtdb } from './firebase';

/**
 * Subscribe to chat messages
 */
export function subscribeToChat(chatId, callback) {
  const messagesRef = ref(rtdb, `chats/${chatId}/messages`);
  
  return onValue(messagesRef, (snapshot) => {
    const messages = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(messages.sort((a, b) => a.timestamp - b.timestamp));
  });
}

/**
 * Send a message
 */
export async function sendMessage(chatId, message, senderId) {
  const messagesRef = ref(rtdb, `chats/${chatId}/messages`);
  const newMessageRef = push(messagesRef);
  
  await set(newMessageRef, {
    senderId,
    text: message,
    timestamp: Date.now(),
    type: 'text'
  });
  
  // Update lastMessage
  await update(ref(rtdb, `chats/${chatId}`), {
    lastMessage: {
      text: message,
      senderId,
      timestamp: Date.now()
    }
  });
}

/**
 * Create a new chat
 */
export async function createChat(userId, adminId = null) {
  const chatsRef = ref(rtdb, 'chats');
  const newChatRef = push(chatsRef);
  
  const chatData = {
    participants: {
      [userId]: true,
    },
    status: 'open',
    createdAt: Date.now(),
  };
  
  if (adminId) {
    chatData.participants[adminId] = true;
  }
  
  await set(newChatRef, chatData);
  return newChatRef.key;
}

/**
 * Subscribe to all chats (admin only)
 */
export function subscribeToAllChats(callback) {
  const chatsRef = ref(rtdb, 'chats');
  
  return onValue(chatsRef, (snapshot) => {
    const chats = [];
    snapshot.forEach((childSnapshot) => {
      chats.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(chats);
  });
}

/**
 * Subscribe to user's chats
 */
export function subscribeToUserChats(userId, callback) {
  const chatsRef = ref(rtdb, 'chats');
  
  return onValue(chatsRef, (snapshot) => {
    const chats = [];
    snapshot.forEach((childSnapshot) => {
      const chat = childSnapshot.val();
      if (chat.participants && chat.participants[userId]) {
        chats.push({
          id: childSnapshot.key,
          ...chat
        });
      }
    });
    callback(chats);
  });
}

/**
 * Update chat status
 */
export async function updateChatStatus(chatId, status) {
  await update(ref(rtdb, `chats/${chatId}`), {
    status
  });
}

/**
 * Delete a message
 */
export async function deleteMessage(chatId, messageId) {
  await remove(ref(rtdb, `chats/${chatId}/messages/${messageId}`));
}
