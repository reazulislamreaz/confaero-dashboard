import React, { useState } from 'react';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserDetailsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
 const navigate = useNavigate();
  const userDetails = {
    name: 'Abdur Khan',
    phone: '+19297829204',
    email: 'example@gmail.com',
    location: 'Dhaka, Bngladesh',
    linkedin: 'Albert Flamingo',
    social: 'Albert Flamingo',
    webpage: 'Albert Flamingo',
    bio: 'Researcher with a strong interest in data analysis, user behavior, and technology-driven solutions. Focused on delivering practical insights through structured research and experimentation. Focused on delivering practical insights through structured research',
    education: {
      school: 'Green Valley High School',
      degree: 'Bachelor of Science (BSc)',
      major: 'Computer Science',
      from: 'January 12, 2020',
      to: 'January 12, 2025'
    },
    affiliation: {
      company: 'Company 12',
      position: 'Researcher',
      from: 'January 12, 2025',
      to: '•••••••'
    },
    userDetails: {
      role: 'Attendee',
      join: 'January 12, 2025'
    },
    resume: {
      filename: 'Father Howard',
      format: 'PDF'
    }
  };

  const handleBack = () => {
    navigate(-1)
  };

  const handleDownloadResume = () => {
    console.log('Download resume:', userDetails.resume);
  };

  const handleSuspend = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('User suspended/deleted');
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span  className="font-medium">Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Contact Details and Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left: Contact Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h2>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-teal-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {userDetails.name}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {userDetails.phone}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {userDetails.email}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {userDetails.location}
                  </div>
                  <div>
                    <span className="font-medium">Linkedin:</span> {userDetails.linkedin}
                  </div>
                  <div>
                    <span className="font-medium">Social:</span> {userDetails.social}
                  </div>
                  <div>
                    <span className="font-medium">Webpage:</span> {userDetails.webpage}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Bio:</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {userDetails.bio}
              </p>
            </div>
          </div>

          {/* Education and Affiliation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Education Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Education Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">School</div>
                  <div className="text-gray-800">{userDetails.education.school}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Degree</div>
                  <div className="text-gray-800">{userDetails.education.degree}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Major</div>
                  <div className="text-gray-800">{userDetails.education.major}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">From</div>
                  <div className="text-gray-800">{userDetails.education.from}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">To</div>
                  <div className="text-gray-800">{userDetails.education.to}</div>
                </div>
              </div>
            </div>

            {/* Affiliation Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Affiliation Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Company</div>
                  <div className="text-gray-800">{userDetails.affiliation.company}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Position Title</div>
                  <div className="text-gray-800">{userDetails.affiliation.position}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">From</div>
                  <div className="text-gray-800">{userDetails.affiliation.from}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">To</div>
                  <div className="text-gray-800">{userDetails.affiliation.to}</div>
                </div>
              </div>
            </div>
          </div>

          {/* User Details and Resume Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">User Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Role</div>
                  <div className="text-gray-800">{userDetails.userDetails.role}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Join</div>
                  <div className="text-gray-800">{userDetails.userDetails.join}</div>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume</h2>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-1">Download Resume</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{userDetails.resume.filename}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{userDetails.resume.format}</span>
                  </div>
                </div>
                <button 
                  onClick={handleDownloadResume}
                  className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Suspend Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700">Would you like to Suspend this </span>
                <span className="text-teal-600 font-medium">Attendee</span>
                <span className="text-gray-700"> ?</span>
              </div>
              <button 
                onClick={handleSuspend}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Suspension</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to suspend this user? This action can be reversed later.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirm Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}