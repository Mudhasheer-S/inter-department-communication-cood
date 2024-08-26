import React, { useState } from 'react';

const NewPostForm = ({ addPost, threads }) => {
  const [selectedThread, setSelectedThread] = useState(threads[0].id);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author,
      content,
      comments: []
    };
    addPost(selectedThread, newPost);
    setAuthor('');
    setContent('');
  };

  return (
    <div className="mb-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Thread</label>
          <select
            value={selectedThread}
            onChange={(e) => setSelectedThread(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {threads.map(thread => (
              <option key={thread.id} value={thread.id}>{thread.title}</option>
            ))}
          </select>
        </div>
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
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
