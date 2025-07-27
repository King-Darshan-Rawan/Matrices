import React from 'react';

export const Select = ({ options = [], value, onChange, className = '' }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const SelectItem = ({ value, label }) => {
  return (
    <option value={value}
    className={`border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {label}
    </option>
  );
}   
