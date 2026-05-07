import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Eye,
  Heart,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Mail,
  Calendar,
  Building2,
  User,
  RefreshCw,
} from "lucide-react";
import { Popconfirm, Select } from "antd";
import { useSelectedEvent } from "../../hooks/useSelectedEvent";
import {
  useDeleteInvitationMutation,
  useResendInvitationMutation,
  useGetInvitationsQuery,
  useSendInvitationForSpekerMutation,
  useSendInvitationMutation,
} from "../../redux/features/invitatation/invitaionSlice";
import {
  useAdminEventdetailsQuery,
  useGetEventQuery,
} from "../../redux/features/eventSlice/eventSlice";
import { useIsAdmin } from "../../hooks/useUserRole";
import toast from "react-hot-toast";

const { Option } = Select;

// ─── Config ──────────────────────────────────────────────────────────────────

const ROLE_MAP = {
  SPEAKER: {
    label: "Speaker",
    color: "text-teal-700 bg-teal-50 border border-teal-200",
  },
  SPONSOR: {
    label: "Sponsor",
    color: "text-purple-700 bg-purple-50 border border-purple-200",
  },
  VOLUNTEER: {
    label: "Volunteer",
    color: "text-amber-700 bg-amber-50 border border-amber-200",
  },
  EXHIBITOR: {
    label: "Exhibitor",
    color: "text-blue-700 bg-blue-50 border border-blue-200",
  },
  TRACK_CHAIR: {
    label: "Track Chair",
    color: "text-pink-700 bg-pink-50 border border-pink-200",
  },
  ABSTRACT_REVIEWER: {
    label: "Reviewer",
    color: "text-emerald-700 bg-emerald-50 border border-emerald-200",
  },
};

const STATUS_MAP = {
  ACCEPTED: {
    label: "Accepted",
    color: "text-teal-700 bg-teal-50 border border-teal-200",
    dot: "bg-teal-500",
  },
  PENDING: {
    label: "Pending",
    color: "text-amber-700 bg-amber-50 border border-amber-200",
    dot: "bg-amber-400",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-700 bg-red-50 border border-red-200",
    dot: "bg-red-500",
  },
};

const TAB_ROLE_MAP = {
  All: "",
  Speakers: "SPEAKER",
  Sponsors: "SPONSOR",
  Exhibitors: "EXHIBITOR",
  Volunteers: "VOLUNTEER",
  Reviewers: "ABSTRACT_REVIEWER",
  "Track Chairs": "TRACK_CHAIR",
};

const TABS = Object.keys(TAB_ROLE_MAP);

const getRoleInfo = (r) =>
  ROLE_MAP[r] || {
    label: r,
    color: "text-gray-700 bg-gray-50 border border-gray-200",
  };
