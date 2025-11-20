import { formatRelativeTime } from '@utils/formatters';

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2 ${
          isOwn
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${
          isOwn ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {formatRelativeTime(new Date(message.timestamp))}
        </p>
      </div>
    </div>
  );
}
