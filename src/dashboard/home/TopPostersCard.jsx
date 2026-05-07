import React from 'react';
import { Star } from 'lucide-react';

const TopPostersCard = ({ posters, onViewRankings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Top Posters</h2>
        <button 
          onClick={onViewRankings}
          className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
        >
          View Rankings
        </button>
      </div>
      <div className="p-6 space-y-4">
        {posters.length === 0 ? (
          <p className="text-gray-500 text-sm italic text-center py-4">No posters available.</p>
        ) : (
          posters.map((poster, index) => (
            <div
              key={poster._id || index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-200 text-cyan-500 font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 line-clamp-1">{poster.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{poster.authorName}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-500">
                <Star className="w-5 h-5 fill-cyan-500" />
                <span className="font-bold text-lg">{poster.rating || '0.0'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopPostersCard;
