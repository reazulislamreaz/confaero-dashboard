import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function QAPolls() {
  const [activeTab, setActiveTab] = useState('QA');
  const [showAddFAQModal, setShowAddFAQModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [pollForm, setPollForm] = useState({
    question: '',
    options: ['', '']
  });

  const faqs = [
    { 
      id: 1, 
      question: 'Lorem Ipsum is simply dummy text of the printing and typeset!!!?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance.",
      isExpanded: false 
    },
    { 
      id: 2, 
      question: 'What is the benefit of combining strength training and Pilates?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance. Together, they create the ultimate dynamic duo: power and grace for a sculpted and toned babe-ody!!",
      isExpanded: true 
    },
    { 
      id: 3, 
      question: 'Lorem Ipsum is simply dummy text of the printing and typeset!!!?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance.",
      isExpanded: false 
    },
    { 
      id: 4, 
      question: 'Lorem Ipsum is simply dummy text of the printing and typeset!!!?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance.",
      isExpanded: false 
    },
    { 
      id: 5, 
      question: 'Lorem Ipsum is simply dummy text of the printing and typeset!!!?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance.",
      isExpanded: false 
    },
    { 
      id: 6, 
      question: 'Lorem Ipsum is simply dummy text of the printing and typeset!!!?', 
      answer: "It's like the best of both worlds, truly. Strength training builds muscle and strength while Pilates brings in the core control, flexibility, and balance.",
      isExpanded: false 
    }
  ];

  const polls = [
    {
      id: 1,
      question: 'Which session topic are you most excited about?',
      options: [
        { label: 'Excellent', value: 80, votes: 30 },
        { label: 'Very good', value: 90, votes: 30 }
      ]
    },
    {
      id: 2,
      question: 'How satisfied are you with the event organization so far?',
      options: [
        { label: 'Very good', value: 80, votes: 80 },
        { label: 'Excellent', value: 95, votes: 95 },
        { label: 'Good', value: 70, votes: 70 },
        { label: 'Average', value: 50, votes: 50 },
        { label: 'Below Average', value: 40, votes: 40 },
        { label: 'Poor', value: 30, votes: 30 },
        { label: 'Very Poor', value: 10, votes: 10 }
      ]
    },
    {
      id: 3,
      question: 'Which session topic are you most excited about?',
      options: [
        { label: 'Excellent', value: 80, votes: 30 },
        { label: 'Very good', value: 90, votes: 30 }
      ]
    },
    {
      id: 4,
      question: 'Which speaker session did you find the most valuable?',
      options: [
        { label: 'Excellent', value: 80, votes: 30 },
        { label: 'Very good', value: 90, votes: 30 }
      ]
    }
  ];

  const surveyData = [
    { id: '#001', user: 'Alen Hossain', rating: 9.5, helpful: 'Yes', suggestion: 'Very informative session.', submitted: '10 Jan, 12:45 PM' },
    { id: '#002', user: 'Sara Johnson', rating: 8.0, helpful: 'Yes', suggestion: 'Engaging and enjoyable.', submitted: '10 Jan, 1:00 PM' },
    { id: '#003', user: 'Mark Smith', rating: 7.5, helpful: 'No', suggestion: 'Could use more examples.', submitted: '10 Jan, 1:15 PM' },
    { id: '#004', user: 'Emily Davis', rating: 9.0, helpful: 'Yes', suggestion: 'Well structured presentation.', submitted: '10 Jan, 1:20 PM' },
    { id: '#005', user: 'Alen Hossain', rating: 9.5, helpful: 'No', suggestion: 'Very informative session.', submitted: '10 Jan, 1:25 PM' },
    { id: '#006', user: 'Michael Lee', rating: 8.5, helpful: 'Yes', suggestion: 'Great insights and takeaways.', submitted: '10 Jan, 1:40 PM' },
    { id: '#007', user: 'Alen Hossain', rating: 9.5, helpful: 'Yes', suggestion: 'Very informative session.', submitted: '10 Jan, 12:45 PM' },
    { id: '#008', user: 'Jessica Miller', rating: 6.5, helpful: 'No', suggestion: 'Lacked depth in some areas.', submitted: '10 Jan, 2:00 PM' },
    { id: '#009', user: 'Tom Brown', rating: 8.0, helpful: 'Yes', suggestion: 'Good structure, but could use more concepts.', submitted: '10 Jan, 2:15 PM' }
  ];

  const [expandedFAQs, setExpandedFAQs] = useState([2]);

  const toggleFAQ = (id) => {
    setExpandedFAQs(prev =>
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    );
  };

  const handleAddFAQ = () => {
    if (faqForm.question && faqForm.answer) {
      console.log('Add FAQ:', faqForm);
      setShowAddFAQModal(false);
      setFaqForm({ question: '', answer: '' });
    }
  };

  const handleCreatePoll = () => {
    if (pollForm.question && pollForm.options.every(opt => opt.trim())) {
      console.log('Create Poll:', pollForm);
      setShowCreatePollModal(false);
      setPollForm({ question: '', options: ['', ''] });
    }
  };

  const addPollOption = () => {
    setPollForm(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updatePollOption = (index, value) => {
    setPollForm(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const totalPages = Math.ceil(surveyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurveyData = surveyData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="">
        {/* Header */}
        <div className='flex items-center justify-between mb-5'>


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
              activeTab === 'QA'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Q/A
          </button>
          <button
            onClick={() => setActiveTab('Poll')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'Poll'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Poll
          </button>
          <button
            onClick={() => setActiveTab('Survey')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'Survey'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Survey
          </button>
        </div>
        </div>

        {/* Q/A Tab Content */}
        {activeTab === 'QA' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddFAQModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Q&A
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="mt-1"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedFAQs.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{faq.question}</p>
                        {expandedFAQs.includes(faq.id) && (
                          <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poll Tab Content */}
        {activeTab === 'Poll' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowCreatePollModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Poll
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {polls.map((poll) => (
                <div key={poll.id} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-gray-800 font-medium mb-4">{poll.question}</h3>
                  <div className="space-y-3 mb-4">
                    {poll.options.map((option, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">{option.label}</span>
                          <span className="text-sm text-gray-600">{option.votes}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${option.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                      Delete
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                      Update
                    </button>
                    <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                      View Votes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Survey Tab Content */}
        {activeTab === 'Survey' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Total Responses</p>
                <p className="text-3xl font-bold text-gray-800">128</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">4.3</p>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600 text-sm mb-2">Positive Feedback</p>
                <p className="text-3xl font-bold text-gray-800">92%</p>
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
                    {currentSurveyData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{item.user}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-800">{item.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              item.helpful === 'Yes'
                                ? 'bg-green-50 text-green-600'
                                : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {item.helpful}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.suggestion}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.submitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Showing</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                  </select>
                  <span>of {surveyData.length}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded ${
                        currentPage === page
                          ? 'bg-teal-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
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

      {/* Add FAQ Modal */}
      {showAddFAQModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Add FAQ</h2>
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
                onClick={handleAddFAQ}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Poll Modal */}
      {showCreatePollModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Create a poll</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                {pollForm.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
                  />
                ))}
              </div>

              <button
                onClick={addPollOption}
                className="text-teal-500 hover:text-teal-600 font-medium text-sm"
              >
                + Add Option
              </button>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={handleCreatePoll}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}