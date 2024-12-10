import React from 'react';

function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
    >
      {text}
    </button>
  );
}

export default Button;
