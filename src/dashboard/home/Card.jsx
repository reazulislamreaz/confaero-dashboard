import React, { useState } from 'react';
import { X, Upload, Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered, Calendar, MapPin, User, CheckSquare, FileText, Store, Megaphone, Users, CheckCircle } from 'lucide-react';
import { useGetEventQuery } from '../../redux/features/eventSlice/eventSlice';

export default function ConferenceDashboard() {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showReviewerModal, setShowReviewerModal] = useState(false);
  
  // Announcement form state
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcementImage, setAnnouncementImage] = useState(null);
  
   const { data: eventResponse, isLoading, isError } = useGetEventQuery();
   
   console.log(eventResponse)

  // Reviewer form state
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([
    'Engineering of the F...',
    'Engineering of the F...',
    'Eng...'
  ]);

  const stats = [
    { icon: <User className="w-6 h-6" />, value: '2K', label: 'Total Registrations' },
    { icon: <CheckSquare className="w-6 h-6" />, value: '0', label: 'Checked In Attendees' },
    { icon: <FileText className="w-6 h-6" />, value: '102', label: 'Pending Abstract Reviews' },
    { icon: <Store className="w-6 h-6" />, value: '8', label: 'Pending Exhibitor Requests' }
  ];

  const actions = [
    { icon: <Megaphone className="w-5 h-5" />, label: 'Create Announcement', onClick: () => setShowAnnouncementModal(true) },
    { icon: <Users className="w-5 h-5" />, label: 'Assign Reviewer', onClick: () => setShowReviewerModal(true) },
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Approve Exhibitor', onClick: () => {} }
  ];

  const handleAnnouncementSubmit = () => {
    const formData = {
      title: announcementTitle,
      description: announcementDescription,
      image: announcementImage
    };
    console.log('Announcement Form Data:', formData);
    
    // Reset form
    setAnnouncementTitle('');
    setAnnouncementDescription('');
    setAnnouncementImage(null);
    setShowAnnouncementModal(false);
  };

  const handleReviewerAssign = () => {
    const formData = {
      reviewerEmail: reviewerEmail,
      selectedFiles: selectedFiles
    };
    console.log('Reviewer Form Data:', formData);
    
    // Reset form
    setReviewerEmail('');
    setShowReviewerModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnnouncementImage(file.name);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="  bg-gray-50 p-6">
      <div className=" ">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-teal-600 text-white p-6">
            <h1 className="text-2xl font-semibold mb-3">
              18th Lithium Supply & Battery Raw Materials Conference
            </h1>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Jun 22-25, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Las Vegas, USA</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-gray-400">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="flex items-center justify-center gap-2 h-12 border border-gray-300 rounded hover:border-teal-500 hover:text-teal-500 transition-colors bg-white"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/80  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add announcements</h2>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
                <input 
                  type="file" 
                  id="imageUpload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <span className="text-teal-600 text-sm">Upload Image</span>
                </label>
                {announcementImage && (
                  <p className="text-xs text-gray-500 mt-2">{announcementImage}</p>
                )}
              </div>

              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcements Title
                </label>
                <input
                  type="text"
                  placeholder="Write your question here..."
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-xs text-teal-600 text-right mt-1">
                  Write at least 100 characters.
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add your job description..."
                  value={announcementDescription}
                  onChange={(e) => setAnnouncementDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-24"
                />
                
                {/* Formatting Toolbar */}
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <button className="p-1 hover:text-gray-700"><Bold className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><Italic className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><Underline className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><Strikethrough className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><Link className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><List className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-gray-700"><ListOrdered className="w-4 h-4" /></button>
                </div>
                <p className="text-xs text-teal-600 text-right mt-1">
                  Write at least 1000 characters.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAnnouncementSubmit}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviewer Modal */}
      {showReviewerModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add Reviewer</h2>
              <button 
                onClick={() => setShowReviewerModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {/* Reviewer Email */}
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

              {/* Files */}
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
                        onClick={() => removeFile(index)}
                        className="hover:text-teal-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Enter free name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
                />
                <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium">
                  <span className="text-lg">+</span> Add
                </button>
              </div>

              {/* Assign Button */}
              <button
                onClick={handleReviewerAssign}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}