import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetQAsQuery,
  useCreateQAMutation,
  useUpdateQAMutation,
  useDeleteQAMutation,
  useGetPollsQuery,
  useCreatePollMutation,
  useUpdatePollMutation,
  useDeletePollMutation,
  useGetSurveyAnalyticsQuery,
} from '../../../redux/features/resourcec/qaPollSurveySlice';
import { useSelectedEvent } from '../../../hooks/useSelectedEvent';

export default function QAPolls() {
  const { eventId } = useSelectedEvent();

  const [activeTab, setActiveTab] = useState('QA');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [expandedFAQs, setExpandedFAQs] = useState([]);

  // ── Add/Edit Q&A Modal ──────────────────────────────────────────────
  const [showAddFAQModal, setShowAddFAQModal] = useState(false);
  const [editingQA, setEditingQA] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  // ── Create/Edit Poll Modal ──────────────────────────────────────────
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [pollForm, setPollForm] = useState({ question: '', options: ['', ''] });

  // ── RTK Queries ────────────────────────────────────────────────────
  const { data: qaData, refetch: refetchQAs } = useGetQAsQuery(eventId, { skip: !eventId });
  const { data: pollData, refetch: refetchPolls } = useGetPollsQuery(eventId, { skip: !eventId });
  const { data: surveyData } = useGetSurveyAnalyticsQuery(
    { eventId, page: currentPage, limit: itemsPerPage },
    { skip: !eventId }
  );

  // ── RTK Mutations ──────────────────────────────────────────────────
  const [createQA, { isLoading: isCreatingQA }] = useCreateQAMutation();
  const [updateQA, { isLoading: isUpdatingQA }] = useUpdateQAMutation();
  const [deleteQA] = useDeleteQAMutation();
  const [createPoll, { isLoading: isCreatingPoll }] = useCreatePollMutation();
  const [updatePoll, { isLoading: isUpdatingPoll }] = useUpdatePollMutation();
  const [deletePoll] = useDeletePollMutation();

  // ── Normalise API data ─────────────────────────────────────────────
  const safeArray = (d) => (Array.isArray(d) ? d : Array.isArray(d?.data) ? d.data : []);
  const faqs = safeArray(qaData);
  const polls = safeArray(pollData);

  // Survey data: backend returns { summary, submissions, meta }
  const surveyPayload = surveyData?.data || surveyData || {};
  const surveySummary = surveyPayload?.summary || {};
  const surveyRows = safeArray(surveyPayload?.submissions);
  const surveyMeta = surveyPayload?.meta || {};
  const totalPages = Math.max(1, surveyMeta.total ? Math.ceil(surveyMeta.total / itemsPerPage) : 1);

  // ── Q&A Helpers ────────────────────────────────────────────────────
  const toggleFAQ = (id) =>
    setExpandedFAQs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const openAddFAQ = () => {
    setEditingQA(null);
    setFaqForm({ question: '', answer: '' });
    setShowAddFAQModal(true);
  };

  const openEditFAQ = (qa) => {
    setEditingQA(qa);
    setFaqForm({ question: qa.question, answer: qa.answer });
    setShowAddFAQModal(true);
  };

  const handleSubmitFAQ = async () => {
    if (!faqForm.question || !faqForm.answer) return;
    try {
      if (editingQA) {
        await updateQA({ id: editingQA._id, eventId, ...faqForm }).unwrap();
        toast.success('Q&A updated!');
      } else {
        await createQA({ eventId, ...faqForm }).unwrap();
        toast.success('Q&A added!');
      }
      refetchQAs();
      setShowAddFAQModal(false);
      setFaqForm({ question: '', answer: '' });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save Q&A');
    }
  };

  const handleDeleteQA = async (id) => {
    try {
      await deleteQA({ id, eventId }).unwrap();
      toast.success('Q&A deleted!');
      refetchQAs();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete Q&A');
    }
  };

  // ── Poll Helpers ───────────────────────────────────────────────────
  const openCreatePoll = () => {
    setEditingPoll(null);
    setPollForm({ question: '', options: ['', ''] });
    setShowCreatePollModal(true);
  };

  const openEditPoll = (poll) => {
    setEditingPoll(poll);
    setPollForm({
      question: poll.question,
      options: poll.options.map((o) => o.text || o.label || o),
    });
    setShowCreatePollModal(true);
  };

  const addPollOption = () =>
    setPollForm((prev) => ({ ...prev, options: [...prev.options, ''] }));

  const updatePollOption = (index, value) =>
    setPollForm((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }));

  const removePollOption = (index) =>
    setPollForm((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));

  const handleSubmitPoll = async () => {
    if (!pollForm.question || pollForm.options.some((o) => !o.trim())) return;
    const payload = {
      eventId,
      question: pollForm.question,
      options: pollForm.options.map((text) => ({ text, voteCount: 0 })),
    };
    try {
      if (editingPoll) {
        await updatePoll({ id: editingPoll._id, eventId, ...payload }).unwrap();
        toast.success('Poll updated!');
      } else {
        await createPoll(payload).unwrap();
        toast.success('Poll created!');
      }
      refetchPolls();
      setShowCreatePollModal(false);
      setPollForm({ question: '', options: ['', ''] });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save poll');
    }
  };

  const handleDeletePoll = async (id) => {
    try {
      await deletePoll({ id, eventId }).unwrap();
      toast.success('Poll deleted!');
      refetchPolls();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete poll');
    }
  };

  // Progress bar percentage helper (uses voteCount field from backend model)
  const calcPercent = (optVoteCount, allOpts) => {
    const total = allOpts.reduce((sum, o) => sum + (o.voteCount || o.votes || 0), 0);
    if (!total) return 0;
    return Math.round(((optVoteCount || 0) / total) * 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="">
        {/* Header */}
        <div className='px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between mb-5'>
          <div className="">
            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
              {activeTab === 'Survey' ? 'Survey Results - Event Feedback' : 'Q&A & Polls'}
            </h1>
            <p className="text-gray-500 text-sm">
              {activeTab === 'Survey' ? 'View User Experience and Event Feedback' : 'Create FAQ and polls for attendees'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 ">
            <button
              onClick={() => setActiveTab('QA')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === 'QA' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >Q/A</button>
            <button
              onClick={() => setActiveTab('Poll')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === 'Poll' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >Poll</button>
            <button
              onClick={() => setActiveTab('Survey')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === 'Survey' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >Survey</button>
          </div>
        </div>



        {/* Q/A Tab Content */}
        {activeTab === 'QA' && (
          <div >
            <div className="flex justify-end mb-4">
              <button onClick={openAddFAQ} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                <Plus className="w-4 h-4" />
                Add Q&A
              </button>
            </div>

            {faqs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center text-gray-500">No Q&As yet. Click "Add Q&A" to create one.</div>
            ) : (
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq._id} className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <button onClick={() => toggleFAQ(faq._id)} className="mt-1">
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQs.includes(faq._id) ? 'rotate-180' : ''}`} />
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{faq.question}</p>
                          {expandedFAQs.includes(faq._id) && (
                            <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditFAQ(faq)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={() => handleDeleteQA(faq._id)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Poll Tab Content */}
        {activeTab === 'Poll' && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={openCreatePoll} className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                <Plus className="w-4 h-4" />
                Create Poll
              </button>
            </div>

            {polls.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-10 text-center text-gray-500">No polls yet. Click "Create Poll" to add one.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {polls.map((poll) => (
                  <div key={poll._id} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-gray-800 font-medium mb-4">{poll.question}</h3>
                    <div className="space-y-3 mb-4">
                      {(poll.options || []).map((option, idx) => {
                        const pct = calcPercent(option.voteCount ?? option.votes, poll.options);
                        return (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-700">{option.text || option.label}</span>
                              <span className="text-sm text-gray-600">{option.voteCount ?? option.votes ?? 0}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleDeletePoll(poll._id)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">Delete</button>
                      <button onClick={() => openEditPoll(poll)} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">Update</button>
                      {/* <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">View Votes</button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Survey Tab Content */}
        {activeTab === 'Survey' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Total Responses</p>
                <p className="text-3xl font-bold text-gray-800">{surveySummary?.totalResponses ?? '-'}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">
                    {surveySummary?.averageRating != null ? Number(surveySummary.averageRating).toFixed(1) : '-'}
                  </p>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Positive Feedback</p>
                <p className="text-3xl font-bold text-gray-800">
                  {surveySummary?.positiveFeedback != null ? `${surveySummary.positiveFeedback}%` : '-'}
                </p>
              </div>
            </div>

            {/* Survey Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">S.ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Helpful?</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Suggestion</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {surveyRows.length === 0 ? (
                      <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500">No survey results yet.</td></tr>
                    ) : (
                      surveyRows.map((item, idx) => (
                        <tr key={item._id || idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-800">#{String(idx + 1).padStart(3, '0')}</td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {item.userId?.email || item.userName || item.user || '-'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-800">{item.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              item.helpful === true || item.helpful === 'Yes'
                                ? 'bg-green-50 text-green-600'
                                : 'bg-red-50 text-red-600'
                            }`}>
                              {item.helpful === true ? 'Yes' : item.helpful === false ? 'No' : item.helpful}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.suggestion || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
                              : '-'}
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
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                  </select>
                  <span>of {surveyMeta?.total ?? surveyRows.length}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded ${
                        currentPage === page ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >{page}</button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit FAQ Modal */}
      {showAddFAQModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">{editingQA ? 'Edit FAQ' : 'Add FAQ'}</h2>
              <button onClick={() => setShowAddFAQModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <input
                  type="text"
                  placeholder="Write your question here..."
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-xs text-teal-500 mt-1 text-right">Write at least 150 characters.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                <textarea
                  placeholder="Write your question's answers..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
                <p className="text-xs text-teal-500 mt-1 text-right">Write at least 300 characters.</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={handleSubmitFAQ}
                disabled={isCreatingQA || isUpdatingQA}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium disabled:opacity-50"
              >
                {isCreatingQA || isUpdatingQA ? 'Saving…' : editingQA ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Poll Modal */}
      {showCreatePollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">{editingPoll ? 'Update poll' : 'Create a poll'}</h2>
              <button onClick={() => setShowCreatePollModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poll Question *</label>
                <input
                  type="text"
                  placeholder="Which session topic are you most excited about?"
                  value={pollForm.question}
                  onChange={(e) => setPollForm({ ...pollForm, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
                {pollForm.options.map((option, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {pollForm.options.length > 2 && (
                      <button onClick={() => removePollOption(index)} className="text-red-400 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addPollOption} className="text-teal-500 hover:text-teal-600 font-medium text-sm">
                + Add Option
              </button>
            </div>
             <div className="p-6 pt-0">
              <button
                onClick={handleSubmitPoll}
                disabled={isCreatingPoll || isUpdatingPoll}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium disabled:opacity-50"
              >
                {isCreatingPoll || isUpdatingPoll ? 'Saving…' : editingPoll ? 'Update Poll' : 'Create Poll'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}