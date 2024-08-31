//only frontend
import React, { useState } from 'react';
import { FaSearch, FaSort, FaFilter, FaTags, FaPlus, FaReply, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const ForumPage = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Request for Infrastructure Improvement on Main Street',
      department: 'Your Department',
      
      date: '2024-08-30',
      preview: 'We have observed significant wear and tear on Main Street due to ...',
      tags:  ["Infrastructure", "Road Maintenance", "Safety"],
      status: 'Open',
      description: 'We have observed significant wear and tear on Main Street due to heavy traffic. The road surface has numerous cracks and potholes which pose a risk to vehicle safety and pedestrian accessibility. We recommend a full resurfacing of the street along with improved signage and road markings.',
      messages: [
        {
          department: 'Your Department',
          avatar: 'https://via.placeholder.com/50?text=YD',
          content: 'This is a message in the thread.',
          timestamp: new Date().toLocaleString(),
          reactions: { like: 5 },
          replies: [
            {
              department: 'Transportation Department',
              avatar: 'https://via.placeholder.com/50?text=AD',
              content: 'This is a reply to the message.',
              timestamp: new Date().toLocaleString(),
              reactions: { like: 2 },
            }
          ]
        }
      ]
    }
  ]);

  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newReply, setNewReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadTags, setNewThreadTags] = useState('');
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [status, setStatus] = useState('Open');

  const userDepartment = 'Your Department';

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  const handleNewMessageSubmit = () => {
    if (newMessage.trim() !== '' && selectedThread) {
      const updatedThreads = threads.map((thread) =>
        thread.id === selectedThread.id
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  department: userDepartment,
                  avatar: 'https://via.placeholder.com/50?text=YD',
                  content: newMessage,
                  timestamp: new Date().toLocaleString(),
                  reactions: { like: 0 },
                  replies: [],
                },
              ],
            }
          : thread
      );
      setThreads(updatedThreads);
      setNewMessage('');
    }
  };

  const handleNewReplySubmit = (messageIndex) => {
    if (newReply.trim() !== '' && selectedThread) {
      const updatedThreads = threads.map((thread) =>
        thread.id === selectedThread.id
          ? {
              ...thread,
              messages: thread.messages.map((message, index) =>
                index === messageIndex
                  ? {
                      ...message,
                      replies: [
                        ...message.replies,
                        {
                          department: userDepartment,
                          avatar: 'https://via.placeholder.com/50?text=YD',
                          content: newReply,
                          timestamp: new Date().toLocaleString(),
                          reactions: { like: 0 },
                        },
                      ],
                    }
                  : message
              ),
            }
          : thread
      );
      setThreads(updatedThreads);
      setNewReply('');
    }
  };

  const handleNewThreadSubmit = () => {
    if (newThreadTitle.trim() !== '' && newThreadMessage.trim() !== '') {
      const newThread = {
        id: threads.length + 1,
        title: newThreadTitle,
        department: userDepartment,
        avatar: 'https://via.placeholder.com/50?text=YD',
        date: new Date().toLocaleDateString(),
        preview: newThreadMessage.substring(0, 50) + '...',
        tags: newThreadTags.split(',').map(tag => tag.trim()),
        status: status,
        description: newThreadMessage,
        messages: [
          {
            department: userDepartment,
            avatar: 'https://via.placeholder.com/50?text=YD',
            content: newThreadMessage,
            timestamp: new Date().toLocaleString(),
            reactions: { like: 0 },
            replies: [],
          },
        ],
      };
      setThreads([...threads, newThread]);
      setNewThreadTitle('');
      setNewThreadTags('');
      setNewThreadMessage('');
      setShowModal(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (selectedThread) {
      const updatedThreads = threads.map((thread) =>
        thread.id === selectedThread.id
          ? { ...thread, status: e.target.value }
          : thread
      );
      setThreads(updatedThreads);
    }
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">Interdepartmental Coordination Forum</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search threads..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-2 top-2.5 text-gray-500" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="mr-2" /> New Thread
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thread List */}
          <div className="md:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FaSort className="mr-2" /> Sort
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FaFilter className="mr-2" /> Filter
              </button>
            </div>

            <div className="space-y-4">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedThread && selectedThread.id === thread.id
                      ? 'bg-[#f0fffa] border-green-300'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  } ${
                    thread.department === userDepartment
                      ? 'border-blue-300'
                      : 'border-gray-300'
                  } flex items-center justify-between`}
                  onClick={() => handleThreadClick(thread)}
                >
                  <div className="flex items-center">
                    <img src="https://via.placeholder.com/50?text=YD" alt={thread.department} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">{thread.title}</h3>
                      <p className="text-sm text-gray-500">
                        {thread.department} - {thread.date}
                      </p>
                      <p className="text-sm mt-1">{thread.preview}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {thread.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thread Details */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            {selectedThread ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">{selectedThread.title}</h2>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <FaChevronDown className="absolute right-2 top-2.5 text-gray-500" />
                  </div>
                </div>
                <p className="mb-4 text-gray-600">{selectedThread.description}</p>
                <div className="h-80 overflow-y-auto">
                  {selectedThread.messages.map((message, index) => (
                    <div key={index} className="border-b py-4 flex items-start">
                      <img src={message.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">{message.department}</p>
                        <p className="text-gray-600">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="text-gray-600 hover:text-blue-600">
                            <FaThumbsUp /> {message.reactions.like}
                          </button>
                          <button
                            onClick={() => {
                              const replyContent = prompt('Enter your reply:');
                              if (replyContent) {
                                handleNewReplySubmit(index, replyContent);
                              }
                            }}
                            className="text-gray-600 hover:text-blue-600"
                          >
                            <FaReply />
                          </button>
                        </div>
                        {message.replies.length > 0 && (
                          <div className="mt-4 ml-6 border-l pl-4">
                            {message.replies.map((reply, replyIndex) => (
                              <div key={replyIndex} className="flex items-start mb-2">
                                <img src={reply.avatar} alt="Reply Avatar" className="w-8 h-8 rounded-full mr-3" />
                                <div>
                                  <p className="font-semibold">{reply.department}</p>
                                  <p className="text-gray-600">{reply.content}</p>
                                  <p className="text-xs text-gray-500 mt-1">{reply.timestamp}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <button className="text-gray-600 hover:text-blue-600">
                                      <FaThumbsUp /> {reply.reactions.like}
                                    </button>
                                    <button className="text-gray-600 hover:text-blue-600">
                                      <FaReply />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex items-center">
                          <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="Type your reply here..."
                            className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => handleNewReplySubmit(index)}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="border rounded-lg px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleNewMessageSubmit}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a thread to view details.</p>
            )}
          </div>
        </div>

        {/* New Thread Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Create New Thread</h2>
              <input
                type="text"
                placeholder="Thread Title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newThreadTags}
                onChange={(e) => setNewThreadTags(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Thread Description"
                value={newThreadMessage}
                onChange={(e) => setNewThreadMessage(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewThreadSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForumPage;
