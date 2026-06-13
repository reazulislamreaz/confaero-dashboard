import React, { useState } from 'react';
import { LayoutGrid, Check, X, Download, Globe, Mail, ChevronRight, Building2, Clock, Tag, FileText } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import {
  
  useGetSponsorsQuery,
  useSponsorDetailsQuery,
  useAcceptBoothRequestMutation,
  useCancelBoothRequestMutation,
  useAcceptSponsorshipRequestMutation,
  useCancelSponsorshipRequestMutation,
  useGetExibutorsQuery,
} from '../../redux/features/exibutor&sponsor/boothSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import CardGridSkeleton from '../../components/loading/CardGridSkeleton';
import DetailPageSkeleton from '../../components/loading/DetailPageSkeleton';
 

export default function ExhibitorsSponsors() {
  const [activeTab, setActiveTab] = useState('Exhibitors');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

   const { eventId, setEvent } = useSelectedEvent();
  console.log(eventId);

  const { data: exhibitorsRes, isLoading: isLoadingExhibitors } = useGetExibutorsQuery(eventId, { skip: !eventId });
  
  // console.log(exhibitorsRes);

  const { data: sponsorsRes, isLoading: isLoadingSponsors } = useGetSponsorsQuery(eventId, { skip: !eventId });

  // console.log(sponsorsRes);

  const { data: sponsorDetailsRes, isLoading: isLoadingSponsorDetails } = useSponsorDetailsQuery(
    selectedItem?._id,
    { skip: !selectedItem || activeTab !== 'Sponsors' }
  );

  const [acceptBoothRequest] = useAcceptBoothRequestMutation();
  const [cancelBoothRequest] = useCancelBoothRequestMutation();
  const [acceptSponsorshipRequest] = useAcceptSponsorshipRequestMutation();
  const [cancelSponsorshipRequest] = useCancelSponsorshipRequestMutation();

  const exhibitors = exhibitorsRes?.data || [];
  const sponsors = sponsorsRes?.data?.data || [];
  const sponsorDetails = sponsorDetailsRes?.data;

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleApprove = async (item) => {
    console.log(item);
    try {
      if (activeTab === 'Exhibitors') {
       const res = await acceptBoothRequest({ id: item._id, body: { boothNumber: item.boothNumber } }).unwrap();
       console.log(res);
      } else {
          const res = await acceptSponsorshipRequest(item._id).unwrap();
          console.log(res);
      }
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  const handleReject = async (item) => {

    console.log(item);

    try {
      if (activeTab === 'Exhibitors') {
      const res =  await cancelBoothRequest({ id: item._id, body: { boothNumber: item.boothNumber } }).unwrap();
      console.log(res);
      } else {
        const res = await cancelSponsorshipRequest(item._id).unwrap();
        console.log(res);
      }
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active' || s === 'approved') return 'bg-green-500 text-white';
    if (s === 'pending' || s === 'inactive') return 'bg-yellow-400 text-gray-800';
    if (s === 'rejected') return 'bg-red-400 text-white';
    return 'bg-gray-300 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active') return 'Approved';
    if (s === 'inactive') return 'Pending';
    return status?.charAt(0).toUpperCase() + status?.slice(1);
  };

  const isPending = (status) => {
    const s = status?.toLowerCase();
    return s === 'pending' || s === 'inactive';
  };

  const currentCount = activeTab === 'Exhibitors' ? exhibitors.length : sponsors.length;

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
          <div className="inline-flex ">
            <button
              onClick={() => setActiveTab('Exhibitors')}
              className={`px-5 py-2 mr-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'Exhibitors' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:text-gray-900 bg-white rounded-lg p-1 shadow-sm'
              }`}
            >
              Exhibitors
            </button>
            <button
              onClick={() => setActiveTab('Sponsors')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'Sponsors' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:text-gray-900 bg-white rounded-lg p-1 shadow-sm'
              }`}
            >
              Sponsors
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <LayoutGrid className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">{currentCount}</span>
          </div>
        </div>

        {/* Exhibitors Grid */}
        {activeTab === 'Exhibitors' && (
          <>
            {isLoadingExhibitors ? (
              <CardGridSkeleton count={4} columns={2} />
            ) : exhibitors.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No exhibitors found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {exhibitors.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl overflow-hidden flex flex-col">
                    {/* Banner Image */}
                    <div className="relative h-32 w-full">
                      <img
                        src={item.banner || '/public/image/exi.jpg'}
                        alt={item.companyName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusBadgeClass(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>

                      {/* Text Over Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold text-base mb-1">{item.companyName}</h3>
                        <p className="text-sm mb-2 line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="w-4 h-4" />
                          <span>{item.boothNumber || '—'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Offer */}
                    {item.offerTitle && (
                      <div className="px-4 py-3 bg-[#EBF6F5] mt-3 border border-[#D2D2D2] rounded mx-0">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <div>
                            <div className="text-[10px] text-teal-600 font-bold uppercase">SPECIAL OFFER</div>
                            <div className="text-sm font-semibold text-gray-900">{item.offerTitle}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="py-2 bg-white border-t border-gray-200 flex items-center justify-between gap-2 mt-auto">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="flex-1 py-2 text-center cursor-pointer border border-[#D2D2D2] rounded text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        View Details
                      </button>

                      {isPending(item.status) && (
                        <>
                          <button
                            onClick={() => handleApprove(item)}
                            className="p-1.5 hover:bg-green-100 border cursor-pointer border-[#D2D2D2] rounded"
                          >
                            <FaCheck className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleReject(item)}
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
          </>
        )}

        {/* Sponsors Grid */}
        {activeTab === 'Sponsors' && (
          <>
            {isLoadingSponsors ? (
              <CardGridSkeleton count={4} columns={2} />
            ) : sponsors.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No sponsors found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sponsors.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl overflow-hidden flex flex-col border border-gray-200 shadow-sm">
                    {/* Logo / Banner Image */}
                    <div className="relative h-32 w-full bg-gray-100">
                      <img
                        src={item.logoUrl || item.logo || '/public/image/review.png'}
                        alt={item.companyName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusBadgeClass(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-4 pt-3 pb-3 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.companyName}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{item.description}</p>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="flex-1 text-sm border border-[#D2D2D2] rounded font-medium text-gray-700 hover:text-gray-900 py-1.5"
                        >
                          View Details
                        </button>
                        {isPending(item.status) && (
                          <>
                            <button
                              onClick={() => handleApprove(item)}
                              className="p-1.5 hover:bg-green-100 border cursor-pointer border-[#D2D2D2] rounded"
                            >
                              <FaCheck className="w-5 h-5 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleReject(item)}
                              className="p-1.5 text-red-600 hover:bg-red-100 border cursor-pointer border-[#D2D2D2] rounded"
                            >
                              <RxCross2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              {activeTab === 'Exhibitors' ? (
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={selectedItem.banner || '/public/image/exi.jpg'}
                    alt={selectedItem.companyName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {/* Close button — light bg for Exhibitor */}
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="h-44 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  {(sponsorDetails?.logoUrl || selectedItem.logoUrl) ? (
                    <img
                      src={sponsorDetails?.logoUrl || selectedItem.logoUrl}
                      alt={selectedItem.companyName}
                      className="rounded-3xl object-cover z-10"
                    />
                  ) : (
                    <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl transform rotate-12 flex items-center justify-center shadow-2xl">
                      <div className="text-white text-5xl font-bold transform -rotate-12">
                        {selectedItem.companyName?.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Close button — dark bg version for Sponsor */}
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isLoadingSponsorDetails && activeTab === 'Sponsors' ? (
                <DetailPageSkeleton />
              ) : (
                <>
                  {/* Company Info */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {activeTab === 'Exhibitors' ? selectedItem.companyName : (sponsorDetails?.companyName || selectedItem.companyName)}
                      </h2>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(activeTab === 'Exhibitors' ? selectedItem.status : (sponsorDetails?.status || selectedItem.status))}`}>
                        {getStatusLabel(activeTab === 'Exhibitors' ? selectedItem.status : (sponsorDetails?.status || selectedItem.status))}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {activeTab === 'Exhibitors' ? selectedItem.description : (sponsorDetails?.description || selectedItem.description)}
                    </p>
                  </div>

                  {/* Special Offer (Exhibitors only) */}
                  {activeTab === 'Exhibitors' && selectedItem.offerTitle && (
                    <div className="mb-5 bg-teal-50 border-l-4 border-teal-500 p-3 rounded">
                      <div className="flex items-start gap-2">
                        <Tag className="w-4 h-4 text-teal-600 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-teal-600 font-bold mb-0.5">SPECIAL OFFER</div>
                          <div className="text-sm font-semibold text-gray-900">{selectedItem.offerTitle}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info Cards (Exhibitors only) */}
                  {activeTab === 'Exhibitors' && (
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                        <Building2 className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                        <div className="text-[10px] text-gray-500 mb-0.5">Assigned Booth</div>
                        <div className="text-sm font-bold text-gray-900">{selectedItem.boothNumber || '—'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                        <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                        <div className="text-[10px] text-gray-500 mb-0.5">Opening Hours</div>
                        <div className="text-xs font-bold text-gray-900">{selectedItem.boothOpening || '—'}</div>
                      </div>
                    </div>
                  )}

                  {/* Connect */}
                  <div className="mb-5">
                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Connect</h3>
                    <div className="space-y-2">
                      {(activeTab === 'Exhibitors' ? selectedItem.websiteUrl : sponsorDetails?.websiteUrl) && (
                        <a
                          href={activeTab === 'Exhibitors' ? selectedItem.websiteUrl : sponsorDetails?.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <Globe className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="text-left">
                              <div className="text-[10px] text-gray-500">Website</div>
                              <div className="text-xs font-medium text-gray-900 truncate max-w-[180px]">
                                {activeTab === 'Exhibitors' ? selectedItem.websiteUrl : sponsorDetails?.websiteUrl}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </a>
                      )}

                      {(activeTab === 'Exhibitors' ? selectedItem.publicEmail : sponsorDetails?.publicEmail) && (
                        <a
                          href={`mailto:${activeTab === 'Exhibitors' ? selectedItem.publicEmail : sponsorDetails?.publicEmail}`}
                          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                              <Mail className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="text-left">
                              <div className="text-[10px] text-gray-500">Email</div>
                              <div className="text-xs font-medium text-gray-900">
                                {activeTab === 'Exhibitors' ? selectedItem.publicEmail : sponsorDetails?.publicEmail}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Resources (Exhibitors only) */}
                  {activeTab === 'Exhibitors' && selectedItem.resources?.length > 0 && (
                    <div className="mb-5">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3">Resources</h3>
                      <div className="space-y-2">
                        {selectedItem.resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-red-500" />
                              <div>
                                <div className="text-xs font-medium text-gray-900">{resource.name || resource.fileName || 'Resource'}</div>
                                {resource.size && <div className="text-[10px] text-gray-500">{resource.size}</div>}
                              </div>
                            </div>
                            {resource.url && (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                              >
                                <Download className="w-4 h-4 text-gray-600" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sponsor Stats */}
                  {/* {activeTab === 'Sponsors' && sponsorDetails?.profileView !== undefined && (
                    <div className="mb-5 bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
                      <div className="text-[10px] text-gray-500 mb-0.5">Profile Views</div>
                      <div className="text-lg font-bold text-gray-900">{sponsorDetails.profileView}</div>
                    </div>
                  )} */}

                  {/* Action Buttons */}
                  {isPending(activeTab === 'Exhibitors' ? selectedItem.status : (sponsorDetails?.status || selectedItem.status)) ? (
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
                  ) : (
                    <div className="pt-2">
                      <div className={`w-full text-center py-2.5 rounded-lg text-sm font-semibold ${getStatusBadgeClass(activeTab === 'Exhibitors' ? selectedItem.status : (sponsorDetails?.status || selectedItem.status))}`}>
                        {getStatusLabel(activeTab === 'Exhibitors' ? selectedItem.status : (sponsorDetails?.status || selectedItem.status))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}