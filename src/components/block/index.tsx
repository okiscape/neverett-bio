import React from 'react';

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
}
const App = ({ children, title, className, ...rest }: BlockProps) => {
  return (
    <div 
      className={`about-block ${className || ''}`} 
      {...rest} 
    >
      <div className='about-block-title-container'>
        <p className='about-block-title'>{title || 'About block'}</p>
      </div>
      {children}
    </div>
  );
};

export default App;