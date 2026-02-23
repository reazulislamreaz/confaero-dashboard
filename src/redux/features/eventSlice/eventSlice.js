import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

// Get initial eventId from localStorage
const getInitialEventId = () => {
  try {
    const savedEventId = localStorage.getItem('selectedEventId');
    return savedEventId || null;
  } catch (error) {
    console.error('Error reading eventId from localStorage:', error);
    return null;
  }
};

// API endpoints
const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvent: builder.query({
            query: () => `/organizer/events`,
            providesTags: [{type: "Events"}]
        }),

        addSession: builder.mutation({
            query: ({ eventId, session }) => ({
                url: `/organizer-sessions/events/${eventId}/sessions`,
                method: 'POST',
                body: session,
            }),
            invalidatesTags: [{type: "Events"}]
        }),

        updateSession: builder.mutation({
            query: ({ eventId, sessionId, sessionData }) => ({
                url: `/organizer/events/${eventId}/sessions/${sessionId}`,
                method: 'PUT',
                body: sessionData,
            }),
            invalidatesTags: [{type: "Events"}]
        }),

        deleteSession: builder.mutation({
            query: ({ eventId, sessionId }) => ({
                url: `/organizer/events/${eventId}/sessions/${sessionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: "Events"}]
        }),

         updateEvent: builder.mutation({
            query: ({ eventId, eventData }) => ({
                url: `/organizer/events/${eventId}`,
                method: 'PATCH',
                body: eventData,
            }),
            invalidatesTags: [{type: "Events"}]
         }),

         deleteFloorMap: builder.mutation({
            query: ({ eventId, floorMapId }) => ({
                url: `/organizer/events/${eventId}/floormaps/${floorMapId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: "Events"}]
         }),
    })
});




export const {
    useGetEventQuery,
    useAddSessionMutation,
    useUpdateSessionMutation,
    useDeleteSessionMutation,
    useUpdateEventMutation,
    useDeleteFloorMapMutation,
} = eventApiSlice;

 

// Separate slice for managing selected event state
const selectedEventSlice = createSlice({
    name: 'selectedEvent',
    initialState: {
        eventId: getInitialEventId(),
        eventData: null,
    },
    reducers: {
        setSelectedEvent: (state, action) => {
            state.eventId = action.payload._id || action.payload.id;
            state.eventData = action.payload;
            // Persist to localStorage
            try {
                localStorage.setItem('selectedEventId', state.eventId);
            } catch (error) {
                console.error('Error saving eventId to localStorage:', error);
            }
        },
        clearSelectedEvent: (state) => {
            state.eventId = null;
            state.eventData = null;
            // Clear from localStorage
            try {
                localStorage.removeItem('selectedEventId');
            } catch (error) {
                console.error('Error removing eventId from localStorage:', error);
            }
        }
    }
});

export const { setSelectedEvent, clearSelectedEvent } = selectedEventSlice.actions;

// Combine the API slice and the selected event slice
export const eventSlice = {
    ...eventApiSlice,
    reducer: selectedEventSlice.reducer,
};



// Selector to get the selected event ID
export const selectEventId = (state) => state.selectedEvent?.eventId;
// Selector to get the selected event data
export const selectEventData = (state) => state.selectedEvent?.eventData;