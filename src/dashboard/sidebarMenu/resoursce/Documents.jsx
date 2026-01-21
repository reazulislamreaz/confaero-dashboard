import React, { useState } from 'react';
import { Upload, Search, Filter, Trash2, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function DocumentManagement() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showUploadModal, setShowUploadModal] = useState(false); // 👈 Modal State

  const documents = [
    {
      id: 1,
      name: 'Senior Software Engineer',
      uploadedBy: 'Organizer',
      status: 'Approved',
      type: 'Abstracts',
      date: '2026/01/10'
    },
    {
      id: 2,
      name: 'Senior Software Engineer',
      uploadedBy: 'Speaker',
      status: 'Rejected',
      type: 'Booklet',
      date: '2026/01/10'
    },
    {
      id: 3,
      name: 'Senior Software Engineer',
      uploadedBy: 'Speaker',
      status: 'Approved',
      type: 'Floor maps',
      date: '2026/01/10'
    },
    {
      id: 4,
      name: 'Junior Software Engineer',
      uploadedBy: 'Organizer',
      status: 'Approved',
      type: 'Workshops',
      date: '2026/01/11'
    },
    {
      id: 5,
      name: 'Junior Software Engineer',
      uploadedBy: 'Speaker',
      status: 'Pending',
      type: 'Panels',
      date: '2026/01/11'
    },
    {
      id: 6,
      name: 'Lead Software Engineer',
      uploadedBy: 'Speaker',
      status: 'Approved',
      type: 'Demos',
      date: '2026/01/12'
    },
    {
      id: 7,
      name: 'Senior Software Engineer',
      uploadedBy: 'Moderator',
      status: 'Approved',
      type: 'Q&A',
      date: '2026/01/12'
    },
    {
      id: 8,
      name: 'Frontend Developer',
      uploadedBy: 'Speaker',
      status: 'Rejected',
      type: 'Posters',
      date: '2026/01/13'
    },
    {
      id: 9,
      name: 'Backend Developer',
      uploadedBy: 'Organizer',
      status: 'Approved',
      type: 'Networking',
      date: '2026/01/14'
    },
    {
      id: 10,
      name: 'Data Scientist',
      uploadedBy: 'Speaker',
      status: 'Approved',
      type: 'Research papers',
      date: '2026/01/15'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-teal-600';
      case 'Rejected':
        return 'text-red-600';
      case 'Pending':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getUploadedByBadge = (role) => {
    switch (role) {
      case 'Organizer':
        return 'bg-gray-100 text-gray-700';
      case 'Speaker':
        return 'bg-blue-100 text-blue-700';
      case 'Moderator':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === 'All' || doc.status === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

  const handleDelete = (id) => {
    console.log('Delete document:', id);
  };

  const handleView = (id) => {
    console.log('View document:', id);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log('Document uploaded!');
    setShowUploadModal(false); // Close modal after submit
  };

  // --- Upload Modal Component ---
  const UploadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Document</h2>
          <button
            onClick={() => setShowUploadModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleUploadSubmit}>
          {/* Document Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="Events"
            >
              <option value="Events">Events</option>
              <option value="Abstracts">Abstracts</option>
              <option value="Booklet">Booklet</option>
              <option value="Floor maps">Floor maps</option>
              <option value="Workshops">Workshops</option>
              <option value="Panels">Panels</option>
              <option value="Demos">Demos</option>
              <option value="Q&A">Q&A</option>
              <option value="Posters">Posters</option>
              <option value="Networking">Networking</option>
              <option value="Research papers">Research papers</option>
            </select>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-teal-300 rounded-lg p-6 mb-4 text-center cursor-pointer hover:bg-teal-50 transition-colors">
            <div className="w-8 h-8 mx-auto mb-2 text-teal-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <p className="text-sm text-teal-600 font-medium">Upload Document</p>
            <input type="file" className="hidden" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Documents</h1>
          <p className="text-gray-500 text-sm">Upload and manage event documents</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3">
              {['All', 'Pending'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-[#5BB8AE] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUploadModal(true)} // 👈 Open Modal
              className="flex items-center gap-2 px-6 py-2 bg-[#5BB8AE] text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by document name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Document Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Uploaded by</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-800">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getUploadedByBadge(doc.uploadedBy)}`}>
                        {doc.uploadedBy}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-800">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{doc.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleView(doc.id)}
                          className="p-1 text-gray-600 hover:text-teal-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
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
                <option value="6">6</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>of {filteredDocuments.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-1 text-gray-400">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}
    </div>
  );
}