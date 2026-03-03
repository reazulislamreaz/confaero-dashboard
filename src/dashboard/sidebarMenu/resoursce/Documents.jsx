



// import React, { useState, useRef } from 'react';
// import {
//   Upload, Search, Filter, Trash2, Eye,
//   ChevronLeft, ChevronRight, X, FileText,
//   Calendar, User, Tag, ExternalLink,
//   CheckCircle, Clock, XCircle, Paperclip,
// } from 'lucide-react';
// import {
//   useDeleteDocumentMutation,
//   useGetDocumentDetailsQuery,
//   useGetDocumentsQuery,
//   useGetPendingDocumentsQuery,
//   useUploadDocumentMutation,
// } from '../../../redux/features/resourcec/resourcesSlice';
// import { useSelectedEvent } from '../../../hooks/useSelectedEvent';
// import { Popconfirm } from 'antd';
// import toast from 'react-hot-toast';

// export default function DocumentManagement() {
//   const [activeFilter, setActiveFilter]         = useState('All');
//   const [searchQuery, setSearchQuery]           = useState('');
//   const [currentPage, setCurrentPage]           = useState(1);
//   const [itemsPerPage, setItemsPerPage]         = useState(6);
//   const [showUploadModal, setShowUploadModal]   = useState(false);
//   const [documentId, setDocumentId]             = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [isSubmitting, setIsSubmitting]         = useState(false);
//   const [uploadForm, setUploadForm]             = useState({
//     documentType: 'Events',
//     documentName: '',
//     documentFile: null,
//   });

//   const fileInputRef = useRef();
//   const { eventId }  = useSelectedEvent();

//   const { data: documentDetailsData, isLoading: detailsLoading } = useGetDocumentDetailsQuery(
//     { eventId, id: documentId },
//     { skip: !documentId }
//   );
//   const { data: documentsData, isLoading, isError } = useGetDocumentsQuery(
//     { eventId, page: currentPage, limit: itemsPerPage },
//     { skip: !eventId || activeFilter !== 'All' }
//   );
//   const { data: pendingDocumentsData, isLoading: pendingLoading, isError: pendingError } = useGetPendingDocumentsQuery(
//     { eventId },
//     { skip: !eventId || activeFilter !== 'Pending' }
//   );
//   const [uploadDocument] = useUploadDocumentMutation();
//   const [deleteDocument] = useDeleteDocumentMutation();

//   const activeData = activeFilter === 'Pending' ? pendingDocumentsData : documentsData;
//   const documents  = activeData?.data?.data ?? [];
//   const meta       = activeData?.data?.meta ?? { page: 1, limit: itemsPerPage, total: 0 };
//   const totalPages = Math.ceil(meta.total / itemsPerPage);
//   const details    = documentDetailsData?.data;

//   const filteredDocuments = documents.filter(doc =>
//     doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     doc.documentType.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const capitalize     = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
//   const formatRole     = (role) => role ? role.charAt(0) + role.slice(1).toLowerCase() : 'Unknown';
//   const formatDate     = (iso)  => iso  ? new Date(iso).toLocaleDateString('en-CA').replace(/-/g, '/') : '—';
//   const formatDateLong = (iso)  => iso
//     ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
//     : '—';

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'approved': return 'text-teal-600';
//       case 'rejected': return 'text-red-600';
//       case 'pending':  return 'text-orange-600';
//       default:         return 'text-gray-600';
//     }
//   };
//   const getUploadedByBadge = (role) => {
//     switch (role?.toUpperCase()) {
//       case 'ORGANIZER': return 'bg-gray-100 text-gray-700';
//       case 'SPEAKER':   return 'bg-blue-100 text-blue-700';
//       case 'MODERATOR': return 'bg-purple-100 text-purple-700';
//       default:          return 'bg-gray-100 text-gray-700';
//     }
//   };
//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'approved': return { bg: 'bg-teal-50 border border-teal-200',     text: 'text-teal-700',   icon: <CheckCircle className="w-4 h-4" /> };
//       case 'rejected': return { bg: 'bg-red-50 border border-red-200',       text: 'text-red-700',    icon: <XCircle className="w-4 h-4" /> };
//       case 'pending':  return { bg: 'bg-orange-50 border border-orange-200', text: 'text-orange-700', icon: <Clock className="w-4 h-4" /> };
//       default:         return { bg: 'bg-gray-50 border border-gray-200',     text: 'text-gray-700',   icon: null };
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await deleteDocument(id).unwrap();
//       if (res.success === true) toast.success('Document deleted successfully');
//     } catch (err) {
//       toast.error('Failed to delete document.');
//     }
//   };

