import React from 'react';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';

const Post = ({ post, threadId, addComment }) => {
  return (
    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <NewCommentForm threadId={threadId} postId={post.id} addComment={addComment} />
      <div>
        {post.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
