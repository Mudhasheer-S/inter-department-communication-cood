import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="mb-2 p-2 bg-white border border-gray-300 rounded-md shadow-sm">
      <p className="text-sm font-semibold">{comment.author}</p>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  );
};

export default Comment;
