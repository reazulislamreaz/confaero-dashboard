import React, { useState } from 'react';
import { Plus, Upload, Edit, Trash2, Eye, X, MapPin, User, Calendar, Clock } from 'lucide-react';

export default function EventAgendaBuilder() {
  const [activeTab, setActiveTab] = useState('Agenda Builder');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

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
    console.log('Add new session');
  };

  const handleUploadCSV = () => {
    console.log('Upload CSV');
  };

  const handleEdit = (session) => {
    console.log('Edit session:', session);
  };

  const handleDelete = (session) => {
    console.log('Delete session:', session);
  };

  const handleSaveChanges = () => {
    console.log('Save all changes');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Event Details & Agenda</h1>
          <p className="text-gray-500 text-sm">Configure event information, floor map, and create agenda</p>
        </div>

        {/* Tabs and Profile */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between border-b">
            <div className="flex">
              {['Event Info', 'Floor Map', 'Agenda Builder'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-white bg-teal-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pr-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Session Schedule */}
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
          <div className="space-y-4">
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
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Session:
                    </span>
                    <span className="text-gray-800 text-sm font-medium">{selectedSession.name}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time:
                    </span>
                    <span className="text-gray-800 text-sm">{selectedSession.time}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">Title:</span>
                    <span className="text-gray-800 text-sm font-medium">{selectedSession.title}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Venue:
                    </span>
                    <span className="text-gray-800 text-sm">{selectedSession.venue}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">Type:</span>
                    <span className={`text-sm font-medium ${getTypeColor(selectedSession.type)}`}>
                      {selectedSession.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Speaker Information */}
              {selectedSession.type !== 'Break' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Speaker Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                          alt="Speaker" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Dr. Sarah Johnson</div>
                        <div className="text-sm text-gray-600">Lead Researcher, Battery Tech Institute</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-gray-600 text-sm flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Email:
                      </span>
                      <span className="text-gray-800 text-sm">sarah.johnson@email.com</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedSession.type === 'Break' 
                    ? 'A networking opportunity for attendees to connect, enjoy refreshments, and explore the exhibition area. Light snacks and beverages will be provided.'
                    : 'This session will explore the latest advancements in battery technology, focusing on lithium-ion innovations and their applications in electric vehicles and renewable energy storage systems. Attendees will gain insights into current research, market trends, and future possibilities in the battery technology sector.'}
                </p>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Capacity:</span>
                    <span className="text-gray-800 text-sm">200 attendees</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Duration:</span>
                    <span className="text-gray-800 text-sm">90 minutes</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Category:</span>
                    <span className="text-gray-800 text-sm">Technical Session</span>
                  </div>
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
    </div>
  );
}