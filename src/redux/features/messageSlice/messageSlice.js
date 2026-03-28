import { apiSlice } from "../../api/apiSlice";
import { io } from "socket.io-client";

let socket;
let currentEventId;

const connectSocket = (eventId) => {
  if (socket && currentEventId === eventId) return socket;

  if (socket) {
    socket.disconnect();
  }

  const token = localStorage.getItem("token");
  socket = io("http://10.10.11.30:8081", {
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

          socket.on("message:new", handleNewMessage);
        } catch {}

        await cacheEntryRemoved;
        socket.off("message:new");
      },
    }),

    getChatStats: builder.query({
      query: (eventId) => `/messageOrganizer/stats/${eventId}`,
      providesTags: ["Conversations", "Messages"],
      // You can add onCacheEntryAdded here to hook into active-count sockets if needed
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
      invalidatesTags: ["Conversations"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetChatStatsQuery,
  useGetMessagesQuery,
  useMarkMessagesSeenMutation,
} = messageSlice;
