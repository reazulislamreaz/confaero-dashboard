// import { Image, Input } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
// import user from '../../../../public/image/randomuser.jpg';
// import { FaCircleArrowLeft } from "react-icons/fa6";
 

// const Profile = () => {
//   const navigate = useNavigate();
 
//   // console.log(profile);
  

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-16">
//         <h1 className="text-2xl md:text-3xl font-medium">
//           <Link to = "/dashboard/settings">
          
//           <FaCircleArrowLeft className="!text-[#0FC3C2] w-8 h-8 cursor-pointer"/>
//           </Link>
//           Profile Information
//           </h1>
//         <div
//           onClick={() => navigate(`/dashboard/settings/editprofile`)}
//           className="flex gap-2 items-center py-3 px-6 rounded-lg cursor-pointer bg-[#0FC3C2]"
//         >
//           <FaEdit size={17} />
//           <p>Edit Profile</p>
//         </div>
//       </div>

//       <div className="lg:flex md:flex gap-4 shadow-md bg-white p-4 rounded-xl">
//         <div className="lg:w-1/3 flex flex-col border border-dotted p-4 justify-center items-center gap-8">
//         <div className="rounded-full  overflow-hidden h-[180px] w-[180px] mx-auto">
//               {/* <Image src={url + profile?.data?.attributes?.image} /> */}
//               <Image src={"https://randomuser.me/api/portraits/men/57.jpg"} />
//             </div>
           
//           <div className="flex flex-col justify-center items-center text-center">
//             {/* <p className="text-lg md:text-xl">{profile?.data?.attributes?.role}</p> */}
//             <p className="text-lg md:text-xl">{"admin"}</p>
//             <h1 className="text-2xl md:text-3xl font-medium">{"absayed"}</h1>
//           </div>
//         </div>

//         <div className="lg:w-2/3 mt-8 lg:mt-0 px-5">
//           <div className="flex flex-col gap-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex-1">
//                 <label htmlFor="name" className="text-lg md:text-xl font-medium">
//                   Name
//                 </label>
//                 <Input
//                   placeholder="First name"
//                   // value={profile?.data?.attributes?.name}
//                   value={"absayed"}
//                   className="p-4 cursor-pointer text-lg md:text-xl bg-[#ebf5f5] text-black rounded w-full mt-3 outline-none focus:bg-[#69C0BE] hover:bg-[#e1f1f1]"
//                   type="text"
//                   readOnly
//                 />
//               </div>
//             </div>

//             <div className="flex-1">
//               <label htmlFor="email" className="text-lg md:text-xl font-medium">
//                 Email
//               </label>
//               <Input
//                 placeholder="Email"
//                 value={"ab@gmail.com"}
//                 className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none focus:bg-[#69C0BE] hover:bg-[#69C0BE]"
//                 type="text"
//                 readOnly
//               />
//             </div>

//             <div className="flex-1">
//               <label htmlFor="phone" className="text-lg md:text-xl font-medium">
//                 Phone Number
//               </label>
//               <Input
//                 placeholder="Phone"
//                 value={"454565465"}
//                 className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none focus:bg-[#69C0BE] hover:bg-[#69C0BE]"
//                 type="text"
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { ArrowLeft, Edit3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
 

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <Link to ="/dashboard/settings">
              
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
                      src="https://randomuser.me/api/portraits/men/57.jpg" 
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
                  <div className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 text-emerald-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                    admin
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    absayed
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
                      value="absayed"
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
                      value="ab@gmail.com"
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
                      value="454565465"
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
                    <span className="text-sm font-medium">Profile Complete</span>
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