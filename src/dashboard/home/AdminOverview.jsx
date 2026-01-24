import React, { useState } from 'react';
import { Calendar, MapPin, Users, UserPlus, TrendingUp, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function DashboardOverview() {
  const [selectedMonth, setSelectedMonth] = useState('Monthly');
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const featuredEvents = [
    {
      id: 1,
      title: '18th Lithium Supply & Battery Raw Materials Conference',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA'
    },
    {
      id: 2,
      title: 'Global Tech Summit 2026',
      date: 'Jul 15-18, 2026',
      location: 'San Francisco, USA'
    },
    {
      id: 3,
      title: 'International Energy Conference',
      date: 'Aug 10-13, 2026',
      location: 'New York, USA'
    }
  ];

  const stats = [
    { label: 'Total Events', value: '2K', icon: Calendar },
    { label: 'Ongoing Events', value: '2K', icon: TrendingUp },
    { label: 'Total Organizers', value: '81', icon: Users },
    { label: 'Total Participants', value: '102K', icon: UserPlus }
  ];

  const recentEvents = [
    {
      id: 1,
      title: '18th Lithium Supply & Battery Raw Materials Confer...',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA'
    },
    {
      id: 2,
      title: '18th Lithium Supply & Battery Raw Materials Confer...',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA'
    },
    {
      id: 3,
      title: '18th Lithium Supply & Battery Raw Materials Confer...',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA'
    }
  ];

  const latestOrganizers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      event: '18th Lithium Supply & Battery Raw Materials Conference',
      date: 'Jun 22-25, 2026'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      event: '18th Lithium Supply & Battery Raw Materials Conference',
      date: 'Jun 22-25, 2026'
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      event: '18th Lithium Supply & Battery Raw Materials Conference',
      date: 'Jun 22-25, 2026'
    }
  ];

  const monthlyData = [
    { label: 'Jan', events: 2500 },
    { label: 'Feb', events: 3800 },
    { label: 'Mar', events: 4200 },
    { label: 'Apr', events: 5000 },
    { label: 'May', events: 3600 },
    { label: 'Jun', events: 4800 },
    { label: 'Jul', events: 5500 }
  ];

  const weeklyData = [
    { label: 'W1', events: 580 },
    { label: 'W2', events: 920 },
    { label: 'W3', events: 750 },
    { label: 'W4', events: 1100 },
    { label: 'W5', events: 650 },
    { label: 'W6', events: 980 },
    { label: 'W7', events: 1200 }
  ];

  const yearlyData = [
    { label: '2020', events: 15000 },
    { label: '2021', events: 22000 },
    { label: '2022', events: 28000 },
    { label: '2023', events: 35000 },
    { label: '2024', events: 32000 },
    { label: '2025', events: 38000 },
    { label: '2026', events: 42000 }
  ];

  const getData = () => {
    switch(selectedMonth) {
      case 'Weekly':
        return weeklyData;
      case 'Yearly':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const getYAxisTicks = () => {
    switch(selectedMonth) {
      case 'Weekly':
        return [0, 200, 400, 600, 800, 1000, 1200];
      case 'Yearly':
        return [0, 10000, 20000, 30000, 40000, 50000];
      default:
        return [0, 1000, 2000, 3000, 4000, 5000, 6000];
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg rounded border border-gray-200">
          <p className="text-sm font-medium text-gray-900">
            {payload[0].value.toLocaleString()} events
          </p>
        </div>
      );
    }
    return null;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

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
      <div className=" ">
        {/* Featured Event Slider */}
        <div className="bg-teal-600 rounded-lg shadow-lg mb-6 relative overflow-hidden">
          <div className="p-8 mx-6 relative z-10">
            <h1 className="text-2xl font-bold text-white mb-3">
              {featuredEvents[currentSlide].title}
            </h1>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{featuredEvents[currentSlide].date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{featuredEvents[currentSlide].location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 w-10 h-10 bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6 " />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 w-10 h-10 bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-white opacity-5 rounded-full -mb-20"></div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <stat.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 px-5 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Create Events</span>
            </button>
            <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Assign Organizer</span>
            </button>
          </div>
        </div>

        {/* Chart Section with Recharts */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-normal text-gray-700">New Events Trend</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={getData()} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="49%" stopColor="#14b8a6" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis 
                dataKey="label" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                dy={5}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                ticks={getYAxisTicks()}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#5eead4', strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="events" 
                stroke="#5eead4" 
                strokeWidth={2}
                fill="url(#colorEvents)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">Recent Events</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-800 flex-1 pr-3">
                      {event.title}
                    </h3>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium whitespace-nowrap">
                      View
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Organizers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">Latest Organizer</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {latestOrganizers.map((organizer) => (
                <div key={organizer.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 pr-3">
                      <h3 className="text-sm font-medium text-gray-800 mb-1">
                        {organizer.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{organizer.event}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{organizer.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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