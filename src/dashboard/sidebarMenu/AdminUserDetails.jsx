import { ArrowLeft, Mail, Shield, Calendar, Clock, Globe, Building2, GraduationCap, Link, FileText, X } from 'lucide-react';
import { useAdminUserDetaislQuery, useDeleteUserMutation } from '../../redux/features/userSlice/userSlice';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';

const ROLE_DISPLAY = {
  ATTENDEE: 'Attendee',
  ORGANIZER: 'Organizer',
};

const formatDateLong = (iso) => iso
  ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  : '—';

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userDetailsData, isLoading, isError } = useAdminUserDetaislQuery(id);

  const account = userDetailsData?.data?.account;
  const profile = userDetailsData?.data?.profile;

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {  
      const res = await deleteUser({ userId: id }).unwrap();
      if (res.success === true) {
        toast.success(res?.message || 'User deleted successfully');
        navigate(-1);
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading user details...</p>
      </div>
    );
  }

  if (isError || !account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-400 text-sm">Failed to load user details.</p>
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
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
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
            <p className="text-gray-500 text-sm">View full profile and account information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mb-4 overflow-hidden">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-teal-600">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : '?'}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{profile?.name || 'N/A'}</h2>
              <p className="text-sm text-gray-500 mb-4">{account.email}</p>
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${
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
              <h3 className="text-sm font-bold text-gray-700 mb-5 uppercase tracking-wider">Account Information</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Email Address</p>
                    <p className="text-sm text-gray-700 font-medium">{account.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <Shield className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Account Roles</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {account.role.map((r, i) => (
                        <span key={i} className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold border border-teal-100">
                          {ROLE_DISPLAY[r] || r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Member Since</p>
                    <p className="text-sm text-gray-700 font-medium">{joinedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Last Activity</p>
                    <p className="text-sm text-gray-700 font-medium">{lastSeen}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About / Bio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">About / Bio</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-normal italic">
                {profile?.about || 'No bio information provides.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Education</h3>
                </div>
                {profile?.education?.length > 0 ? (
                  <div className="space-y-3">
                    {profile.education.map((edu, i) => (
                      <div key={i} className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium">{edu}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic font-light">No education details available.</p>
                )}
              </div>

              {/* Affiliations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Affiliations</h3>
                </div>
                {profile?.affiliations?.length > 0 ? (
                  <div className="space-y-3">
                    {profile.affiliations.map((aff, i) => (
                      <div key={i} className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium">{aff}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic font-light">No professional affiliations added.</p>
                )}
              </div>
            </div>

            {/* Online Presence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Websites */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Websites</h3>
                </div>
                {profile?.personalWebsites?.length > 0 ? (
                  <div className="space-y-2">
                    {profile.personalWebsites.map((site, i) => (
                      <a key={i} href={site} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium break-all">
                        <Link className="w-3 h-3 flex-shrink-0" />
                        {site}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No websites listed.</p>
                )}
              </div>

              {/* Social Connections */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Link className="w-4 h-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Social Links</h3>
                </div>
                {profile?.socialLinks?.length > 0 ? (
                  <div className="space-y-2">
                    {profile.socialLinks.map((link, i) => (
                      <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium break-all">
                        <Globe className="w-3 h-3 flex-shrink-0" />
                        {link}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No social profiles connected.</p>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-red-500">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">Danger Zone</h4>
                  <p className="text-xs text-gray-500">Managing access for <span className="text-teal-600 font-bold">{profile?.name || 'this user'}</span>. Deleting an account is permanent.</p>
                </div>
                <Popconfirm
                  title={`Delete ${profile?.name || 'this user'}`}
                  description="Are you sure you want to delete this user? This action cannot be undone."
                  onConfirm={handleDelete}
                  okText="Yes, Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                >
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-shadow shadow-sm font-bold text-sm">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}