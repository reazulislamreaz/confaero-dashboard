

import { ArrowLeft, Bold, Italic, Link2, List, ListOrdered, Underline, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetJobByIdQuery, useUpdateJobMutation } from '../../../redux/features/jobSlice/jobSlice';
 
import toast from 'react-hot-toast';
import { useUploadFileMutation } from '../../../redux/features/fileUpload';

export default function EditJobPost() {
  const { id } = useParams(); // Get job ID from URL
  console.log(id)
  const navigate = useNavigate();
  
  // RTK Query hooks
  const { data: jobData, isLoading: jobLoading, isFetching, refetch } = useGetJobByIdQuery(id, { skip: !id, refetchOnMountOrArgChange: true });
  const [updateJob] = useUpdateJobMutation();
  const [uploadFile] = useUploadFileMutation();
  
  // Local state
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [newFacility, setNewFacility] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    locationUrl: '',
    experience: '',
    qualification: '',
    type: 'Full-time',
    position: '',
    jobExpire: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: [],
    applyLink: ''
  });

  // Load job data when fetched
  useEffect(() => {
    if (jobData?.data) {
      const job = jobData.data;
      setFormData({
        company: job.company || '',
        title: job.title || '',
        location: job.location || '',
        locationUrl: job.locationUrl || '',
        experience: job.experience || '',
        qualification: job.qualification || '',
        type: job.type || 'Full-time',
        position: job.position || '',
        jobExpire: job.jobExpire ? job.jobExpire.split('T')[0] : '',
        salary: job.salary || '',
        description: job.description || '',
        requirements: job.requirements || '',
        applyLink: job.applyLink || ''
      });
      setBannerUrl(job.bannerImage || '');
      setBannerPreview(job.bannerImage || '');
      setFacilities(job.benefits || []);
    }
  }, [jobData]);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setFacilities([...facilities, newFacility.trim()]);
      setNewFacility('');
    }
  };

  const handleRemoveFacility = (index) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Upload image to server and get URL
  const handleUploadImage = async () => {
    if (!bannerImage) {
      toast.error('Please select an image first');
      return null;
    }

    setIsUploading(true);
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', bannerImage);
      fileFormData.append('type', 'job_banner'); // Console log type as requested

      // Console log the file and type as requested
      console.log('Uploading File:', bannerImage);
      console.log('Upload Type:', 'job_banner');

      const attachmentResult = await uploadFile(fileFormData).unwrap();

      if (!attachmentResult?.success || !attachmentResult?.data?.url) {
        toast.error(attachmentResult?.message || 'File upload failed.');
        return null;
      }

      const imageUrl = attachmentResult.data.url;
      console.log('Uploaded Image URL:', imageUrl); // Console log URL
      setBannerUrl(imageUrl);
      setBannerPreview(imageUrl);
      setBannerImage(null);
      toast.success('Image uploaded successfully');
      return imageUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error?.data?.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    
    try {
      let finalBannerUrl = bannerUrl;

      // If there's a new image that hasn't been uploaded yet
      if (bannerImage) {
        finalBannerUrl = await handleUploadImage();
        if (!finalBannerUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare job update data
      const updateData = {
        ...formData,
        bannerImage: finalBannerUrl,
        benefits: facilities
      };

      // Console log final data before sending
      console.log('Updating Job with Data:', updateData);

      const result = await updateJob({ id, data: updateData }).unwrap();
       console.log(result);
      if (result.success===true) {
        toast.success('Job updated successfully');
        navigate('/dashboard/resources/job-posts');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error(error?.data?.message || 'Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log('Edit cancelled');
    navigate('/dashboard/resources/job-posts');
  };

  if (jobLoading || isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-500">Loading job details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button and Header */}
        <div className="mb-6">
          <button 
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Jobs</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Edit Job Post</h1>
          <p className="text-gray-500 text-sm mt-1">Update job posting details</p>
        </div>

        {/* Logo & Banner Image Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Logo & Banner Image</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white relative">
              {bannerPreview ? (
                <div className="relative">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="max-h-48 mx-auto rounded"
                  />
                  {bannerImage && (
                    <button
                      onClick={() => {
                        setBannerImage(null);
                        setBannerPreview(bannerUrl);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      title="Revert to previous image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Browse photo or drop here</p>
                  <p className="text-xs text-gray-400">
                    Normal image 480px dimension 1920x600. Max photo size 10 MB
                  </p>
                </div>
              )}
            </div>

            {/* Change Image Button — always visible */}
            <label
              htmlFor="banner-upload"
              className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {bannerPreview ? 'Change Image' : 'Select Image'}
            </label>
            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="hidden"
            />

            {/* Upload Button — shown when new file is selected but not yet uploaded */}
            {bannerImage && (
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={isUploading}
                className="mt-2 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload New Image'}
              </button>
            )}
          </div>
        </div>

        {/* Post a Job Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h2>
          
          {/* Company */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Add Job title, role, vacancies etc"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Job Location and Location URL */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location URL
              </label>
              <input
                type="url"
                placeholder="https://maps.google.com/..."
                value={formData.locationUrl}
                onChange={(e) => handleInputChange('locationUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Information</h2>
          
          {/* Experience, Qualification, Job Type */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                placeholder="e.g., 3+ years"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification
              </label>
              <input
                type="text"
                placeholder="e.g., BSc in CSE"
                value={formData.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Position, Job Expire, Salary */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                placeholder="e.g., Senior Engineer"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Expire
              </label>
              <input
                type="date"
                value={formData.jobExpire}
                onChange={(e) => handleInputChange('jobExpire', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary
              </label>
              <input
                type="text"
                placeholder="e.g., $2000/month"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Facilities and Others */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facilities and Benefits
            </label>
            
            {/* Facility Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {facilities.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                >
                  {facility}
                  <button
                    onClick={() => handleRemoveFacility(index)}
                    className="hover:text-teal-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Facility Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add job benefits"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFacility()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleAddFacility}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Description & Responsibility Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Description & Responsibility</h2>
          
          {/* Job Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job description
            </label>
            <textarea
              placeholder="Add your job description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            
            {/* Text Editor Toolbar (visual only - implement rich text editor if needed) */}
            <div className="flex items-center gap-2 mt-2 p-2 border-t border-gray-200">
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Bold">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Italic">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Underline">
                <Underline className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Link">
                <Link2 className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Bullet List">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Numbered List">
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <textarea
              placeholder="Add your Job Requirements..."
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            
            {/* Text Editor Toolbar */}
            <div className="flex items-center gap-2 mt-2 p-2 border-t border-gray-200">
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Bold">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Italic">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Underline">
                <Underline className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Link">
                <Link2 className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Bullet List">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800" title="Numbered List">
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Apply Link */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Link
          </label>
          <input
            type="url"
            placeholder="https://forms.google.com/..."
            value={formData.applyLink}
            onChange={(e) => handleInputChange('applyLink', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Update Job'}
          </button>
        </div>
      </div>
    </div>
  );
}