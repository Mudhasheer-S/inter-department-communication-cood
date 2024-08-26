import React, { useState } from 'react';
import { FaSearch, FaSort, FaFilter, FaTags, FaPlus, FaRegBell, FaReply, FaThumbsUp, FaTimes } from 'react-icons/fa';

const ForumPage = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Urban Park Renovation Strategies',
      department: 'Urban Planning',
      avatar: 'https://via.placeholder.com/50?text=UP',
      date: '2024-08-25',
      preview: 'Discussing the best strategies for renovating urban parks to improve community engagement...',
      tags: ['Urban Planning', 'Parks'],
      status: 'In Progress',
      messages: [
        {
          department: 'Urban Planning',
          avatar: 'https://via.placeholder.com/50?text=UP',
          content: 'One effective strategy is to involve community members in the planning process to ensure their needs are met...',
          timestamp: '2024-08-25T14:30:00',
          reactions: { like: 4 }
        },
        {
          department: 'Urban Planning',
          avatar: 'https://via.placeholder.com/50?text=UP',
          content: 'We should also consider integrating sustainable practices like rain gardens and native plantings...',
          timestamp: '2024-08-25T15:00:00',
          reactions: { like: 2 }
        }
      ]
    },
    {
      id: 2,
      title: 'Traffic Flow Improvement Initiatives',
      department: 'Transportation',
      avatar: 'https://via.placeholder.com/50?text=TR',
      date: '2024-08-24',
      preview: 'Exploring various initiatives to improve traffic flow and reduce congestion in city areas...',
      tags: ['Transportation', 'Traffic Management'],
      status: 'Completed',
      messages: [
        {
          department: 'Transportation',
          avatar: 'https://via.placeholder.com/50?text=TR',
          content: 'Implementing smart traffic signals and adjusting signal timings based on real-time traffic data could significantly help...',
          timestamp: '2024-08-24T11:00:00',
          reactions: { like: 6 }
        },
        {
          department: 'Transportation',
          avatar: 'https://via.placeholder.com/50?text=TR',
          content: 'Additionally, promoting alternative modes of transportation such as cycling and public transit can alleviate traffic congestion...',
          timestamp: '2024-08-24T12:00:00',
          reactions: { like: 3 }
        }
      ]
    },
    {
      id: 3,
      title: 'Affordable Housing Development Plans',
      department: 'Housing',
      avatar: 'https://via.placeholder.com/50?text=HO',
      date: '2024-08-23',
      preview: 'Discussing the development plans for affordable housing projects to meet the growing demand...',
      tags: ['Housing', 'Affordable Housing'],
      status: 'Planning',
      messages: [
        {
          department: 'Housing',
          avatar: 'https://via.placeholder.com/50?text=HO',
          content: 'It is crucial to design affordable housing with energy efficiency and accessibility in mind to serve a diverse population...',
          timestamp: '2024-08-23T10:00:00',
          reactions: { like: 5 }
        },
        {
          department: 'Housing',
          avatar: 'https://via.placeholder.com/50?text=HO',
          content: 'We should also explore partnerships with non-profit organizations to maximize the impact of our housing initiatives...',
          timestamp: '2024-08-23T10:45:00',
          reactions: { like: 4 }
        }
      ]
    }
  ]);

  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadTags, setNewThreadTags] = useState('');
  const [newThreadMessage, setNewThreadMessage] = useState('');

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
                  department: 'Your Department',
                  avatar: 'https://via.placeholder.com/50?text=YD',
                  content: newMessage,
                  timestamp: new Date().toLocaleString(),
                  reactions: { like: 0 },
                },
              ],
            }
          : thread
      );
      setThreads(updatedThreads);
      setNewMessage('');
    }
  };

  const handleNewThreadSubmit = () => {
    if (newThreadTitle.trim() !== '' && newThreadMessage.trim() !== '') {
      const newThread = {
        id: threads.length + 1,
        title: newThreadTitle,
        department: 'Your Department',
        avatar: 'https://via.placeholder.com/50?text=YD',
        date: new Date().toLocaleDateString(),
        preview: newThreadMessage.substring(0, 50) + '...',
        tags: newThreadTags.split(',').map(tag => tag.trim()),
        status: 'Open',
        messages: [
          {
            department: 'Your Department',
            avatar: 'https://via.placeholder.com/50?text=YD',
            content: newThreadMessage,
            timestamp: new Date().toLocaleString(),
            reactions: { like: 0 },
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

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
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
                } flex items-center justify-between`}
                onClick={() => handleThreadClick(thread)}
              >
                <div className="flex items-center">
                  <img src={thread.avatar} alt={thread.department} className="w-12 h-12 rounded-full mr-4" />
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
                <div>
                  {/* <FaTags className="text-gray-500" /> */}
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
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedThread.status === 'Open'
                      ? 'bg-green-100 text-green-800'
                      : selectedThread.status === 'Resolved'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {selectedThread.status}
                </span>
              </div>
              <div className="border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold mb-2">Messages</h3>
                <div className="space-y-4">
                  {(selectedThread.messages || []).map((message, index) => (
                    <div key={index} className="flex items-start space-x-4 mb-4">
                      <img
                        src={message.avatar}
                        alt={message.department}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{message.department}</span>
                          <span className="text-sm text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{message.content}</p>
                        <div className="flex space-x-4 mt-2">
                          <button className="text-gray-500 hover:text-gray-700 flex items-center">
                            <FaThumbsUp className="mr-1" /> {message.reactions.like}
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 flex items-center">
                            <FaReply className="mr-1" /> Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Message Input */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Post a Message</h3>
                <textarea
                  className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={handleNewMessageSubmit}
                >
                  Post Message
                </button>
              </div>
            </div>
          ) : (
            <p>Select a thread to see details</p>
          )}
        </div>
      </div>

      {/* New Thread Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg mx-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Create New Thread</h2>
            <input
              type="text"
              placeholder="Thread Title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newThreadTags}
              onChange={(e) => setNewThreadTags(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full mb-4"
            />
            <textarea
              placeholder="Thread Message"
              value={newThreadMessage}
              onChange={(e) => setNewThreadMessage(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full mb-4"
              rows="4"
            />
            <button
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              onClick={handleNewThreadSubmit}
            >
              Create Thread
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
