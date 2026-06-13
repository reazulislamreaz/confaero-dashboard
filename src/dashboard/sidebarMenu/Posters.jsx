import React, { useState } from 'react';
import { useGetTopPostersQuery } from '../../redux/features/reviwer/reviewerSlice';
import { useSelectedEvent } from '../../hooks/useSelectedEvent';
import { Star } from 'lucide-react';
import TableSkeleton from '../../components/loading/TableSkeleton';

const PostersRanking = () => {
  const { eventId } = useSelectedEvent();
  const [limit, setLimit] = useState(10);

  const { data: postersData, isLoading, isError } = useGetTopPostersQuery({ eventId, limit });

  const rawPosters = postersData?.data || [];
  const posters = [...rawPosters]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400 text-white';
      case 2:
        return 'bg-gray-300 text-gray-800';
      case 3:
        return 'bg-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Top Posters</h1>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Rank', 'Name', 'Rating', 'Reviews'].map((header) => (
                  <th key={header} className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <TableSkeleton rows={6} columns={4} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load posters. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Poster Rankings</h1>
          <p className="text-gray-500 text-sm">View the top-rated posters for this event</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={3}>Top 3</option>
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={20}>Top 20</option>
            </select>
          </div>
        </div>

        {/* Posters List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {posters.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No posters available for this event.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {posters.map((poster, index) => (
                <div
                  key={poster._id || poster.id || index}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Number */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getRankColor(
                        index + 1
                      )}`}
                    >
                      {index + 1}
                    </div>

                    {/* Poster Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">
                        {poster.title || 'Untitled Poster'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {poster.authorName || 'Unknown Author'}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold text-gray-800">
                        {poster.rating?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostersRanking;
