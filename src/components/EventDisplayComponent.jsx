import React, { useEffect } from 'react';
import { useGetEventQuery } from '../redux/features/eventSlice/eventSlice';
import { useSelectedEvent } from '../hooks/useSelectedEvent';

const EventDisplayComponent = () => {
  const { data: eventsResponse, isLoading, error } = useGetEventQuery();
  const { eventId, eventData, setEvent, clearEvent, isSelected } = useSelectedEvent();

  // Example: Automatically set the first event as selected when data loads
  useEffect(() => {
    if (eventsResponse?.data && eventsResponse.data.length > 0 && !isSelected) {
      // Set the first event as the selected event
      setEvent(eventsResponse.data[0]);
    }
  }, [eventsResponse, isSelected, setEvent]);

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2>Current Selected Event</h2>
      
      {eventId ? (
        <div>
          <p><strong>Event ID:</strong> {eventId}</p>
          <p><strong>Event Title:</strong> {eventData?.title}</p>
          <p><strong>Event Location:</strong> {eventData?.location}</p>
          <button 
            onClick={clearEvent}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Selected Event
          </button>
        </div>
      ) : (
        <p>No event selected</p>
      )}

      <h3 className="mt-4">Available Events:</h3>
      <div className="space-y-2">
        {eventsResponse?.data?.map((event) => (
          <div key={event._id} className="border p-2 rounded">
            <p>{event.title}</p>
            <p>ID: {event._id}</p>
            {!isSelected || eventId !== event._id ? (
              <button 
                onClick={() => setEvent(event)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Select Event
              </button>
            ) : (
              <span className="text-green-600 font-semibold">(Selected)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDisplayComponent;