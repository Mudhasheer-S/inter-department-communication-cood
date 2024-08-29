import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';

const notificationsData = {
  whatsNew: [
    { id: 1, message: 'New feature X has been released.', date: '2024-08-20', time: '10:00' },
    { id: 2, message: 'Update Y is now available.', date: '2024-08-19', time: '15:00' },
  ],
  publicGrievance: [
    { id: 1, message: 'Grievance Z has been resolved.', date: '2024-08-18', time: '12:00' },
    { id: 2, message: 'New grievance received.', date: '2024-08-17', time: '08:00' },
  ],
};

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'projectAlerts':
      return <FaExclamationTriangle className="text-red-500 text-2xl" />;
    case 'whatsNew':
      return <FaInfoCircle className="text-green-500 text-2xl" />;
    case 'publicGrievance':
      return <VscFeedback className="text-yellow-500 text-2xl" />;
    default:
      return null;
  }
};

const NotificationsPage = () => {
  const [activeType, setActiveType] = useState('projectAlerts');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departmentName = useSelector((state) => state.department.name);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        if (activeType === 'projectAlerts') {
          const response = await axios.get(`http://localhost:8080/notifications/${departmentName}`);
          setNotifications(response.data);
        } else {
          // For static data
          setNotifications(notificationsData[activeType]);
        }
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [activeType, departmentName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading notifications: {error.message}</p>;

  const handleTypeChange = (type) => {
    setActiveType(type);
    setLoading(true); // Trigger loading when changing types
  };

  return (
    <>
    <Navbar />
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="mb-6 flex space-x-6">
        {['projectAlerts', 'whatsNew', 'publicGrievance'].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`flex items-center px-4 py-4 rounded-full text-white font-semibold shadow-md transition-transform transform ${activeType === type ? 'bg-gray-700 transition duration-300 scale-105' : 'bg-gray-300'}`}
          >
            <NotificationIcon type={type} />
            <span className="ml-2 capitalize">{type.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
          </button>
        ))}
      </div>
      <div>
        {notifications.map((notification) => (
          <div key={notification.id} className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md flex items-start">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#DCF0E9] rounded-full">
              <NotificationIcon type={activeType} />
            </div>
            <div className="ml-4 flex-1">
              {activeType === 'projectAlerts' ? (
                <>
                  <p className="text-lg font-semibold">Your project overlapped with {notification.departmentName} department</p>
                  <p className="text-gray-500 text-sm">The overlapping project is {notification.overlappingProjectName}. 
                  <span>
                    <a href="#" className='text-red-400'> view project</a>
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm">{new Date(notification.overlapDateTime).toLocaleString()}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{notification.date} at {notification.time}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default NotificationsPage;
