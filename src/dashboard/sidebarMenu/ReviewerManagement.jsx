import React, { useState } from 'react';
import { Plus, Eye, X, FileText, Mail, ChevronLeft, ChevronRight, User, Edit2Icon, Edit } from 'lucide-react';

export default function ReviewerManagement() {
  const [activeTab, setActiveTab] = useState('Unassigned Files');
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);
  const [showFileDetailsModal, setShowFileDetailsModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([
    'Engineering of the F...',
    'Engineering of the F...',
    'Eng...'
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const reviewers = [
    {
      name: 'Dr. Sarah Wilson',
      email: 'sarah@email.com',
      assigned: 8,
      completed: 4,
      avgScore: 8.5,
      avatar: 'SW'
    },
    {
      name: 'Prof. Michael Lee',
      email: 'michael@email.com',
      assigned: 8,
      completed: 4,
      avgScore: 8.5,
      avatar: 'ML'
    },
    {
      name: 'Dr. Emily Chen',
      email: 'emily@email.com',
      assigned: 8,
      completed: 4,
      avgScore: 8.5,
      avatar: 'EC'
    },
    {
      name: 'Dr. James Park',
      email: 'james@email.com',
      assigned: 8,
      completed: 5,
      avgScore: 9.0,
      avatar: 'JP'
    }
  ];

  const files = [
    {
      id: 1,
      type: 'email',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    },
    {
      id: 2,
      type: 'pdf',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    },
    {
      id: 3,
      type: 'email',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    },
    {
      id: 4,
      type: 'pdf',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    },
    {
      id: 5,
      type: 'email',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    },
    {
      id: 6,
      type: 'pdf',
      title: 'Engineering of the FRB domain of the...',
      author: 'Dr. Sarah Wilson',
      submitted: 'Jun 20, 2026',
      due: 'Jun 22, 2026',
      fileType: 'PDF'
    }
  ];

  const tabs = ['Unassigned Files', 'Documents', 'Posters', 'Reported Files'];

  const totalPages = Math.ceil(files.length / itemsPerPage);

  const handleAddReviewer = () => {
    const reviewerData = {
      email: reviewerEmail,
      files: selectedFiles
    };
    console.log('Add Reviewer:', reviewerData);
    setShowAddReviewerModal(false);
    setReviewerEmail('');
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setShowFileDetailsModal(true);
  };

  const handleAssign = (file) => {
    console.log('Assign file:', file);
  };

  const removeFileTag = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="  bg-gray-50">
      <div className=" ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Reviewer Management</h1>
            <p className="text-gray-500 text-sm">Assign submission and track review progress</p>
          </div>
          <button
            onClick={() => setShowAddReviewerModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Reviewer
          </button>
        </div>

        {/* Reviewer Cards */}
        <div className="mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            {reviewers.map((reviewer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 min-w-60 flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-semibold">
                    <img className='' src="/public/image/review.png" alt="" />
                  </div>
                  <button className="text-gray-400 cursor-pointer hover:text-gray-600">
                     <Edit />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{reviewer.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{reviewer.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned</span>
                    <span className="font-medium text-gray-800">{reviewer.assigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-gray-800">{reviewer.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Score</span>
                    <span className="font-medium text-gray-800">{reviewer.avgScore}</span>
                  </div>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full" 
                    style={{ width: `${(reviewer.completed / reviewer.assigned) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex  ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-white rounded ml-2 bg-[#32A69A]'
                    : 'text-gray-600 border ml-2 border-gray-300 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full mt-2">
              <thead className="bg-[#D7EAE8]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">File type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Submitted</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Due</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        {file.type === 'email' ? (
                          <Mail className="w-5 h-5 text-gray-400" />
                        ) : (
                          <FileText className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{file.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.submitted}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{file.due}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewFile(file)}
                          className="text-gray-600 hover:text-teal-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAssign(file)}
                          className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                        >
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>
              <span>of 50</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded ${
                    currentPage === page
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Reviewer Modal */}
      {showAddReviewerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add Reviewer</h2>
              <button 
                onClick={() => setShowAddReviewerModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reviewer
                </label>
                <input
                  type="email"
                  placeholder="Enter Reviewer email"
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Files*
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedFiles.map((file, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm"
                    >
                      {file}
                      <button 
                        onClick={() => removeFileTag(index)}
                        className="hover:text-teal-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Enter files name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
                />
                <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              <button
                onClick={handleAddReviewer}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Details Modal */}
      {showFileDetailsModal && selectedFile && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">File Details</h2>
              <button 
                onClick={() => setShowFileDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">Title:</span>
                    <span className="text-gray-800 text-sm font-medium">{selectedFile.title}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Author:
                    </span>
                    <span className="text-gray-800 text-sm">{selectedFile.author}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">File Type:</span>
                    <span className="text-gray-800 text-sm">{selectedFile.fileType}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">Submitted:</span>
                    <span className="text-gray-800 text-sm">{selectedFile.submitted}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-600 text-sm">Due Date:</span>
                    <span className="text-gray-800 text-sm">{selectedFile.due}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Abstract</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  This research explores the engineering aspects of the FRB domain and its applications in modern battery technology. The study focuses on optimizing energy density and improving overall performance metrics in lithium-based battery systems.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Status</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Status:</span>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                      Pending Review
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-600 text-sm">Assigned To:</span>
                    <span className="text-gray-800 text-sm">Not Assigned</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowFileDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAssign(selectedFile);
                  setShowFileDetailsModal(false);
                }}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Assign Reviewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}