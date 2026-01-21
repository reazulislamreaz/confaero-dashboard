import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Users, MessageCircle, FileText } from 'lucide-react';

export default function MessagingSystem() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi, I am available to start work immediately. Let me know where you need me.',
      sender: 'other',
      time: 'Yesterday, 9:00 PM'
    },
    {
      id: 2,
      text: 'Hi, I\'m looking to get Crew back. Do you think you will be available for the job?',
      sender: 'me',
      time: null
    },
    {
      id: 3,
      text: 'Hi, I am available to start work immediately. Let me know where you need me.',
      sender: 'other',
      time: null
    },
    {
      id: 4,
      text: 'Hi, I\'m looking to get Crew back. Do you think you will be available for the job?',
      sender: 'me',
      time: 'Yesterday, 9:00 PM'
    },
    {
      id: 5,
      text: 'Hi, I am available to start work immediately. Let me know where you need me.',
      sender: 'other',
      time: null
    }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const conversations = [
    {
      id: 1,
      name: 'Henry Silver',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      message: 'Hi, I am available to sta...',
      time: '2:30 pm',
      unread: 2
    },
    {
      id: 2,
      name: 'Brooklyn Simmons',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      message: 'Hi, I am available to sta...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 3,
      name: 'Kristin Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 4,
      name: 'Devon Lane',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 5,
      name: 'Esther Howard',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 6,
      name: 'Ronald Richards',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 7,
      name: 'Ahmad Kabir',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 8,
      name: 'Ronald Richards',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    },
    {
      id: 9,
      name: 'Cameron William',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
      message: 'Hi, can you tell me ab...',
      time: '2:30 pm',
      unread: 0
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=60&h=60&fit=crop',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
      color: 'bg-red-500'
    },
    {
      id: 3,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop',
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop',
      color: 'bg-red-500'
    },
    {
      id: 5,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
      color: 'bg-yellow-500'
    },
    {
      id: 6,
      name: 'ren_fil_31-03-2020...',
      icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop',
      color: 'bg-red-500'
    }
  ];

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'me',
        time: null
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Member</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-800">18</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Member</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-800">18</div>
          </div>
          
          <div className="bg-[#0FC3C2] rounded-lg shadow-sm p-6 relative">
            <div className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              3
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-sm text-white">Unread Messages</span>
            </div>
            <div className="text-3xl font-bold text-white">7</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Conversations List */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[600px]">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectUser(conv)}
                  className={`p-4 border-b border-[#0FC3C2] mx-4 cursor-pointer transition-colors ${
                    selectedUser?.id === conv.id ? 'bg-teal-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">{conv.name}</h4>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-300">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{selectedUser.name}</h3>
                      <p className="text-xs text-gray-500">Active 2 hours ago</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto max-h-[450px]">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div key={msg.id}>
                        {msg.time && (
                          <div className="text-center text-xs text-gray-500 mb-3">{msg.time}</div>
                        )}
                        <div className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
                          <div
                            className={`max-w-md px-4 py-3 rounded-2xl ${
                              msg.sender === 'me'
                                ? 'bg-teal-600 text-white rounded-br-sm'
                                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>

          {/* User Info Sidebar */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm">
            {selectedUser ? (
              <div className="p-6">
                {/* User Profile */}
                <div className="text-center mb-6">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">Employee</p>
                </div>

                {/* Media Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-4">Media</h4>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className={`w-12 h-12 ${doc.color} rounded-full flex items-center justify-center overflow-hidden flex-shrink-0`}>
                          <img src={doc.icon} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 p-6">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-sm">Select a user to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
