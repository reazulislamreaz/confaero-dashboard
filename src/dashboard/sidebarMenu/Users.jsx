// import React, { useState } from 'react';
// import { Search, Filter, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useSelectedEvent } from '../../hooks/useSelectedEvent';
// import { useGetAllUsersQuery } from '../../redux/features/userSlice/userSlice';
// export default function UserManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [selectedRole, setSelectedRole] = useState('');
//  const navigate = useNavigate();

//   const { eventId } = useSelectedEvent();

//   console.log(eventId);

//   const { data: usersData, isLoading, isError } = useGetAllUsersQuery(eventId); 
// console.log(usersData);
//   // Sample user data
//   const users = Array(50).fill(null).map((_, index) => ({
//     id: `#01`,
//     name: 'Dr. Sarah Wilson',
//     email: 'example@email.com',
//     address: 'Dhaka, Bangladesh',
//     roll: 'Attendee'
//   }));

//   const roles = [
//     'Attendee',
//     'Speakers',
//     'Exhibitor',
//     'Sponsors',
//     'Volunteers',
//     'Reviewer',
//     'Track Chair'
//   ];

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = !selectedRole || user.roll === selectedRole;
//     return matchesSearch && matchesRole;
//   });

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentUsers = filteredUsers.slice(startIndex, endIndex);

//   const handleDelete = (userId) => {
//     console.log('Delete user:', userId);
//   };

//   const handleDetails = (user) => {
//     console.log('View details:', user);
//   };

//   return (
//     <div className="  bg-gray-50 p-6 relative">
//       <div className=" ">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold text-gray-800 mb-1">User Management</h1>
//           <p className="text-gray-500 text-sm">Manage User and profiles</p>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex gap-3">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by email or name"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//             <button 
//               className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//             >
//               <Search className="w-5 h-5" />
//             </button>
//             <div className="relative">
//               <select
//                 value={selectedRole}
//                 onChange={(e) => {
//                   setSelectedRole(e.target.value);
//                   console.log('Selected Role:', e.target.value);
//                 }}
//                 className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer min-w-40"
//               >
//                 <option value="">All Roles</option>
//                 {roles.map((role) => (
//                   <option key={role} value={role}>
//                     {role}
//                   </option>
//                 ))}
//               </select>
//               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//               <svg 
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">S. ID</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Roll</th>
//                   <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentUsers.map((user, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
//                     <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{user.address}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{user.roll}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           // onClick={() => handleDetails(user)}
//                           onClick={() => navigate("/dashboard/users/details")}
//                           className="px-4 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
//                         >
//                           Details
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user.id)}
//                           className="p-1 text-red-500 hover:text-red-700 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>Showing</span>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => setItemsPerPage(Number(e.target.value))}
//                 className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 <option value={6}>6</option>
//                 <option value={12}>12</option>
//                 <option value={24}>24</option>
//                 <option value={50}>50</option>
//               </select>
//               <span>of {filteredUsers.length}</span>
//             </div>

//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
              
//               {[...Array(Math.min(5, totalPages))].map((_, index) => {
//                 const pageNum = index + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`w-8 h-8 rounded ${
//                       currentPage === pageNum
//                         ? 'bg-teal-600 text-white'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
              
//               <button
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sidebar - Removed */}
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Search, Filter, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/features/userSlice/userSlice';
import toast from 'react-hot-toast';
import { Popconfirm } from 'antd';
import { useGetEventQuery } from '../../redux/features/eventSlice/eventSlice';

// Role display mapping
const ROLE_DISPLAY = {
  ATTENDEE: 'Attendee',
  SPEAKER: 'Speaker',
  EXHIBITOR: 'Exhibitor',
  SPONSOR: 'Sponsor',
  VOLUNTEER: 'Volunteer',
  ABSTRACT_REVIEWER: 'Reviewer',
  TRACK_CHAIR: 'Track Chair',
};

const ROLE_FILTER_OPTIONS = [
  { label: 'All Roles', value: '' },
  { label: 'Attendee', value: 'ATTENDEE' },
  { label: 'Speaker', value: 'SPEAKER' },
  { label: 'Exhibitor', value: 'EXHIBITOR' },
  { label: 'Sponsor', value: 'SPONSOR' },
  { label: 'Volunteer', value: 'VOLUNTEER' },
  { label: 'Reviewer', value: 'ABSTRACT_REVIEWER' },
  { label: 'Track Chair', value: 'TRACK_CHAIR' },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // local input before submit
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState('');

  const navigate = useNavigate();

  const { eventId } = useSelectedEvent();

const { data: usersData, isLoading, isError } = useGetAllUsersQuery(
  {
    id: eventId,
    role: selectedRole,
    search: searchTerm,
    limit: itemsPerPage,
    page: currentPage,
  },
  {
    skip: !eventId, // ✅ don't fire the query until eventId exists
  }
);

  // console.log(usersData);
  // Extract data from response shape
  const users = usersData?.data?.data || [];
  const meta = usersData?.data?.meta || {};
  const totalPages = meta.totalPages || 1;
  const totalUsers = meta.total || 0;

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // reset to page 1 on new search
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // reset to page 1 on role filter change
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (accountId) => {
    console.log('Delete user:', accountId, eventId);
    try {  
      const res = await deleteUser({ eventId, userId: accountId }).unwrap();
      console.log(res);
      if (res.success === true) {
        toast.success(res?.message || 'User deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
   

  };

  // Generate page numbers to display (max 5 around current page)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="bg-gray-50 p-6 relative">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">User Management</h1>
          <p className="text-gray-500 text-sm">Manage users and profiles</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email or name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearchSubmit}
              className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white cursor-pointer min-w-40"
              >
                {ROLE_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">S. No</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                      Loading users...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-red-400 text-sm">
                      Failed to load users. Please try again.
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.accountId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.address?.address || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ROLE_DISPLAY[user.role] || user.role}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/dashboard/users/details/${user.accountId}`)}
                            className="px-4 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
                          >
                            Details
                          </button>
                        <Popconfirm
  title={`Delete ${user.name}`}
  description="Are you sure you want to delete this user? This action cannot be undone."
  onConfirm={() => handleDelete(user.accountId)}
  okText="Yes, Delete"
  cancelText="Cancel"
  okButtonProps={{ danger: true }}
>
  <button className="p-1 text-red-500 hover:text-red-700 transition-colors">
    <Trash2 className="w-4 h-4" />
  </button>
</Popconfirm>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>
              <span>of {totalUsers} users</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded text-sm ${
                    currentPage === pageNum
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}