const getStatusInfo = (s) =>
  STATUS_MAP[s] || {
    label: s,
    color: "text-gray-700 bg-gray-50 border border-gray-200",
    dot: "bg-gray-400",
  };
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Badge({ className, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div
            className="h-4 bg-gray-100 rounded animate-pulse"
            style={{ width: `${50 + i * 9}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>
      <span className="text-sm text-gray-500 w-24 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium break-all">
        {value}
      </span>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";
const selectCls =
  "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";

// ─── Details Modal ────────────────────────────────────────────────────────────

function DetailsModal({ invitation: inv, onClose, onResend }) {
  if (!inv) return null;
  const role = getRoleInfo(inv.role);
  const status = getStatusInfo(inv.status);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold uppercase">
              {(inv.name || inv.email)?.[0] || "?"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {inv.name || <span className="italic opacity-60">No name</span>}
              </h2>
              <p className="text-teal-100 text-sm mt-0.5">{inv.email}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Badge className={role.color}>{role.label}</Badge>
            <Badge className={status.color}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <Section title="Invitation Details">
            <InfoRow
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value={inv.email}
            />
            <InfoRow
              icon={<Calendar className="w-4 h-4" />}
              label="Sent"
              value={formatDate(inv.createdAt)}
            />
            <InfoRow
              icon={<Calendar className="w-4 h-4" />}
              label="Updated"
              value={formatDate(inv.updatedAt)}
            />
          </Section>
          <Section title="System Info">
            <InfoRow
              icon={<User className="w-4 h-4" />}
              label="ID"
              value={
                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                  {inv._id}
                </code>
              }
            />
            <InfoRow
              icon={<Building2 className="w-4 h-4" />}
              label="Event ID"
              value={
                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                  {inv.eventId}
                </code>
              }
            />
          </Section>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onResend(inv);
              onClose();
            }}
            className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Resend
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Send Invitation Modal ────────────────────────────────────────────────────

function SendInvitationModal({ onClose, onSubmit, sessions = [] }) {
  const [form, setForm] = useState({
    role: "",
    sessions: [],
    name: "",
    email: "",
  });
  const set = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = () => {
    if (!form.role || !form.email)
      return alert("Please fill in all required fields");
    if (form.role === "SPEAKER" && form.sessions.length === 0)
      return alert("Please select at least one session for Speaker");
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Send Invitation
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Invite someone to participate in this event
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Field label="Role" required>
            <select
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              className={selectCls}
            >
              <option value="">Select a role</option>
              {Object.entries(ROLE_MAP).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </Field>

          {form.role === "SPEAKER" && (
            <Field label="Sessions" required>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select sessions"
                value={form.sessions}
                onChange={(val) => set("sessions", val)}
                className="custom-antd-select"
              >
                {sessions.map((s, index) => (
                  <Option key={index} value={index}>
                    {s.title || `Session ${index + 1}`}
                  </Option>
                ))}
              </Select>
            </Field>
          )}

          <Field label="Email Address" required>
            <input
              type="email"
              placeholder="e.g. sarah@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" /> Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InvitationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedInv, setSelectedInv] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const debounceRef = React.useRef(null);

  const { eventId } = useSelectedEvent();
  const isAdmin = useIsAdmin();

  // Fetch Event Details for Sessions
  const { data: adminEvent } = useAdminEventdetailsQuery(eventId, {
    skip: !isAdmin || !eventId,
  });
  const { data: userEvent } = useGetEventQuery(undefined, {
    skip: isAdmin || !eventId,
  });

  const eventData = isAdmin ? adminEvent?.data : userEvent?.data;
  const sessions = eventData?.agenda?.sessions || [];

  const [sendInvitationToSpeaker] = useSendInvitationForSpekerMutation();
  const [sendInvitee] = useSendInvitationMutation();

  // ─── Send Invite Handler ────────────────────────────────────────────────────
  const sendInvite = async (form) => {
    try {
      let response;

      if (form.role === "SPEAKER") {
        const data = {
          email: form.email,
          sessionIndex: form.sessions, // Now an array of indices
        };
        console.log("Speaker Invitation Data:", data);
        response = await sendInvitationToSpeaker({ data, eventId });
      } else {
        const data = {
          email: form.email,
          role: form.role,
        };
        response = await sendInvitee({ data, id: eventId });
      }

      if (response?.data?.success === true) {
        toast.success(response.data.message || "Invitation sent successfully");
      } else {
        toast.error(
          response?.error?.data?.message || "Failed to send invitation",
        );
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Something went wrong");
    }
  };

  // ─── Debounced Search ───────────────────────────────────────────────────────
  const handleSearchChange = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setCurrentPage(1);
    }, 400);
  };

  // ─── Query Params ───────────────────────────────────────────────────────────
  const queryParams = useMemo(
    () => ({
      id: eventId,
      page: currentPage,
      limit: itemsPerPage,
      role: TAB_ROLE_MAP[activeTab] || "",
      search: debouncedSearch,
    }),
    [eventId, currentPage, itemsPerPage, activeTab, debouncedSearch],
  );

  const {
    data: invitationsData,
    isLoading,
    isFetching,
  } = useGetInvitationsQuery(queryParams, { skip: !eventId });
  console.log(invitationsData);

  const invitations = invitationsData?.data?.data || [];
  const meta = invitationsData?.data?.meta || { total: 0 };
  const totalPages = Math.ceil(meta.total / itemsPerPage);
  const loading = isLoading || isFetching;

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const [deleteInvitation] = useDeleteInvitationMutation();

  const handleDelete = useCallback(async (inv) => {
    console.log("Delete invitation:", inv._id);

    try {
      const res = await deleteInvitation({ inviteId: inv._id, eventId });

      if (res?.data?.success) {
        toast.success(res.data.message || "Invitation deleted");
      }
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast.error("Failed to delete invitation");
    }
  }, []);
  const [resendInvitation] = useResendInvitationMutation();

  const handleResend = useCallback(
    async (inv) => {
      try {
        const res = await resendInvitation({ invitationId: inv._id, eventId });
        if (res?.data?.success) {
          toast.success(res.data.message || "Invitation resent successfully");
        } else {
          toast.error(
            res?.error?.data?.message || "Failed to resend invitation",
          );
        }
      } catch (error) {
        console.error("Error resending invitation:", error);
        toast.error("Something went wrong");
      }
    },
    [eventId],
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        .animate-fade-in { animation: fadeIn .2s ease; }
        .row-in { animation: fadeIn .15s ease both; }
        
        /* Custom Ant Design Select Styling */
        .custom-antd-select .ant-select-selector {
          border-radius: 0.75rem !important;
          padding: 4px 8px !important;
          border-color: #e5e7eb !important;
          box-shadow: none !important;
        }
        .custom-antd-select.ant-select-focused .ant-select-selector {
          border-color: #14b8a6 !important;
          ring: 2px #14b8a6 !important;
        }
        .custom-antd-select .ant-select-selection-item {
          background-color: #f0fdfa !important;
          border: 1px solid #ccfbf1 !important;
          color: #0f766e !important;
          border-radius: 6px !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invitations</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {loading
                ? "Loading…"
                : `${meta.total} total invitation${meta.total !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm shadow-teal-200"
          >
            <Plus className="w-4 h-4" /> Send Invitation
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 overflow-x-auto">
          <div className="flex p-1.5 gap-1 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-10 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border-0"
            />
            {loading && (
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Name", "Role", "Email", "Status", "Date", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : invitations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Mail className="w-10 h-10 opacity-30" />
                        <p className="text-sm font-medium">
                          No invitations found
                        </p>
                        <p className="text-xs">
                          {debouncedSearch
                            ? "Try a different search term"
                            : "Send your first invitation to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  invitations.map((inv, i) => {
                    const role = getRoleInfo(inv.role);
                    const status = getStatusInfo(inv.status);
                    const isFav = favorites.has(inv._id);
                    return (
                      <tr
                        key={inv._id}
                        className="hover:bg-gray-50/80 transition-colors row-in"
                        style={{ animationDelay: `${i * 25}ms` }}
                      >
                        {/* Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase">
                              {(inv.name || inv.email)?.[0] || "?"}
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                              {inv.name || (
                                <span className="text-gray-400 italic text-xs">
                                  No name
                                </span>
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <Badge className={role.color}>{role.label}</Badge>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {inv.email}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <Badge className={status.color}>
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                          </Badge>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(inv.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedInv(inv);
                                setShowDetails(true);
                              }}
                              className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => toggleFavorite(inv._id)}
                              className={`p-1.5 rounded-lg transition-colors ${isFav ? "text-pink-500 bg-pink-50" : "text-gray-400 hover:text-pink-500 hover:bg-pink-50"}`}
                              title="Favourite"
                            >
                              <Heart
                                className="w-4 h-4"
                                fill={isFav ? "currentColor" : "none"}
                              />
                            </button>

                            <Popconfirm
                              title="Delete Invitation"
                              description="Are you sure you want to delete this invitation? This action cannot be undone."
                              onConfirm={() => handleDelete(inv)}
                              okText="Yes, Delete"
                              cancelText="Cancel"
                              okButtonProps={{
                                danger: true,
                                style: { borderRadius: "8px" },
                              }}
                              cancelButtonProps={{
                                style: { borderRadius: "8px" },
                              }}
                              placement="topRight"
                            >
                              <button
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </Popconfirm>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && meta.total > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {[9, 18, 27, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>
                  of <strong>{meta.total}</strong> results
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from(
                  { length: Math.min(6, totalPages) },
                  (_, i) => i + 1,
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 text-sm rounded-lg font-medium transition-colors ${
                      currentPage === p
                        ? "bg-teal-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}

      {showDetails && (
        <DetailsModal
          invitation={selectedInv}
          onClose={() => setShowDetails(false)}
          onResend={(inv) => handleResend(inv)} // ← এটা change করো
        />
      )}

      {showInvite && (
        <SendInvitationModal
          onClose={() => setShowInvite(false)}
          onSubmit={(form) => sendInvite(form)}
          sessions={sessions}
        />
      )}
    </div>
  );
}
