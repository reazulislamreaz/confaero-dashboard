import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Bold, Italic, Underline, Link2, List, ListOrdered, Upload, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { GrAnnounce } from 'react-icons/gr';

export default function NoticeAnnouncements() {
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [announcementImagePreview, setAnnouncementImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const announcements = [
    {
      id: 1,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    },
    {
      id: 2,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    },
    {
      id: 3,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    },
    {
      id: 4,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    },
    {
      id: 5,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    },
    {
      id: 6,
      date: 'April 12, 2023 at 22:22 PM',
      title: 'Last day registration Announcements',
      description: 'Official update from event by'
    }
  ];

  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = announcements.slice(startIndex, endIndex);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnnouncementImage(file);
        setAnnouncementImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateClick = () => {
    setEditingAnnouncement(null);
    setFormData({ title: '', description: '' });
    setAnnouncementImage(null);
    setAnnouncementImagePreview(null);
    setShowModal(true);
  };

  const handleEditClick = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      description: announcement.description
    });
    setAnnouncementImagePreview(null);
    setAnnouncementImage(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log('Delete announcement:', id);
  };

  const handleSubmit = () => {
    if (editingAnnouncement) {
      console.log('Update announcement:', formData);
    } else {
      console.log('Create announcement:', formData);
    }
    setShowModal(false);
    setFormData({ title: '', description: '' });
    setAnnouncementImage(null);
    setAnnouncementImagePreview(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: '', description: '' });
    setAnnouncementImage(null);
    setAnnouncementImagePreview(null);
  };

  return (
    <div className=" bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Notice announcements</h1>
            <p className="text-gray-500 text-sm">Manage User and profiles</p>
          </div>
          <button 
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Announcements
          </button>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {currentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                      <img className='mt-3' src="/public/image/ann.png" alt="" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{announcement.date}</div>
                      <h3 className="text-[22px] font-semibold text-gray-800 mb-1">{announcement.title}</h3>
                      <p className="text-sm text-gray-600">{announcement.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditClick(announcement)}
                      className="p-2 text-gray-400 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="6">6</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>of {announcements.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const page = index + 1;
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

      {/* Add/Edit Announcement Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingAnnouncement ? 'Edit announcement' : 'Add announcements'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Upload Image */}
              <div className="mb-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white relative">
                  {announcementImagePreview ? (
                    <div className="relative">
                      <img 
                        src={announcementImagePreview} 
                        alt="Announcement preview" 
                        className="max-h-32 mx-auto rounded"
                      />
                      <button
                        onClick={() => {
                          setAnnouncementImage(null);
                          setAnnouncementImagePreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-teal-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-teal-600 font-medium">Upload Image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Announcements Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcements Title
                </label>
                <input
                  type="text"
                  placeholder="Write your question here..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  Write at least 100 characters
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add your job description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm"
                />
                
                {/* Text Editor Toolbar */}
                <div className="flex items-center gap-2 mt-2 p-2 border-t border-gray-200">
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Bold">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Italic">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Underline">
                    <Underline className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Strikethrough">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M7 16h.01" />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Link">
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Bullet List">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-800" title="Numbered List">
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right text-xs text-gray-400 mt-1">
                  Write at least 300 characters
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6">
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}