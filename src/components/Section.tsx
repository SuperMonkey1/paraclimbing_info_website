import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  backgroundColor?: 'white' | 'gray' | 'primary' | 'secondary';
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  backgroundColor = 'white',
  className = '',
  id,
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
  };
  
  return (
    <section id={id} className={`py-12 ${backgroundClasses[backgroundColor]} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  const alignment = centered ? 'text-center' : '';
  
  return (
    <div className={`mb-12 ${alignment} ${className}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className={`${centered ? 'max-w-3xl mx-auto' : ''} text-gray-700`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Section;
