import React, { useState } from 'react';
import { Calendar, MapPin, Users, UserPlus, TrendingUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DashboardOverview() {
  const [selectedMonth, setSelectedMonth] = useState('Monthly');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Featured Event Slider */}
        <div className="bg-teal-600 rounded-lg shadow-lg mb-6 relative overflow-hidden">
          <div className="p-8 relative z-10">
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-white opacity-5 rounded-full -mb-20"></div>
          
          {/* Slide Indicators */}
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
            <button className="flex items-center gap-3 px-5 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
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

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-800">New Events Trend</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          {/* SVG Area Chart */}
          <div className="relative w-full h-64">
            <svg viewBox="0 0 600 250" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Y-axis grid lines and labels */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="60" x2="580" y2="60" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="100" x2="580" y2="100" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="140" x2="580" y2="140" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="40" y1="220" x2="580" y2="220" stroke="#f0f0f0" strokeWidth="1" />

              <text x="10" y="25" fontSize="11" fill="#999">6,000</text>
              <text x="10" y="65" fontSize="11" fill="#999">5,000</text>
              <text x="10" y="105" fontSize="11" fill="#999">4,000</text>
              <text x="10" y="145" fontSize="11" fill="#999">3,000</text>
              <text x="10" y="185" fontSize="11" fill="#999">2,000</text>
              <text x="10" y="225" fontSize="11" fill="#999">1,000</text>

              {/* Area path - smooth curve */}
              <path
                d="M 50,160 Q 120,120 140,100 T 230,80 Q 280,60 320,50 T 410,90 Q 460,110 500,60 T 570,40"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Filled area */}
              <path
                d="M 50,160 Q 120,120 140,100 T 230,80 Q 280,60 320,50 T 410,90 Q 460,110 500,60 T 570,40 L 570,220 L 50,220 Z"
                fill="url(#chartGradient)"
              />

              {/* Data points */}
              <circle cx="50" cy="160" r="5" fill="#14b8a6" />
              <circle cx="140" cy="100" r="5" fill="#14b8a6" />
              <circle cx="230" cy="80" r="5" fill="#14b8a6" />
              <circle cx="320" cy="50" r="5" fill="#14b8a6" />
              <circle cx="410" cy="90" r="5" fill="#14b8a6" />
              <circle cx="500" cy="60" r="5" fill="#14b8a6" />
              <circle cx="570" cy="40" r="5" fill="#14b8a6" />

              {/* X-axis labels */}
              <text x="40" y="240" fontSize="11" fill="#666">Jan</text>
              <text x="130" y="240" fontSize="11" fill="#666">Feb</text>
              <text x="220" y="240" fontSize="11" fill="#666">Mar</text>
              <text x="310" y="240" fontSize="11" fill="#666">Apr</text>
              <text x="400" y="240" fontSize="11" fill="#666">May</text>
              <text x="490" y="240" fontSize="11" fill="#666">Jun</text>
              <text x="560" y="240" fontSize="11" fill="#666">Jul</text>
            </svg>
          </div>
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
      </div>
    </div>
  );
}