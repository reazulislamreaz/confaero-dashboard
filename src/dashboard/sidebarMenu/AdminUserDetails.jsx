import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, Shield, Calendar, Globe, Building2, GraduationCap, Link, Clock } from 'lucide-react';
import { useAdminUserDetaislQuery } from '../../redux/features/userSlice/userSlice';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userDetailsData, isLoading, isError } = useAdminUserDetaislQuery(id);

  const account = userDetailsData?.data?.account;
  const profile = userDetailsData?.data?.profile;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  if (isError || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load user details.</p>
      </div>
    );
  }

  const joinedDate = new Date(account.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const lastSeen = profile?.lastSeen
    ? new Date(profile.lastSeen).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Never';

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
          <p className="text-gray-600 text-sm">View full profile and account information</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Left Column — Profile Card */}
        <div className="col-span-1 space-y-6">

          {/* Avatar & Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-teal-600">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{profile?.name || 'N/A'}</h2>
            <p className="text-sm text-gray-500 mb-3">{account.email}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              account.activeRole === 'ORGANIZER'
                ? 'bg-green-100 text-green-700'
                : account.activeRole === 'ATTENDEE'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {account.activeRole}
            </span>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm text-gray-700">{account.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Roles</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {account.role.map((r, i) => (
                      <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{r}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Joined</p>
                  <p className="text-sm text-gray-700">{joinedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Last Seen</p>
                  <p className="text-sm text-gray-700">{lastSeen}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column — Profile Details */}
        <div className="col-span-2 space-y-6">

          {/* Personal Websites */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-gray-700">Personal Websites</h3>
            </div>
            {profile?.personalWebsites?.length > 0 ? (
              <div className="space-y-2">
                {profile.personalWebsites.map((site, i) => (
                  <a key={i} href={site} target="_blank" rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline">{site}</a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No websites added.</p>
            )}
          </div>

          {/* Affiliations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-gray-700">Affiliations</h3>
            </div>
            {profile?.affiliations?.length > 0 ? (
              <div className="space-y-2">
                {profile.affiliations.map((aff, i) => (
                  <div key={i} className="text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg">{aff}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No affiliations added.</p>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-gray-700">Education</h3>
            </div>
            {profile?.education?.length > 0 ? (
              <div className="space-y-2">
                {profile.education.map((edu, i) => (
                  <div key={i} className="text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg">{edu}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No education info added.</p>
            )}
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-semibold text-gray-700">Social Links</h3>
            </div>
            {profile?.socialLinks?.length > 0 ? (
              <div className="space-y-2">
                {profile.socialLinks.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline">{link}</a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No social links added.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}