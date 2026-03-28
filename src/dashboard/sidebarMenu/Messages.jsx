import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Users, MessageCircle, Mail } from 'lucide-react';
import { 
  useGetConversationsQuery, 
  useGetMessagesQuery, 
  getSocketInstance, 
  useMarkMessagesSeenMutation,
  useGetChatStatsQuery
} from '../../redux/features/messageSlice/messageSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { useFetchUserProfileQuery } from '../../redux/features/userSlice/userSlice';
import moment from 'moment';

export default function MessagingSystem() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { eventId } = useSelectedEvent();
  const { data: userProfileResponse } = useFetchUserProfileQuery();
  const user = userProfileResponse?.data;
  
  const { data: conversationsResponse, isLoading: conversationsLoading } = useGetConversationsQuery(eventId, { skip: !eventId });
  const conversations = conversationsResponse?.data || [];

  const { data: messagesResponse, isLoading: messagesLoading } = useGetMessagesQuery(
    { conversationId: selectedUser?._id, eventId },
    { skip: !selectedUser?._id || !eventId }
  );
  const messages = messagesResponse?.data || [];

  const { data: statsResponse } = useGetChatStatsQuery(eventId, { skip: !eventId });
  const stats = statsResponse?.data || { totalMember: 0, activeMember: 0, unreadMessages: 0 };

  const [markMessagesSeen] = useMarkMessagesSeenMutation();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectUser = (conv) => {
    setSelectedUser(conv);
    if (conv.unreadCount > 0 && eventId) {
       markMessagesSeen({ conversationId: conv._id, eventId }).catch(console.error);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedUser) {
      const socket = getSocketInstance();
      if (socket) {
        socket.emit('send-message', {
          receiverId: selectedUser.profile.accountId,
          text: messageInput.trim()
        });
        setMessageInput('');
      } else {
        console.error("Socket not connected");
      }
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h bg-gray-50 flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] font-semibold text-gray-800">Total Member</span>
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <div className="text-[40px] font-bold text-gray-900 leading-tight">{stats.totalMember}</div>
        </div>
        
        <div className="bg-white rounded-[20px] shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] font-semibold text-gray-800">Active Member</span>
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <div className="text-[40px] font-bold text-gray-900 leading-tight">{stats.activeMember}</div>
        </div>
        
        <div className="bg-[#0FC3C2] rounded-[20px] shadow-sm p-6 flex flex-col justify-between relative">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[16px] font-semibold text-white">Unread Messages</span>
            <div className="relative">
              <Mail className="w-8 h-8 text-white stroke-[1.5]" />
              {stats.unreadMessages > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#F6515B] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-[2px] border-[#0FC3C2]">
                  {stats.unreadMessages}
                </span>
              )}
            </div>
          </div>
          <div className="text-[40px] font-bold text-white leading-tight">{stats.unreadMessages}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 pb-6">
        {/* Conversations List */}
        <div className="col-span-3 bg-white rounded-[20px] shadow-sm flex flex-col h-[700px] overflow-hidden">
          <div className="p-4 px-6 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-[13px] text-gray-600 font-medium"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 font-bold" />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {conversationsLoading ? (
              <div className="text-center p-4 text-gray-500">Loading...</div>
            ) : filteredConversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => handleSelectUser(conv)}
                className="p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: selectedUser?._id === conv._id ? "#F8F9FA" : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.profile?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
                      alt={conv.profile?.name}
                      className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
                      onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-[15px] font-semibold text-gray-800 truncate leading-tight">{conv.profile?.name || "Unknown"}</h4>
                      <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap ml-2">
                        {conv.lastMessageAt ? moment(conv.lastMessageAt).format("LT") : ""}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-400 truncate leading-tight">
                      {conv.lastMessage?.text || "Started a conversation"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-6 bg-white rounded-[20px] shadow-sm flex flex-col h-[700px] overflow-hidden">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 px-6 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedUser.profile?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt={selectedUser.profile?.name}
                    onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg" }}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-[17px] font-semibold text-gray-700 leading-tight">{selectedUser.profile?.name}</h3>
                    <p className="text-[12px] text-gray-400 font-medium">
                      {selectedUser.profile?.lastSeen 
                        ? `Active ${moment(selectedUser.profile.lastSeen).fromNow()}` 
                        : "Active recently"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 px-8 bg-white overflow-y-auto">
                {messagesLoading ? (
                  <div className="flex justify-center items-center h-full text-gray-500">Loading messages...</div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => {
                       const isMe = msg.senderId === user?.accountId || msg.senderId === user?._id;
                       
                       // Determine if we should show a time separator
                       let showTimeSeparator = false;
                       if (index === 0) {
                         showTimeSeparator = true;
                       } else {
                         const prevMsg = messages[index - 1];
                         const duration = moment(msg.createdAt).diff(moment(prevMsg.createdAt), 'hours');
                         if (duration >= 1 || moment(msg.createdAt).format("L") !== moment(prevMsg.createdAt).format("L")) {
                           showTimeSeparator = true;
                         }
                       }

                       return (
                        <React.Fragment key={msg._id || index}>
                          {showTimeSeparator && (
                            <div className="flex justify-center my-6">
                              <span className="text-[10px] text-gray-400 font-semibold tracking-wide">
                                {moment(msg.createdAt).calendar(null, {
                                  sameDay: '[Today], h:mm A',
                                  lastDay: '[Yesterday], h:mm A',
                                  lastWeek: 'dddd, h:mm A',
                                  sameElse: 'MMM D, YYYY, h:mm A'
                                }).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                              className={`max-w-[70%] px-5 py-3 ${
                                isMe
                                  ? 'bg-[#0FC3C2] text-white rounded-t-xl rounded-bl-xl rounded-br-sm shadow-md shadow-teal-100'
                                  : 'bg-gray-100 text-gray-700 rounded-t-xl rounded-br-xl rounded-bl-sm'
                              }`}
                            >
                              <p className="text-[14.5px] font-medium leading-[1.6] whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-5 px-6 border-t border-gray-100 flex gap-4 items-center bg-white">
                <button className="flex-shrink-0 p-3 bg-[#0FC3C2] text-white rounded-full hover:bg-teal-500 transition-colors shadow-md shadow-teal-100 focus:outline-none">
                  <svg className="w-[18px] h-[18px] transform -rotate-45" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <div className="flex-1 bg-[#F5F7F9] rounded-full flex items-center px-6 py-3.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-transparent focus:outline-none text-[15px] text-gray-700 font-medium placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="flex-shrink-0 p-3 bg-[#0FC3C2] text-white rounded-full hover:bg-teal-500 transition-colors shadow-md shadow-teal-100"
                >
                  <Send className="w-[18px] h-[18px] ml-0.5" strokeWidth={2.5} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-30 stroke-1" />
                <p className="font-medium">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* User Info Sidebar */}
        <div className="col-span-3 bg-white rounded-[20px] shadow-sm overflow-hidden h-fit">
          {selectedUser ? (
            <div className="p-8">
              {/* User Profile */}
              <div className="text-center mb-8">
                <img
                  src={selectedUser.profile?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt={selectedUser.profile?.name}
                  onError={(e) => { e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg" }}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-[3px] border-gray-50 shadow-sm"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{selectedUser.profile?.name}</h3>
                <p className="text-sm font-medium text-gray-400">Participant</p>
              </div>

              {/* Media Section */}
              <div className="mt-8">
                <h4 className="text-[15px] font-semibold text-gray-500 mb-4">Media</h4>
                <div className="space-y-3">
                  <div className="text-[13px] font-medium text-gray-400 text-center py-6 bg-[#F8F9FA] rounded-[14px]">No media attached</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 p-6">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30 stroke-1" />
                <p className="text-sm font-medium">Select a user to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
