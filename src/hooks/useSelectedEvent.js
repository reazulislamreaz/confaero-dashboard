import { useSelector, useDispatch } from 'react-redux';
import {  selectEventData, setSelectedEvent, clearSelectedEvent, selectEventId } from '../redux/features/eventSlice/eventSlice';

/**
 * Custom hook to access and manage the selected event
 */
export const useSelectedEvent = () => {
  const dispatch = useDispatch();
  
  // Get the selected event ID and data from the store
  const eventId = useSelector(selectEventId);
  const eventData = useSelector(selectEventData);

  // Function to set the selected event
  const setEvent = (eventData) => {
    dispatch(setSelectedEvent(eventData));
  };

  // Function to clear the selected event
  const clearEvent = () => {
    dispatch(clearSelectedEvent());
  };

  return {
    eventId,
    eventData,
    setEvent,
    clearEvent,
    isSelected: !!eventId, // Boolean indicating if an event is currently selected
  };
};