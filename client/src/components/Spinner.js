// Spinner.js
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
      <div className="animate-spin border-8 border-t-8 border-t-blue-600 border-gray-300 rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Spinner;
