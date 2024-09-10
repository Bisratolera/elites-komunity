import  { useState } from 'react';
import ChatHeader from '../Components/ChatHeader.jsx/index.js';
import MessageList from '../Components/MessageList.jsx/index.js';
import MessageInput from '../Components/MessageInput.jsx';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle new message
  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
