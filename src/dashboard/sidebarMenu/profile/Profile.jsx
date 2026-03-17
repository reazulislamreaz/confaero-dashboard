import { ArrowLeft, Edit3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchUserProfileQuery } from "../../../redux/features/userSlice/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useFetchUserProfileQuery();

  const user = profileData?.data;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <Link to="/dashboard/settings">
                <ArrowLeft className="w-6 h-6 text-[#0FC3C2]" />
              </Link>
            </button>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Profile Information
            </h1>
          </div>

          <button
            onClick={() => navigate(`/dashboard/settings/editprofile`)}
            className="flex items-center gap-3 py-4 px-8 rounded-xl cursor-pointer bg-gradient-to-r from-[#0FC3C2] to-[#0BC5EA] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
          >
            <Edit3 size={18} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="lg:flex md:flex">
            {/* Profile Section */}
            <div className="lg:w-1/3 bg-gradient-to-br from-gray-50 to-blue-50 border-r border-gray-100">
              <div className="flex flex-col justify-center items-center p-8 gap-8">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="rounded-full overflow-hidden h-48 w-48 mx-auto shadow-2xl ring-4 ring-white">
                    <img
                      src={
                        user?.avatar
                          ? user.avatar
                          : "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff%22"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-[#0FC3C2] to-[#0BC5EA] rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col justify-center items-center text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {user?.name || "Admin"}
                  </h2>

                  <div className="h-1 w-16 bg-gradient-to-r from-[#0FC3C2] to-[#0BC5EA] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="space-y-8">
                {/* Name Field */}
                <div className="space-y-3">
                  <label className="text-xl font-semibold text-gray-700 block">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user?.name || ""}
                      placeholder="First name"
                      className="w-full p-5 text-xl bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl border-2 border-transparent focus:border-[#0FC3C2] focus:bg-white hover:from-[#e1f1f1] hover:to-[#ebf5f5] transition-all duration-300 outline-none font-medium"
                      readOnly
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-xl font-semibold text-gray-700 block">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.email || ""}
                      placeholder="Email"
                      className="w-full p-5 text-xl bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl border-2 border-transparent focus:border-[#0FC3C2] focus:bg-white hover:from-[#e1f1f1] hover:to-[#ebf5f5] transition-all duration-300 outline-none font-medium"
                      readOnly
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-3">
                  <label className="text-xl font-semibold text-gray-700 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={user?.phone || ""}
                      placeholder="Phone"
                      className="w-full p-5 text-xl bg-gradient-to-r from-gray-50 to-blue-50 text-gray-800 rounded-xl border-2 border-transparent focus:border-[#0FC3C2] focus:bg-white hover:from-[#e1f1f1] hover:to-[#ebf5f5] transition-all duration-300 outline-none font-medium"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Last updated: Today
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Profile Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
