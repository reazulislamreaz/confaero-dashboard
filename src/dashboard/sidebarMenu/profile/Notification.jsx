import { useState } from 'react';
import { ChevronDown, ChevronUp, Bell, AlertCircle, RefreshCw } from 'lucide-react';
import { useGetNotificationsQuery, useMarkAsReadMutation } from '../../../redux/features/notificationSlice/notificationSlice';
import { useSelectedEvent } from '../../../hooks/useSelectedEvent';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ListSkeleton from '../../../components/loading/ListSkeleton';
import SubtitleSkeleton from '../../../components/loading/SubtitleSkeleton';
import { useDashboardLoading } from '../../../hooks/useDashboardLoading';

dayjs.extend(relativeTime);

export default function NotificationsPage() {
  const [expandedNotifications, setExpandedNotifications] = useState({});
  const { eventId } = useSelectedEvent();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { data: notificationsRes, isLoading, isFetching, refetch } = useGetNotificationsQuery({
    eventId,
    page: currentPage,
    limit: itemsPerPage
  }, { skip: !eventId });

  const loading = useDashboardLoading(isLoading, isFetching);

  const [markAsRead] = useMarkAsReadMutation();

  const notifications = notificationsRes?.data?.data || [];
  const meta = notificationsRes?.data?.meta || {};
  const totalItems = meta.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handleExpandAndRead = async (notification) => {
    // Toggle expand state
    setExpandedNotifications(prev => ({
      ...prev,
      [notification._id]: !prev[notification._id]
    }));

    // If not read, mark as read
    if (!notification.isRead) {
      try {
       await markAsRead({
  notificationId: notification._id,
  eventId: eventId
}).unwrap();
        // Since we invalidate tags in RTK query, the list will automatically refetch
      } catch (error) {
        console.error("Failed to mark notification as read", error);
      }
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'warning':
      case 'Alert':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'success':
      case 'Approval':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return <Bell size={18} className="text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className=" px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">All the notifications related to the Events and App</p>
            </div>
            <button 
              onClick={() => refetch()} 
              disabled={isFetching}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
              title="Refresh notifications"
            >
              <RefreshCw size={18} className={`text-gray-600 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="  px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {loading ? (
            <ListSkeleton rows={5} />
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
              <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p>No notifications found.</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification._id} 
                className={`rounded-lg shadow-sm p-4 border transition-colors ${
                  !notification.isRead 
                    ? 'bg-blue-50/50 border-teal-200 shadow-teal-100/50' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => handleExpandAndRead(notification)}>
                    <div className="flex items-center gap-2 mb-2">
                      {getIconForType(notification.type)}
                      <h3 className={`font-medium ${!notification.isRead ? 'text-teal-800' : 'text-gray-900'}`}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 inline-block w-2.5 h-2.5 bg-teal-500 rounded-full"></span>
                        )}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {dayjs(notification.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                  
                  <div className='flex justify-center items-center ml-4'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandAndRead(notification);
                      }}
                      className="p-1 text-gray-400 bg-gray-50 rounded-full cursor-pointer hover:text-gray-600 transition-colors"
                    >
                      {expandedNotifications[notification._id] ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Details Section */}
                {expandedNotifications[notification._id] && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Details</h4>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">
                        {notification.message}
                      </p>
                      {notification.type && (
                        <div className="mt-3 text-xs text-gray-500">
                          <strong>Type:</strong> {notification.type.replace(/_/g, ' ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && notifications.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select 
                title="Limit"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={50}>50</option>
              </select>
              <span>of {totalItems}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                // simple pagination logic to show up to 5 surrounding pages
                // For a real app, you might want more complex ellipsis logic
                let pageNum = Math.max(1, currentPage - 2) + idx;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] px-3 py-1 rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
