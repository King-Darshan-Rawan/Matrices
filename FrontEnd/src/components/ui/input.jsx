import React from 'react';

export const Input = ({ type = 'text', value, onChange, placeholder, className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};
