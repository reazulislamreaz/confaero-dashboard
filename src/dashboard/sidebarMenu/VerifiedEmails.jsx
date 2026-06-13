<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Mail,
  FileUp,
  ShieldCheck,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useAddVerifyEmailsMutation,
  useUploadVerifyEmailCSVMutation,
  useDeleteVerifyEmailMutation,
} from "../../redux/features/verifyEmail/verifyEmailSlice";
import { useSelectedEvent } from "../../hooks/useSelectedEvent";
import { Popconfirm } from "antd";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../redux/api/baseUrl";

export default function VerifiedEmails() {
  const { eventId } = useSelectedEvent();
  const [emailInput, setEmailInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Data State
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPage: 1 });
  const [isLoading, setIsLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mutations
  const [addVerifyEmails] = useAddVerifyEmailsMutation();
  const [uploadCSV] = useUploadVerifyEmailCSVMutation();
  const [deleteEmail] = useDeleteVerifyEmailMutation();

  // Manual Fetch Logic
  const fetchEmails = async () => {
    if (!eventId) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const selectedEventId = localStorage.getItem("selectedEventId");
      const response = await axios.get(
        `${API_BASE_URL}/organizer/verify-email/list/${eventId}`,
        {
          params: { page: currentPage, limit: pageSize },
          headers: {
            Authorization: `Bearer ${token}`,
            eventid: selectedEventId,
          },
        },
      );

      // Log API response structure for verification
      console.log("Verified Email API Response:", response.data);

      // Backend nested format: response.data.data.data
      if (response.data?.success) {
        setVerifiedEmails(response.data.data.data || []);
        setMeta(response.data.data.meta || { total: 0, totalPage: 1 });
      }
    } catch (err) {
      console.error("Failed to fetch verified emails:", err);
      toast.error(
        err?.response?.data?.message || "Failed to load verified emails",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEmails();
    }
  }, [eventId, currentPage, pageSize]);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !eventId) return;

    const emails = emailInput
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e !== "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((e) => !emailRegex.test(e));

    if (invalidEmails.length > 0) {
      toast.error(`Invalid email(s): ${invalidEmails.join(", ")}`);
      return;
    }

    try {
      const res = await addVerifyEmails({ eventId, emails }).unwrap();
      if (res.success) {
        toast.success(res.message || "Emails added successfully");
        setEmailInput("");
        setCurrentPage(1);
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add emails");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !eventId) return;

    setIsUploading(true);
    try {
      const res = await uploadCSV({ eventId, file }).unwrap();
      if (res.success) {
        toast.success(res.message || "Emails uploaded successfully");
        setCurrentPage(1);
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (verifyEmailId) => {
    if (!eventId) return;
    try {
      const res = await deleteEmail({ eventId, verifyEmailId }).unwrap();
      if (res.success) {
        toast.success("Email removed from verified list");
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // Local filter for search query
  const filteredEmails = Array.isArray(verifiedEmails)
    ? verifiedEmails.filter((item) =>
        item.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!eventId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Please select an event first</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Attendee Email Verification
        </h1>
        <p className="text-gray-500 text-sm">
          Manage pre-verified attendee emails for this event
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Manual Add Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-teal-600" />
            <h2 className="font-semibold text-gray-800">Add Verified Emails</h2>
          </div>
          <form
            onSubmit={handleAddEmail}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Enter email addresses (separated by commas)"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all shadow-sm"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Emails
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400 italic">
            Separate multiple emails with commas (e.g. john@example.com,
            jane@example.com)
          </p>
        </div>

        {/* Bulk Upload Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="bg-teal-50 p-3 rounded-full mb-3">
            <FileUp className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="font-semibold text-gray-800 mb-1">Bulk Upload</h2>
          <p className="text-xs text-gray-500 mb-4 px-4">
            Upload a CSV file containing an 'email' column to verify attendees
            in bulk.
          </p>
          <div className="relative w-full">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <button
              className={`w-full py-2.5 px-4 rounded-lg border-2 border-dashed border-teal-100 text-teal-600 font-medium text-sm hover:bg-teal-50 transition-all flex items-center justify-center gap-2 ${isUploading ? "opacity-50" : ""}`}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileUp className="w-4 h-4" />
              )}
              {isUploading ? "Uploading..." : "Choose File"}
            </button>
          </div>
        </div>
      </div>

      {/* Email List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            Verified List
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {meta.total} Total
            </span>
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/10 text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Added Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right uppercase tracking-wider pr-10">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-20" />
                    <span className="text-sm">Loading verified emails...</span>
                  </td>
                </tr>
              ) : filteredEmails.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <Mail className="w-12 h-12 mx-auto mb-2 opacity-10" />
                    <span className="text-sm">No verified emails found.</span>
                  </td>
                </tr>
              ) : (
                filteredEmails.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.isUsed ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          Used
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Not Used
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {item.isUsed
                        ? formatDate(item.usedAt)
                        : formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                      <div className="flex justify-end items-center gap-2">
                        <Popconfirm
                          title="Delete verified email?"
                          description="This email will no longer be pre-verified."
                          onConfirm={() => handleDelete(item._id)}
                          okText="Yes"
                          cancelText="No"
                          disabled={item.isUsed}
                        >
                          <button
                            disabled={item.isUsed}
                            className={`p-2 transition-all rounded-lg flex items-center justify-center ${
                              item.isUsed
                                ? "text-gray-200 cursor-not-allowed bg-transparent"
                                : "text-gray-400 hover:text-red-600 hover:bg-red-50 bg-white border border-transparent hover:border-red-100 shadow-sm hover:shadow-md"
                            }`}
                            title={
                              item.isUsed
                                ? "Cannot delete used email"
                                : "Delete"
                            }
                          >
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

        {/* Pagination Controls */}
        {!isLoading && meta.total > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>of {meta.total}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(meta.totalPage)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === meta.totalPage ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/20"
                            : "text-gray-600 hover:bg-white hover:shadow-sm"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    (page === currentPage - 2 && page > 1) ||
                    (page === currentPage + 2 && page < meta.totalPage)
                  ) {
                    return (
                      <span key={page} className="px-1 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1))
                }
                disabled={currentPage === meta.totalPage}
                className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Mail, FileUp, ShieldCheck, Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  useAddVerifyEmailsMutation, 
  useUploadVerifyEmailCSVMutation, 
  useDeleteVerifyEmailMutation 
} from '../../redux/features/verifyEmail/verifyEmailSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';

export default function VerifiedEmails() {
  const { eventId } = useSelectedEvent();
  const [emailInput, setEmailInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Data State
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPage: 1 });
  const [isLoading, setIsLoading] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mutations
  const [addVerifyEmails] = useAddVerifyEmailsMutation();
  const [uploadCSV] = useUploadVerifyEmailCSVMutation();
  const [deleteEmail] = useDeleteVerifyEmailMutation();

  // Manual Fetch Logic
  const fetchEmails = async () => {
    if (!eventId) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const selectedEventId = localStorage.getItem("selectedEventId");
      const response = await axios.get(
        `http://206.162.244.11:8078/api/v1/organizer/verify-email/list/${eventId}`, 
        {
          params: { page: currentPage, limit: pageSize },
          headers: {
            Authorization: `Bearer ${token}`,
            eventid: selectedEventId
          }
        }
      );

      // Log API response structure for verification
      console.log("Verified Email API Response:", response.data);

      // Backend nested format: response.data.data.data
      if (response.data?.success) {
        setVerifiedEmails(response.data.data.data || []);
        setMeta(response.data.data.meta || { total: 0, totalPage: 1 });
      }
    } catch (err) {
      console.error("Failed to fetch verified emails:", err);
      toast.error(err?.response?.data?.message || 'Failed to load verified emails');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEmails();
    }
  }, [eventId, currentPage, pageSize]);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || !eventId) return;

    const emails = emailInput.split(',').map(e => e.trim()).filter(e => e !== '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter(e => !emailRegex.test(e));
    
    if (invalidEmails.length > 0) {
      toast.error(`Invalid email(s): ${invalidEmails.join(', ')}`);
      return;
    }

    try {
      const res = await addVerifyEmails({ eventId, emails }).unwrap();
      if (res.success) {
        toast.success(res.message || 'Emails added successfully');
        setEmailInput('');
        setCurrentPage(1); 
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add emails');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !eventId) return;

    setIsUploading(true);
    try {
      const res = await uploadCSV({ eventId, file }).unwrap();
      if (res.success) {
        toast.success(res.message || 'Emails uploaded successfully');
        setCurrentPage(1); 
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = ''; 
    }
  };

  const handleDelete = async (verifyEmailId) => {
    if (!eventId) return;
    try {
      const res = await deleteEmail({ eventId, verifyEmailId }).unwrap();
      if (res.success) {
        toast.success('Email removed from verified list');
        fetchEmails(); // Manual refetch
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Delete failed');
    }
  };

  // Local filter for search query
  const filteredEmails = Array.isArray(verifiedEmails) 
    ? verifiedEmails.filter(item => item.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!eventId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
        <ShieldCheck className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Please select an event first</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Attendee Email Verification</h1>
        <p className="text-gray-500 text-sm">Manage pre-verified attendee emails for this event</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Manual Add Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-teal-600" />
            <h2 className="font-semibold text-gray-800">Add Verified Emails</h2>
          </div>
          <form onSubmit={handleAddEmail} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter email addresses (separated by commas)"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all shadow-sm"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Emails
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400 italic">Separate multiple emails with commas (e.g. john@example.com, jane@example.com)</p>
        </div>

        {/* Bulk Upload Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="bg-teal-50 p-3 rounded-full mb-3">
            <FileUp className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="font-semibold text-gray-800 mb-1">Bulk Upload</h2>
          <p className="text-xs text-gray-500 mb-4 px-4">Upload a CSV file containing an 'email' column to verify attendees in bulk.</p>
          <div className="relative w-full">
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <button
              className={`w-full py-2.5 px-4 rounded-lg border-2 border-dashed border-teal-100 text-teal-600 font-medium text-sm hover:bg-teal-50 transition-all flex items-center justify-center gap-2 ${isUploading ? 'opacity-50' : ''}`}
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
              {isUploading ? 'Uploading...' : 'Choose File'}
            </button>
          </div>
        </div>
      </div>

      {/* Email List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            Verified List
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{meta.total} Total</span>
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/10 text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Added Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right uppercase tracking-wider pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 opacity-20" />
                    <span className="text-sm">Loading verified emails...</span>
                  </td>
                </tr>
              ) : filteredEmails.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                    <Mail className="w-12 h-12 mx-auto mb-2 opacity-10" />
                    <span className="text-sm">No verified emails found.</span>
                  </td>
                </tr>
              ) : (
                filteredEmails.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.isUsed ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          Used
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Not Used
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {item.isUsed ? formatDate(item.usedAt) : formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                      <div className="flex justify-end items-center gap-2">
                        <Popconfirm
                          title="Delete verified email?"
                          description="This email will no longer be pre-verified."
                          onConfirm={() => handleDelete(item._id)}
                          okText="Yes"
                          cancelText="No"
                          disabled={item.isUsed}
                        >
                          <button
                            disabled={item.isUsed}
                            className={`p-2 transition-all rounded-lg flex items-center justify-center ${
                              item.isUsed 
                                ? 'text-gray-200 cursor-not-allowed bg-transparent' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50 bg-white border border-transparent hover:border-red-100 shadow-sm hover:shadow-md'
                            }`}
                            title={item.isUsed ? "Cannot delete used email" : "Delete"}
                          >
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

        {/* Pagination Controls */}
        {!isLoading && meta.total > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>of {meta.total}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(meta.totalPage)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 || 
                    page === meta.totalPage || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page 
                            ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/20' 
                            : 'text-gray-600 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    (page === currentPage - 2 && page > 1) || 
                    (page === currentPage + 2 && page < meta.totalPage)
                  ) {
                    return <span key={page} className="px-1 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(meta.totalPage, prev + 1))}
                disabled={currentPage === meta.totalPage}
                className="p-2 text-gray-600 hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> a284ea9fe68e0c25f8d196130dc2e627f4c87122
