import React, { useState, useRef } from "react";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  X,
  MapPin,
  Calendar,
  Paperclip,
} from "lucide-react";
import {
  useAddSessionByCsvfileMutation,
  useAddSessionMutation,
  useAdminEventdetailsQuery,
  useDeleteFloorMapMutation,
  useDeleteSessionMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useUpdateSessionMutation,
} from "../../redux/features/eventSlice/eventSlice";
import { useSelectedEvent } from "../../hooks/useSelectedEvent";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";
import { useIsAdmin } from "../../hooks/useUserRole";

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatDateTimeLocal = (iso) => {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
};

export default function EventAgendaBuilder() {
  const [activeTab, setActiveTab] = useState("Event Info");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileName, setCsvFileName] = useState("");
  const isAdmin = useIsAdmin();

  const floorMapFileRef = useRef();
  const csvFileRef = useRef();

  const { eventId, setEvent } = useSelectedEvent();

  console.log(eventId);


  const {
    data: adminResponse,
    isLoading: adminLoading,
    isError: adminError,
    refetch: refetchAdminEvent,
  } = useAdminEventdetailsQuery(eventId, {
    skip: !isAdmin,
  });

  const {
    data: userResponse,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUserEvent,
  } = useGetEventQuery(undefined, {
    skip: isAdmin,
  });
  // Final unified response
  const eventResponse = isAdmin ? adminResponse : userResponse;
  const isLoading = isAdmin ? adminLoading : userLoading;
  const isError = isAdmin ? adminError : userError;
  const refetchEvent = isAdmin ? refetchAdminEvent : refetchUserEvent;

  const event = eventResponse?.data;
  console.log(eventResponse);

  React.useEffect(() => {
    if (event && !eventId) setEvent(event);
  }, [event, eventId, setEvent]);

  const [addSessionByCsvfile] = useAddSessionByCsvfileMutation();

  const [eventData, setEventData] = useState(null);
  const [updateEvent] = useUpdateEventMutation();

  React.useEffect(() => {
    if (event && !eventData) {
      setEventData({
        bannerImage: null,
        bannerImagePreview: event.bannerImageUrl || null,
        title: event.title || "",
        startDate: formatDateTimeLocal(event.startDate),
        endDate: formatDateTimeLocal(event.endDate),
        location: event.location || "",
        mapLink: event.googleMapLink || "",
        price: event.price || "",
        description: event.details || "",
        website: event.website || "",
      });
    }
  }, [event, eventData, csvFile]);

  const [floorMaps, setFloorMaps] = useState(null);

  React.useEffect(() => {
    if (event?.floorMaps && !floorMaps) {
      setFloorMaps(
        event.floorMaps.map((fm) => ({
          id: fm._id,
          name: fm.title,
          image: fm.imageUrl,
        })),
      );
    }
  }, [event, floorMaps]);

  const [floorMapData, setFloorMapData] = useState({
    title: "",
    bannerImage: null,
    bannerImagePreview: null,
  });

  const sessions = event?.agenda?.sessions || [];

  const getTypeColor = (type) => {
    switch (type) {
      case "Break":
        return "text-teal-600";
      case "Keynote":
        return "text-blue-600";
      case "Session":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const handleAddSession = () => {
    setEditingSession({
      id: null,
      title: "",
      floorMap: null,
      floorMapPreview: null,
      floorMapName: "",
      date: "",
      time: "",
      details: "",
    });
    setShowEditModal(true);
  };

  const handleEdit = (session) => {
    setEditingSession({
      id: session._id,
      title: session.title || "",
      floorMap: null,
      floorMapPreview: session.floorMapUrl || null,
      floorMapName: session.floorMapTitle || "",
      date: session.date
        ? new Date(session.date).toISOString().slice(0, 10)
        : "",
      time: session.time || "",
      details: session.description || session.details || "",
    });
    setShowEditModal(true);
  };

  const [handleDeleteSession] = useDeleteSessionMutation();

  const handleDelete = async (session) => {
    const res = await handleDeleteSession({ eventId, sessionId: session._id });
    if (res?.data?.success === true) {
      toast.success("Session deleted successfully!");
      refetchEvent();
    } else {
      toast.error("Failed to delete session. Please try again.");
    }
  };

  // ── CSV Handlers ──────────────────────────────────────────────────────────

  // Step 1: just store the file, don't upload yet
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // reset so same file can be re-selected

    if (!file) return;

    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      toast.error("Please select a valid CSV file.");
      return;
    }

    setCsvFile(file);
    setCsvFileName(file.name);
  };

  // Step 2: user clicks "Add Sessions" to confirm upload
  const handleConfirmCsvUpload = async () => {
    if (!csvFile) return;

    setIsUploadingCsv(true);

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const result = await addSessionByCsvfile({
        eventId,
        file: formData,
      }).unwrap();

      if (result?.success) {
        toast.success("Sessions imported from CSV successfully!");
        setCsvFile(null);
        setCsvFileName("");
        refetchEvent();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "CSV upload failed");
    } finally {
      setIsUploadingCsv(false);
    }
  };
  // ── Event & Floor Map Handlers ────────────────────────────────────────────

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("title", eventData.title);
    if (eventData.startDate) formData.append("startDate", new Date(eventData.startDate).toISOString());
    if (eventData.endDate) formData.append("endDate", new Date(eventData.endDate).toISOString());
    formData.append("location", eventData.location);
    formData.append("googleMapLink", eventData.mapLink);
    formData.append("price", eventData.price);
    formData.append("website", eventData.website);
    formData.append("details", eventData.description);
    if (eventData.bannerImage) {
      formData.append("banner", eventData.bannerImage);
    }
    if (eventId) {
      const result = await updateEvent({ eventId, eventData: formData });
      if (result?.data?.success === true) {
        toast.success("Event updated successfully!");
        if (result.data.data) {
          setEvent(result.data.data);
        }
        refetchEvent();
      } else {
        toast.error("Failed to update event. Please try again.");
      }
    }
  };

  const [deleteFloorMap] = useDeleteFloorMapMutation();

  const handleRemoveFloorMap = async (id) => {
    const result = await deleteFloorMap({ eventId, floorMapId: id });
    if (result?.data?.success === true) {
      toast.success("Floor map deleted successfully!");
      setFloorMaps((prev) => prev.filter((m) => m.id !== id));
    } else {
      toast.error("Failed to delete floor map. Please try again.");
    }
  };

  const handleAddFloorMap = async () => {
    if (!floorMapData.title) return;
    const newId = `new_${Date.now()}`;
    setFloorMaps((prev) => [
      ...prev,
      {
        id: newId,
        name: floorMapData.title,
        image: floorMapData.bannerImagePreview,
      },
    ]);
    setFloorMapData({ title: "", bannerImage: null, bannerImagePreview: null });
    try {
      const formData = new FormData();
      formData.append("floorMapTitle", floorMapData.title);
      formData.append("floorMapImage", floorMapData.bannerImage);
      const res = await updateEvent({ eventId, eventData: formData });
      if (res?.data?.success === true) {
        toast.success("Floor map added successfully!");
      } else {
        toast.error("Failed to add floor map. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while adding the floor map. Please try again.",
      );
    }
  };

  const handleEventBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEventData((prev) => ({
        ...prev,
        bannerImage: file,
        bannerImagePreview: reader.result,
      }));
    reader.readAsDataURL(file);
  };

  const handleFloorMapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFloorMapData((prev) => ({
        ...prev,
        bannerImage: file,
        bannerImagePreview: reader.result,
      }));
    reader.readAsDataURL(file);
  };

  const handleSessionFloorMapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEditingSession((prev) => ({
        ...prev,
        floorMap: file,
        floorMapPreview: reader.result,
        floorMapName: file.name,
      }));
    reader.readAsDataURL(file);
  };

  const [addSession] = useAddSessionMutation();
  const [editSession] = useUpdateSessionMutation();

  const handleSaveSession = async () => {
    if (!editingSession.title?.trim()) {
      toast.error("Session title is required.");
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append("title", editingSession.title.trim());
    formData.append("details", editingSession.details || "");
    formData.append("time", editingSession.time || "");

    if (editingSession.date) {
      formData.append("date", new Date(editingSession.date).toISOString());
    }

    if (editingSession.floorMap) {
      formData.append("floorMap", editingSession.floorMap);
    }

    try {
      let result;

      if (editingSession.id) {
        result = await editSession({
          sessionId: editingSession.id,
          eventId,
          session: formData,
        });
      } else {
        result = await addSession({
          eventId,
          session: formData,
        });
      }

      if (result?.data?.success === true) {
        toast.success(
          editingSession.id
            ? "Session updated successfully!"
            : "Session added successfully!",
        );
        setShowEditModal(false);
        setEditingSession(null);
      } else {
        toast.error(
          result?.error?.data?.message ||
            (editingSession.id
              ? "Failed to update session."
              : "Failed to add session."),
        );
      }
    } catch (error) {
      console.error("Session save error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Loading / Error ───────────────────────────────────────────────────────
  if (isLoading || !eventData || !floorMaps) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading event data...</p>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-400 text-sm">
          Failed to load event. Please try again.
        </p>
      </div>
    );
  }

  // ── Tab: Event Info ───────────────────────────────────────────────────────
  const renderEventInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Event Details
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Banner Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative overflow-hidden">
          {eventData.bannerImagePreview ? (
            <div className="relative">
              <img
                src={eventData.bannerImagePreview}
                alt="Banner preview"
                className="max-h-48 mx-auto rounded object-cover"
              />
              <button
                onClick={() =>
                  setEventData((p) => ({
                    ...p,
                    bannerImage: null,
                    bannerImagePreview: null,
                  }))
                }
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Browse photo or drop here
              </p>
              <p className="text-xs text-gray-400">
                1920×600 recommended · Max 10 MB
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleEventBannerUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Title
        </label>
        <input
          type="text"
          value={eventData.title}
          onChange={(e) =>
            setEventData((p) => ({ ...p, title: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            value={eventData.startDate}
            onChange={(e) =>
              setEventData((p) => ({ ...p, startDate: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            value={eventData.endDate}
            onChange={(e) =>
              setEventData((p) => ({ ...p, endDate: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location / Venue
          </label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) =>
              setEventData((p) => ({ ...p, location: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Map Link
          </label>
          <input
            type="text"
            value={eventData.mapLink}
            onChange={(e) =>
              setEventData((p) => ({ ...p, mapLink: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>




      {/*  */}


       <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          type="text"
          value={eventData.website}
          onChange={(e) =>
            setEventData((p) => ({ ...p, website: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Fee
          </label>
          <input
            type="number"
            value={eventData.price}
            onChange={(e) =>
              setEventData((p) => ({ ...p, price: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Description
        </label>
        <textarea
          value={eventData.description}
          onChange={(e) =>
            setEventData((p) => ({ ...p, description: e.target.value }))
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <span>
          🎟 Expected Attendees:{" "}
          <strong>{event.expectedAttendee?.toLocaleString() || "—"}</strong>
        </span>
        <span>
          🏢 Booth Slots: <strong>{event.boothSlot || "—"}</strong>
        </span>
        <span>
          👥 Organizers:{" "}
          <strong>{event.organizerEmails?.join(", ") || "—"}</strong>
        </span>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  // ── Tab: Floor Map ────────────────────────────────────────────────────────
  const renderFloorMap = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {floorMaps.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {floorMaps.map((map) => (
            <div
              key={map.id}
              className="relative border border-gray-200 rounded-lg overflow-hidden"
            >
              <Popconfirm
                title="Are you sure you want to delete this floor map?"
                onConfirm={() => handleRemoveFloorMap(map.id)}
                okText="Yes"
                cancelText="No"
              >
                <button className="absolute top-2 right-2 z-10 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900">
                  <X className="w-3 h-3" />
                </button>
              </Popconfirm>
              {map.image ? (
                <img
                  src={map.image}
                  alt={map.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
              <div className="p-2 text-sm font-medium text-gray-800 truncate">
                {map.name}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Floor Map Title
        </label>
        <input
          type="text"
          value={floorMapData.title}
          onChange={(e) =>
            setFloorMapData((p) => ({ ...p, title: e.target.value }))
          }
          placeholder="e.g. Main Hall"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Floor Map Image
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative">
          {floorMapData.bannerImagePreview ? (
            <div className="relative">
              <img
                src={floorMapData.bannerImagePreview}
                alt="Floor map"
                className="max-h-48 mx-auto rounded"
              />
              <button
                onClick={() =>
                  setFloorMapData((p) => ({
                    ...p,
                    bannerImage: null,
                    bannerImagePreview: null,
                  }))
                }
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Browse photo or drop here</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFloorMapUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleAddFloorMap}
        className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mb-6"
      >
        Add Floor Map
      </button>
    </div>
  );

  // ── Tab: Agenda Builder ───────────────────────────────────────────────────
  const renderAgendaBuilder = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Session Schedule
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSession}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Session
          </button>

          {/* ── Hidden CSV input ─────────────────────────────────────────── */}
          <input
            ref={csvFileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={handleCsvUpload}
          />

          {/* ── No file selected → show Upload CSV button ────────────────── */}
          {!csvFile ? (
            <button
              onClick={() => csvFileRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" /> Upload CSV
            </button>
          ) : (
            /* ── File selected → show pill + Add Sessions button ─────────── */
            <div className="flex items-center gap-2">
              {/* Filename pill with clear button */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 max-w-[180px]">
                <Paperclip className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{csvFileName}</span>
                <button
                  onClick={() => {
                    setCsvFile(null);
                    setCsvFileName("");
                  }}
                  className="ml-1 text-teal-500 hover:text-red-500 transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Confirm upload */}
              <button
                onClick={handleConfirmCsvUpload}
                disabled={isUploadingCsv}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploadingCsv ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Upload CSV FIle
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No sessions yet. Add your first session.
        </p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div
              key={session?._id || index}
              className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-sm font-medium text-gray-800">
                  {session?.name || `Session ${index + 1}`}
                </div>
                <div className="col-span-2 text-sm text-gray-600">
                  {session?.time || "—"}
                </div>
                <div className="col-span-6">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    {session?.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    {/* <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session?.floorMapLocation || "—"}
                    </span> */}
                    <span
                      className={`font-medium ${getTypeColor(session?.type)}`}
                    >
                      {/* {session?.type || "—"} */}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <Popconfirm
                    title="Are you sure you want to delete this session?"
                    onConfirm={() => handleDelete(session)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Popconfirm>
                  <button
                    onClick={() => handleViewDetails(session)}
                    className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Event Details & Agenda
          </h1>
          <p className="text-gray-500 text-sm">
            Configure event information, floor map, and create agenda
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex items-center p-4 gap-2">
            {["Event Info", "Floor Map", "Agenda Builder"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium transition-colors rounded ${
                  activeTab === tab
                    ? "text-white bg-teal-600"
                    : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Event Info" && renderEventInfo()}
        {activeTab === "Floor Map" && renderFloorMap()}
        {activeTab === "Agenda Builder" && renderAgendaBuilder()}
      </div>

      {/* ── Details Modal ──────────────────────────────────────────────────── */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-[500px] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">
                Session Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Session Date</div>
                  <div className="text-sm font-medium text-gray-800">
                    {selectedSession.date
                      ? formatDate(selectedSession.date)
                      : "—"}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    Session Hours
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {selectedSession.time || "—"}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Title
                </h3>
                <p className="text-sm text-gray-700">{selectedSession.title}</p>
              </div>

              {(selectedSession.description || selectedSession.details) && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Details
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {selectedSession.description || selectedSession.details}
                  </p>
                </div>
              )}
              {selectedSession.floorMapUrl && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Floor Map
                  </h3>
                  <img
                    src={selectedSession.floorMapUrl}
                    alt="Floor map"
                    className="w-full rounded-lg object-cover max-h-48"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEdit(selectedSession);
                  setShowDetailsModal(false);
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Edit Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Session Modal ───────────────────────────────────────── */}
      {showEditModal && editingSession && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSession.id ? "Edit Session" : "Add Session"}
              </h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingSession(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5 max-h-[65vh] overflow-y-auto">
              {/* Session Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Session Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingSession.title || ""}
                  onChange={(e) =>
                    setEditingSession((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Enter Session Title"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Floor Map Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location (Floor Map)
                </label>
                <input
                  ref={floorMapFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSessionFloorMapUpload}
                />
                {editingSession.floorMapPreview ? (
                  <div className="relative border border-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={editingSession.floorMapPreview}
                      alt="Floor map"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      onClick={() =>
                        setEditingSession((p) => ({
                          ...p,
                          floorMap: null,
                          floorMapPreview: null,
                          floorMapName: "",
                        }))
                      }
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="px-3 py-2 text-xs text-gray-500 truncate">
                      {editingSession.floorMapName}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => floorMapFileRef.current.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    Add Floor Map
                  </button>
                )}
              </div>

              {/* Date & Time */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={editingSession.date || ""}
                    onChange={(e) =>
                      setEditingSession((p) => ({ ...p, date: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Session Hour
                  </label>
                  <input
                    type="text"
                    value={editingSession.time || ""}
                    onChange={(e) =>
                      setEditingSession((p) => ({ ...p, time: e.target.value }))
                    }
                    placeholder="09:00 - 12:00"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Details
                </label>
                <textarea
                  value={editingSession.details || ""}
                  onChange={(e) =>
                    setEditingSession((p) => ({
                      ...p,
                      details: e.target.value,
                    }))
                  }
                  placeholder="Enter details"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={handleSaveSession}
                disabled={isSaving}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    {editingSession.id ? "Updating..." : "Creating..."}
                  </>
                ) : editingSession.id ? (
                  "Update Session"
                ) : (
                  "Create Session"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
