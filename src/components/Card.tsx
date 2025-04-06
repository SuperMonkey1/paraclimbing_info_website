import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hover ? 'transition-shadow duration-300 hover:shadow-xl' : '';
  const cursorClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${cursorClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export interface CardMediaProps {
  image: string;
  alt: string;
  height?: string;
  className?: string;
  hover?: boolean;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  image,
  alt,
  height = 'h-48',
  className = '',
  hover = false,
}) => {
  const baseClasses = 'overflow-hidden';
  const imgClasses = hover 
    ? 'w-full h-full object-cover transition-transform duration-300 hover:scale-105' 
    : 'w-full h-full object-cover';
  
  return (
    <div className={`${baseClasses} ${height} ${className}`}>
      <img 
        src={image} 
        alt={alt} 
        className={imgClasses}
      />
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
