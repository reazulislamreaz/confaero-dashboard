import React, { useState } from 'react';
import { Plus, Upload, Edit, Trash2, Eye, X, MapPin, Calendar } from 'lucide-react';
import { useGetEventQuery } from '../../redux/features/eventSlice/eventSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

const formatDateTimeLocal = (iso) => {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
};

export default function EventAgendaBuilder() {
  const [activeTab, setActiveTab] = useState('Event Info');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);

  const { eventId, setEvent } = useSelectedEvent();
  const { data: eventResponse, isLoading, isError } = useGetEventQuery();

  // ── Extract event from API response ────────────────────────────────────────
  const event = eventResponse?.data?.[0];

  // ── Sync eventId into context once loaded ──────────────────────────────────
  React.useEffect(() => {
    if (event && !eventId) {
      setEvent(event);
    }
  }, [event, eventId, setEvent]);

  // ── Editable Event Info state — seeded from API ────────────────────────────
  const [eventData, setEventData] = useState(null);

  React.useEffect(() => {
    if (event && !eventData) {
      setEventData({
        bannerImage: null,
        bannerImagePreview: event.bannerImageUrl || null,
        title: event.title || '',
        startDate: formatDateTimeLocal(event.startDate),
        endDate: formatDateTimeLocal(event.endDate),
        location: event.location || '',
        mapLink: event.googleMapLink || '',
        description: event.details || '',
        website: event.website || '',
      });
    }
  }, [event, eventData]);

  // ── Floor maps state — seeded from API ────────────────────────────────────
  const [floorMaps, setFloorMaps] = useState(null);

  React.useEffect(() => {
    if (event?.floorMaps && !floorMaps) {
      setFloorMaps(
        event.floorMaps.map((fm) => ({
          id: fm._id,
          name: fm.title,
          image: fm.imageUrl,
        }))
      );
    }
  }, [event, floorMaps]);

  const [floorMapData, setFloorMapData] = useState({
    title: '',
    bannerImage: null,
    bannerImagePreview: null,
  });

  // ── Sessions from API agenda ───────────────────────────────────────────────
  const sessions = event?.agenda?.sessions || [];

  // ── Type color helper ─────────────────────────────────────────────────────
  const getTypeColor = (type) => {
    switch (type) {
      case 'Break':   return 'text-teal-600';
      case 'Keynote': return 'text-blue-600';
      case 'Session': return 'text-purple-600';
      default:        return 'text-gray-600';
    }
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const handleAddSession = () => {
    setEditingSession({ id: null, name: '', time: '', title: '', venue: '', type: 'Session' });
    setShowEditModal(true);
  };

  const handleEdit = (session) => {
    setEditingSession({ ...session });
    setShowEditModal(true);
  };

  const handleDelete = (session) => {
    console.log('Delete session:', session);
    // TODO: dispatch delete mutation
  };

  const handleSaveChanges = () => {
    console.log('Save event data:', eventData);
    // TODO: dispatch update mutation
  };

  const handleRemoveFloorMap = (id) => {
    setFloorMaps((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddFloorMap = () => {
    if (!floorMapData.title) return;
    const newId = `new_${Date.now()}`;
    setFloorMaps((prev) => [
      ...prev,
      { id: newId, name: floorMapData.title, image: floorMapData.bannerImagePreview },
    ]);
    setFloorMapData({ title: '', bannerImage: null, bannerImagePreview: null });
  };

  const handleEventBannerUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEventData((prev) => ({ ...prev, bannerImage: file, bannerImagePreview: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleFloorMapUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFloorMapData((prev) => ({ ...prev, bannerImage: file, bannerImagePreview: reader.result }));
    reader.readAsDataURL(file);
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
        <p className="text-red-400 text-sm">Failed to load event. Please try again.</p>
      </div>
    );
  }

  // ── Tab: Event Info ───────────────────────────────────────────────────────
  const renderEventInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Event Details</h2>

      {/* Banner Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative overflow-hidden">
          {eventData.bannerImagePreview ? (
            <div className="relative">
              <img
                src={eventData.bannerImagePreview}
                alt="Banner preview"
                className="max-h-48 mx-auto rounded object-cover"
              />
              <button
                onClick={() => setEventData((p) => ({ ...p, bannerImage: null, bannerImagePreview: null }))}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Browse photo or drop here</p>
              <p className="text-xs text-gray-400">1920×600 recommended · Max 10 MB</p>
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

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
        <input
          type="text"
          value={eventData.title}
          onChange={(e) => setEventData((p) => ({ ...p, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
          <input
            type="datetime-local"
            value={eventData.startDate}
            onChange={(e) => setEventData((p) => ({ ...p, startDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
          <input
            type="datetime-local"
            value={eventData.endDate}
            onChange={(e) => setEventData((p) => ({ ...p, endDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Location & Map */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location / Venue</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData((p) => ({ ...p, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google Map Link</label>
          <input
            type="text"
            value={eventData.mapLink}
            onChange={(e) => setEventData((p) => ({ ...p, mapLink: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Website */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="text"
          value={eventData.website}
          onChange={(e) => setEventData((p) => ({ ...p, website: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
        <textarea
          value={eventData.description}
          onChange={(e) => setEventData((p) => ({ ...p, description: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>

      {/* Quick Info Pills */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <span>🎟 Expected Attendees: <strong>{event.expectedAttendee?.toLocaleString() || '—'}</strong></span>
        <span>🏢 Booth Slots: <strong>{event.boothSlot || '—'}</strong></span>
        <span>👥 Organizers: <strong>{event.organizerEmails?.join(', ') || '—'}</strong></span>
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
      {/* Existing Floor Map Cards */}
      {floorMaps.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {floorMaps.map((map) => (
            <div key={map.id} className="relative border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => handleRemoveFloorMap(map.id)}
                className="absolute top-2 right-2 z-10 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900"
              >
                <X className="w-3 h-3" />
              </button>
              {map.image ? (
                <img src={map.image} alt={map.name} className="w-full h-32 object-cover" />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
              <div className="p-2 text-sm font-medium text-gray-800 truncate">{map.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Floor Map */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Floor Map Title</label>
        <input
          type="text"
          value={floorMapData.title}
          onChange={(e) => setFloorMapData((p) => ({ ...p, title: e.target.value }))}
          placeholder="e.g. Main Hall"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Floor Map Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative">
          {floorMapData.bannerImagePreview ? (
            <div className="relative">
              <img src={floorMapData.bannerImagePreview} alt="Floor map" className="max-h-48 mx-auto rounded" />
              <button
                onClick={() => setFloorMapData((p) => ({ ...p, bannerImage: null, bannerImagePreview: null }))}
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

      <div className="flex justify-center pt-6 border-t">
        <button
          onClick={handleSaveChanges}
          className="px-12 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  // ── Tab: Agenda Builder ───────────────────────────────────────────────────
  const renderAgendaBuilder = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Session Schedule</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAddSession}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add Session
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
            <Upload className="w-4 h-4" /> Upload CSV
          </button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No sessions yet. Add your first session.</p>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div key={session._id || index} className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-sm font-medium text-gray-800">
                  {session.name || `Session ${index + 1}`}
                </div>
                <div className="col-span-2 text-sm text-gray-600">{session.time || '—'}</div>
                <div className="col-span-6">
                  <div className="text-sm font-medium text-gray-800 mb-1">{session.title}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.venue || '—'}
                    </span>
                    <span className={`font-medium ${getTypeColor(session.type)}`}>
                      {session.type || '—'}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button onClick={() => handleEdit(session)} className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(session)} className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleViewDetails(session)} className="p-2 text-gray-600 hover:text-teal-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={handleSaveChanges} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Event Details & Agenda</h1>
          <p className="text-gray-500 text-sm">Configure event information, floor map, and create agenda</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex items-center p-4 gap-2">
            {['Event Info', 'Floor Map', 'Agenda Builder'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium transition-colors rounded ${
                  activeTab === tab
                    ? 'text-white bg-teal-600'
                    : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Event Info'      && renderEventInfo()}
        {activeTab === 'Floor Map'       && renderFloorMap()}
        {activeTab === 'Agenda Builder'  && renderAgendaBuilder()}
      </div>

      {/* ── Details Modal ──────────────────────────────────────────────────── */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-[500px] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Session Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
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
                    {formatDate(event.startDate)} – {formatDate(event.endDate)}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Session Hours</div>
                  <div className="text-sm font-medium text-gray-800">{selectedSession.time || '—'}</div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Title</h3>
                <p className="text-sm text-gray-700">{selectedSession.title}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Venue</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {selectedSession.venue || '—'}
                </p>
              </div>
              {selectedSession.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Details</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedSession.description}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Close
              </button>
              <button
                onClick={() => { handleEdit(selectedSession); setShowDetailsModal(false); }}
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
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingSession.id ? 'Edit Session' : 'Add Session'}
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Session Name', key: 'name', placeholder: 'e.g. Session 1' },
                { label: 'Time',         key: 'time', placeholder: 'e.g. 08:30 - 09:00' },
                { label: 'Title',        key: 'title', placeholder: 'e.g. Registration & Welcome Coffee' },
                { label: 'Venue',        key: 'venue', placeholder: 'e.g. Main Hall' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
                    value={editingSession[key] || ''}
                    onChange={(e) => setEditingSession((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editingSession.type || 'Session'}
                  onChange={(e) => setEditingSession((p) => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Session">Session</option>
                  <option value="Keynote">Keynote</option>
                  <option value="Break">Break</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { console.log('Save session:', editingSession); setShowEditModal(false); }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                {editingSession.id ? 'Update Session' : 'Add Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}