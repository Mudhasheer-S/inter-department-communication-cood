import React, { useState } from 'react';
import Thread from '../components/Thread';
import NewPostForm from '../components/NewPostForm';

const mockThreads = [
  {
    id: 1,
    title: 'Urban Infrastructure Improvements',
    description: 'Discuss the latest improvements in urban infrastructure.',
    posts: [
      {
        id: 1,
        author: 'John Doe',
        content: 'The new road constructions are really improving traffic flow!',
        comments: [
          { id: 1, author: 'Jane Smith', content: 'I agree, especially the new bypass is helpful.' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Public Safety Measures',
    description: 'Discuss new safety measures in urban areas.',
    posts: []
  }
];

const ForumPage = () => {
  const [threads, setThreads] = useState(mockThreads);

  const addPostToThread = (threadId, post) => {
    setThreads(threads.map(thread =>
      thread.id === threadId
        ? { ...thread, posts: [post, ...thread.posts] }
        : thread
    ));
  };

  const addCommentToPost = (threadId, postId, comment) => {
    setThreads(threads.map(thread => 
      thread.id === threadId
        ? {
          ...thread,
          posts: thread.posts.map(post => 
            post.id === postId 
              ? { ...post, comments: [comment, ...post.comments] }
              : post
          )
        }
        : thread
    ));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Discussion Forum</h1>
      <NewPostForm addPost={addPostToThread} threads={threads} />
      <div className="mt-6">
        {threads.map(thread => (
          <Thread
            key={thread.id}
            thread={thread}
            addComment={addCommentToPost}
          />
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
