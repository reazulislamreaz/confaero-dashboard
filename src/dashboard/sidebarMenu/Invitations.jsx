import React, { useState } from 'react';
import { Search, Eye, Heart, Trash2, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const tabs = ['All', 'Speakers', 'Sponsors', 'Exhibitors', 'Volunteers', 'Reviewers', 'Track Chairs'];

  const invitations = [
    { name: 'Dr. Sarah Johnson', role: 'Speaker', email: 'sarah@email.com', status: 'Accepted', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Sponsors', email: 'sarah@email.com', status: 'Accepted', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Volunteers', email: 'sarah@email.com', status: 'Pending', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Exhibitors', email: 'sarah@email.com', status: 'Accepted', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Track Chairs', email: 'sarah@email.com', status: 'Rejected', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Reviewers', email: 'sarah@email.com', status: 'Pending', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Speaker', email: 'sarah@email.com', status: 'Accepted', date: '2026-01-10' },
    { name: 'Dr. Sarah Johnson', role: 'Speaker', email: 'sarah@email.com', status: 'Accepted', date: '2026-01-10' },
  ];

  const filteredInvitations = invitations.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || inv.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredInvitations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvitations = filteredInvitations.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'text-teal-600 bg-teal-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'Speaker': 'text-teal-600 bg-teal-50',
      'Sponsors': 'text-purple-600 bg-purple-50',
      'Volunteers': 'text-yellow-600 bg-yellow-50',
      'Exhibitors': 'text-blue-600 bg-blue-50',
      'Track Chairs': 'text-pink-600 bg-pink-50',
      'Reviewers': 'text-green-600 bg-green-50',
    };
    return colors[role] || 'text-gray-600 bg-gray-50';
  };

  const handleViewDetails = (invitation) => {
    setSelectedUser(invitation);
    setShowDetailsModal(true);
  };

  const handleDelete = (invitation) => {
    console.log('Delete invitation:', invitation);
  };

  const handleSendInvitation = () => {
    console.log('Send new invitation');
  };

  return (
    <div className="  bg-gray-50">
      <div className=" ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Invitations</h1>
            <p className="text-gray-500 text-sm">Send and manage invitations to event participants</p>
          </div>
          <button
            onClick={handleSendInvitation}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Send Invitation
          </button>
        </div>

        {/* Tabs */}
        
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invitations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentInvitations.map((invitation, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{invitation.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(invitation.role)}`}>
                        {invitation.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invitation.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invitation.status)}`}>
                        {invitation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invitation.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(invitation)}
                          className="p-1 text-gray-600 hover:text-teal-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:text-pink-600 transition-colors"
                          title="Favorite"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(invitation)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={9}>9</option>
                <option value={18}>18</option>
                <option value={27}>27</option>
                <option value={50}>50</option>
              </select>
              <span>of {filteredInvitations.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(Math.min(6, totalPages))].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded ${
                      currentPage === pageNum
                        ? 'bg-teal-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Invitation Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Name:</span>
                    <span className="text-gray-800 text-sm font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Email:</span>
                    <span className="text-gray-800 text-sm">{selectedUser.email}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Role:</span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invitation Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Invitation Status</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Status:</span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Sent Date:</span>
                    <span className="text-gray-800 text-sm">{selectedUser.date}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Response Date:</span>
                    <span className="text-gray-800 text-sm">{selectedUser.date}</span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Organization:</span>
                    <span className="text-gray-800 text-sm">Tech Solutions Inc.</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Phone:</span>
                    <span className="text-gray-800 text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Location:</span>
                    <span className="text-gray-800 text-sm">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  Invitation sent for the 18th Lithium Supply & Battery Raw Materials Conference. 
                  Participant has confirmed attendance and requested additional information about 
                  the venue and accommodation options.
                </p>
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
                  console.log('Resend invitation to:', selectedUser);
                  setShowDetailsModal(false);
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Resend Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}