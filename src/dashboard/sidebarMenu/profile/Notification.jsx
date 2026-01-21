import { useState } from 'react';
import { ChevronDown, ChevronUp, Bell, AlertCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [expandedNotifications, setExpandedNotifications] = useState({});

  const notifications = [
    {
      id: 1,
      title: "New Session has been Created!",
      message: "New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer.",
      time: "2 min ago",
      type: "info"
    },
    {
      id: 2,
      title: "New Session has been Created!",
      message: "New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer.",
      time: "2 min ago",
      type: "info"
    },
    {
      id: 3,
      title: "New Session has been Created!",
      message: "New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer. New Session has been Created for the event by Organizer.",
      time: "January 1, 2024",
      type: "info"
    },
    {
      id: 4,
      title: "Event Reminder: Conference Starts Tomorrow",
      message: "Your scheduled conference is starting tomorrow at 9:00 AM. Please prepare your presentation materials and arrive 15 minutes early.",
      time: "1 hour ago",
      type: "warning"
    },
    {
      id: 5,
      title: "Payment Confirmation",
      message: "Your payment of $250.00 for Event Registration has been successfully processed. Thank you for your participation!",
      time: "Yesterday",
      type: "success"
    },
    {
      id: 6,
      title: "System Update Scheduled",
      message: "The system will be undergoing maintenance tonight from 10:00 PM to 2:00 AM. Please save your work before then.",
      time: "3 days ago",
      type: "info"
    }
  ];

  const toggleExpand = (id) => {
    setExpandedNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">All the notifications related to the Events and App</p>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="  px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {notification.type === 'warning' && (
                      <AlertCircle size={18} className="text-yellow-500" />
                    )}
                    {notification.type === 'success' && (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      notification.type === 'warning' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : notification.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.time}
                    </span>
                    <div className='flex justify-center items-center'>

                      <button
                  onClick={() => toggleExpand(notification.id)}
                  className="ml-2 p-1 text-gray-400 bg-amber-50 cursor-pointer hover:text-gray-600 transition-colors"
                >
                  {expandedNotifications[notification.id] ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                    </div>

                  </div>
                </div>
                
              
              </div>
              
              {/* Details Section */}
              {expandedNotifications[notification.id] && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">
                      {notification.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Showing</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </select>
            <span className="text-sm text-gray-600">of 50</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(page => (
              <button
                key={page}
                className={`px-3 py-1 rounded text-sm ${
                  page === 1
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
