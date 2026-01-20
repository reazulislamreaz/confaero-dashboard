import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Calendar, MapPin, Search } from 'lucide-react';

const VolunteerManagementPage = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [expandedVolunteerId, setExpandedVolunteerId] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock Data
  const volunteers = [
    {
      id: 1,
      name: "Alice Cooper",
      role: "Registration Desk",
      status: "Pending",
      reportsCount: 0,
      reports: [],
    },
    {
      id: 2,
      name: "Alice Cooper",
      role: "Registration Desk",
      status: "Completed",
      reportsCount: 1,
      reports: [
        {
          id: 1,
          title: "Day 1 Registration Report",
          summary: "Successfully registered 120 attendees on day 1.",
          date: "2026-06-22",
        },
      ],
    },
    {
      id: 3,
      name: "Alice Cooper",
      role: "Registration Desk",
      status: "Completed",
      reportsCount: 2,
      reports: [
        {
          id: 1,
          title: "Day 1 Registration Report",
          summary: "Successfully registered 120 attendees on day 1.",
          date: "2026-06-22",
        },
        {
          id: 2,
          title: "Day 1 Registration Report",
          summary: "Successfully registered 120 attendees on day 1.",
          date: "2026-06-22",
        },
      ],
    },
  ];

  // Handlers
  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  const handleToggleExpand = (id) => {
    setExpandedVolunteerId(expandedVolunteerId === id ? null : id);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseReportModal = () => {
    setSelectedReport(null);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    alert("Task submitted!"); // Replace with API call
    setShowAddTaskModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Volunteer Management</h1>
          <p className="text-sm text-gray-600">Assign tasks and view reports</p>
        </div>
        <button
          onClick={handleAddTaskClick}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <span>+</span> Assign Task
        </button>
      </div>

      {/* Volunteers List */}
      <div className="space-y-4">
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Volunteer Header */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                <p className="text-sm text-gray-700">{volunteer.role}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    volunteer.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {volunteer.status}
                  </span>
                  <span className="text-xs text-gray-500">• {volunteer.reportsCount} Reports submitted</span>
                </div>
              </div>
              <button
                onClick={() => handleToggleExpand(volunteer.id)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedVolunteerId === volunteer.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Expanded Section */}
            {expandedVolunteerId === volunteer.id && (
              <div className="border-t border-gray-200 p-4 pt-3">
                <h4 className="text-sm font-medium text-gray-800 mb-3">Recent Reports</h4>
                {volunteer.reports.length > 0 ? (
                  volunteer.reports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-teal-50 border border-teal-200 rounded-md p-3 mb-3 flex justify-between items-start"
                    >
                      <div>
                        <h5 className="font-semibold text-gray-900 text-sm">{report.title}</h5>
                        <p className="text-xs text-gray-700 mt-1 line-clamp-2">{report.summary}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                      </div>
                      <button
                        onClick={() => handleViewReport(report)}
                        className="text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded border border-teal-300"
                      >
                        View Reports
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No reports yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination (Optional) */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div>Showing <select className="mx-1 border rounded px-1"><option>6</option></select> of 50</div>
        <div className="flex gap-1">
          <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded">1</button>
          <button className="px-2 py-1 border border-gray-300 rounded">2</button>
          <button className="px-2 py-1 border border-gray-300 rounded">3</button>
          <button className="px-2 py-1 border border-gray-300 rounded">4</button>
          <button className="px-2 py-1 border border-gray-300 rounded">5</button>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Add Task Photo</h2>
                <button
                  onClick={handleCloseAddTaskModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitTask}>
                {/* Upload Image */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Upload Image</p>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Search by email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Task Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    defaultValue="Manage Registration Desk"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Task Time & Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Time</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="00:00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="dd/mm/yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="Booth B, North Wing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Task Instruction */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Instruction: *</label>
                  <textarea
                    placeholder="Add your job description..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  ></textarea>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">B</button>
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">I</button>
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">U</button>
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">S</button>
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">🔗</button>
                    <button type="button" className="px-1 py-0.5 border border-gray-300 rounded">☰</button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-medium transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Report Details</h2>
                <button
                  onClick={handleCloseReportModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-md p-4">
                <h3 className="font-semibold text-gray-900">{selectedReport.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{selectedReport.summary}</p>
                <p className="text-xs text-gray-500 mt-2">{selectedReport.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerManagementPage;