import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function Card({ title, image, description, date, status, rating, author, role, actionText, onAction }) {
  
  const getStatusColor = (statusText) => {
    if (!statusText) return '';
    const s = statusText.toLowerCase();
    switch (s) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'accepted':
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    if(!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Optional Image Section */}
      {image && (
        <div className="w-full sm:w-48 h-32 sm:h-auto overflow-hidden bg-gray-50 shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
          />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
            {status && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                {getStatusText(status)}
              </span>
            )}
            {rating && (
              <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded border border-teal-100">
                <span className="text-xs font-bold text-teal-700">★ {rating}</span>
              </div>
            )}
          </div>
          
          {(author || role) && (
             <div className="text-sm font-medium text-gray-600 mb-2">
               {author && <span className="text-gray-800">{author}</span>}
               {author && role && <span className="mx-2 text-gray-300">|</span>}
               {role && <span className="text-teal-600">{role}</span>}
             </div>
          )}

          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-400 font-medium">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {date ? new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'}) : "N/A"}
          </div>
          
          {(actionText || onAction) && (
            <button 
              onClick={onAction}
              className="group flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
            >
              {actionText || 'View Details'}
              <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
