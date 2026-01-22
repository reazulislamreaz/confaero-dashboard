import React, { useState } from 'react';
import { Calendar, MapPin, Users, UserPlus, TrendingUp, Eye } from 'lucide-react';

export default function DashboardOverview() {
  const [selectedMonth, setSelectedMonth] = useState('Monthly');

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
      location: 'Las Vegas, USA',
      organizer: 'Dr. Sarah Johnson',
      organizerRole: '18th Lithium Supply & Battery Raw Materials Conference'
    },
    {
      id: 2,
      title: '18th Lithium Supply & Battery Raw Materials Confer...',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA',
      organizer: 'Dr. Sarah Johnson',
      organizerRole: '18th Lithium Supply & Battery Raw Materials Conference'
    },
    {
      id: 3,
      title: '18th Lithium Supply & Battery Raw Materials Confer...',
      date: 'Jun 22-25, 2026',
      location: 'Las Vegas, USA',
      organizer: 'Dr. Sarah Johnson',
      organizerRole: '18th Lithium Supply & Battery Raw Materials Conference'
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

  // Chart data points for the area chart
  const chartData = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 3500 },
    { month: 'Mar', value: 2800 },
    { month: 'Apr', value: 4200 },
    { month: 'May', value: 3800 },
    { month: 'Jun', value: 5200 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const chartHeight = 200;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Event Header Banner */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-lg shadow-sm p-6 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-white mb-2">
              18th Lithium Supply & Battery Raw Materials Conference
            </h1>
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Jun 22-25, 2026</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Las Vegas, USA</span>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-white opacity-5 rounded-full -mb-20"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Create Events</span>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Assign Organizer</span>
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">New Events Trend</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>

          {/* Area Chart */}
          <div className="relative" style={{ height: `${chartHeight}px` }}>
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="100%"
                  y2={i * 40}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              {[5000, 4000, 3000, 2000, 1000, 0].map((value, i) => (
                <text
                  key={i}
                  x="0"
                  y={i * 40 + 5}
                  fontSize="12"
                  fill="#999"
                >
                  {value}
                </text>
              ))}

              {/* Area path */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <path
                d={`M 60,${chartHeight - (chartData[0].value / maxValue) * chartHeight} 
                   ${chartData.map((d, i) => 
                     `L ${60 + (i * (100 / (chartData.length - 1)))}%,${chartHeight - (d.value / maxValue) * chartHeight}`
                   ).join(' ')}
                   L ${60 + ((chartData.length - 1) * (100 / (chartData.length - 1)))}%,${chartHeight}
                   L 60,${chartHeight} Z`}
                fill="url(#areaGradient)"
              />

              {/* Line path */}
              <path
                d={`M 60,${chartHeight - (chartData[0].value / maxValue) * chartHeight} 
                   ${chartData.map((d, i) => 
                     `L ${60 + (i * (100 / (chartData.length - 1)))}%,${chartHeight - (d.value / maxValue) * chartHeight}`
                   ).join(' ')}`}
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
              />

              {/* Data points */}
              {chartData.map((d, i) => (
                <circle
                  key={i}
                  cx={`${60 + (i * (100 / (chartData.length - 1)))}%`}
                  cy={chartHeight - (d.value / maxValue) * chartHeight}
                  r="4"
                  fill="#14b8a6"
                />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 px-12">
              {chartData.map((d, i) => (
                <span key={i} className="text-xs text-gray-600">{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Events</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
            </div>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="pb-4 border-b last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 flex-1 pr-4">
                      {event.title}
                    </h3>
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      View
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Latest Organizer</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
            </div>
            <div className="space-y-4">
              {latestOrganizers.map((organizer) => (
                <div key={organizer.id} className="pb-4 border-b last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        {organizer.name}
                      </h3>
                      <p className="text-xs text-gray-600">{organizer.event}</p>
                    </div>
                    <span className="text-xs text-gray-500">{organizer.date}</span>
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