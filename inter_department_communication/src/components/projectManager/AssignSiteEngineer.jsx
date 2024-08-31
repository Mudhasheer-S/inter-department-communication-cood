import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AssignSiteEngineer = ({ project, onClose }) => {
  const departmentName = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);

  const [selectedManager, setSelectedManager] = useState({ name: '', email: '' });
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchValue(searchTerm);
    const filtered = filteredManagers.filter(manager =>
      manager.name.toLowerCase().includes(searchTerm) ||
      manager.email.toLowerCase().includes(searchTerm)
    );
    setFilteredManagers(filtered);
  };

  const handleSuggestionClick = (manager) => {
    setSelectedManager({ ...manager, email: manager.email, name: manager.name });
  };

  const handleAssignExisting = async () => {
    if (selectedManager) {
      console.log(selectedManager);
      try {
        await axios.post(`http://localhost:8080/assign-exist-engineer/${selectedManager.email}/${project.id}`);
        onClose();
      } catch (error) {
        console.error('Error assigning project manager:', error);
      }
    }
  };

  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/site/engineer/all`);
        if (response.status === 200) {
          setFilteredManagers(response.data);
        } else if (response.status === 204) {
          console.log("No content");
          setFilteredManagers([]);
        }
      } catch (err) {
        console.log('Failed to fetch project managers:', err);
      }
    };

    fetchProjectManagers();
  }, [departmentName, location]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Assign Site Engineer</h2>
        {filteredManagers && filteredManagers.length > 0 ? (
          <div>
            <input
              type="text"
              placeholder={selectedManager ? 'Choose Manager' : ''}
              onChange={handleSearchChange}
              value={selectedManager && selectedManager.name && selectedManager.email ? `${selectedManager.name} (${selectedManager.email})` : searchValue}
              className="border border-gray-300 p-2 rounded-lg w-full mb-4"
            />
            <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
              {filteredManagers.map(manager => (
                <li
                  key={manager.email}
                  onClick={() => handleSuggestionClick(manager)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {manager.name} ({manager.email})
                </li>
              ))}
            </ul>
            <button
              onClick={handleAssignExisting}
              className="bg-[#055A43] mt-2 text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#00392B] transition duration-300"
            >
              Assign
            </button>
          </div>
        ) : (
          <p>No Existing Site Engineer</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignSiteEngineer;
