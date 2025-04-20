import React from 'react';

const Input = (props) => {
  return (
    <input 
      {...props} 
      className="placeholder-input border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" // Basic styling
    />
  );
};

export { Input };