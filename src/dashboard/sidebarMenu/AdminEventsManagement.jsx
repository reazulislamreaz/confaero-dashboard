import React, { useState } from 'react';
import { Search, Calendar, MapPin, ExternalLink, Plus, Edit2, Trash2, Heart, X } from 'lucide-react';
import { TiPinOutline } from 'react-icons/ti';

export default function AdminEventManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recently');
  const [eventDate, setEventDate] = useState('Recently');
  const [condition, setCondition] = useState('Upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [organizerEmails, setOrganizerEmails] = useState(['example@email.com']);
  const [formData, setFormData] = useState({
    title: '',
    website: '',
    location: '',
    googleMapLink: '',
    startDate: '',
    endDate: '',
    expectedAttendee: '',
    boothSlot: '',
    details: ''
  });

  const events = [
    {
      id: 28,
      title: 'The 23rd International Meeting on Lithium Batteries (IMLB 2026)',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA',
      website: 'https://www.imlb.org/',
      expected: '245,000',
      organizers: 2,
      exhibitors: 19,
      image: '/public/image/event.png'
    },
    {
      id: 28,
      title: 'The 23rd International Meeting on Lithium Batteries (IMLB 2026)',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA',
      website: 'https://www.imlb.org/',
      expected: '245,000',
      organizers: 2,
      exhibitors: 19,
      image: '/public/image/event.png'
    },
    {
      id: 28,
      title: 'The 23rd International Meeting on Lithium Batteries (IMLB 2026)',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA',
      website: 'https://www.imlb.org/',
      expected: '245,000',
      organizers: 2,
      exhibitors: 19,
      image: '/public/image/event.png'
    }
  ];

  const addOrganizerEmail = () => {
    setOrganizerEmails([...organizerEmails, '']);
  };

  const removeOrganizerEmail = (index) => {
    setOrganizerEmails(organizerEmails.filter((_, i) => i !== index));
  };

  const handleCreateEvent = () => {
    console.log('Creating event:', formData, organizerEmails);
    setShowCreateModal(false);
    setFormData({
      title: '',
      website: '',
      location: '',
      googleMapLink: '',
      startDate: '',
      endDate: '',
      expectedAttendee: '',
      boothSlot: '',
      details: ''
    });
    setOrganizerEmails(['example@email.com']);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Event Management</h1>
            <p className="text-sm text-gray-600">Create event, assign to Organizer and Manage Event</p>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Event name or event date"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Created</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option>Recently</option>
                <option>Oldest</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event date</label>
              <select
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option>Recently</option>
                <option>This Month</option>
                <option>Next Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg border border-[#32A69A] h-48 shadow-sm overflow-hidden">
              <div className="flex items-start gap-4 p-5">
                {/* Event Image */}
                <div className="flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-48 h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 border-r border-[#32A69A] px-2">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <span className="text-sm text-gray-500">ID: {event.id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-blue-600">{event.website}</span>
                        </div>
                      </div>
                    </div>
                  
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-8 text-sm mt-20">
                    <div>
                      <span className="text-gray-500">Expected</span>
                      <span className="ml-2 font-semibold text-gray-900">{event.expected}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Organizer</span>
                      <span className="ml-2 font-semibold text-gray-900">{event.organizers}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Exhibitors</span>
                      <span className="ml-2 font-semibold text-gray-900">{event.exhibitors}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                      <button className="text-gray-400 hover:text-red-500 flex justify-end transition-colors">
                     <TiPinOutline className="w-6 h-6 cursor-pointer" />
                    </button>
                  <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap">
                    View Overview
                  </button>
                  <div className="flex gap-2 mt-6">
                    <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Create Event</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Website</label>
                  <input
                    type="url"
                    placeholder="https://www.lnfb.org/"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Mail</label>
                  <div className="space-y-2">
                    {organizerEmails.map((email, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded text-sm text-gray-700 flex items-center justify-between">
                          <span>{email || 'example@email.com'}</span>
                          <button 
                            onClick={() => removeOrganizerEmail(index)}
                            className="text-gray-400 hover:text-gray-600 ml-2"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <input
                      type="email"
                      placeholder="Enter organizer mail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button 
                      onClick={addOrganizerEmail}
                      className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1"
                    >
                      <span className="text-lg">+</span> Add
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location/Venue</label>
                    <input
                      type="text"
                      placeholder="Las Vegas, USA"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google map link</label>
                    <input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      value={formData.googleMapLink}
                      onChange={(e) => setFormData({...formData, googleMapLink: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected attendee</label>
                    <input
                      type="number"
                      placeholder="10,000"
                      value={formData.expectedAttendee}
                      onChange={(e) => setFormData({...formData, expectedAttendee: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Booth Slot</label>
                    <input
                      type="number"
                      placeholder="10"
                      value={formData.boothSlot}
                      onChange={(e) => setFormData({...formData, boothSlot: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea
                    placeholder="Enter details"
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                <button 
                  onClick={handleCreateEvent}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}