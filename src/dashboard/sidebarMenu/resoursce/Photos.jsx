import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Folder, Camera } from 'lucide-react';

export default function Photos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [photos, setPhotos] = useState([
    { id: 1, src: 'https://placehold.co/600x400/3b82f6/ffffff?text=Events', category: 'event', title: 'Events' },
    { id: 2, src: 'https://placehold.co/600x400/10b981/ffffff?text=Events', category: 'event', title: 'Events' },
    { id: 3, src: 'https://placehold.co/600x400/f59e0b/ffffff?text=Events', category: 'event', title: 'Events' },
    { id: 4, src: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Events', category: 'event', title: 'Events' },
    { id: 5, src: 'https://placehold.co/600x400/ef4444/ffffff?text=Events', category: 'event', title: 'Events' },
    { id: 6, src: 'https://placehold.co/600x400/059669/ffffff?text=Events', category: 'event', title: 'Events' }
  ]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'event', name: 'Event' },
    { id: 'booth', name: 'Booth gallery' },
    { id: 'floor', name: 'Floor map' },
    { id: 'campaign', name: 'Campaign' },
    { id: 'other', name: 'Other\'s' }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const handleUpload = (e) => {
    e.preventDefault();
    // In a real app, you would handle the file upload here
    console.log('Photo uploaded');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Photo</h1>
              <p className="text-sm text-gray-500">Upload and manage event Photo</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Upload size={18} />
              Upload Photo
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map(photo => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button className="bg-white/80 hover:bg-white p-1 rounded-full">
                    <ImageIcon size={16} className="text-gray-600" />
                  </button>
                  <button className="bg-white/80 hover:bg-white p-1 rounded-full">
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">{photo.title}</p>
              </div>
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

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Photo</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpload}>
              <div className="mb-6">
                <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
                  <div className="flex flex-col items-center">
                    <ImageIcon size={32} className="text-teal-500 mb-2" />
                    <span className="text-sm text-gray-600">Upload Image</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value="event"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="event">Events</option>
                  <option value="booth">Booth gallery</option>
                  <option value="floor">Floor map</option>
                  <option value="campaign">Campaign</option>
                  <option value="other">Other's</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
