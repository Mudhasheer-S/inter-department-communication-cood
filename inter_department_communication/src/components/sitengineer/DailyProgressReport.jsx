import React, { useState } from 'react';

function DailyProgressReport() {
  const [formData, setFormData] = useState({
    projectName: '',
    jobNumber: '',
    contractorName: '',
    superintendentName: '',
    date: '',
    weatherTemperature: '',
    overallProgress: '',
    workers: [
      { workerName: '', workCompleted: '', equipmentUsed: '', progressDetails: '' }
    ]
  });

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedWorkers = [...formData.workers];
      updatedWorkers[index][field] = e.target.value;
      setFormData({ ...formData, workers: updatedWorkers });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addWorkerRow = () => {
    setFormData({
      ...formData,
      workers: [...formData.workers, { workerName: '', workCompleted: '', equipmentUsed: '', progressDetails: '' }]
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Daily Progress Report</h2>
      <form>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700">Project Name:</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Job Number:</label>
            <input
              type="text"
              name="jobNumber"
              value={formData.jobNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Contractor Name:</label>
            <input
              type="text"
              name="contractorName"
              value={formData.contractorName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Superintendent Name:</label>
            <input
              type="text"
              name="superintendentName"
              value={formData.superintendentName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Weather and Temperature:</label>
            <input
              type="text"
              name="weatherTemperature"
              value={formData.weatherTemperature}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Today's Overall Progress:</label>
          <textarea
            name="overallProgress"
            value={formData.overallProgress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-32"
          ></textarea>
        </div>

        <h3 className="text-xl font-semibold mb-4">Workers Present on Site</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Worker Name</th>
                <th className="border border-gray-300 p-2">Work Completed</th>
                <th className="border border-gray-300 p-2">Equipment Used</th>
                <th className="border border-gray-300 p-2">Progress Details</th>
              </tr>
            </thead>
            <tbody>
              {formData.workers.map((worker, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={worker.workerName}
                      onChange={(e) => handleChange(e, index, 'workerName')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={worker.workCompleted}
                      onChange={(e) => handleChange(e, index, 'workCompleted')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={worker.equipmentUsed}
                      onChange={(e) => handleChange(e, index, 'equipmentUsed')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={worker.progressDetails}
                      onChange={(e) => handleChange(e, index, 'progressDetails')}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addWorkerRow}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
        >
          Add Worker
        </button>
        <button
          type="submit"
          className="mt-4 ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DailyProgressReport;
