import React, { useState } from 'react';
import { Star } from 'lucide-react';

const InvitationsDashboard = () => {
  const [invitations] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Speaker',
      status: 'pending'
    },
    {
      id: 2,
      name: 'TechCorp Inc',
      role: 'Sponsor',
      status: 'accepted'
    },
    {
      id: 3,
      name: 'InnovateLab',
      role: 'Exhibitor',
      status: 'rejected'
    }
  ]);

  const [topPosters] = useState([
    {
      id: 1,
      rank: 1,
      title: 'AI in Energy Storage',
      author: 'Dr. Sarah Johnson',
      rating: 9.5
    },
    {
      id: 2,
      rank: 2,
      title: 'AI in Energy Storage',
      author: 'Dr. Sarah Johnson',
      rating: 9.5
    },
    {
      id: 3,
      rank: 3,
      title: 'AI in Energy Storage',
      author: 'Dr. Sarah Johnson',
      rating: 9.5
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'accepted':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="  bg-gray-50 p-6">
      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invitations Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Invitations</h2>
              <button className="text-sm text-cyan-500 hover:text-cyan-600 font-medium">
                View All
              </button>
            </div>
            <div className="p-6 space-y-4">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{invitation.name}</h3>
                    <p className="text-sm text-gray-500">{invitation.role}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      invitation.status
                    )}`}
                  >
                    {getStatusText(invitation.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Posters Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Top Posters</h2>
              <button className="text-sm text-cyan-500 hover:text-cyan-600 font-medium">
                View Rankings
              </button>
            </div>
            <div className="p-6 space-y-4">
              {topPosters.map((poster) => (
                <div
                  key={poster.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {poster.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{poster.title}</h3>
                    <p className="text-sm text-gray-500">{poster.author}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <Star className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                    <span className="text-sm font-semibold text-gray-800">{poster.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationsDashboard;