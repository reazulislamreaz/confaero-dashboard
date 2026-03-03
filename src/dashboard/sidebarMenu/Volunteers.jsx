 

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, X, Calendar, MapPin, Search, Upload, Image as ImageIcon } from 'lucide-react';
// import { useAssignTaskMutation, useGetTaskByIdQuery, useGetTaskQuery, useGetVoluntearEamilQuery } from '../../redux/features/taskSlice/taskSlice';
 
// import { useSelectedEvent } from '../../hooks/useSelectedEvent';
// import toast from 'react-hot-toast';
// import { useUploadFileMutation } from '../../redux/features/fileUpload';

// const VolunteerManagementPage = () => {
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [expandedVolunteerId, setExpandedVolunteerId] = useState(null);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   // Form state
//   const [selectedEmail, setSelectedEmail] = useState('');
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskTime, setTaskTime] = useState('');
//   const [taskDate, setTaskDate] = useState('');
//   const [location, setLocation] = useState('');
//   const [instruction, setInstruction] = useState('');
//   const [referenceImage, setReferenceImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { eventId } = useSelectedEvent();
//   console.log('Event ID:', eventId);

//   const { data: taskData, isLoading: tasksLoading, refetch } = useGetTaskQuery({ eventId, page, limit });
//   console.log('Task Data:', taskData);

//   const { data: volunteerEmailData, isLoading: emailsLoading } = useGetVoluntearEamilQuery(eventId);
//   console.log('Volunteer Email Data:', volunteerEmailData);

//   // const {data: reportData} = useGetTaskByIdQuery(reportId);

//   const [assignTask] = useAssignTaskMutation();
//   const [uploadFile] = useUploadFileMutation();

//   // Extract data from API responses
//   const volunteers = taskData?.data?.data || [];
//   const volunteerEmails = volunteerEmailData?.data || [];
//   const meta = taskData?.data?.meta || { total: 0, page: 1, limit: 10 };

//   // Handlers
//   const handleAddTaskClick = () => {
//     setShowAddTaskModal(true);
//   };

//   const handleToggleExpand = (id) => {
//     setExpandedVolunteerId(expandedVolunteerId === id ? null : id);
//   };

//   const handleViewReport = (report) => {
//     setSelectedReport(report);
//   };

//   const handleCloseReportModal = () => {
//     setSelectedReport(null);
//   };

//   const handleCloseAddTaskModal = () => {
//     setShowAddTaskModal(false);
//     // Reset form
//     setSelectedEmail('');
//     setTaskTitle('');
//     setTaskTime('');
//     setTaskDate('');
//     setLocation('');
//     setInstruction('');
//     setReferenceImage(null);
//     setImagePreview(null);
//     setImageUrl('');
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setReferenceImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUploadImage = async () => {
//     if (!referenceImage) {
//       toast.error('Please select an image first');
//       return null;
//     }

//     setIsUploading(true);
//     try {
//       const fileFormData = new FormData();
//       fileFormData.append('file', referenceImage);
//       fileFormData.append('type', 'task_reference');

//       // Console log file and type as requested
//       console.log('Uploading File:', referenceImage);
//       console.log('Upload Type:', 'task_reference');

//       const attachmentResult = await uploadFile(fileFormData).unwrap();

//       if (!attachmentResult?.success || !attachmentResult?.data?.url) {
//         toast.error(attachmentResult?.message || 'File upload failed.');
//         return null;
//       }

//       const uploadedUrl = attachmentResult.data.url;

//       console.log('Uploaded Image URL:', uploadedUrl);
//       setImageUrl(uploadedUrl);
//       toast.success('Image uploaded successfully');
//       return uploadedUrl;
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error(error?.data?.message || 'Failed to upload image');
//       return null;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmitTask = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!selectedEmail) {
//       toast.error('Please select a volunteer email');
//       return;
//     }
//     if (!taskTitle) {
//       toast.error('Please enter task title');
//       return;
//     }
//     if (!taskDate) {
//       toast.error('Please select task date');
//       return;
//     }
//     if (!taskTime) {
//       toast.error('Please enter task time');
//       return;
//     }
//     if (!location) {
//       toast.error('Please enter location');
//       return;
//     }
//     if (!instruction) {
//       toast.error('Please enter task instruction');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       let finalImageUrl = imageUrl;

//       // Upload image if new one selected
//       if (referenceImage && !imageUrl) {
//         finalImageUrl = await handleUploadImage();
//         if (!finalImageUrl) {
//           setIsSubmitting(false);
//           return;
//         }
//       }

//       // Prepare task data
//       const taskData = {
//         eventId: eventId,
//         volunteerEmail: selectedEmail,
//         title: taskTitle,
//         date: taskDate,
//         time: taskTime,
//         location: location,
//         instruction: instruction,
//         referenceImage: finalImageUrl
//       };

//       // Console log final data
//       console.log('Creating Task with Data:', taskData);

//       const result = await assignTask(taskData).unwrap();
//       console.log(result)

//       if (result.success) {
//         toast.success('Task assigned successfully');
//         handleCloseAddTaskModal();
//         refetch();
//       }
//     } catch (error) {
//       console.error('Error assigning task:', error);
//       toast.error(error?.data?.message || 'Failed to assign task');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const totalPages = Math.ceil(meta.total / limit);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800">Volunteer Management</h1>
//           <p className="text-sm text-gray-600">Assign tasks and view reports</p>
//         </div>
//         <button
//           onClick={handleAddTaskClick}
//           className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
//         >
//           <span>+</span> Assign Task
//         </button>
//       </div>

//       {/* Volunteers List */}
//       <div className="space-y-4">
//         {tasksLoading ? (
//           <div className="text-center py-10 text-gray-500">Loading volunteers...</div>
//         ) : volunteers.length === 0 ? (
//           <div className="text-center py-10 text-gray-500">No volunteers found</div>
//         ) : (
//           volunteers.map((volunteer) => (
//             <div key={volunteer.volunteer.accountId} className="bg-white rounded-lg shadow-sm border border-gray-200">
//               {/* Volunteer Header */}
//               <div className="p-4 flex justify-between items-center">
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{volunteer.volunteer.name}</h3>
//                   <p className="text-sm text-gray-700">{volunteer.assignedArea}</p>
//                   <p className="text-xs text-gray-500 mt-1">{volunteer.volunteer.email}</p>
//                   <div className="flex items-center gap-3 mt-2">
//                     <span className={`px-2 py-1 text-xs rounded-full ${
//                       volunteer.taskStatus === 'Pending'
//                         ? 'bg-yellow-100 text-yellow-800'
//                         : volunteer.taskStatus === 'Completed'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-blue-100 text-blue-800'
//                     }`}>
//                       {volunteer.taskStatus}
//                     </span>
//                     <span className="text-xs text-gray-500">• {volunteer.reportsCount} Reports submitted</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleToggleExpand(volunteer.volunteer.accountId)}
//                   className="text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   {expandedVolunteerId === volunteer.volunteer.accountId ? (
//                     <ChevronUp className="w-5 h-5" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>

//               {/* Expanded Section */}
//               {expandedVolunteerId === volunteer.volunteer.accountId && (
//                 <div className="border-t border-gray-200 p-4 pt-3">
//                   <h4 className="text-sm font-medium text-gray-800 mb-3">Recent Reports</h4>
//                   {volunteer.recentReports && volunteer.recentReports.length > 0 ? (
//                     volunteer.recentReports.map((report) => (
//                       <div
//                         key={report._id}
//                         className="bg-teal-50 border border-teal-200 rounded-md p-3 mb-3 flex justify-between items-start"
//                       >
//                         <div>
//                           <h5 className="font-semibold text-gray-900 text-sm">{report.title}</h5>
//                           <p className="text-xs text-gray-700 mt-1 line-clamp-2">{report.summary}</p>
//                           <p className="text-xs text-gray-500 mt-1">{report.date}</p>
//                         </div>
//                         <button
//                           onClick={() => handleViewReport(report)}
//                           className="text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded border border-teal-300"
//                         >
//                           View Report
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">No reports yet.</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
//         <div className="flex items-center gap-2">
//           <span>Showing</span>
//           <select 
//             value={limit} 
//             onChange={(e) => {
//               setLimit(Number(e.target.value));
//               setPage(1);
//             }}
//             className="border rounded px-2 py-1"
//           >
//             <option value="6">6</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//           </select>
//           <span>of {meta.total}</span>
//         </div>
//         <div className="flex gap-1">
//           {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
//             <button
//               key={pageNum}
//               onClick={() => setPage(pageNum)}
//               className={`px-3 py-1 rounded ${
//                 page === pageNum
//                   ? 'bg-teal-500 text-white'
//                   : 'bg-white border border-gray-300 hover:bg-gray-50'
//               }`}
//             >
//               {pageNum}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       {showAddTaskModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Assign Task</h2>
//                 <button
//                   onClick={handleCloseAddTaskModal}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmitTask}>
//                 {/* Upload Reference Image */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image</label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
//                     {imagePreview ? (
//                       <div className="relative">
//                         <img 
//                           src={imagePreview} 
//                           alt="Preview" 
//                           className="max-h-48 mx-auto rounded"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setReferenceImage(null);
//                             setImagePreview(null);
//                             setImageUrl('');
//                           }}
//                           className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center">
//                         <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
//                         <p className="text-sm text-gray-600 mb-1">Upload Reference Image</p>
//                         <p className="text-xs text-gray-400 mb-3">Optional: Add a reference image for the task</p>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="hidden"
//                           id="task-image-upload"
//                         />
//                         <label 
//                           htmlFor="task-image-upload"
//                           className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-md cursor-pointer hover:bg-teal-100 transition-colors"
//                         >
//                           <Upload className="w-4 h-4" />
//                           Choose File
//                         </label>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Upload Button if new image selected */}
//                   {referenceImage && !imageUrl && (
//                     <button
//                       type="button"
//                       onClick={handleUploadImage}
//                       disabled={isUploading}
//                       className="mt-2 w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50 transition-colors"
//                     >
//                       {isUploading ? 'Uploading...' : 'Upload Image to Server'}
//                     </button>
//                   )}
                  
//                   {imageUrl && (
//                     <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
//                       <span className="w-2 h-2 bg-green-600 rounded-full"></span>
//                       Image uploaded successfully
//                     </p>
//                   )}
//                 </div>

//                 {/* Email Dropdown */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Volunteer Email <span className="text-red-500">*</span>
//                   </label>
//                   {emailsLoading ? (
//                     <div className="text-sm text-gray-500">Loading emails...</div>
//                   ) : (
//                     <select
//                       value={selectedEmail}
//                       onChange={(e) => setSelectedEmail(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     >
//                       <option value="">Select volunteer email</option>
//                       {volunteerEmails.map((volunteer, index) => (
//                         <option key={index} value={volunteer.email}>
//                           {volunteer.email} - {volunteer.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </div>

//                 {/* Task Title */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Task Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={taskTitle}
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                     placeholder="e.g., Manage Registration Desk"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   />
//                 </div>

//                 {/* Task Time & Date */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Task Time <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="time"
//                       value={taskTime}
//                       onChange={(e) => setTaskTime(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Date <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="date"
//                       value={taskDate}
//                       onChange={(e) => setTaskDate(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Location <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       placeholder="e.g., Main Entrance Hall"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     />
//                     <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Task Instruction */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Task Instruction <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={instruction}
//                     onChange={(e) => setInstruction(e.target.value)}
//                     placeholder="Add task instructions..."
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   ></textarea>
//                   <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
//                     <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">B</button>
//                     <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">I</button>
//                     <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">U</button>
//                     <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">Link</button>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? 'Assigning Task...' : 'Assign Task'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Report Modal */}
//       {selectedReport && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Report Details</h2>
//                 <button
//                   onClick={handleCloseReportModal}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="bg-teal-50 border border-teal-200 rounded-md p-4">
//                 <h3 className="font-semibold text-gray-900">{selectedReport.title}</h3>
//                 <p className="text-sm text-gray-700 mt-2">{selectedReport.summary}</p>
//                 <p className="text-xs text-gray-500 mt-2">{selectedReport.date}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VolunteerManagementPage;




import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Calendar, MapPin, Search, Upload, Image as ImageIcon, Clock, User, Mail, Tag, AlertCircle } from 'lucide-react';
import { useAssignTaskMutation, useGetTaskByIdQuery, useGetTaskQuery, useGetVoluntearEamilQuery} from '../../redux/features/taskSlice/taskSlice';
 
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import toast from 'react-hot-toast';
import { useUploadFileMutation } from '../../redux/features/fileUpload';

