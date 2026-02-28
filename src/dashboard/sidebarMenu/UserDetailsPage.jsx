import React, { useState } from 'react';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { useDeleteUserMutation, useDetailUserQuery } from '../../redux/features/userSlice/userSlice';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';

const ROLE_DISPLAY = {
  ATTENDEE: 'Attendee',
  SPEAKER: 'Speaker',
  EXHIBITOR: 'Exhibitor',
  SPONSOR: 'Sponsor',
  VOLUNTEER: 'Volunteer',
  ABSTRACT_REVIEWER: 'Reviewer',
  TRACK_CHAIR: 'Track Chair',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  // handles "2022-01" or "2023" or full ISO
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

export default function UserDetailsPage() {
  const { id } = useParams();
  console.log(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { eventId } = useSelectedEvent();
  const navigate = useNavigate();

  const { data: userDetailsResponse, isLoading, isError } = useDetailUserQuery(
    { eventId, userId: id },
    { skip: !eventId || !id }
  );

  console.log(userDetailsResponse);

  // ── Map API response to local variables ──────────────────────────────────
  const raw = userDetailsResponse?.data;
  const profile = raw?.profile;
  const account = raw?.account;
  const education = profile?.education?.[0];
  const affiliation = profile?.affiliations?.[0];
  const resume = profile?.resume;
  const roleInEvent = raw?.roleInEvent;

  const linkedin = profile?.socialLinks?.find(
    (s) => s.platform?.toLowerCase() === 'linkedin'
  )?.url;
  const github = profile?.socialLinks?.find(
    (s) => s.platform?.toLowerCase() === 'github'
  )?.url;
  const webpage = profile?.personalWebsites?.[0];

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleDownloadResume = () => {
    if (resume?.url) window.open(resume.url, '_blank');
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    console.log('Delete user:', id, eventId);
    try {  
      const res = await deleteUser({ eventId, userId: id }).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success(res?.message || 'User deleted successfully');
        navigate(-1); // Navigate back after successful deletion
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
   

  };

  // ── Loading / Error states ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading user details...</p>
      </div>
    );
  }

  if (isError || !raw) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-400 text-sm">Failed to load user details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">

          {/* ── Contact Details & Bio ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* Contact Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h2>
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-24 h-24 bg-teal-100 rounded-lg overflow-hidden flex-shrink-0">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile?.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal-600 text-2xl font-bold">
                      {profile?.name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span>{' '}
                    {profile?.name || '—'}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{' '}
                    {profile?.contact?.phone || profile?.contact?.mobile || '—'}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{' '}
                    {account?.email || profile?.contact?.email || '—'}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{' '}
                    {profile?.location?.address || '—'}
                  </div>
                  <div>
                    <span className="font-medium">LinkedIn:</span>{' '}
                    {linkedin ? (
                      <a href={linkedin} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">
                        {linkedin}
                      </a>
                    ) : '—'}
                  </div>
                  <div>
                    <span className="font-medium">GitHub:</span>{' '}
                    {github ? (
                      <a href={github} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">
                        {github}
                      </a>
                    ) : '—'}
                  </div>
                  <div>
                    <span className="font-medium">Webpage:</span>{' '}
                    {webpage ? (
                      <a href={webpage} target="_blank" rel="noreferrer" className="text-teal-600 hover:underline">
                        {webpage}
                      </a>
                    ) : '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Bio</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {profile?.about || 'No bio provided.'}
              </p>
            </div>
          </div>

          {/* ── Education & Affiliation ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* Education */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Education Details</h2>
              {education ? (
                <div className="space-y-3">
                  {[
                    { label: 'School',  value: education.institute },
                    { label: 'Degree',  value: education.degree },
                    { label: 'Major',   value: education.major },
                    { label: 'From',    value: formatDate(education.from) },
                    { label: 'To',      value: education.isCurrent ? 'Present' : formatDate(education.to) },
                  ].map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-600">{label}</div>
                      <div className="text-gray-800">{value || '—'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No education info available.</p>
              )}
            </div>

            {/* Affiliation */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Affiliation Details</h2>
              {affiliation ? (
                <div className="space-y-3">
                  {[
                    { label: 'Company',        value: affiliation.company },
                    { label: 'Position Title', value: affiliation.position },
                    { label: 'From',           value: formatDate(affiliation.from) },
                    { label: 'To',             value: affiliation.isCurrent ? 'Present' : formatDate(affiliation.to) },
                  ].map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-600">{label}</div>
                      <div className="text-gray-800">{value || '—'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No affiliation info available.</p>
              )}
            </div>
          </div>

          {/* ── User Details & Resume ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* User Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">User Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Role</div>
                  <div className="text-gray-800">{ROLE_DISPLAY[roleInEvent] || roleInEvent || '—'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-600">Account Roles</div>
                  <div className="text-gray-800">
                    {account?.roles?.map((r) => ROLE_DISPLAY[r] || r).join(', ') || '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume</h2>
              {resume?.url ? (
                <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-1">Download Resume</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        Updated {formatDate(resume.updatedAt)}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">PDF</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadResume}
                    className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400">No resume uploaded.</p>
              )}
            </div>
          </div>

          {/* ── Suspend / Delete Section ──────────────────────────────── */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-700">Would you like to suspend this </span>
                <span className="text-teal-600 font-medium">
                  {ROLE_DISPLAY[roleInEvent] || roleInEvent || 'User'}
                </span>
                <span className="text-gray-700"> ?</span>
              </div>
              <Popconfirm
                title={`Delete ${profile?.name || 'this user'}`}
                description="Are you sure you want to delete this user? This action cannot be undone."
              onConfirm={handleDelete}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </Popconfirm>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}