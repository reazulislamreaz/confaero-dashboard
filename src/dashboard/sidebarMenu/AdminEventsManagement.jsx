import React, { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { TiPinOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setSelectedEvent,
  useAdminCreateEventMutation,
  useAdminDeleteEventMutation,
  useAdminUpdateEventMutation,
  useGetAdminEventQuery,
} from "../../redux/features/eventSlice/eventSlice";
import toast from "react-hot-toast";
// test
export default function AdminEventManagement({ onEventSelect }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recently");
  const [eventDate, setEventDate] = useState("");
  const [condition, setCondition] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [organizerEmailInput, setOrganizerEmailInput] = useState("");
  const [organizerEmails, setOrganizerEmails] = useState([]);

  const { data: adminEvents, isLoading, isError } = useGetAdminEventQuery({
    search: searchQuery,
    createdSort: sortBy,
    eventDate: eventDate || undefined,
    condition: condition || undefined,
  });
  const [createEvent, { isLoading: isCreating }] =
    useAdminCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useAdminUpdateEventMutation();
  const [deleteEvent] = useAdminDeleteEventMutation();

  const events = adminEvents?.data || [];

  const [formData, setFormData] = useState({
    title: "",
    website: "",
    location: "",
    googleMapLink: "",
    startDate: "",
    endDate: "",
    expectedAttendee: "",
    boothSlot: "",
    details: "",
  });

  const [selectedEvent, setSelectedEventLocal] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formError, setFormError] = useState("");

  const formatDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", { ...options, year: "numeric" })}`;
  };

  const handleEventClick = (event) => {
    setSelectedEventLocal(event);
    dispatch(setSelectedEvent(event));
    if (onEventSelect) onEventSelect(event);
  };

  const addOrganizerEmail = () => {
    const trimmed = organizerEmailInput.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    if (organizerEmails.includes(trimmed)) return;
    setOrganizerEmails([...organizerEmails, trimmed]);
    setOrganizerEmailInput("");
  };

  const removeOrganizerEmail = (index) => {
    setOrganizerEmails(organizerEmails.filter((_, i) => i !== index));
  };

  const goOverview = (e, eventId) => {
    e.stopPropagation();
    navigate(`/dashboard/admin-events/event-overview/${eventId}`);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      website: "",
      location: "",
      googleMapLink: "",
      startDate: "",
      endDate: "",
      expectedAttendee: "",
      boothSlot: "",
      details: "",
    });
    setOrganizerEmails([]);
    setOrganizerEmailInput("");
    setFormError("");
    setEditingEvent(null);
  };

  const handleEditClick = (e, event) => {
    e.stopPropagation();
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      website: event.website || "",
      location: event.location || "",
      googleMapLink: event.googleMapLink || "",
      startDate: event.startDate ? new Date(event.startDate).toISOString().split("T")[0] : "",
      endDate: event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : "",
      expectedAttendee: event.expectedAttendee || "",
      boothSlot: event.boothSlot || "",
      details: event.details || "",
    });
    // If organizers array has emails or names, we might need a separate way to fetch them. 
    // For now, I'll leave organizerEmails empty or populate from event.organizers if they are emails.
    setShowCreateModal(true);
  };

  const handleDeleteClick = async (e, eventId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event? This will also remove all related registrations and invitations.")) {
      try {
        const res = await deleteEvent(eventId).unwrap();
        if (res.success) {
          toast.success("Event deleted successfully!");
        }
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete event.");
      }
    }
  };

  const handleCreateEvent = async () => {
    setFormError("");

    // Basic validation
    if (!formData.title.trim()) return setFormError("Event title is required.");
    if (!formData.startDate) return setFormError("Start date is required.");
    if (!formData.endDate) return setFormError("End date is required.");
    if (!formData.location.trim()) return setFormError("Location is required.");

    const payload = {
      title: formData.title,
      website: formData.website,
      organizerEmails: organizerEmails,
      location: formData.location,
      googleMapLink: formData.googleMapLink,
      startDate: formData.startDate,
      endDate: formData.endDate,
      expectedAttendee: formData.expectedAttendee
        ? Number(formData.expectedAttendee)
        : undefined,
      boothSlot: formData.boothSlot ? Number(formData.boothSlot) : undefined,
      details: formData.details,
    };

    try {
      let res;
      if (editingEvent) {
        res = await updateEvent({ eventId: editingEvent._id, eventData: payload }).unwrap();
      } else {
        res = await createEvent(payload).unwrap();
      }
      
      if (res.success === true) {
        toast.success(editingEvent ? "Event updated successfully!" : "Event created successfully!");
        setShowCreateModal(false);
        resetForm();
      }
    } catch (err) {
      console.log(err);

      if (err?.data?.errorSources?.length > 0) {
        const errors = err.data.errorSources
          .map((e) => `${e.path}: ${e.message}`)
          .join(", ");

        setFormError(errors);
      } else {
        setFormError(
          err?.data?.message || "Failed to process event. Please try again."
        );
      }
    }
  };
  console.log("this is my", events);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Event Management
            </h1>
            <p className="text-sm text-gray-600">
              Create event, assign to Organizer and Manage Event
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Event name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort Created
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option value="Recently">Recently</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Popular">Most Popular</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event date
              </label>
              <select
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option value="">All</option>
                <option value="Recently">Recently</option>
                <option value="This Month">This Month</option>
                <option value="Next Month">Next Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option value="">All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="text-center py-12 text-gray-500">
            Loading events...
          </div>
        )}
        {isError && (
          <div className="text-center py-12 text-red-500">
            Failed to load events. Please try again.
          </div>
        )}

        {/* Event Cards */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No events found.
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event._id}
                  className={`bg-white rounded-lg ${
                    selectedEvent && selectedEvent._id === event._id
                      ? "border-teal-500 ring-2 ring-teal-300"
                      : "border-[#32A69A]"
                  } h-48 shadow-sm overflow-hidden cursor-pointer`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start gap-4 p-5">
                    <div className="flex-shrink-0">
                      <img
                        src={event.bannerImageUrl || "/public/image/event.png"}
                        alt={event.title}
                        className="w-48 h-40 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0 border-r border-[#32A69A] px-2">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-base font-semibold text-gray-900">
                              {event.title}
                            </h3>
                            <span className="text-sm text-gray-500">
                              ID: {event._id}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(event.startDate, event.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ExternalLink className="w-4 h-4" />
                              <a
                                href={event.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {event.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-sm mt-20">
                        <div>
                          <span className="text-gray-500">Expected</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {event.expectedAttendee?.toLocaleString() || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Booth Slots</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {event.boothSlot ?? "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Participants</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {event.registrationCount ?? 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Organizers</span>
                          <span className="ml-2 font-semibold text-gray-900">
                            {event.organizerCount ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button className="hover:text-red-500 flex justify-end transition-colors">
                        <TiPinOutline
                          className={`w-6 h-6 cursor-pointer ${selectedEvent && selectedEvent._id === event._id ? "text-teal-500" : "text-gray-400"}`}
                        />
                      </button>
                      <button
                        onClick={(e) => goOverview(e, event._id)}
                        className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        View Overview
                      </button>
                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={(e) => handleEditClick(e, event)}
                          className="flex items-center gap-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, event._id)}
                          className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Error Message */}
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg whitespace-pre-line">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.example.org/"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Organizer Emails - Only visible during creation */}
                {!editingEvent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organizer Emails
                    </label>
                    <div className="space-y-2">
                      {/* Added email tags */}
                      {organizerEmails.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {organizerEmails.map((email, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 bg-teal-50 border border-teal-200 text-teal-700 px-3 py-1 rounded-full text-sm"
                            >
                              {email}
                              <button
                                onClick={() => removeOrganizerEmail(index)}
                                className="text-teal-400 hover:text-teal-700 ml-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Input + Add */}
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Enter organizer email"
                          value={organizerEmailInput}
                          onChange={(e) => setOrganizerEmailInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addOrganizerEmail();
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          type="button"
                          onClick={addOrganizerEmail}
                          className="px-4 py-2 bg-teal-50 border border-teal-300 text-teal-600 hover:bg-teal-100 rounded-lg text-sm font-medium transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location/Venue <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Las Vegas, USA"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Map Link
                    </label>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      value={formData.googleMapLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          googleMapLink: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Attendee
                    </label>
                    <input
                      type="number"
                      placeholder="10000"
                      value={formData.expectedAttendee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expectedAttendee: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booth Slot
                    </label>
                    <input
                      type="number"
                      placeholder="50"
                      value={formData.boothSlot}
                      onChange={(e) =>
                        setFormData({ ...formData, boothSlot: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <textarea
                    placeholder="Enter event details"
                    rows="4"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleCreateEvent}
                  disabled={isCreating || isUpdating}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      {editingEvent ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    editingEvent ? "Update Event" : "Create Event"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
