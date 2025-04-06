import React, { useState } from 'react';

interface DevelopmentNoticeProps {
  pageName: string;
}

const DevelopmentNotice: React.FC<DevelopmentNoticeProps> = ({ pageName }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="bg-yellow-100 text-yellow-800 rounded-full p-3 inline-block mb-4">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-dark mb-2">Page Under Development</h3>
          <p className="text-gray-700 mb-6">
            The <span className="font-medium">{pageName}</span> page is currently under construction. 
            Some features may be incomplete or not fully functional.
          </p>
          
          <p className="text-sm text-gray-600 mb-6">
            We're working hard to complete this section soon. Thank you for your patience!
          </p>
          
          <button
            onClick={() => setIsOpen(false)}
            className="btn bg-primary text-white hover:bg-primary-dark w-full"
          >
            Continue to Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentNotice;
