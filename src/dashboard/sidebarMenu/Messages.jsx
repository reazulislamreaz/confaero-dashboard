
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Send, Users, MessageCircle, Mail, Paperclip, FileText, X, Loader2 } from 'lucide-react';
import { 
  useGetConversationsQuery, 
  useGetMessagesQuery, 
  getSocketInstance, 
  useMarkMessagesSeenMutation,
  useGetChatStatsQuery,
  useUploadChatAttachmentMutation
} from '../../redux/features/messageSlice/messageSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { useFetchUserProfileQuery } from '../../redux/features/userSlice/userSlice';
import ListSkeleton from '../../components/loading/ListSkeleton';
import SubtitleSkeleton from '../../components/loading/SubtitleSkeleton';
import { useDashboardLoading } from '../../hooks/useDashboardLoading';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

export default function MessagingSystem() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [uploadChatAttachment, { isLoading: isUploading }] = useUploadChatAttachmentMutation();
  
  const { eventId } = useSelectedEvent();
  const { data: userProfileResponse } = useFetchUserProfileQuery();
  const user = userProfileResponse?.data;
  
  const { data: conversationsResponse, isLoading: conversationsLoading, isFetching: conversationsFetching } = useGetConversationsQuery(eventId, { skip: !eventId });
  const conversations = conversationsResponse?.data || [];

  const conversationsLoadingState = useDashboardLoading(conversationsLoading, conversationsFetching);

  const { data: messagesResponse, isLoading: messagesLoading, isFetching: messagesFetching } = useGetMessagesQuery(
    { conversationId: selectedUser?._id, eventId },
    { skip: !selectedUser?._id || !eventId }
  );
  const messagesLoadingState = useDashboardLoading(messagesLoading, messagesFetching);
  const messages = messagesResponse?.data || [];

  const { data: statsResponse } = useGetChatStatsQuery(eventId, { skip: !eventId });
  const stats = statsResponse?.data || { totalMember: 0, activeMember: 0, unreadMessages: 0 };

  const [markMessagesSeen] = useMarkMessagesSeenMutation();

  const messagesEndRef = useRef(null);

  // ─── নিজের accountId বের করা conversations থেকে ───────────────────────────
  // selectedUser.profile.accountId হলো receiver এর ID।
  // messages এ দুইটা আলাদা senderId alternate করে —
  // যেটা receiver এর ID না, সেটাই আমার (sender এর) ID।
  const myAccountId = useMemo(() => {
    if (!selectedUser || !messages.length) return null;

    const receiverId = selectedUser?.profile?.accountId;

    for (const m of messages) {
      let sid = null;
      if (m.senderId) {
        if (typeof m.senderId === 'object') {
          sid = m.senderId.accountId || m.senderId._id;
        } else {
          sid = m.senderId;
        }
      }
      if (sid && receiverId && String(sid) !== String(receiverId)) {
        return sid; // এটাই আমার ID
      }
    }
    return null;
  }, [selectedUser, messages]);
  // ──────────────────────────────────────────────────────────────────────────

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

  const handleSendMessage = async () => {
    if ((messageInput.trim() || attachment) && selectedUser) {
      const socket = getSocketInstance();
      if (!socket) {
        console.error("Socket not connected");
        return;
      }
      
      let finalAttachments = [];
      if (attachment) {
         try {
           const formData = new FormData();
           formData.append("file", attachment);
           const res = await uploadChatAttachment(formData).unwrap();
           const uploadedUrl = res?.data?.url || res?.url || res?.data || res?.secure_url;
           if (uploadedUrl && typeof uploadedUrl === 'string') {
             finalAttachments.push({
               url: uploadedUrl,
               name: attachment.name,
               size: attachment.size,
               mimeType: attachment.type
             });
           }
         } catch (error) {
           console.error("Failed to upload attachment", error);
           return;
         }
      }

      socket.emit('send-message', {
        receiverId: selectedUser.profile.accountId,
        text: messageInput.trim(),
        ...(finalAttachments.length > 0 && { attachments: finalAttachments })
      });
      setMessageInput('');
      setAttachment(null);
    }
  };

  useEffect(() => {
    if (selectedUser && eventId) {
      const conv = conversations.find(c => c._id === selectedUser._id);
      if (conv && conv.unreadCount > 0) {
        markMessagesSeen({ conversationId: selectedUser._id, eventId }).catch(console.error);
      }
    }
  }, [messages, selectedUser, conversations, eventId, markMessagesSeen]);

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
            {conversationsLoadingState ? (
              <div className="p-3">
                <ListSkeleton rows={5} />
              </div>
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
                        {conv.lastMessageAt ? dayjs(conv.lastMessageAt).format("h:mm A") : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={`text-[13px] truncate leading-tight ${conv.unreadCount > 0 ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                        {(() => {
                           if (typeof conv.lastMessage === 'string' && conv.lastMessage.trim() !== '') return conv.lastMessage;
                           if (conv.lastMessage?.text) return conv.lastMessage.text;
                           if (conv.lastMessage?.attachments?.length > 0) return "📎 Attachment";
                           return "Started a conversation";
                        })()}
                      </p>
                      {conv.unreadCount > 0 && (
                        <div className="bg-[#0FC3C2] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
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
                    <p className="text-[12px] text-gray-400 font-medium flex items-center gap-1.5">
                      {selectedUser.profile?.isOnline ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span className="text-green-500">Active now</span>
                        </>
                      ) : (
                        selectedUser.profile?.lastSeen 
                          ? `Active ${dayjs(selectedUser.profile.lastSeen).fromNow()}` 
                          : "Active recently"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 px-8 bg-white overflow-y-auto">
                {messagesLoadingState ? (
                  <div className="h-full p-4">
                    <ListSkeleton rows={6} showAvatar={false} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => {

                      // senderId বের করা
                      let senderId = null;
                      if (msg.senderId) {
                        if (typeof msg.senderId === 'object') {
                          senderId = msg.senderId.accountId || msg.senderId._id;
                        } else {
                          senderId = msg.senderId;
                        }
                      }

                      // myAccountId দিয়ে check — receiver এর ID না হলে সেটা আমার message
                      const isMe = Boolean(
                        senderId &&
                        myAccountId &&
                        String(senderId) === String(myAccountId)
                      );

                      // Time separator logic
                      let showTimeSeparator = false;
                      if (index === 0) {
                        showTimeSeparator = true;
                      } else {
                        const prevMsg = messages[index - 1];
                        const duration = dayjs(msg.createdAt).diff(dayjs(prevMsg.createdAt), 'hour');
                        if (
                          duration >= 1 ||
                          dayjs(msg.createdAt).format("YYYY-MM-DD") !== dayjs(prevMsg.createdAt).format("YYYY-MM-DD")
                        ) {
                          showTimeSeparator = true;
                        }
                      }

                      return (
                        <React.Fragment key={msg._id || index}>
                          {showTimeSeparator && (
                            <div className="flex justify-center my-6">
                              <span className="text-[10px] text-gray-400 font-semibold tracking-wide">
                                {dayjs(msg.createdAt)
                                  .calendar(null, {
                                    sameDay: '[Today], h:mm A',
                                    lastDay: '[Yesterday], h:mm A',
                                    lastWeek: 'dddd, h:mm A',
                                    sameElse: 'MMM D, YYYY, h:mm A'
                                  })
                                  .toUpperCase()}
                              </span>
                            </div>
                          )}

                          {/* isMe=true → RIGHT (teal), isMe=false → LEFT (gray) */}
                          <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[70%] px-5 py-3 ${
                                isMe
                                  ? "bg-[#0FC3C2] text-white rounded-t-xl rounded-bl-xl rounded-br-sm"
                                  : "bg-gray-100 text-gray-700 rounded-t-xl rounded-br-xl rounded-bl-sm"
                              }`}
                            >
                              {/* Attachments */}
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mb-2 space-y-2">
                                  {msg.attachments.map((att, i) => {
                                    const isImg =
                                      att.mimeType?.startsWith("image/") ||
                                      att.url?.match(/\.(jpeg|jpg|gif|png)$/i);
                                    return isImg ? (
                                      <img
                                        key={i}
                                        src={att.url}
                                        alt={att.name || "attachment"}
                                        className="rounded-lg max-w-full h-auto object-cover max-h-[200px]"
                                      />
                                    ) : (
                                      <a
                                        key={i}
                                        href={att.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 p-2 rounded bg-white bg-opacity-20 ${
                                          isMe ? "text-white" : "text-gray-800"
                                        }`}
                                      >
                                        <FileText className="w-5 h-5 flex-shrink-0" />
                                        <span className="text-sm truncate max-w-[150px]">
                                          {att.name || "View Attachment"}
                                        </span>
                                      </a>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Message Text */}
                              {msg.text && (
                                <p className="text-[14.5px] font-medium leading-[1.6] whitespace-pre-wrap break-words">
                                  {msg.text}
                                </p>
                              )}
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
              <div className="p-5 px-6 border-t border-gray-100 flex gap-4 items-center bg-white relative">
                 {attachment && (
                  <div className="absolute bottom-full left-6 mb-2 p-3 bg-white rounded-lg shadow-md border border-gray-100 flex items-center justify-between gap-3 z-20 min-w-[200px]">
                    <div className="flex items-center gap-2 overflow-hidden">
                       <FileText className="w-4 h-4 text-teal-500 flex-shrink-0" />
                       <span className="text-sm font-medium text-gray-600 truncate max-w-[150px]">{attachment.name}</span>
                    </div>
                    <button onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-500 rounded-full p-1 bg-gray-50 hover:bg-red-50 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                 )}
                <div className="relative">
                  <label className="flex-shrink-0 p-3 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors cursor-pointer block">
                    <Paperclip className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    <input type="file" className="hidden" accept="image/*,.pdf,.doc,.docx" onChange={(e) => { if(e.target.files[0]) setAttachment(e.target.files[0]) }} />
                  </label>
                </div>
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
                  disabled={isUploading}
                  className={`flex-shrink-0 p-3 bg-[#0FC3C2] text-white rounded-full hover:bg-teal-500 transition-colors shadow-md shadow-teal-100 disabled:opacity-75 disabled:cursor-not-allowed`}
                >
                  {isUploading ? <Loader2 className="w-[18px] h-[18px] ml-0.5 animate-spin" strokeWidth={2.5} /> : <Send className="w-[18px] h-[18px] ml-0.5" strokeWidth={2.5} />}
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