import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

// API endpoints
const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvent: builder.query({
            query: () => `/organizer/events`,
            providesTags: [{type: "Events"}]
        }),

        addSession: builder.mutation({
            query: ({ eventId, sessionData }) => ({
                url: `/organizer-sessions/events/${eventId}/sessions`,
                method: 'POST',
                body: sessionData,
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


    })
});




export const {
    useGetEventQuery,
    useAddSessionMutation,
    useUpdateSessionMutation,
    useDeleteSessionMutation,
    useUpdateEventMutation,
} = eventApiSlice;

 

// Separate slice for managing selected event state
const selectedEventSlice = createSlice({
    name: 'selectedEvent',
    initialState: {
        eventId: null,
        eventData: null,
    },
    reducers: {
        setSelectedEvent: (state, action) => {
            state.eventId = action.payload._id || action.payload.id;
            state.eventData = action.payload;
        },
        clearSelectedEvent: (state) => {
            state.eventId = null;
            state.eventData = null;
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