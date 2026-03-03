import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
 
import { useCreateJobMutation } from '../../../redux/features/jobSlice/jobSlice'; // Adjust path
import toast from 'react-hot-toast';
import { useUploadFileMutation } from '../../../redux/features/fileUpload';

export default function JobCreate() {
    const navigate = useNavigate();
    const [uploadFile] = useUploadFileMutation();
    const [createJob] = useCreateJobMutation();
    
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        requirements: '',
        location: '',
        locationUrl: '',
        position: '',
        qualification: '',
        experience: '',
        jobExpire: '',
        type: 'Full-time',
        salary: '',
        benefits: '',
        applyLink: ''
    });
    
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadImage = async () => {
        if (!bannerImage) {
            toast.error('Please select an image first');
            return null;
        }

        setIsUploading(true);
        try {
            const fileFormData = new FormData();
            fileFormData.append('file', bannerImage);
            fileFormData.append('type', 'banner'); // or 'job_banner'

            const attachmentResult = await uploadFile(fileFormData).unwrap();

            if (!attachmentResult?.success || !attachmentResult?.data?.url) {
                toast.error(attachmentResult?.message || 'File upload failed.');
                return null;
            }

            const imageUrl = attachmentResult.data.url;
            console.log('Uploaded Image URL:', imageUrl);
            setBannerUrl(imageUrl);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let finalBannerUrl = bannerUrl;

            // If there's a new image that hasn't been uploaded yet
            if (bannerImage && !bannerUrl) {
                finalBannerUrl = await handleUploadImage();
                if (!finalBannerUrl) {
                    setIsSubmitting(false);
                    return;
                }
            }

            // Prepare benefits array from comma-separated string
            const benefitsArray = formData.benefits
                .split(',')
                .map(b => b.trim())
                .filter(b => b);

            // Prepare job data
            const jobData = {
                title: formData.title,
                company: formData.company,
                bannerImage: finalBannerUrl,
                description: formData.description,
                requirements: formData.requirements,
                location: formData.location,
                locationUrl: formData.locationUrl,
                position: formData.position,
                qualification: formData.qualification,
                experience: formData.experience,
                jobExpire: formData.jobExpire,
                type: formData.type,
                salary: formData.salary,
                benefits: benefitsArray,
                applyLink: formData.applyLink
            };

            console.log('Creating job with data:', jobData);

            const result = await createJob(jobData).unwrap();

            if (result.success) {
                toast.success('Job created successfully');
                navigate('/dashboard/resources/job-posts'); // Adjust route as needed
            }
        } catch (error) {
            console.error('Error creating job:', error);
            toast.error(error?.data?.message || 'Failed to create job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Create Job Post</h1>
                        <p className="text-gray-500 text-sm">Fill in the details to create a new job posting</p>
                    </div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {/* Banner Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Banner Image
                        </label>
                        <div className="space-y-3">
                            {bannerPreview ? (
                                <div className="relative">
                                    <img 
                                        src={bannerPreview} 
                                        alt="Banner preview" 
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBannerImage(null);
                                            setBannerPreview(null);
                                            setBannerUrl('');
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
                                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">Upload a banner image</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="banner-upload"
                                    />
                                    <label 
                                        htmlFor="banner-upload"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Choose File
                                    </label>
                                </div>
                            )}
                            {bannerImage && !bannerUrl && (
                                <button
                                    type="button"
                                    onClick={handleUploadImage}
                                    disabled={isUploading}
                                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isUploading ? 'Uploading...' : 'Upload Image to Server'}
                                </button>
                            )}
                            {bannerUrl && (
                                <p className="text-sm text-green-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    Image uploaded successfully
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., Senior Software Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company *
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., TechCorp"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Position
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., Senior Engineer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Type *
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., Dhaka, Bangladesh"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location Map URL
                            </label>
                            <input
                                type="url"
                                name="locationUrl"
                                value={formData.locationUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="https://maps.google.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Salary
                            </label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., $2000/month"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Expire Date
                            </label>
                            <input
                                type="date"
                                name="jobExpire"
                                value={formData.jobExpire}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Describe the job role and responsibilities..."
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Requirements
                        </label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., Node.js, MongoDB, 3+ years experience"
                        />
                    </div>

                    {/* Qualification & Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Qualification
                            </label>
                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., BSc in CSE"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience
                            </label>
                            <input
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="e.g., 3+ years"
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Benefits (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="e.g., Medical, Profit Sharing, Remote Work"
                        />
                    </div>

                    {/* Apply Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Application Link
                        </label>
                        <input
                            type="url"
                            name="applyLink"
                            value={formData.applyLink}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="https://forms.google.com/..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 justify-end pt-4 border-t">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Job Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}