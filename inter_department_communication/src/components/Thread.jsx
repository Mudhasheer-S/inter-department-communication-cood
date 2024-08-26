import React from 'react';
import Post from './Post';

const Thread = ({ thread, addComment }) => {
  return (
    <div className="mb-8 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{thread.title}</h2>
      <p className="text-gray-700 mb-4">{thread.description}</p>
      <div>
        {thread.posts.map(post => (
          <Post
            key={post.id}
            post={post}
            threadId={thread.id}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Thread;
