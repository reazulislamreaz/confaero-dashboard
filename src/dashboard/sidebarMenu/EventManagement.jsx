import React, { useState } from 'react';
import { Plus, Upload, Edit, Trash2, Eye, X, MapPin, User, Calendar, Clock } from 'lucide-react';
import { useGetEventQuery } from '../../redux/features/eventSlice/eventSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
 

export default function EventAgendaBuilder() {
  const [activeTab, setActiveTab] = useState('Event Info');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editingSession, setEditingSession] = useState(null);

    const { eventId } = useSelectedEvent();

const {data: event, } = useGetEventQuery();

console.log(eventId)

  const [floorMaps, setFloorMaps] = useState([
    { id: 1, name: 'Main Hall', image: null },
    { id: 2, name: 'Main Hall', image: null },
    { id: 3, name: 'Main Hall', image: null }
  ]);

  const [eventData, setEventData] = useState({
    bannerImage: null,
    bannerImagePreview: null,
    title: '18th Lithium Supply & Battery Conference',
    startDate: 'Jun 22-25, 2026',
    endDate: '',
    location: 'Las Vegas, USA',
    mapLink: 'https://maps.app.goo.gl/6qv1H5UMsY5gUAg8',
    description: 'For 18 years, the Fastmarkets Lithium Supply and Battery Raw Materials Conference has been the definitive meeting place for the sector. More than 1,300 delegates rely on this platform to negotiate offtake agreements, secure financing, assess market fundamentals and build partnerships across the supply chain.'
  });

  const [floorMapData, setFloorMapData] = useState({
    title: '',
    bannerImage: null,
    bannerImagePreview: null
  });

  const sessions = [
    {
      id: 1,
      name: 'Session 1',
      time: '08:30 - 09:00',
      title: 'Registration & Welcome Coffee',
      venue: 'Main Hall',
      type: 'Break'
    },
    {
      id: 2,
      name: 'Session 2',
      time: '09:00 - 10:30',
      title: 'Keynote: Future of Battery Technology',
      venue: 'Main Hall',
      type: 'Keynote'
    },
    {
      id: 3,
      name: 'Session 3',
      time: '10:30 - 11:00',
      title: 'Coffee Break / Posters & Exhibit',
      venue: 'Exhibit Area',
      type: 'Break'
    },
    {
      id: 4,
      name: 'Session 4',
      time: '11:00 - 11:30',
      title: 'Unlocking higher energy density in LFP cells',
      venue: 'Main Hall',
      type: 'Session'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Break': return 'text-teal-600';
      case 'Keynote': return 'text-blue-600';
      case 'Session': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const handleAddSession = () => {
    setEditingSession({
      id: null,
      name: '',
      time: '',
      title: '',
      venue: '',
      type: 'Session',
      sessionDate: '',
      sessionHours: ''
    });
    setShowEditModal(true);
  };

  const handleUploadCSV = () => {
    console.log('Upload CSV');
  };

  const handleEdit = (session) => {
    setEditingSession({
      ...session,
      sessionDate: 'Jun 22-25, 2026',
      sessionHours: '08:30AM - 9:00AM'
    });
    setShowEditModal(true);
  };

  const handleDelete = (session) => {
    console.log('Delete session:', session);
  };

  const handleSaveChanges = () => {
    console.log('Save all changes');
  };

  const handleRemoveFloorMap = (id) => {
    setFloorMaps(floorMaps.filter(map => map.id !== id));
  };

  const handleAddFloorMap = () => {
    const newId = Math.max(...floorMaps.map(m => m.id), 0) + 1;
    setFloorMaps([...floorMaps, { id: newId, name: 'Main Hall', image: null }]);
  };

  const handleEventBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData({
          ...eventData,
          bannerImage: file,
          bannerImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFloorMapUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFloorMapData({
          ...floorMapData,
          bannerImage: file,
          bannerImagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEventInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Event Details</h2>
      
      {/* Banner Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative">
          {eventData.bannerImagePreview ? (
            <div className="relative">
              <img 
                src={eventData.bannerImagePreview} 
                alt="Banner preview" 
                className="max-h-48 mx-auto rounded"
              />
              <button
                onClick={() => setEventData({...eventData, bannerImage: null, bannerImagePreview: null})}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Browse photo or drop here</p>
              <p className="text-xs text-gray-400">Banner images option dimension 1920x600 Max photo size 10 MB</p>
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

      {/* Event Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
        <input
          type="text"
          value={eventData.title}
          onChange={(e) => setEventData({...eventData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
          <input
            type="text"
            value={eventData.startDate}
            onChange={(e) => setEventData({...eventData, startDate: e.target.value})}
            placeholder="mm/dd/yyyy - Jun 22-25, 2026"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
          <input
            type="text"
            value={eventData.endDate}
            onChange={(e) => setEventData({...eventData, endDate: e.target.value})}
            placeholder="mm/dd/yyyy --:-- --"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Location & Map Link */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location/Venue</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData({...eventData, location: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google map link</label>
          <input
            type="text"
            value={eventData.mapLink}
            onChange={(e) => setEventData({...eventData, mapLink: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Event Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
        <textarea
          value={eventData.description}
          onChange={(e) => setEventData({...eventData, description: e.target.value})}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>

      {/* Footer Actions */}
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

  const renderFloorMap = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Floor Map Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {floorMaps.map((map) => (
          <div key={map.id} className="relative border border-gray-200 rounded-lg p-3">
            <button
              onClick={() => handleRemoveFloorMap(map.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <span className="text-sm font-medium text-gray-800">{map.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floor Map Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Floor Map Title</label>
        <input
          type="text"
          value={floorMapData.title}
          onChange={(e) => setFloorMapData({...floorMapData, title: e.target.value})}
          placeholder="e.g. Main Hall"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Banner Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 relative">
          {floorMapData.bannerImagePreview ? (
            <div className="relative">
              <img 
                src={floorMapData.bannerImagePreview} 
                alt="Floor map preview" 
                className="max-h-48 mx-auto rounded"
              />
              <button
                onClick={() => setFloorMapData({...floorMapData, bannerImage: null, bannerImagePreview: null})}
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

      {/* Add More Button */}
      <div className="mb-6">
        <button
          onClick={handleAddFloorMap}
          className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Add More
        </button>
      </div>

      {/* Footer Actions */}
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

  const renderAgendaBuilder = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Session Schedule</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAddSession}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Session
          </button>
          <button
            onClick={handleUploadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Upload className="w-4 h-4" />
            Upload CSV
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <div key={session.id} className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex-1 grid grid-cols-12 gap-4 items-center">
              {/* Session Name */}
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-800">{session.name}</span>
              </div>

              {/* Time */}
              <div className="col-span-2">
                <span className="text-sm text-gray-600">{session.time}</span>
              </div>

              {/* Session Details */}
              <div className="col-span-6">
                <div className="text-sm font-medium text-gray-800 mb-1">{session.title}</div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {session.venue}
                  </span>
                  <span className={`font-medium ${getTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(session)}
                  className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(session)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewDetails(session)}
                  className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Event Details & Agenda</h1>
          <p className="text-gray-500 text-sm">Configure event information, floor map, and create agenda</p>
        </div>

        {/* Tabs and Profile */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-2">
              {['Event Info', 'Floor Map', 'Agenda Builder'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-sm font-medium transition-colors rounded ${
                    activeTab === tab
                      ? 'text-white bg-teal-600'
                      : 'text-gray-600 border border-gray-300 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
           
           
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'Event Info' && renderEventInfo()}
        {activeTab === 'Floor Map' && renderFloorMap()}
        {activeTab === 'Agenda Builder' && renderAgendaBuilder()}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-[500px] max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Session Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Session Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Session Date</div>
                  <div className="text-sm font-medium text-gray-800">{editingSession.sessionDate || 'Jun 22-25, 2026'}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">Session Hours</div>
                  <div className="text-sm font-medium text-gray-800">{editingSession.sessionHours || '08:30AM - 9:00AM'}</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Details</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>

              </div>
 
 
            </div>

            {/* Modal Footer */}
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

      {/* Add/Edit Session Modal */}
      {showEditModal && editingSession && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingSession.id ? editingSession.title : 'Unlocking higher energy density in LFP cells'}
              </h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Session Date & Hours Cards */}
            

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Name</label>
                  <input
                    type="text"
                    value={editingSession.name}
                    onChange={(e) => setEditingSession({...editingSession, name: e.target.value})}
                    placeholder="e.g. Session 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={editingSession.time}
                    onChange={(e) => setEditingSession({...editingSession, time: e.target.value})}
                    placeholder="e.g. 08:30 - 09:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingSession.title}
                    onChange={(e) => setEditingSession({...editingSession, title: e.target.value})}
                    placeholder="e.g. Registration & Welcome Coffee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                  <input
                    type="text"
                    value={editingSession.venue}
                    onChange={(e) => setEditingSession({...editingSession, venue: e.target.value})}
                    placeholder="e.g. Main Hall"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={editingSession.type}
                    onChange={(e) => setEditingSession({...editingSession, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Session">Session</option>
                    <option value="Keynote">Keynote</option>
                    <option value="Break">Break</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Save session:', editingSession);
                  setShowEditModal(false);
                }}
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