const VolunteerManagementPage = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [expandedVolunteerId, setExpandedVolunteerId] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Form state
  const [selectedEmail, setSelectedEmail] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [location, setLocation] = useState('');
  const [instruction, setInstruction] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { eventId } = useSelectedEvent();
  console.log('Event ID:', eventId);

  const { data: taskData, isLoading: tasksLoading, refetch } = useGetTaskQuery({ eventId, page, limit });
  console.log('Task Data:', taskData);

  const { data: volunteerEmailData, isLoading: emailsLoading } = useGetVoluntearEamilQuery(eventId);
  console.log('Volunteer Email Data:', volunteerEmailData);

  // Fetch report details when selectedReportId changes
  console.log(selectedReportId)
  const {  reportData, isLoading: reportLoading } = useGetTaskByIdQuery(selectedReportId);
  console.log('Report Details:', reportData);

  const [assignTask] = useAssignTaskMutation();
  const [uploadFile] = useUploadFileMutation();

  // Extract data from API responses
  const volunteers = taskData?.data?.data || [];
  const volunteerEmails = volunteerEmailData?.data || [];
  const meta = taskData?.data?.meta || { total: 0, page: 1, limit: 10 };

  // Handlers
  const handleAddTaskClick = () => {
    setShowAddTaskModal(true);
  };

  const handleToggleExpand = (id) => {
    setExpandedVolunteerId(expandedVolunteerId === id ? null : id);
  };

  const handleViewReport = (reportId) => {
    setSelectedReportId(reportId);
    setShowReportDetailsModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportDetailsModal(false);
    setSelectedReportId(null);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
    // Reset form
    setSelectedEmail('');
    setTaskTitle('');
    setTaskTime('');
    setTaskDate('');
    setLocation('');
    setInstruction('');
    setReferenceImage(null);
    setImagePreview(null);
    setImageUrl('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReferenceImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    if (!referenceImage) {
      toast.error('Please select an image first');
      return null;
    }

    setIsUploading(true);
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', referenceImage);
      fileFormData.append('type', 'task_reference');

      // Console log file and type as requested
      console.log('Uploading File:', referenceImage);
      console.log('Upload Type:', 'task_reference');

      const attachmentResult = await uploadFile(fileFormData).unwrap();

      if (!attachmentResult?.success || !attachmentResult?.data?.url) {
        toast.error(attachmentResult?.message || 'File upload failed.');
        return null;
      }

      const uploadedUrl = attachmentResult.data.url;
      console.log('Uploaded Image URL:', uploadedUrl);
      setImageUrl(uploadedUrl);
      toast.success('Image uploaded successfully');
      return uploadedUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error?.data?.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedEmail) {
      toast.error('Please select a volunteer email');
      return;
    }
    if (!taskTitle) {
      toast.error('Please enter task title');
      return;
    }
    if (!taskDate) {
      toast.error('Please select task date');
      return;
    }
    if (!taskTime) {
      toast.error('Please enter task time');
      return;
    }
    if (!location) {
      toast.error('Please enter location');
      return;
    }
    if (!instruction) {
      toast.error('Please enter task instruction');
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = imageUrl;

      // Upload image if new one selected
      if (referenceImage && !imageUrl) {
        finalImageUrl = await handleUploadImage();
        if (!finalImageUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare task data
      const taskData = {
        eventId: eventId,
        volunteerEmail: selectedEmail,
        title: taskTitle,
        date: taskDate,
        time: taskTime,
        location: location,
        instruction: instruction,
        referenceImage: finalImageUrl
      };

      // Console log final data
      console.log('Creating Task with Data:', taskData);

      const result = await assignTask(taskData).unwrap();

      if (result.success) {
        toast.success('Task assigned successfully');
        handleCloseAddTaskModal();
        refetch();
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      toast.error(error?.data?.message || 'Failed to assign task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Volunteer Management</h1>
          <p className="text-sm text-gray-600">Assign tasks and view reports</p>
        </div>
        <button
          onClick={handleAddTaskClick}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <span>+</span> Assign Task
        </button>
      </div>

      {/* Volunteers List */}
      <div className="space-y-4">
        {tasksLoading ? (
          <div className="text-center py-10 text-gray-500">Loading volunteers...</div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No volunteers found</div>
        ) : (
          volunteers.map((volunteer) => (
            <div key={volunteer.volunteer.accountId} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Volunteer Header */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{volunteer.volunteer.name}</h3>
                  <p className="text-sm text-gray-700">{volunteer.assignedArea}</p>
                  <p className="text-xs text-gray-500 mt-1">{volunteer.volunteer.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      volunteer.taskStatus === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : volunteer.taskStatus === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {volunteer.taskStatus}
                    </span>
                    <span className="text-xs text-gray-500">• {volunteer.reportsCount} Reports submitted</span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleExpand(volunteer.volunteer.accountId)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {expandedVolunteerId === volunteer.volunteer.accountId ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Expanded Section */}
              {expandedVolunteerId === volunteer.volunteer.accountId && (
                <div className="border-t border-gray-200 p-4 pt-3">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">Recent Reports</h4>
                  {volunteer.recentReports && volunteer.recentReports.length > 0 ? (
                    volunteer.recentReports.map((report) => (
                      <div
                        key={report._id}
                        className="bg-teal-50 border border-teal-200 rounded-md p-3 mb-3 flex justify-between items-start"
                      >
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">{report.title}</h5>
                          <p className="text-xs text-gray-700 mt-1 line-clamp-2">{report.summary}</p>
                          <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                        </div>
                        <button
                          onClick={() => handleViewReport(report._id)}
                          className="text-teal-600 hover:text-teal-800 text-sm font-medium px-3 py-1 rounded border border-teal-300"
                        >
                          View Report
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No reports yet.</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <select 
            value={limit} 
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span>of {meta.total}</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 rounded ${
                page === pageNum
                  ? 'bg-teal-500 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Assign Task</h2>
                <button
                  onClick={handleCloseAddTaskModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitTask}>
                {/* Upload Reference Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-48 mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setReferenceImage(null);
                            setImagePreview(null);
                            setImageUrl('');
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Upload Reference Image</p>
                        <p className="text-xs text-gray-400 mb-3">Optional: Add a reference image for the task</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="task-image-upload"
                        />
                        <label 
                          htmlFor="task-image-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-md cursor-pointer hover:bg-teal-100 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Button if new image selected */}
                  {referenceImage && !imageUrl && (
                    <button
                      type="button"
                      onClick={handleUploadImage}
                      disabled={isUploading}
                      className="mt-2 w-full px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50 transition-colors"
                    >
                      {isUploading ? 'Uploading...' : 'Upload Image to Server'}
                    </button>
                  )}
                  
                  {imageUrl && (
                    <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Image uploaded successfully
                    </p>
                  )}
                </div>

                {/* Email Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volunteer Email <span className="text-red-500">*</span>
                  </label>
                  {emailsLoading ? (
                    <div className="text-sm text-gray-500">Loading emails...</div>
                  ) : (
                    <select
                      value={selectedEmail}
                      onChange={(e) => setSelectedEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    >
                      <option value="">Select volunteer email</option>
                      {volunteerEmails.map((volunteer, index) => (
                        <option key={index} value={volunteer.email}>
                          {volunteer.email} - {volunteer.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Task Title */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g., Manage Registration Desk"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {/* Task Time & Date */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={taskTime}
                      onChange={(e) => setTaskTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Main Entrance Hall"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Task Instruction */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Instruction <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder="Add task instructions..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  ></textarea>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">B</button>
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">I</button>
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">U</button>
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">Link</button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Assigning Task...' : 'Assign Task'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Report Details Modal */}
      {showReportDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Report Details</h2>
                <button
                  onClick={handleCloseReportModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {reportLoading ? (
                <div className="text-center py-10 text-gray-500">Loading report details...</div>
              ) : reportData?.data ? (
                <div className="space-y-6">
                  {/* Urgency & Category Badges */}
                  <div className="flex gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(reportData.data.urgency)}`}>
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      {reportData.data.urgency} Urgency
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <Tag className="w-4 h-4 inline mr-1" />
                      {reportData.data.category}
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {reportData.data.description}
                    </p>
                  </div>

                  {/* Images */}
                  {reportData.data.images && reportData.data.images.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Attached Images</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {reportData.data.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`Report image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Volunteer Information */}
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Volunteer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium text-gray-900">{reportData.data.volunteer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">{reportData.data.volunteer.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Task Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Task Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Task Title:</span>
                        <p className="font-medium text-gray-900 mt-1">{reportData.data.task.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-900">{reportData.data.task.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">{reportData.data.task.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900">{reportData.data.task.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Date */}
                  <div className="text-xs text-gray-500 border-t pt-4">
                    <span>Report Created: {reportData.data.createdAt}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-red-500">Failed to load report details</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerManagementPage;