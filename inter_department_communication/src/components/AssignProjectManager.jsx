import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';




const AssignProjectManager = ({ project, onClose }) => {


  const departmentName = useSelector((state) => state.department.name);
  const location = useSelector((state) => state.department.location);


  const [assignExisting, setAssignExisting] = useState(true);
  const [selectedManager, setSelectedManager] = useState({ name: '', email: ''});
  const [newManager, setNewManager] = useState({ name: '', email: '', password: '', phone: '' });
  const [filteredManagers, setFilteredManagers] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = filteredManagers.filter(manager => 
      manager.name.toLowerCase().includes(searchTerm) || 
      manager.email.toLowerCase().includes(searchTerm)
    );
    setFilteredManagers(filtered);
  };

  const handleSuggestionClick = (manager) => {
 
    setSelectedManager({ ...manager, email: manager.email , name: manager.name })
  };

  const handleAssignExisting = async () => {
    if (selectedManager) {
      console.log(selectedManager);
    try {
      await axios.post(`http://localhost:8080/assign-exist-manager/${selectedManager.email}/${project.id}`);
     
      onClose(); 
    } catch (error) {
      console.error('Error assigning project manager:', error);
    }
  }
  };

  useEffect(() => {
    const fetchProjectManagers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/get-managers/${departmentName}/${location}`);
            
            if (response.status === 200) {
                console.log(response.data);
                setFilteredManagers(response.data);
            } else if (response.status === 204) {
                console.log("no content");
                setFilteredManagers([]);
            }
        } catch (err) {
            console.log('Failed to fetch project managers:' , err);
        } 
        
    };

    fetchProjectManagers();
}, [departmentName, location]);



  const handleAssignNew = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/post-new-manager/${departmentName}/${location}/${project.id}`,
        newManager
      );

      const savedManager = response.data;
      setSelectedManager(savedManager);
      
      onClose(); 
    } catch (error) {
      console.error('Error assigning project manager:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Assign Project Manager</h2>
        <div className="mb-4">
          <button
            onClick={() => setAssignExisting(true)}
            className={`px-4 py-2 rounded-lg ${assignExisting ? 'bg-[#055A43] text-white' : 'bg-[#E2FFF7]'}`}
          >
            Assign Existing
          </button>
          <button
            onClick={() => setAssignExisting(false)}
            className={`px-4 py-2 rounded-lg ${!assignExisting ? 'bg-[#055A43] text-white' : 'bg-[#E2FFF7]'} ml-4`}
          >
            Assign New
          </button>
        </div>
        {assignExisting ? (
           filteredManagers && filteredManagers.length > 0 ?(
          <div>
            <input
              type="text"
              placeholder={selectedManager ? 'Choose Manager' : ''}
              onChange={handleSearchChange}
              value={selectedManager && selectedManager.name && selectedManager.email ? `${selectedManager.name} (${selectedManager.email})` : ''}
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
        ):(
          <p>No Existing Managers</p>
        )
        ) : (
          <div>
            <form onSubmit={handleAssignNew} >
            <input
              type="text"
              placeholder="Name"
              value={newManager.name}
              onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newManager.email}
              onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newManager.password}
              onChange={(e) => setNewManager({ ...newManager, password: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg w-full mb-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newManager.phone}
              onChange={(e) => setNewManager({ ...newManager, phone: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg w-full mb-4"
            />
            <button
              type="submit"
              className="bg-[#055A43] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#00392B] transition duration-300"
            >
              Assign
            </button>
            </form>
          </div>
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

export default AssignProjectManager;
