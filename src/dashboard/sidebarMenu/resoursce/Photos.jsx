import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Edit } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import { useDeletePhotoMutation, useGetPhotosQuery, useUploadPhotoMutation } from '../../../redux/features/photos/photoSlice';
import { useSelectedEvent } from '../../../hooks/useSelectedEvent';
import { Popconfirm } from 'antd';
import toast from 'react-hot-toast';
import { useUploadFileMutation } from '../../../redux/features/fileUpload';

export default function Photos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // New states for Upload Modal
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState('event');
  const [uploadPhoto] = useUploadPhotoMutation();

  const { eventId } = useSelectedEvent();

  const { data: photosData, isLoading, isError } = useGetPhotosQuery({
    eventId,
    page: currentPage,
    limit: itemsPerPage
  });

  const photos = photosData?.data ?? [];
  
  const meta = photosData?.meta ?? { page: 1, limit: itemsPerPage, total: 0 };
  const totalPages = Math.ceil(meta.total / itemsPerPage);

  const categories = [
    { id: 'all',      name: 'All' },
    { id: 'event',    name: 'Event' },
    { id: 'booth',    name: 'Booth gallery' },
    { id: 'floor',    name: 'Floor map' },
    { id: 'campaign', name: 'Campaign' },
    { id: 'other',    name: "Other's" }
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.type?.toLowerCase() === selectedCategory.toLowerCase());

  const [deletePhoto] = useDeletePhotoMutation();

  const handleDelete = async(id) => {
      try {
       const res = await deletePhoto(id);
       if (res?.data?.success === true) {
        toast.success('Photo deleted successfully');
       } 
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
  };

  const handleEdit = (id) => {
    console.log('Edit photo:', id);
  };
   const [uploadChatAttachment] = useUploadFileMutation(); 

  // Updated Handle Upload to get File and Type
  const handleUpload = async(e) => {
    e.preventDefault();
    
    // Console log the file and type as requested
    console.log('Selected File:', selectedFile);
    console.log('Selected Type:', selectedType);

     const fileFormData = new FormData();
     fileFormData.append('file', selectedFile);
     fileFormData.append('type', selectedType);

      const attachmentResult = await uploadChatAttachment(fileFormData).unwrap();

      if (!attachmentResult?.success || !attachmentResult?.data?.url) {
        toast.error(attachmentResult?.message || 'File upload failed.');
        return;
      }

      const documentUrl = attachmentResult.data.url;
      console.log(documentUrl)



    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }
 
    try {
     const res = await uploadPhoto({ 
        eventId,  
        body: {
          imageUrl: documentUrl, // Use the URL from the file upload response
          type: selectedType,
        }
      }).unwrap();
      if (res?.success === true) {
        toast.success('Photo uploaded successfully');
      } else {
        toast.error(res?.message || 'Photo upload failed');
      }
 
    setSelectedFile(null);
    setSelectedType('event');
    setIsModalOpen(false);

    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
      return;
    } 

  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Helper to close modal and reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setSelectedType('event');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
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
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer border-[#D2D2D2] transition-colors ${
                selectedCategory === category.id
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            Loading photos...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-20 text-red-400 text-sm">
            Failed to load photos.
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            No photos found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map(photo => (
              <div key={photo._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.type}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = '/public/image/photo.png'; }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(photo._id)}
                      className="bg-white/80 hover:bg-white p-1 rounded-full transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <Popconfirm
                      title="Are you sure you want to delete this photo?"
                      onConfirm={() => handleDelete(photo._id)}
                      okText="Yes"
                      cancelText="No"
                    >

                    <button 
                      className="bg-white/80 hover:bg-white p-1 rounded-full transition-colors"
                      title="Delete"
                    >
                      <RxCross2 size={16} className="text-gray-600 hover:text-red-500" />
                    </button>
                    </Popconfirm>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 capitalize">{photo.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Showing</span>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {[6, 12, 24].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-sm text-gray-600">of {meta.total}</span>
          </div>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-teal-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add Photo</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpload}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors cursor-pointer relative">
                  <div className="flex flex-col items-center">
                    <ImageIcon size={32} className="text-teal-500 mb-2" />
                    <span className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : 'Click to Upload Image'}
                    </span>
                    {/* Hidden Input triggered by the box logic or visible */}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*" 
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
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
                  onClick={closeModal}
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