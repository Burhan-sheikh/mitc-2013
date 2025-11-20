import { useAuth } from '@hooks/useAuth';
import { useChat } from '@hooks/useChat';
import LoadingSpinner from '@components/common/LoadingSpinner';

export default function ChatList({ onSelectChat }) {
  const { userRole } = useAuth();
  const { chats, loading, setActiveChat, activeChat } = useChat();
  if (userRole !== 'admin') return null;

  if (loading) {
    return <div className='p-4'><LoadingSpinner /></div>;
  }
  return (
    <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
      {chats.map(chat => (
        <button
          key={chat.id}
          className={`block w-full text-left px-4 py-3 hover:bg-primary-500/10 transition-all ${chat.id === activeChat ? 'bg-primary-500/5' : ''}`}
          onClick={() => {
            setActiveChat(chat.id);
            onSelectChat?.(chat.id);
          }}
        >
          <div className="font-medium text-sm">{chat.participants && Object.keys(chat.participants).join(', ')}</div>
          <div className="text-xs text-gray-500 truncate">{chat.lastMessage?.text}</div>
          <div className="text-xs text-gray-400 mt-1">{chat.lastMessage && new Date(chat.lastMessage.timestamp).toLocaleTimeString()}</div>
        </button>
      ))}
      {chats.length === 0 && <div className="p-4 text-gray-400 text-center">No chats yet</div>}
    </div>
  );
}
