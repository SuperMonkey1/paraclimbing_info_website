import React, { useState } from 'react';
import { subscribeToNewsletter } from '../firebase/services';

const NewsletterSubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await subscribeToNewsletter(email);
      setSubmitStatus('success');
      setEmail(''); // Clear the form on success
    } catch (error) {
      setSubmitStatus('error');
      // Provide more specific error message
      const errorMsg = error instanceof Error 
        ? error.message 
        : 'Failed to subscribe. Please try again later.';
      setErrorMessage(errorMsg);
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-8">
        Subscribe to our newsletter to receive updates on upcoming events, activities, and news from the Belgian paraclimbing community.
      </p>
      
      <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email address"
          className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900 w-full sm:w-auto sm:flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className={`bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {submitStatus === 'success' && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg">
          Thank you for subscribing to our newsletter!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}
      
      <p className="mt-4 text-sm opacity-80">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSubscriptionForm;