//   const handleView = (id) => { setDocumentId(id); setShowDetailsModal(true); };
//   const handleCloseDetails = () => { setShowDetailsModal(false); setDocumentId(null); };
//   const handleFilterChange = (filter) => { setActiveFilter(filter); setCurrentPage(1); };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     e.target.value = '';
//     if (file) setUploadForm((p) => ({ ...p, documentFile: file }));
//   };

//   const resetForm = () => setUploadForm({ documentType: 'Events', documentName: '', documentFile: null });

//   const handleUploadSubmit = async (e) => {
//     console.log(uploadForm);
//     e.preventDefault();
//     if (!uploadForm.documentName.trim()) { toast.error('Document name is required.'); return; }
//     if (!uploadForm.documentFile)        { toast.error('Please select a file.');       return; }

//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('documentType', uploadForm.documentType);
//       formData.append('documentName', uploadForm.documentName.trim());
//       formData.append('file', uploadForm.documentFile);

//       const result = await uploadDocument({ eventId, formData });
//       if (result?.data?.success === true) {
//         toast.success('Document uploaded successfully!');
//         setShowUploadModal(false);
//         resetForm();
//       } else {
//         toast.error(result?.error?.data?.message || 'Failed to upload document.');
//       }
//     } catch {
//       toast.error('An unexpected error occurred.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isLoadingAny = isLoading || pendingLoading;
//   const isErrorAny   = isError   || pendingError;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="">

