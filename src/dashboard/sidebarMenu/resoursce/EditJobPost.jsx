import React, { useState } from 'react';
import { Upload, Plus, X, Bold, Italic, Underline, Link2, List, ListOrdered, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditJobPost() {
  const navigate = useNavigate()
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop');
  const [facilities, setFacilities] = useState(['401k Salary', 'Profit Sharing']);
  const [newFacility, setNewFacility] = useState('');
  
  const [formData, setFormData] = useState({
    company: 'TechCorp',
    jobTitle: 'Senior Software Engineer',
    jobLocation: 'London, UK',
    locationUrl: 'https://maps.google.com/london',
    experience: '5+ years',
    qualification: 'Bachelor\'s Degree in Computer Science',
    jobType: 'Full-time',
    position: 'Senior Engineer',
    jobExpire: '2026-06-30',
    salary: '$120,000 - $150,000',
    jobDescription: 'We are seeking a talented Senior Software Engineer to join our dynamic team at TechCorp. The ideal candidate will have strong technical skills and a passion for innovation. This is a full-time position based in London.\n\nYou will be responsible for designing, developing, and maintaining high-quality software solutions. Working collaboratively with cross-functional teams to deliver exceptional products.',
    requirements: '• 5+ years of relevant experience in software development\n• Strong problem-solving skills and analytical thinking\n• Excellent communication abilities and team collaboration\n• Bachelor\'s degree in Computer Science or related field\n• Proficiency in modern programming languages and frameworks\n• Experience with cloud technologies and microservices architecture'
  });

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(file);
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
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

  const handleUpdate = () => {
    console.log('Updated Form Data:', formData);
    console.log('Facilities:', facilities);
    console.log('Banner Image:', bannerImage);
    alert('Job post updated successfully!');
   navigate("/dashboard/resources/job-posts")
  };

  const handleCancel = () => {
    console.log('Edit cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button and Header */}
        <div className="mb-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
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
                  <button
                    onClick={() => {
                      setBannerImage(null);
                      setBannerPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center rounded">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="text-white opacity-0 hover:opacity-100 text-sm">Click to change</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Browse photo or drop here</p>
                  <p className="text-xs text-gray-400">
                    Normal image 480px dimension 1920x600. Max photo size 10 MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
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
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
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
                value={formData.jobLocation}
                onChange={(e) => handleInputChange('jobLocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="url link"
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
                Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type"
                value={formData.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jobType}
                onChange={(e) => handleInputChange('jobType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select...</option>
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
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Expire <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                value={formData.jobExpire}
                onChange={(e) => handleInputChange('jobExpire', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Facilities and Others */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facilities and Others <span className="text-red-500">*</span>
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
              Job description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Add your job description..."
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
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

          {/* Requirements */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements <span className="text-red-500">*</span>
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

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg"
          >
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
}