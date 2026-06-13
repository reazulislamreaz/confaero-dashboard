import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, X, Check, Eye, Edit2, FileText, ChevronLeft, ChevronRight, Edit, Delete, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetJobsQuery, useDeleteJobMutation, useUpdateJobStatusMutation } from '../../../redux/features/jobSlice/jobSlice';
import toast from 'react-hot-toast';
import { Popconfirm } from 'antd';
import TableSkeleton from '../../../components/loading/TableSkeleton';
import SubtitleSkeleton from '../../../components/loading/SubtitleSkeleton';
import SearchLoadingSpinner from '../../../components/loading/SearchLoadingSpinner';
import { useDashboardLoading } from '../../../hooks/useDashboardLoading';

export default function JobPostManagement() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('My Job');
    const [searchQuery, setSearchQuery] = useState('');
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const { data: jobsData, isLoading: jobsLoading, isFetching: jobsFetching, refetch } = useGetJobsQuery({ 
        page: currentPage, 
        limit: itemsPerPage,
        type: activeTab,
        search: searchQuery
    });
    
    const [deleteJob]       = useDeleteJobMutation();
    const [updateJobStatus] = useUpdateJobStatusMutation();

    // Extract jobs from API response
    const apiJobs = jobsData?.data?.data || [];
    const meta = jobsData?.data?.meta || { total: 0 };
    
    console.log('API Jobs:', apiJobs);

    const handleDelete = async (id) => {
        try {
            const result = await deleteJob(id).unwrap();
            if (result.success) {
                toast.success('Job deleted successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to delete job');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const result = await updateJobStatus({ id, status }).unwrap();
            if (result.success) {
                toast.success(`Job ${status.toLowerCase()} successfully`);
            }
        } catch (error) {
            toast.error(error?.data?.message || `Failed to update job status`);
        }
    };

    const handleEdit = (id) => {
        console.log('Edit job:', id);
        navigate(`editjob/${id}`);
    };

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setShowReviewModal(true);
    };

    const totalPages = Math.ceil((meta.total || apiJobs.length || 0) / itemsPerPage);
    const displayedJobs = apiJobs;
    const loading = useDashboardLoading(jobsLoading, jobsFetching);

    const getStatusColor = (status) => {
        return status === 'APPROVED' ? 'text-teal-600' : 'text-orange-600';
    };

    const getStatusBadgeColor = (status) => {
        return status === 'APPROVED' 
            ? 'bg-teal-100 text-teal-700' 
            : 'bg-orange-100 text-orange-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Job Post</h1>
                        <p className="text-gray-500 text-sm">
                            {loading ? (
                                <SubtitleSkeleton />
                            ) : (
                                'Create & review job postings'
                            )}
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate("create-job")}
                        className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Job Post
                    </button>
                </div>

                {/* Tabs and Search */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-3">
                            {['My Job', 'Review Job Post'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === tab
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search by title, company or location"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {loading ? (
                                <SearchLoadingSpinner className="absolute right-3 top-1/2 -translate-y-1/2" />
                            ) : (
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-600" />
                            )}
                        </div>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-teal-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <TableSkeleton rows={6} columns={6} />
                                ) : displayedJobs.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                                No jobs found
                                            </td>
                                        </tr>
                                    ) : (
                                        displayedJobs.map((job) => (
                                            <tr key={job._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-800">{job.title}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-800">{job.company}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-800">{job.location}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-800">{job.type}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-sm font-medium ${getStatusColor(job.status)}`}>
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleViewDetails(job)} className="p-1 text-gray-600 hover:text-teal-600 transition-colors" title="View Details">
                                                            <Eye className="w-5 h-5" />
                                                        </button>

                                                        {activeTab === 'Review Job Post' && job.status === 'PENDING' && (
                                                            <>
                                                                <button onClick={() => handleUpdateStatus(job._id, 'APPROVED')} className="p-1 text-gray-600 hover:text-teal-600 transition-colors" title="Approve">
                                                                    <Check className="w-5 h-5" />
                                                                </button>
                                                                <button onClick={() => handleUpdateStatus(job._id, 'REJECTED')} className="p-1 text-gray-600 hover:text-orange-600 transition-colors" title="Reject">
                                                                    <X className="w-5 h-5" />
                                                                </button>
                                                            </>
                                                        )}

                                                        {activeTab === 'My Job' && job.status === 'PENDING' && (
                                                            <button onClick={() => handleEdit(job._id)} className="p-1 text-gray-600 hover:text-blue-600 transition-colors" title="Edit">
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                        )}

                                                        <Popconfirm title="Delete Job" description="Are you sure you want to delete this job?" onConfirm={() => handleDelete(job._id)} okText="Yes, Delete" cancelText="Cancel" okButtonProps={{ danger: true }}>
                                                            <button className="p-1 text-gray-600 hover:text-red-600 transition-colors" title="Delete">
                                                                <Trash2 className="w-5 h-5" />
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
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="6">6</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <span>of {meta.total || 0}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            {[...Array(Math.min(5, totalPages))].map((_, index) => {
                                const page = index + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                                            currentPage === page
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Job Modal */}
            {showReviewModal && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Job Details</h2>
                            <button 
                                onClick={() => setShowReviewModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="space-y-6">
                                {/* Job Title */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedJob.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>{selectedJob.company}</span>
                                        <span>•</span>
                                        <span>{selectedJob.location}</span>
                                        <span>•</span>
                                        <span>{selectedJob.type}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedJob.status)}`}>
                                        {selectedJob.status}
                                    </span>
                                </div>

                                {/* Banner Image */}
                                {selectedJob.bannerImage && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                                        <img 
                                            src={selectedJob.bannerImage} 
                                            alt="Job Banner" 
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Job Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                        {selectedJob.description}
                                    </p>
                                </div>

                                {/* Requirements */}
                                {selectedJob.requirements && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {selectedJob.requirements}
                                        </p>
                                    </div>
                                )}

                                {/* Qualifications */}
                                {selectedJob.qualification && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {selectedJob.qualification}
                                        </p>
                                    </div>
                                )}

                                {/* Experience */}
                                {selectedJob.experience && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {selectedJob.experience}
                                        </p>
                                    </div>
                                )}

                                {/* Salary */}
                                {selectedJob.salary && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {selectedJob.salary}
                                        </p>
                                    </div>
                                )}

                                {/* Benefits */}
                                {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                                        <ul className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg">
                                            {selectedJob.benefits.map((benefit, index) => (
                                                <li key={index}>• {benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Location URL */}
                                {selectedJob.locationUrl && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location Map</label>
                                        <a 
                                            href={selectedJob.locationUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-teal-600 hover:text-teal-700"
                                        >
                                            View on Map →
                                        </a>
                                    </div>
                                )}

                                {/* Apply Link */}
                                {selectedJob.applyLink && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apply Link</label>
                                        <a 
                                            href={selectedJob.applyLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-teal-600 hover:text-teal-700"
                                        >
                                            Apply Now →
                                        </a>
                                    </div>
                                )}

                                {/* Job Expiry */}
                                {selectedJob.jobExpire && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Expires</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                            {new Date(selectedJob.jobExpire).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 justify-end p-6 border-t bg-gray-50">
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleEdit(selectedJob._id);
                                    setShowReviewModal(false);
                                }}
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                Edit Job
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}