//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold text-gray-800 mb-1">Documents</h1>
//           <p className="text-gray-500 text-sm">Upload and manage event documents</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex gap-3">
//               {['All', 'Pending'].map((filter) => (
//                 <button key={filter} onClick={() => handleFilterChange(filter)}
//                   className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//                     activeFilter === filter ? 'bg-[#5BB8AE] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}>
//                   {filter}
//                 </button>
//               ))}
//             </div>
//             <button onClick={() => setShowUploadModal(true)}
//               className="flex items-center gap-2 px-6 py-2 bg-[#5BB8AE] text-white rounded-lg hover:bg-teal-700 transition-colors">
//               <Upload className="w-4 h-4" /> Upload Document
//             </button>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex-1 relative">
//               <input type="text" placeholder="Search by document name" value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             </div>
//             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Filter className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-teal-50">
//                 <tr>
//                   {['Document Name','Uploaded by','Status','Type','Date','Actions'].map(h => (
//                     <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {isLoadingAny ? (
//                   <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">Loading documents...</td></tr>
//                 ) : isErrorAny ? (
//                   <tr><td colSpan={6} className="px-6 py-10 text-center text-red-500 text-sm">Failed to load documents.</td></tr>
//                 ) : filteredDocuments.length === 0 ? (
//                   <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">No documents found.</td></tr>
//                 ) : filteredDocuments.map((doc) => (
//                   <tr key={doc._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
//                           <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
//                           </svg>
//                         </div>
//                         <span className="text-sm text-gray-800">{doc.documentName}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getUploadedByBadge(doc.uploadedBy?.activeRole)}`}>
//                         {formatRole(doc.uploadedBy?.activeRole)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>{capitalize(doc.status)}</span>
//                     </td>
//                     <td className="px-6 py-4"><span className="text-sm text-gray-800">{doc.documentType}</span></td>
//                     <td className="px-6 py-4"><span className="text-sm text-gray-600">{formatDate(doc.createdAt)}</span></td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <Popconfirm title="Are you sure you want to delete this document?" onConfirm={() => handleDelete(doc._id)} okText="Yes" cancelText="No">
//                           <button className="p-1 text-gray-600 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
//                         </Popconfirm>
//                         <button onClick={() => handleView(doc._id)} className="p-1 text-gray-600 hover:text-teal-600 transition-colors">
//                           <Eye className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>Showing</span>
//               <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
//                 className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
//                 {[6,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
//               </select>
//               <span>of {meta.total}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed">
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               {[...Array(totalPages)].map((_, i) => {
//                 const page = i + 1;
//                 if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
//                   return (
//                     <button key={page} onClick={() => setCurrentPage(page)}
//                       className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
//                         currentPage === page ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                       }`}>
//                       {page}
//                     </button>
//                   );
//                 }
//                 if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="px-1 text-gray-400">...</span>;
//                 return null;
//               })}
//               <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
//                 className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed">
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* ── Upload Modal (inlined — not a sub-component, fixes focus loss) ── */}
//       {showUploadModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-xl font-semibold text-gray-800">Add Document</h2>
//               <button onClick={() => { setShowUploadModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleUploadSubmit} className="space-y-4">

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
//                 <select value={uploadForm.documentType}
//                   onChange={(e) => setUploadForm((p) => ({ ...p, documentType: e.target.value }))}
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-800">
//                   {['Events','Abstracts','Booklet','Floor maps','Workshops','Panels','Demos','Q&A','Posters','Networking','Research papers'].map(t => (
//                     <option key={t} value={t}>{t}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Document Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={uploadForm.documentName}
//                   onChange={(e) => setUploadForm((p) => ({ ...p, documentName: e.target.value }))}
//                   placeholder="Enter document name"
//                   className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   File <span className="text-red-500">*</span>
//                 </label>
//                 <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
//                 {uploadForm.documentFile ? (
//                   <div className="flex items-center gap-2 px-3 py-2.5 border border-teal-200 bg-teal-50 rounded-lg">
//                     <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center shrink-0">
//                       <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
//                       </svg>
//                     </div>
//                     <span className="text-sm text-teal-700 truncate flex-1">{uploadForm.documentFile.name}</span>
//                     <button type="button" onClick={() => setUploadForm((p) => ({ ...p, documentFile: null }))}
//                       className="text-teal-400 hover:text-red-500 transition-colors shrink-0">
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <button type="button" onClick={() => fileInputRef.current.click()}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors">
//                     <Paperclip className="w-4 h-4" /> Click to select file
//                   </button>
//                 )}
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button type="button" onClick={() => { setShowUploadModal(false); resetForm(); }}
//                   className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={isSubmitting}
//                   className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
//                   {isSubmitting ? (
//                     <>
//                       <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
//                         <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                       </svg>
//                       Uploading...
//                     </>
//                   ) : 'Submit'}
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── Details Modal ── */}
//       {showDetailsModal && (() => {
//         const statusBadge = getStatusBadge(details?.status);
//         return (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
//               <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-5">
//                 <div className="flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
//                       <FileText className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h2 className="text-white font-semibold text-lg leading-tight">
//                         {detailsLoading ? 'Loading...' : details?.documentName ?? '—'}
//                       </h2>
//                       <p className="text-teal-100 text-sm mt-0.5">Document Details</p>
//                     </div>
//                   </div>
//                   <button onClick={handleCloseDetails} className="text-white/70 hover:text-white transition-colors mt-0.5">
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="px-6 py-5">
//                 {detailsLoading ? (
//                   <div className="flex items-center justify-center py-10 text-gray-400 text-sm">Loading document details...</div>
//                 ) : !details ? (
//                   <div className="flex items-center justify-center py-10 text-red-400 text-sm">Failed to load document details.</div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
//                       {statusBadge.icon}{capitalize(details.status)}
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 pt-1">
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Tag className="w-3 h-3" /> Document Type</p>
//                         <p className="text-sm text-gray-800 font-medium">{details.documentType}</p>
//                       </div>
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><User className="w-3 h-3" /> Uploaded By</p>
//                         <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getUploadedByBadge(details.uploadedBy?.activeRole)}`}>
//                           {formatRole(details.uploadedBy?.activeRole)}
//                         </span>
//                         {details.uploadedBy?.email && <p className="text-xs text-gray-500">{details.uploadedBy.email}</p>}
//                       </div>
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Uploaded On</p>
//                         <p className="text-sm text-gray-800">{formatDateLong(details.createdAt)}</p>
//                       </div>
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Last Updated</p>
//                         <p className="text-sm text-gray-800">{formatDateLong(details.updatedAt)}</p>
//                       </div>
//                     </div>
//                     {details.documentUrl && (
//                       <div className="pt-1 space-y-1">
//                         <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Document File</p>
//                         <a href={details.documentUrl} target="_blank" rel="noopener noreferrer"
//                           className="flex items-center gap-2 w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-sm font-medium hover:bg-teal-100 transition-colors group">
//                           <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center shrink-0">
//                             <svg className="w-3.5 h-3.5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
//                               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
//                             </svg>
//                           </div>
//                           <span className="truncate flex-1">{details.documentName}</span>
//                           <ExternalLink className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
//                 <button onClick={handleCloseDetails}
//                   className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })()}

//     </div>
//   );
// }


import React, { useState, useRef } from 'react';
import {
  Upload, Search, Filter, Trash2, Eye,
  ChevronLeft, ChevronRight, X, FileText,
  Calendar, User, Tag, ExternalLink,
  CheckCircle, Clock, XCircle, Paperclip,
} from 'lucide-react';
import {
  useDeleteDocumentMutation,
  useGetDocumentDetailsQuery,
  useGetDocumentsQuery,
  useGetPendingDocumentsQuery,
  useUploadDocumentMutation,
 
} from '../../../redux/features/resourcec/resourcesSlice';
import { useSelectedEvent } from '../../../hooks/useSelectedEvent';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';
import { useUploadFileMutation } from '../../../redux/features/fileUpload';

export default function DocumentManagement() {
  const [activeFilter, setActiveFilter]         = useState('All');
  const [searchQuery, setSearchQuery]           = useState('');
  const [currentPage, setCurrentPage]           = useState(1);
  const [itemsPerPage, setItemsPerPage]         = useState(6);
  const [showUploadModal, setShowUploadModal]   = useState(false);
  const [documentId, setDocumentId]             = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [uploadForm, setUploadForm]             = useState({
    documentType: 'Events',
    documentName: '',
    documentFile: null,
  });

  const fileInputRef = useRef();
  const { eventId }  = useSelectedEvent();

  const { data: documentDetailsData, isLoading: detailsLoading } = useGetDocumentDetailsQuery(
    { eventId, id: documentId },
    { skip: !documentId }
  );
  const { data: documentsData, isLoading, isError } = useGetDocumentsQuery(
    { eventId, page: currentPage, limit: itemsPerPage },
    { skip: !eventId || activeFilter !== 'All' }
  );
  const { data: pendingDocumentsData, isLoading: pendingLoading, isError: pendingError } = useGetPendingDocumentsQuery(
    { eventId },
    { skip: !eventId || activeFilter !== 'Pending' }
  );

  const [uploadChatAttachment] = useUploadFileMutation(); // ← STEP 1 mutation
  const [uploadDocument]       = useUploadDocumentMutation();       // ← STEP 2 mutation
  const [deleteDocument]       = useDeleteDocumentMutation();

  const activeData = activeFilter === 'Pending' ? pendingDocumentsData : documentsData;
  const documents  = activeData?.data?.data ?? [];
  const meta       = activeData?.data?.meta ?? { page: 1, limit: itemsPerPage, total: 0 };
  const totalPages = Math.ceil(meta.total / itemsPerPage);
  const details    = documentDetailsData?.data;

  const filteredDocuments = documents.filter(doc =>
    doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.documentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const capitalize     = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  const formatRole     = (role) => role ? role.charAt(0) + role.slice(1).toLowerCase() : 'Unknown';
  const formatDate     = (iso)  => iso  ? new Date(iso).toLocaleDateString('en-CA').replace(/-/g, '/') : '—';
  const formatDateLong = (iso)  => iso
    ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'text-teal-600';
      case 'rejected': return 'text-red-600';
      case 'pending':  return 'text-orange-600';
      default:         return 'text-gray-600';
    }
  };
  const getUploadedByBadge = (role) => {
    switch (role?.toUpperCase()) {
      case 'ORGANIZER': return 'bg-gray-100 text-gray-700';
      case 'SPEAKER':   return 'bg-blue-100 text-blue-700';
      case 'MODERATOR': return 'bg-purple-100 text-purple-700';
      default:          return 'bg-gray-100 text-gray-700';
    }
  };
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return { bg: 'bg-teal-50 border border-teal-200',     text: 'text-teal-700',   icon: <CheckCircle className="w-4 h-4" /> };
      case 'rejected': return { bg: 'bg-red-50 border border-red-200',       text: 'text-red-700',    icon: <XCircle className="w-4 h-4" /> };
      case 'pending':  return { bg: 'bg-orange-50 border border-orange-200', text: 'text-orange-700', icon: <Clock className="w-4 h-4" /> };
      default:         return { bg: 'bg-gray-50 border border-gray-200',     text: 'text-gray-700',   icon: null };
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteDocument(id).unwrap();
      if (res.success === true) toast.success('Document deleted successfully');
    } catch (err) {
      toast.error('Failed to delete document.');
    }
  };

  const handleView         = (id) => { setDocumentId(id); setShowDetailsModal(true); };
  const handleCloseDetails = ()   => { setShowDetailsModal(false); setDocumentId(null); };
  const handleFilterChange = (filter) => { setActiveFilter(filter); setCurrentPage(1); };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (file) setUploadForm((p) => ({ ...p, documentFile: file }));
  };

  const resetForm = () => setUploadForm({ documentType: 'Events', documentName: '', documentFile: null });

  // ─────────────────────────────────────────────────────────────
  // TWO-STEP UPLOAD
  //  Step 1 → POST /upload/chat-attachment  (multipart, key: "file")
  //            returns { success, data: { url, name, size, mimeType } }
  //  Step 2 → POST /document/{eventId}      (JSON)
  //            body: { documentType, documentUrl, documentName }
  // ─────────────────────────────────────────────────────────────
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.documentName.trim()) { toast.error('Document name is required.'); return; }
    if (!uploadForm.documentFile)        { toast.error('Please select a file.');       return; }

    setIsSubmitting(true);
    try {
      // ── Step 1: upload file → get back CDN url ──
      const fileFormData = new FormData();
      fileFormData.append('file', uploadForm.documentFile);

      const attachmentResult = await uploadChatAttachment(fileFormData).unwrap();

      if (!attachmentResult?.success || !attachmentResult?.data?.url) {
        toast.error(attachmentResult?.message || 'File upload failed.');
        return;
      }

      const documentUrl = attachmentResult.data.url;
      console.log(documentUrl)

      // ── Step 2: create document record with the returned URL ──
      const result = await uploadDocument({
        eventId,
        body: {
          documentType: uploadForm.documentType,
          documentName: uploadForm.documentName.trim(),
          documentUrl,
        },
      }).unwrap();

      if (result?.success === true) {
        toast.success('Document uploaded successfully!');
        setShowUploadModal(false);
        resetForm();
      } else {
        toast.error(result?.message || 'Failed to create document.');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoadingAny = isLoading || pendingLoading;
  const isErrorAny   = isError   || pendingError;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Documents</h1>
          <p className="text-gray-500 text-sm">Upload and manage event documents</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3">
              {['All', 'Pending'].map((filter) => (
                <button key={filter} onClick={() => handleFilterChange(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter ? 'bg-[#5BB8AE] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {filter}
                </button>
              ))}
            </div>
            <button onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-[#5BB8AE] text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Upload className="w-4 h-4" /> Upload Document
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input type="text" placeholder="Search by document name" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-50">
                <tr>
                  {['Document Name','Uploaded by','Status','Type','Date','Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoadingAny ? (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">Loading documents...</td></tr>
                ) : isErrorAny ? (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-red-500 text-sm">Failed to load documents.</td></tr>
                ) : filteredDocuments.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">No documents found.</td></tr>
                ) : filteredDocuments.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-800">{doc.documentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getUploadedByBadge(doc.uploadedBy?.activeRole)}`}>
                        {formatRole(doc.uploadedBy?.activeRole)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>{capitalize(doc.status)}</span>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-800">{doc.documentType}</span></td>
                    <td className="px-6 py-4"><span className="text-sm text-gray-600">{formatDate(doc.createdAt)}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Popconfirm title="Are you sure you want to delete this document?" onConfirm={() => handleDelete(doc._id)} okText="Yes" cancelText="No">
                          <button className="p-1 text-gray-600 hover:text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </Popconfirm>
                        <button onClick={() => handleView(doc._id)} className="p-1 text-gray-600 hover:text-teal-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                {[6,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span>of {meta.total}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        currentPage === page ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                      {page}
                    </button>
                  );
                }
                if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="px-1 text-gray-400">...</span>;
                return null;
              })}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Upload Modal ── */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800">Add Document</h2>
              <button onClick={() => { setShowUploadModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
                <select value={uploadForm.documentType}
                  onChange={(e) => setUploadForm((p) => ({ ...p, documentType: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-gray-800">
                  {['Events','Abstracts','Booklet','Floor maps','Workshops','Panels','Demos','Q&A','Posters','Networking','Research papers'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={uploadForm.documentName}
                  onChange={(e) => setUploadForm((p) => ({ ...p, documentName: e.target.value }))}
                  placeholder="Enter document name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  File <span className="text-red-500">*</span>
                </label>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                {uploadForm.documentFile ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 border border-teal-200 bg-teal-50 rounded-lg">
                    <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-teal-700 truncate flex-1">{uploadForm.documentFile.name}</span>
                    <button type="button" onClick={() => setUploadForm((p) => ({ ...p, documentFile: null }))}
                      className="text-teal-400 hover:text-red-500 transition-colors shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-colors">
                    <Paperclip className="w-4 h-4" /> Click to select file
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowUploadModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Uploading...
                    </>
                  ) : 'Submit'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ── Details Modal ── */}
      {showDetailsModal && (() => {
        const statusBadge = getStatusBadge(details?.status);
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-semibold text-lg leading-tight">
                        {detailsLoading ? 'Loading...' : details?.documentName ?? '—'}
                      </h2>
                      <p className="text-teal-100 text-sm mt-0.5">Document Details</p>
                    </div>
                  </div>
                  <button onClick={handleCloseDetails} className="text-white/70 hover:text-white transition-colors mt-0.5">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-5">
                {detailsLoading ? (
                  <div className="flex items-center justify-center py-10 text-gray-400 text-sm">Loading document details...</div>
                ) : !details ? (
                  <div className="flex items-center justify-center py-10 text-red-400 text-sm">Failed to load document details.</div>
                ) : (
                  <div className="space-y-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                      {statusBadge.icon}{capitalize(details.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Tag className="w-3 h-3" /> Document Type</p>
                        <p className="text-sm text-gray-800 font-medium">{details.documentType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><User className="w-3 h-3" /> Uploaded By</p>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getUploadedByBadge(details.uploadedBy?.activeRole)}`}>
                          {formatRole(details.uploadedBy?.activeRole)}
                        </span>
                        {details.uploadedBy?.email && <p className="text-xs text-gray-500">{details.uploadedBy.email}</p>}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Uploaded On</p>
                        <p className="text-sm text-gray-800">{formatDateLong(details.createdAt)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Last Updated</p>
                        <p className="text-sm text-gray-800">{formatDateLong(details.updatedAt)}</p>
                      </div>
                    </div>
                    {details.documentUrl && (
                      <div className="pt-1 space-y-1">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Document File</p>
                        <a href={details.documentUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 w-full px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-lg text-teal-700 text-sm font-medium hover:bg-teal-100 transition-colors group">
                          <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            </svg>
                          </div>
                          <span className="truncate flex-1">{details.documentName}</span>
                          <ExternalLink className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button onClick={handleCloseDetails}
                  className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}