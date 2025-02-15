import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = useStore((state) => state.currentUser);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: getBotResponse(newMessage),
        sender: 'other',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('help')) {
      return "I can help you with: creating groups, adding members, managing expenses, and viewing payment history.";
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "To add a payment, go to your group and click 'Add Transaction'. You can split expenses and track payments there.";
    } else if (lowerMessage.includes('group')) {
      return "You can create a new group by clicking the 'New Group' button on the home page.";
    }
    return "How can I help you with FundFlow today?";
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[500px] sm:h-[600px] lg:h-[calc(100vh-8rem)] flex flex-col sticky top-6">
      <div className="p-4 border-b flex items-center gap-2">
        <Bot size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold">FundFlow Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="break-words">{message.text}</p>
              <span className="text-xs opacity-75 block mt-1">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};