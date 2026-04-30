import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Eye,
  X,
  FileText,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Edit,
  Search,
  CheckCircle,
  FileIcon,
} from "lucide-react";

import {
  useGetReviewerStatsQuery,
  useGetAllReviewersQuery,
  useGetUnassignFilesQuery,
  useGetAssignedDocumentsQuery,
  useGetAssignedPostersQuery,
  useGetReportedFilesQuery,
  useAssignReviewerMutation,
  useReAssignReviewerMutation,
  useReviewImageMutation,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
  useReviseDocumentMutation,
  useFlagAdminDocumentMutation,
} from "../../redux/features/reviwer/reviewerSlice";

import { useSelectedEvent } from "../../hooks/useSelectedEvent";
import { useGetEventQuery } from "../../redux/features/eventSlice/eventSlice";
import { useIsAdmin } from "../../hooks/useUserRole";
import toast from "react-hot-toast";

export default function ReviewerManagement() {
  const isAdmin = useIsAdmin();

  const safeArray = (data) => (Array.isArray(data) ? data : []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [activeTab, setActiveTab] = useState("Unassigned Files");
  const [showAddReviewerModal, setShowAddReviewerModal] = useState(false);
  const [showFileDetailsModal, setShowFileDetailsModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getStatusColorClass = (statusStr) => {
    const s = (statusStr || "").toLowerCase();
    if (s === "approved" || s === "completed" || s === "reviewed")
      return "bg-green-100 text-green-700";
    if (s === "rejected") return "bg-red-100 text-red-700";
    if (s.includes("revis")) return "bg-amber-100 text-amber-700";
    if (s.includes("flag")) return "bg-purple-100 text-purple-700";
    if (s === "assigned" || s === "pending" || s === "-")
      return "bg-gray-100 text-gray-700";
    return "bg-blue-100 text-blue-700";
  };

  // Action Modal State
  const [actionModalConfig, setActionModalConfig] = useState({
    isOpen: false,
    action: null,
  });
  const [actionReason, setActionReason] = useState("");

  // Search state
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [dueDate, setDueDate] = useState("");

  const dropdownRef = useRef(null);
  const { eventId, setEvent } = useSelectedEvent();

  // Load events
  const { data: eventResponse } = useGetEventQuery();

  // Select first event automatically
  useEffect(() => {
    if (!eventId && eventResponse?.data?.length) {
      setEvent(eventResponse.data[0]);
    }
  }, [eventResponse, eventId, setEvent]);

  // Reviewer stats
  const { data: reviewerStats, isLoading: isStatsLoading } =
    useGetReviewerStatsQuery(eventId, {
      skip: !eventId,
    });

  // Unassigned files
  const { data: unassignedFiles, refetch: refetchUnassigned } =
    useGetUnassignFilesQuery(eventId, {
      skip: !eventId,
    });
  console.log(unassignedFiles);
  // Assigned documents
  const { data: assignedDocs, refetch: refetchDocs } =
    useGetAssignedDocumentsQuery({ eventId, type: "pdf" }, { skip: !eventId });

  // Assigned posters
  const { data: assignedPosters, refetch: refetchPosters } =
    useGetAssignedPostersQuery({ eventId, type: "image" }, { skip: !eventId });

  // Reported files
  const { data: reportedFiles, refetch: refetchReported } =
    useGetReportedFilesQuery(eventId, {
      skip: !eventId,
    });

  const refreshAllData = () => {
    refetchUnassigned();
    refetchDocs();
    refetchPosters();
    refetchReported();
  };

  const [assignReviewer] = useAssignReviewerMutation();
  const [reAssignReviewer] = useReAssignReviewerMutation();
  const [reviewImage, { isLoading: isSubmittingReview }] =
    useReviewImageMutation();
  const [approveDocument, { isLoading: isApproving }] =
    useApproveDocumentMutation();
  const [rejectDocument, { isLoading: isRejecting }] =
    useRejectDocumentMutation();
  const [reviseDocument, { isLoading: isRevising }] =
    useReviseDocumentMutation();
  const [flagAdminDocument, { isLoading: isFlagging }] =
    useFlagAdminDocumentMutation();

  // Image review score state
  const defaultScores = {
    originality: 1,
    scientificRigor: 1,
    clarity: 1,
    visualDesign: 1,
    impact: 1,
    presentation: 1,
    overall: true,
  };
  const [scores, setScores] = useState(defaultScores);

  // Get all reviewers for selection
  const { data: allReviewersData, isLoading: isAllReviewersLoading } =
    useGetAllReviewersQuery(eventId, {
      skip: !eventId,
    });

  // Handle clicking outside Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset page and selection when tab changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedFiles([]);
  }, [activeTab]);

  // Prevent render before eventId ready
  if (!eventId || isStatsLoading) {
    return (
      <div className="p-10 text-gray-500 flex justify-center">
        Loading reviewer data...
      </div>
    );
  }

  // Normalize reviewer stats to avoid undefined issues
  const reviewers = safeArray(reviewerStats?.data).map((reviewer) => ({
    _id: reviewer?._id || reviewer?.id,
    name: reviewer?.name || "Unknown",
    email: reviewer?.email || "No Email",
    avatar:
      reviewer?.profileImage || reviewer?.avatar || "/public/image/review.png",
    assigned: Number(reviewer?.assigned) || 0,
    completed: Number(reviewer?.completed) || 0,
    avgScore: reviewer?.avgScore ? Number(reviewer.avgScore).toFixed(1) : "0.0",
    progress:
      ((Number(reviewer?.completed) || 0) / (Number(reviewer?.assigned) || 1)) *
      100,
  }));

  // Resolve raw files based on active tab
  let rawFiles = [];
  if (activeTab === "Unassigned Files") {
    rawFiles = safeArray(unassignedFiles?.data);
  } else if (activeTab === "Documents") {
    rawFiles = safeArray(assignedDocs?.data);
  } else if (activeTab === "Posters") {
    rawFiles = safeArray(assignedPosters?.data);
  } else if (activeTab === "Reported Files") {
    rawFiles = safeArray(reportedFiles?.data);
  }

  // Normalize all responses into one consistent format for table rendering
  console.log("unassigned raw:", rawFiles);

  const files = rawFiles
    .flatMap((item) => {
      const attachments = item?.attachments || item?.documentFiles || [];

      if (attachments.length > 0) {
        return attachments.map((att) => ({
          id: att._id || att.id || Math.random().toString(36).substring(7),
          title: item?.title || item?.name || "-",
          fileName: att?.name || "-",
          // authorName mapping: try all possible keys including fullName
          authorName:
            item?.author?.name ||
            item?.author?.fullName ||
            item?.authorDetails?.name ||
            item?.authorDetails?.fullName ||
            item?.user?.name ||
            item?.user?.fullName ||
            item?.submittedBy?.name ||
            item?.submittedBy?.fullName ||
            "-",
          authEmail:
            item?.author?.email ||
            item?.authorDetails?.email ||
            item?.user?.email ||
            "-",
          // Mapping rules: submitted -> createdAt / submitted
          submitted:
            att?.submittedAt ||
            item?.submittedAt ||
            item?.submitted ||
            item?.createdAt ||
            null,
          dueDate: item?.dueDate || item?.assignedDate || null,
          type:
            att?.type ||
            item?.type ||
            (activeTab === "Documents" ? "pdf" : "image"),
          // status -> reviewStatus / status
          status:
            att?.reviewStatus ||
            item?.file?.reviewStatus ||
            item?.status ||
            "-",
          // score -> reviewerScore / score (fallback 0)
          score:
            att?.reviewScore ||
            att?.score ||
            item?.file?.score ||
            item?.reviewerScore ||
            null,
          flagReason:
            att?.reason ||
            att?.flagReason ||
            att?.reportReason ||
            att?.reviewerComment ||
            item?.reason ||
            item?.flagReason ||
            item?.reportReason ||
            item?.reviewerComment ||
            item?.reviewerNote ||
            "-",

          posterId: item?.posterId || item?._id || item?.id || null,
          attachmentId: att?._id || att?.id || null,
          url: att?.url || null,
          originalData: { ...item, _attachmentData: att },
        }));
      } else {
        return [
          {
            id:
              item?._id || item?.id || Math.random().toString(36).substring(7),
            title: item?.title || item?.name || "-",
            fileName: item?.fileName || item?.file?.name || "-",
            authorName:
              item?.author?.name ||
              item?.author?.fullName ||
              item?.author?.author?.name ||
              item?.authorDetails?.name ||
              item?.authorDetails?.fullName ||
              item?.user?.name ||
              item?.user?.fullName ||
              item?.submittedBy?.name ||
              item?.createdBy?.name ||
              "-",
            authEmail:
              item?.author?.email ||
              item?.authorDetails?.email ||
              item?.user?.email ||
              "-",
            submitted:
              item?.submittedAt || item?.submitted || item?.createdAt || null,
            dueDate: item?.dueDate || item?.assignedDate || null,
            type:
              item?.type ||
              item?.fileType ||
              item?.file?.type ||
              (activeTab === "Documents" ? "pdf" : "image"),
            status:
              item?.status || item?.reviewType || item?.reviewStatus || "-",
            score:
              item?.score || item?.reviewerScore || item?.file?.score || null,
            flagReason:
              item?.reason ||
              item?.flagReason ||
              item?.reportReason ||
              item?.reviewerComment ||
              item?.reviewerNote ||
              item?.file?.reason ||
              item?.file?.flagReason ||
              item?.file?.reportReason ||
              "-",

            posterId: item?.posterId || item?._id || item?.id || null,
            attachmentId:
              item?.attachmentId ||
              item?.fileId ||
              item?.documentId ||
              item?._id ||
              null,
            url: item?.url || item?.file?.url || null,
            originalData: item,
          },
        ];
      }
    })
    .filter(Boolean); // Remove empty mappings if any

  console.log("transformed files:", files);

  const tabs = ["Unassigned Files", "Documents", "Posters", "Reported Files"];

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(files.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const start = (validCurrentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedFiles = files.slice(start, end);

  // Toggle file selection
  const toggleFileSelection = (fileSelected) => {
    setSelectedFiles((prev) => {
      // Compare attachmentId because a poster can have multiple attachments
      const exists = prev.some(
        (f) => f.attachmentId === fileSelected.attachmentId,
      );
      if (exists) {
        return prev.filter((f) => f.attachmentId !== fileSelected.attachmentId);
      } else {
        return [...prev, fileSelected];
      }
    });
  };

  // Check if file is selected
  const isFileSelected = (fileToCheck) => {
    return selectedFiles.some(
      (f) => f.attachmentId === fileToCheck.attachmentId,
    );
  };

  // Handle assign button click - open modal
  const handleAssignClick = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file to assign");
      return;
    }
    setSelectedReviewer(null);
    setIsDropdownOpen(false);
    setShowAddReviewerModal(true);
  };

  // Handle Search Result Selection
  const selectSearchResult = (rev) => {
    // IMPORTANT Fix: Use the explicitly returned 'reviewerId' and allow fallback
    setSelectedReviewer({
      reviewerId: rev.reviewerId || rev._id || rev.id,
      email: rev.email,
      name: rev.name || rev.email.split("@")[0], // Extract name from email if backend omitted it
    });
    setIsDropdownOpen(false);
  };

  // Handle add reviewer submission
  const handleAddReviewer = async () => {
    if (!eventId) {
      console.error("eventId missing");
      toast.error("Event ID is missing");
      return;
    }

    if (!selectedReviewer || !selectedReviewer.reviewerId) {
      toast.error("Please select a reviewer first.");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("No files selected for assignment");
      return;
    }

    try {
      console.log("selectedFiles:", selectedFiles);
      // Build items array strictly, filtering out any records that do not resolve both IDs
      const items = selectedFiles
        .map((file) => ({
          posterId: file.posterId,
          attachmentId: file.attachmentId,
        }))
        // Ensure no item is sent missing an essential ID per backend requirements
        .filter((file) => file.posterId && file.attachmentId);
      console.log("items:", items);
      if (items.length === 0) {
        console.error("Payload constraint failed:", selectedFiles);
        toast.error("Selected files are missing required ID references.");
        return;
      }

      // Prepare payload
      const payload = {
        items,
        reviewerId: selectedReviewer.reviewerId,
        dueDate: dueDate || new Date().toISOString().split("T")[0],
      };

      console.log("eventId:", eventId);
      console.log("payload:", payload);

      // Call correct API based on active tab
      let result;
      if (activeTab === "Unassigned Files") {
        result = await assignReviewer({
          eventId: eventId,
          body: payload,
        }).unwrap();
      } else {
        result = await reAssignReviewer({
          eventId: eventId,
          body: payload,
        }).unwrap();
      }

      if (result) {
        toast.success(result?.message || "Files assigned successfully!");
      }

      // Clear state on success
      setSelectedFiles([]);
      setSelectedReviewer(null);
      setDueDate("");
      setShowAddReviewerModal(false);
    } catch (error) {
      console.error("Assign reviewer error:", error);
      toast.error(error?.data?.message || "Failed to assign reviewer");
    }
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setScores(defaultScores);
    setShowFileDetailsModal(true);
  };

  // Handle PDF document action (approve/reject/revise/flagAdmin)
  const handleDocumentAction = async (action) => {
    const attachmentId = selectedFile?.attachmentId;
    if (!attachmentId) {
      toast.error("Attachment ID missing");
      return;
    }

    if (action === "approve") {
      try {
        const result = await approveDocument(attachmentId).unwrap();
        toast.success(result?.message || `Document approved successfully!`);
        refreshAllData();
        setShowFileDetailsModal(false);
      } catch (err) {
        toast.error(err?.data?.message || `Failed to approve document`);
      }
    } else {
      // For reject, revise, and flagAdmin, open the reason modal
      setActionModalConfig({ isOpen: true, action });
      setActionReason("");
    }
  };

  const handleSubmitAction = async () => {
    const { action } = actionModalConfig;
    const attachmentId = selectedFile?.attachmentId;
    if (!attachmentId) {
      toast.error("Attachment ID missing");
      return;
    }
    if (!actionReason.trim()) {
      toast.error("Reason is required");
      return;
    }

    try {
      let result;
      if (action === "reject")
        result = await rejectDocument({
          attachmentId,
          reason: actionReason,
        }).unwrap();
      else if (action === "revise")
        result = await reviseDocument({
          attachmentId,
          reason: actionReason,
        }).unwrap();
      else if (action === "flagAdmin")
        result = await flagAdminDocument({
          attachmentId,
          reason: actionReason,
        }).unwrap();

      toast.success(
        result?.message ||
          `Document ${action === "flagAdmin" ? "flagged to admin" : action + "d"} successfully!`,
      );
      refreshAllData();
      setActionModalConfig({ isOpen: false, action: null });
      setActionReason("");
      setShowFileDetailsModal(false);
    } catch (err) {
      toast.error(err?.data?.message || `Failed to submit action`);
    }
  };

  // Handle image (poster) review score submit
  const handleImageReview = async () => {
    const attachmentId = selectedFile?.attachmentId;
    if (!attachmentId) {
      toast.error("Attachment ID missing");
      return;
    }
    try {
      const result = await reviewImage({ attachmentId, body: scores }).unwrap();
      toast.success(result?.message || "Poster reviewed successfully!");
      refreshAllData();
      setShowFileDetailsModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const handleAssign = (file) => {
    // Select this specific file if it's not selected and instantly open modal
    if (!isFileSelected(file)) {
      setSelectedFiles((prev) => [...prev, file]);
    } else {
      setSelectedFiles([file]); // Or replace all selection with just this one to be safe
    }
    setSelectedReviewer(null);
    setIsDropdownOpen(false);
    setShowAddReviewerModal(true);
  };

  return (
    <div className="bg-gray-50 flex flex-col h-[calc(100vh-64px)] overflow-hidden p-6">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              Reviewer Management
            </h1>
            <p className="text-gray-500 text-sm">
              Assign submission and track review progress
            </p>
          </div>

          <button
            onClick={handleAssignClick}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Reviewer
          </button>
        </div>

        {/* Reviewer Cards */}
        <div className="mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            {reviewers?.map((reviewer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 min-w-60 flex-shrink-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-semibold overflow-hidden">
                    <img
                      src={reviewer.avatar}
                      alt={reviewer.name}
                      onError={(e) =>
                        (e.currentTarget.src = "/public/image/review.png")
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Unuse edit btn */}

                  {/* <button className="text-gray-400 cursor-pointer hover:text-gray-600">
                    <Edit />
                  </button> */}
                </div>

                <h3
                  className="font-semibold text-gray-800 mb-1 truncate"
                  title={reviewer.name}
                >
                  {reviewer.name}
                </h3>

                <p
                  className="text-sm text-gray-500 mb-4 truncate"
                  title={reviewer.email}
                >
                  {reviewer.email}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned</span>
                    <span className="font-medium text-gray-800">
                      {reviewer.assigned}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-gray-800">
                      {reviewer.completed}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Score</span>
                    <span className="font-medium text-gray-800">
                      {reviewer.avgScore}
                    </span>
                  </div>
                </div>

                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, reviewer.progress))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between flex-1 min-h-0 overflow-hidden">
          <div className="flex shrink-0 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-teal-700 bg-teal-50 border-teal-600"
                    : "text-gray-600 border-transparent hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto flex-1 bg-white">
            <table className="w-full table-fixed md:table-auto text-left relative">
              <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
                <tr>
                  <th className="w-16 px-4 py-3 text-sm font-semibold text-gray-700 text-center">
                    {/* Select All Checkbox Placeholder */}
                  </th>
                  <th className="w-[8%] px-2 py-3 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="w-[32%] px-4 py-3 text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="w-[18%] px-4 py-3 text-sm font-semibold text-gray-700">
                    Author
                  </th>
                  {activeTab === "Unassigned Files" && (
                    <th className="w-[12%] px-2 py-3 text-sm font-semibold text-gray-700">
                      Submitted
                    </th>
                  )}
                  {activeTab === "Posters" && (
                    <th className="w-[12%] px-2 py-3 text-sm font-semibold text-gray-700 text-center">
                      Score
                    </th>
                  )}
                  {(activeTab === "Documents" ||
                    activeTab === "Reported Files") && (
                    <th className="w-[12%] px-2 py-3 text-sm font-semibold text-gray-700 text-center">
                      Status
                    </th>
                  )}
                  <th className="w-[12%] px-2 py-3 text-sm font-semibold text-gray-700">
                    Due
                  </th>
                  <th className="w-[15%] px-4 py-3 text-sm font-semibold text-gray-700 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedFiles.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-10 h-10 text-gray-300 mb-3" />
                        <p>No files found for this category.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedFiles.map((file, index) => (
                    <tr
                      key={file.id || index}
                      className="bg-white hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          checked={isFileSelected(file)}
                          onChange={() => toggleFileSelection(file)}
                        />
                      </td>

                      <td className="px-2 py-4">
                        {/* 2. File Type Not Showing Fix */}
                        <div className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                          {file.type?.toLowerCase() === "pdf" ? (
                            <FileText
                              className="w-5 h-5 text-red-500"
                              title="PDF Document"
                            />
                          ) : file.type?.toLowerCase() === "image" ||
                            file.type?.toLowerCase() === "jpg" ||
                            file.type?.toLowerCase() === "png" ? (
                            <FileIcon
                              className="w-5 h-5 text-blue-500"
                              title="Image File"
                            />
                          ) : (
                            <FileIcon
                              className="w-5 h-5 text-gray-400"
                              title="Unknown File Type"
                            />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-800">
                        <div
                          className="line-clamp-2 font-medium"
                          title={file.title}
                        >
                          {file.title}
                        </div>
                        <div
                          className="text-xs text-gray-500 mt-1 line-clamp-1"
                          title={file.fileName}
                        >
                          {file.fileName}
                        </div>
                      </td>

                      <td
                        className="px-4 py-4 text-sm text-gray-600 truncate"
                        title={file.authorName}
                      >
                        {file.authorName !== "-"
                          ? file.authorName
                          : file.authEmail !== "-"
                            ? file.authEmail
                            : "-"}
                      </td>

                      {activeTab === "Unassigned Files" && (
                        <td className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {file.submitted
                            ? new Date(file.submitted).toLocaleDateString()
                            : "N/A"}
                        </td>
                      )}

                      {activeTab === "Posters" && (
                        <td className="px-2 py-4 text-sm font-semibold text-gray-700 text-center">
                          <span className="text-teal-600">
                            {typeof file.score === "object" &&
                            file.score !== null
                              ? Object.values(file.score)[0] || 0
                              : file.score || 0}
                          </span>
                        </td>
                      )}

                      {(activeTab === "Documents" ||
                        activeTab === "Reported Files") && (
                        <td className="px-2 py-4 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColorClass(file.status)}`}
                          >
                            {file.status || "-"}
                          </span>
                        </td>
                      )}

                      <td className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {file.dueDate
                          ? new Date(file.dueDate).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleViewFile(file)}
                            className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleAssign(file)}
                            className="px-3 py-1.5 text-teal-600 border border-teal-500 hover:bg-teal-50 text-xs font-semibold rounded-md transition-colors"
                          >
                            {activeTab === "Unassigned Files"
                              ? "Assign"
                              : "Re-Assign"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500 outline-none"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>

              <span>of {files.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setCurrentPage(Math.max(1, validCurrentPage - 1))
                }
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={validCurrentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                // Simple pagination to avoid too many buttons
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= validCurrentPage - 1 && page <= validCurrentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-sm font-medium rounded transition-colors ${
                        validCurrentPage === page
                          ? "bg-teal-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === validCurrentPage - 2 ||
                  page === validCurrentPage + 2
                ) {
                  return (
                    <span key={page} className="px-1 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, validCurrentPage + 1))
                }
                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={validCurrentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Assign Reviwer Modal */}
      {showAddReviewerModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">
                Assign Reviewer
              </h3>
              <button
                onClick={() => setShowAddReviewerModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Selected Files Badge */}
              <div className="mb-6 bg-teal-50 border border-teal-100 rounded-lg p-3 flex items-start gap-3">
                <div className="mt-0.5">
                  <FileIcon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-900">
                    {selectedFiles.length}{" "}
                    {selectedFiles.length === 1 ? "file" : "files"} selected for
                    assignment
                  </p>
                  <p className="text-xs text-teal-700 mt-1 line-clamp-1">
                    Including: {selectedFiles[0]?.title}
                  </p>
                </div>
              </div>

              {/* Dropdown Selection Area */}
              <div className="mb-6 relative" ref={dropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex justify-between items-center">
                  <span>
                    Select Reviewer <span className="text-red-500">*</span>
                  </span>
                  {selectedReviewer && (
                    <button
                      onClick={() => {
                        setSelectedReviewer(null);
                      }}
                      className="text-xs text-teal-600 hover:underline"
                    >
                      Clear Selection
                    </button>
                  )}
                </label>

                {/* Dropdown Trigger */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedReviewer
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 bg-white hover:border-teal-500"
                  }`}
                >
                  {selectedReviewer ? (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold">
                        {selectedReviewer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 leading-tight">
                          {selectedReviewer.name}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">
                          {selectedReviewer.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Choose a reviewer...
                    </span>
                  )}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="max-h-60 overflow-y-auto">
                      {isAllReviewersLoading ? (
                        <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading reviewers...</span>
                        </div>
                      ) : safeArray(allReviewersData?.data).length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No reviewers available
                        </div>
                      ) : (
                        <ul className="py-1">
                          {safeArray(allReviewersData?.data).map((rev) => {
                            const isSelected =
                              selectedReviewer?.reviewerId ===
                              (rev.reviewerId || rev._id || rev.id);
                            return (
                              <li
                                key={rev.reviewerId || rev._id || rev.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectSearchResult(rev);
                                }}
                                className={`px-4 py-2 hover:bg-teal-50 cursor-pointer flex items-center justify-between group ${isSelected ? "bg-teal-50" : ""}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {rev.name || rev.email?.split("@")[0]}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {rev.email}
                                    </p>
                                  </div>
                                </div>
                                {isSelected && (
                                  <CheckCircle className="w-4 h-4 text-teal-600" />
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Picker */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex justify-end gap-3 mt-auto">
              <button
                onClick={() => setShowAddReviewerModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReviewer}
                disabled={!selectedReviewer}
                className="px-6 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {activeTab === "Unassigned Files"
                  ? "Assign Now"
                  : "Re-Assign Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Beautiful File Details Modal */}
      {showFileDetailsModal && selectedFile && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {selectedFile.type?.toLowerCase() === "pdf" ? (
                    <FileText className="w-5 h-5 text-red-500" />
                  ) : (
                    <FileIcon className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    Document Details
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">
                    {selectedFile.type || "Unknown"} File
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFileDetailsModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-white flex-1">
              {/* Section 1: Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 mb-8 bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Title
                  </p>
                  <p className="text-gray-800 font-medium leading-snug">
                    {selectedFile.title || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    File Name
                  </p>
                  <p
                    className="text-gray-800 text-sm truncate"
                    title={selectedFile.fileName}
                  >
                    {selectedFile.fileName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Author
                  </p>
                  <p className="text-gray-800 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {selectedFile.authorName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColorClass(selectedFile.status)}`}
                  >
                    {selectedFile.status || "-"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Submitted Date
                  </p>
                  <p className="text-gray-800 text-sm">
                    {formatDate(selectedFile.submitted)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Due Date
                  </p>
                  <p className="text-gray-800 text-sm">
                    {formatDate(selectedFile.dueDate)}
                  </p>
                </div>

                {/* Flag Reason Conditionally Displayed */}
                {(activeTab === "Reported Files" ||
                  (selectedFile.flagReason &&
                    selectedFile.flagReason !== "-")) && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-red-50 p-4 rounded-lg border border-red-100 flex items-start gap-3 mt-2">
                    <div>
                      <p className="text-xs text-red-600 uppercase font-bold tracking-wider mb-1">
                        Reason for Flag / Report
                      </p>
                      <p className="text-red-900 text-sm leading-snug">
                        {selectedFile.flagReason || "-"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Assignment Link */}
              {selectedFile.status !== "Pending" &&
                (selectedFile.reviewerName || selectedFile.reviewerEmail) && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                      Assignment Overview
                    </h4>
                    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold">
                        {(
                          selectedFile.reviewerName ||
                          selectedFile.reviewerEmail ||
                          "R"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          Currently Assigned to
                        </p>
                        <p className="font-semibold text-gray-800">
                          {selectedFile.reviewerName ||
                            selectedFile.reviewerEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Section 3: Document Preview Box */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                  Document Preview
                </h4>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
                  {selectedFile.url ? (
                    selectedFile.type?.toLowerCase() === "image" ||
                    selectedFile.type?.toLowerCase() === "jpg" ||
                    selectedFile.type?.toLowerCase() === "png" ? (
                      <div className="w-full flex justify-center py-2">
                        <img
                          src={selectedFile.url}
                          alt="Poster View"
                          className="max-h-80 object-contain rounded border border-gray-200 shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <FileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-gray-600 text-sm mb-4">
                          PDF Document allows secure preview via embedded viewer
                        </p>
                        <a
                          href={selectedFile.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm focus:ring-4 focus:ring-teal-500/30"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Open External PDF Viewer
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <FileIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="font-medium text-gray-500">
                        No URL link embedded
                      </p>
                      <p className="text-xs mt-1">
                        Cloud storage reference could not be resolved
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer — Conditional Review Actions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50 flex flex-col gap-3 shrink-0">
              {/* IMAGE / POSTER: Score Form */}
              {(selectedFile.type?.toLowerCase() === "image" ||
                selectedFile.type?.toLowerCase() === "jpg" ||
                selectedFile.type?.toLowerCase() === "png") && (
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Submit Review Scores
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {[
                      "originality",
                      "scientificRigor",
                      "clarity",
                      "visualDesign",
                      "impact",
                      "presentation",
                    ].map((field) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={scores[field]}
                          onChange={(e) =>
                            setScores((s) => ({
                              ...s,
                              [field]: Number(e.target.value),
                            }))
                          }
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      id="overall-check"
                      type="checkbox"
                      checked={scores.overall}
                      onChange={(e) =>
                        setScores((s) => ({ ...s, overall: e.target.checked }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                      htmlFor="overall-check"
                      className="text-sm text-gray-700 font-medium"
                    >
                      Overall Approved
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 border-b border-gray-100 pb-4 mb-4">
                    <button
                      onClick={handleImageReview}
                      disabled={isSubmittingReview}
                      className="px-6 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 shadow-sm"
                    >
                      {isSubmittingReview
                        ? "Submitting…"
                        : "Submit Review Scores"}
                    </button>
                  </div>
                </div>
              )}

              {/* DOCUMENT: Approve / Reject / Revise / Flag Admin */}
              {selectedFile.type?.toLowerCase() === "pdf" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-bold">
                    Document Decision
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFileDetailsModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    {!isAdmin && (
                      <button
                        onClick={() => handleDocumentAction("flagAdmin")}
                        disabled={isFlagging}
                        className="px-4 py-2 text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 rounded-lg transition-colors disabled:opacity-50 border-transparent"
                      >
                        {isFlagging ? "…" : "Flag to Admin"}
                      </button>
                    )}
                    <button
                      onClick={() => handleDocumentAction("revise")}
                      disabled={isRevising}
                      className="px-4 py-2 text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition-colors disabled:opacity-50 border-transparent"
                    >
                      {isRevising ? "…" : "Revise"}
                    </button>
                    <button
                      onClick={() => handleDocumentAction("reject")}
                      disabled={isRejecting}
                      className="px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 border-transparent"
                    >
                      {isRejecting ? "…" : "Reject"}
                    </button>
                    <button
                      onClick={() => handleDocumentAction("approve")}
                      disabled={isApproving}
                      className="px-4 py-2 text-sm font-medium bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50 shadow-sm border-transparent"
                    >
                      {isApproving ? "…" : "Approve"}
                    </button>
                  </div>
                </div>
              )}

              {/* POSTER: Reject only (Approve handled by Score Form) */}
              {(selectedFile.type?.toLowerCase() === "image" ||
                selectedFile.type?.toLowerCase() === "jpg" ||
                selectedFile.type?.toLowerCase() === "png") && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-bold">
                    Poster Decision
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFileDetailsModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDocumentAction("reject")}
                      disabled={isRejecting}
                      className="px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 border-transparent"
                    >
                      {isRejecting ? "…" : "Reject"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal (Reject / Revise / Flag Admin) */}
      {actionModalConfig.isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 capitalize">
                {actionModalConfig.action === "flagAdmin"
                  ? "Flag to Admin"
                  : actionModalConfig.action}{" "}
                Document
              </h3>
              <button
                onClick={() =>
                  setActionModalConfig({ isOpen: false, action: null })
                }
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {actionModalConfig.action === "reject" && "Reason"}
                {actionModalConfig.action === "revise" && "Revision Reason"}
                {actionModalConfig.action === "flagAdmin" && "Flag Reason"}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                rows={4}
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder={`Enter ${actionModalConfig.action === "flagAdmin" ? "flag" : actionModalConfig.action} reason...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() =>
                  setActionModalConfig({ isOpen: false, action: null })
                }
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAction}
                disabled={isRejecting || isRevising || isFlagging}
                className="px-6 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-50"
              >
                Confirm{" "}
                {actionModalConfig.action === "flagAdmin"
                  ? "Flag"
                  : actionModalConfig.action.charAt(0).toUpperCase() +
                    actionModalConfig.action.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
