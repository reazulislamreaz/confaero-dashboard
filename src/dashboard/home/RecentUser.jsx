import React from 'react';
import Card from './Card';
import TopPostersCard from './TopPostersCard';
import { useGetInvitationsQuery } from '../../redux/features/invitatation/invitaionSlice';
import { useGetTopPostersQuery } from '../../redux/features/reviwer/reviewerSlice';
import { useNavigate } from 'react-router-dom';

const InvitationsDashboard = ({ eventId }) => {
  const navigate = useNavigate();
  // Fetch actual data
  const { data: invitationsData, isLoading: invLoading, isError: invError } = useGetInvitationsQuery({ id: eventId, page: 1, limit: 3 });
  const { data: postersData, isLoading: postersLoading, isError: postersError } = useGetTopPostersQuery({ eventId, limit: 3 });

  const rawInvitations = invitationsData?.data?.data || [];
  const invitations = [...rawInvitations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Process posters data - sort by rating and take top 3
  const rawPosters = postersData?.data || [];
  const posters = [...rawPosters]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-gray-600';
      case 'accepted':
      case 'approved':
        return 'text-teal-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="  bg-gray-50 p-6">
      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invitations Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Invitations</h2>
              <button
                onClick={() => navigate('/dashboard/invitaitons')}
                className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
              >
                View All
              </button>
            </div>
            <div className="p-6 space-y-4">
              {invLoading ? (
                <p className="text-gray-500 text-sm">Loading invitations...</p>
              ) : invError ? (
                <p className="text-red-500 text-sm">Failed to load invitations.</p>
              ) : invitations.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent invitations.</p>
              ) : (
                invitations.map((invitation) => (
                  <div
                    key={invitation._id || invitation.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{invitation.name || invitation?.invitedUserEmail || "Invited User"}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 capitalize">{invitation.role}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-white ${getStatusColor(
                        invitation.status
                      )}`}
                    >
                      {getStatusText(invitation.status)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Posters Section */}
          <TopPostersCard 
            posters={posters}
            onViewRankings={() => navigate('/dashboard/reviewer-management')}
          />
        </div>
      </div>
    </div>
  );
};

export default InvitationsDashboard;