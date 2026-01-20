import React, { useState } from 'react';
import { LayoutGrid, Check, X, Download, Globe, Mail, ChevronRight, Building2, Clock, Tag, FileText, CheckCircle, XCircle } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

export default function ExhibitorsSponsors() {
  const [activeTab, setActiveTab] = useState('Exhibitors');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const exhibitors = [
    { id: 1, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Approved', booth: 'A-12', offer: '20% Off Annual Plan' },
    { id: 2, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Approved', booth: 'A-12', offer: '20% Off Annual Plan' },
    { id: 3, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Approved', booth: 'A-12', offer: '20% Off Annual Plan' },
    { id: 4, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Pending', booth: 'B-05', offer: '20% Off Annual Plan' },
    { id: 5, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Pending', booth: 'B-08', offer: '20% Off Annual Plan' },
    { id: 6, name: 'InnovateLab', subtitle: 'Hardware Solutions', status: 'Pending', booth: 'C-15', offer: '20% Off Annual Plan' }
  ];

  const sponsors = [
    { id: 1, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' },
    { id: 2, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' },
    { id: 3, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' },
    { id: 4, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' },
    { id: 5, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' },
    { id: 6, name: 'Tesla Energy', status: 'Pending', description: 'Lorem Ipsum is simply dummy text of the...' }
  ];

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleApprove = (item) => {
    console.log('Approve:', item);
  };

  const handleReject = (item) => {
    console.log('Reject:', item);
  };

  const currentData = activeTab === 'Exhibitors' ? exhibitors : sponsors;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Exhibitors & Sponsors</h1>
          <p className="text-sm text-gray-500">Manage exhibitor and sponsor profiles</p>
        </div>

        {/* Tabs and Counter */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('Exhibitors')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'Exhibitors'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Exhibitors
            </button>
            <button
              onClick={() => setActiveTab('Sponsors')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'Sponsors'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sponsors
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <LayoutGrid className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">10</span>
          </div>
        </div>

        {/* Exhibitors Grid */}
{activeTab === 'Exhibitors' && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {exhibitors.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl overflow-hidden flex flex-col"
      >
        {/* Full Background Image with Overlay */}
        <div className="relative h-32 w-full">
          <img
            src="/public/image/exi.jpg"
            alt="Office"
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Status Badge - Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                item.status === 'Approved'
                  ? 'bg-green-500 text-white'
                  : item.status === 'Pending'
                  ? 'bg-yellow-400 text-gray-800'
                  : 'bg-red-400 text-gray-800'
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Text Content Over Image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-base mb-1">{item.name}</h3>
            <p className="text-sm mb-2">{item.subtitle}</p>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4" />
              <span>{item.booth || '—'}</span>
            </div>
          </div>
        </div>

        {/* Special Offer Section (White Background Below Image) */}
        <div className="px-4 py-3 bg-[#EBF6F5] mt-3 border border-[#D2D2D2] rounded">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-teal-600 font-bold uppercase">SPECIAL OFFER</div>
              <div className="text-sm font-semibold text-gray-900">{item.offer}</div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar: View Details + Approve/Reject */}
        <div className=" py-2 bg-white border-t  border-gray-200 flex items-center justify-between gap-2">
          <button
            onClick={() => handleViewDetails(item)}
            className="flex-1 py-2 text-center cursor-pointer border border-[#D2D2D2] rounded text-sm font-medium text-gray-700 hover:text-gray-900  transition-colors"
          >
            View Details
          </button>

          {/* Show Approve/Reject Buttons Only if Pending */}
          {item.status === 'Pending' && (
            <>
              <button
                onClick={() => handleApprove(item.id)}
                className="p-1.5 hover:bg-green-100 border cursor-pointer border-[#D2D2D2] rounded"
              >
                <FaCheck className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleReject(item.id)}
                className="p-1.5 text-red-600 hover:bg-red-100 border cursor-pointer border-[#D2D2D2] rounded"
              >
               <RxCross2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
)}

        {/* Sponsors Grid */}
        {activeTab === 'Sponsors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sponsors.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Card Content */}
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    {/* Avatar */}
                    <img src="/public/image/review.png" alt="" />
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                    </div>

                    {/* Status Badge */}
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400 text-gray-800 whitespace-nowrap">
                      {item.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="flex-1 text-sm border border-[#D2D2D2] rounded font-medium text-gray-700 hover:text-gray-900 py-1.5"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApprove(item)}
                      className="w-9 h-9 flex items-center border border-[#D2D2D2] rounded justify-center text-green-600 hover:bg-green-50  transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(item)}
                      className="w-9 h-9 flex items-center justify-center text-red-600 hover:bg-red-50 border border-[#D2D2D2] rounded transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header with Image */}
            <div className="relative">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {activeTab === 'Exhibitors' ? (
                <div className="h-44 bg-gradient-to-br from-purple-300 via-purple-200 to-purple-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path d="M0,100 Q100,50 200,100 T400,100" fill="none" stroke="white" strokeWidth="40" opacity="0.3"/>
                      <path d="M0,120 Q100,70 200,120 T400,120" fill="none" stroke="white" strokeWidth="30" opacity="0.2"/>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="h-44 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl transform rotate-12 flex items-center justify-center shadow-2xl">
                    <div className="text-white text-5xl font-bold transform -rotate-12">T</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Company Info */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {activeTab === 'Exhibitors' ? 'TchFlow' : 'Tesla, Inc.'}
                </h2>
                <p className="text-sm text-gray-500">Software & Technology</p>
              </div>

              {/* About */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">About</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
              </div>

              {/* Special Offer (Exhibitors only) */}
              {activeTab === 'Exhibitors' && (
                <div className="mb-5 bg-teal-50 border-l-4 border-teal-500 p-3 rounded">
                  <div className="flex items-start gap-2">
                    <Tag className="w-4 h-4 text-teal-600 mt-0.5" />
                    <div>
                      <div className="text-[10px] text-teal-600 font-bold mb-0.5">SPECIAL OFFER</div>
                      <div className="text-sm font-semibold text-gray-900">20% Off Annual Plan</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Cards */}
              {activeTab === 'Exhibitors' && (
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <Building2 className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                    <div className="text-[10px] text-gray-500 mb-0.5">Assigned Booth</div>
                    <div className="text-sm font-bold text-gray-900">A-12</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                    <div className="text-[10px] text-gray-500 mb-0.5">Opening Hours</div>
                    <div className="text-xs font-bold text-gray-900">7:00 AM - 10:00AM</div>
                  </div>
                </div>
              )}

              {/* Connect */}
              <div className="mb-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Connect</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Globe className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500">Website</div>
                        <div className="text-xs font-medium text-gray-900">https://example.com</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-gray-500">Email</div>
                        <div className="text-xs font-medium text-gray-900">example@gmail.com</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Resources (Exhibitors only) */}
              {activeTab === 'Exhibitors' && (
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Resources</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="text-xs font-medium text-gray-900">2025_Product_Catalog.pdf</div>
                        <div className="text-[10px] text-gray-500">2.4 Mb</div>
                      </div>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    handleReject(selectedItem);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 py-2.5 border-2 border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    handleApprove(selectedItem);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}