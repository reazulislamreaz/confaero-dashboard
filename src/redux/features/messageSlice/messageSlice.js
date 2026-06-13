import { apiSlice } from "../../api/apiSlice";
import { API_ORIGIN } from "../../api/baseUrl";
import { io } from "socket.io-client";

let socket;
let currentEventId;

// this is a test
const connectSocket = (eventId) => {
  if (socket && currentEventId === eventId) return socket;

  if (socket) {
    socket.disconnect();
  }

  const token = localStorage.getItem("token");
  socket = io(API_ORIGIN, {
    extraHeaders: {
      token: token,
      eventid: eventId,
    },
  });

  currentEventId = eventId;
  return socket;
};

export const getSocketInstance = () => socket;

export const messageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (eventId) => `/messageOrganizer/conversations/${eventId}`,
      providesTags: ["Conversations"],
      async onCacheEntryAdded(
        eventId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = connectSocket(eventId);

        try {
          await cacheDataLoaded;

          const handleNewMessage = (message) => {
            updateCachedData((draft) => {
              if (draft?.data) {
                const index = draft.data.findIndex(
                  (c) => c._id === message.conversationId
                );
                if (index !== -1) {
                  draft.data[index].lastMessage = message;
                  draft.data[index].lastMessageAt = message.createdAt;
                  // Only increment if we received it, not sent by us usually,
                  // but backend logic could differ. Unread count can be tricky dynamically.
                  draft.data[index].unreadCount += 1;
                  
                  // Move conversation to top
                  const [updatedConv] = draft.data.splice(index, 1);
                  draft.data.unshift(updatedConv);
                }
              }
            });
          };

          const handleUserOnline = (data) => {
            const userId = typeof data === 'string' ? data : data?.userId || data?.id || data?.accountId;
            updateCachedData((draft) => {
              if (draft?.data) {
                const conv = draft.data.find(c => c.profile?.accountId === userId || c._id === userId);
                if (conv) conv.profile.isOnline = true;
              }
            });
          };

          const handleUserOffline = (data) => {
            const userId = typeof data === 'string' ? data : data?.userId || data?.id || data?.accountId;
            updateCachedData((draft) => {
              if (draft?.data) {
                const conv = draft.data.find(c => c.profile?.accountId === userId || c._id === userId);
                if (conv) {
                  conv.profile.isOnline = false;
                  conv.profile.lastSeen = data?.lastSeen || new Date().toISOString();
                }
              }
            });
          };

          socket.on("message:new", handleNewMessage);
          socket.on("useronline", handleUserOnline);
          socket.on("useroffline", handleUserOffline);
        } catch {}

        await cacheEntryRemoved;
        socket.off("message:new");
        socket.off("useronline");
        socket.off("useroffline");
      },
    }),

    getChatStats: builder.query({
      query: (eventId) => `/messageOrganizer/stats/${eventId}`,
      providesTags: ["Conversations", "Messages"],
      async onCacheEntryAdded(
        eventId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = connectSocket(eventId);

        try {
          await cacheDataLoaded;

          const handleActiveCount = (count) => {
            const activeMemberValue = Number(count) || 0;
            updateCachedData((draft) => {
              if (draft?.data) {
                draft.data.activeMember = activeMemberValue;
              } else if (draft && 'activeMember' in draft) {
                draft.activeMember = activeMemberValue;
              }
            });
          };

          socket.on("active-count", handleActiveCount);
          socket.on("active_count", handleActiveCount);
        } catch {}

        await cacheEntryRemoved;
        socket.off("active-count");
        socket.off("active_count");
      },
    }),

    getMessages: builder.query({
      query: ({ conversationId, eventId }) =>
        `/messageOrganizer/messages/${conversationId}/${eventId}`,
      providesTags: (result, error, { conversationId }) => [
        { type: "Messages", id: conversationId },
      ],
      async onCacheEntryAdded(
        { conversationId, eventId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = connectSocket(eventId);

        try {
          await cacheDataLoaded;

          const handleNewMessage = (message) => {
            if (message.conversationId === conversationId) {
              updateCachedData((draft) => {
                if (draft?.data) {
                  draft.data.push(message);
                }
              });
            }
          };

          socket.on("message:new", handleNewMessage);
        } catch {}

        await cacheEntryRemoved;
        socket.off("message:new");
      },
    }),

    markMessagesSeen: builder.mutation({
      query: ({ conversationId, eventId }) => ({
        url: `/messageOrganizer/seen/${conversationId}/${eventId}`,
        method: "PATCH",
      }),
      async onQueryStarted({ conversationId, eventId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getConversations', eventId, (draft) => {
            if (draft?.data) {
              const conv = draft.data.find(c => c._id === conversationId);
              if (conv) {
                conv.unreadCount = 0;
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Conversations"],
    }),
    uploadChatAttachment: builder.mutation({
      query: (formData) => ({
        url: `/upload/chat-attachment`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetChatStatsQuery,
  useGetMessagesQuery,
  useMarkMessagesSeenMutation,
  useUploadChatAttachmentMutation,
} = messageSlice;
