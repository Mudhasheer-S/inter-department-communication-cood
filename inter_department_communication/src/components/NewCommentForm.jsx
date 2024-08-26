import React, { useState } from 'react';

const NewCommentForm = ({ threadId, postId, addComment }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      author,
      content
    };
    addComment(threadId, postId, newComment);
    setAuthor('');
    setContent('');
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default NewCommentForm;
