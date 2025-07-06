import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { submitEventForReview } from '../firebase/events-service';

interface AddEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    endDate: '', // For date ranges
    location: '',
    description: '',
    organiser: '',
    externalUrl: '',
    imageUrl: '',
    type: 'competitions',
    submitterEmail: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper function to normalize URLs
  const normalizeUrl = (url: string): string => {
    if (!url) return url;
    
    const trimmedUrl = url.trim();
    
    // If it already has a protocol, return as is
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    
    // Add https:// as default protocol
    return `https://${trimmedUrl}`;
  };

  // Helper function to format date for display
  const formatDateForDisplay = (startDate: string, endDate: string): string => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (!endDate || startDate === endDate) {
      return startFormatted;
    }
    
    const end = new Date(endDate);
    
    // If same month and year, show "March 15-16, 2025"
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    }
    
    // Otherwise show full dates
    const endFormatted = end.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `${startFormatted} - ${endFormatted}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.organiser.trim()) {
      newErrors.organiser = 'Organiser is required';
    }
    
    if (!formData.submitterEmail.trim()) {
      newErrors.submitterEmail = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.submitterEmail)) {
      newErrors.submitterEmail = 'Please enter a valid email address';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Validate URL if provided - much more lenient
    if (formData.externalUrl && formData.externalUrl.trim()) {
      const url = formData.externalUrl.trim();
      // Very basic validation - just check if it contains a dot and no spaces
      if (!url.includes('.') || url.includes(' ')) {
        newErrors.externalUrl = 'Please enter a valid URL (e.g., paraclimbing.be or www.example.com)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { submitterEmail, endDate, ...eventData } = formData;
      
      // Format the date for storage
      const formattedDate = formatDateForDisplay(formData.date, formData.endDate);
      
      // Normalize the URL
      const normalizedUrl = formData.externalUrl ? normalizeUrl(formData.externalUrl) : '';
      
      const eventToSubmit = {
        ...eventData,
        date: formattedDate,
        externalUrl: normalizedUrl
      };
      
      await submitEventForReview(eventToSubmit, submitterEmail);
      
      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        date: '',
        endDate: '',
        location: '',
        description: '',
        organiser: '',
        externalUrl: '',
        imageUrl: '',
        type: 'competitions',
        submitterEmail: ''
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
      setErrors({ submit: 'Failed to submit event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      subtitle: '',
      date: '',
      endDate: '',
      location: '',
      description: '',
      organiser: '',
      externalUrl: '',
      imageUrl: '',
      type: 'competitions',
      submitterEmail: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Add New Event</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Your Email */}
            <div>
              <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email Address *
              </label>
              <input
                type="email"
                id="submitterEmail"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.submitterEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.submitterEmail && <p className="text-red-500 text-sm mt-1">{errors.submitterEmail}</p>}
            </div>

            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Regional Paraclimbing Championship"
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Event Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                Event Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Open to all categories"
                disabled={isSubmitting}
              />
            </div>

            {/* Event Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                <option value="competitions">Competitions</option>
                <option value="workshops">Workshops</option>
                <option value="social">Social Events</option>
                <option value="international">International</option>
              </select>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Start Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Event End Date (optional)
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                  min={formData.date} // End date can't be before start date
                />
                <p className="text-gray-500 text-xs mt-1">
                  Leave empty for single-day events
                </p>
              </div>
            </div>

            {/* Date Preview */}
            {formData.date && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Date will appear as:</strong> {formatDateForDisplay(formData.date, formData.endDate)}
                </p>
              </div>
            )}

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Brussels, Belgium"
                disabled={isSubmitting}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Organiser */}
            <div>
              <label htmlFor="organiser" className="block text-sm font-medium text-gray-700 mb-1">
                Organiser *
              </label>
              <input
                type="text"
                id="organiser"
                name="organiser"
                value={formData.organiser}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.organiser ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Belgian Climbing Federation"
                disabled={isSubmitting}
              />
              {errors.organiser && <p className="text-red-500 text-sm mt-1">{errors.organiser}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Event Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the event, categories, registration details, etc."
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* External URL */}
            <div>
              <label htmlFor="externalUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Event Website / More Info URL
              </label>
              <input
                type="text"
                id="externalUrl"
                name="externalUrl"
                value={formData.externalUrl}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.externalUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="paraclimbing.be or www.example.com or https://example.com"
                disabled={isSubmitting}
              />
              {errors.externalUrl && <p className="text-red-500 text-sm mt-1">{errors.externalUrl}</p>}
              <p className="text-gray-500 text-xs mt-1">
                You can enter just the domain (paraclimbing.be) - we'll add https:// automatically
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Event Image URL (optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/event-image.jpg"
                disabled={isSubmitting}
              />
              <p className="text-gray-500 text-sm mt-1">
                If no image is provided, a default event image will be used.
              </p>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {errors.submit}
              </div>
            )}

            {/* Submission Notice */}
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Your event will be reviewed by our team before being published. 
                You'll receive an email notification when your event is approved and goes live.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Event for Review'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
