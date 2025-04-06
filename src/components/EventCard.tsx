import React from 'react';

export interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

const EventCard: React.FC<EventProps> = ({
  title,
  date,
  location,
  description,
  imageUrl,
}) => {
  return (
    <div className="card h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="card-content flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-dark">{title}</h3>
        <div className="mb-3 text-gray-600">
          <div className="flex items-center mb-1">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span>{location}</span>
          </div>
        </div>
        <p className="text-gray-700 flex-grow mb-4">{description}</p>
        <button className="btn btn-primary mt-auto self-start">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
