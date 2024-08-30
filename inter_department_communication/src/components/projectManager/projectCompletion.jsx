// ProjectCompletion.js
import React, { useState } from "react";
import axios from "axios";

export default function ProjectCompletion({ project, onBack }) {
  const [completionDetails, setCompletionDetails] = useState({
    finalCost: "",
    endDate: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompletionDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setCompletionDetails((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setCompletionDetails((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitCompletion = async () => {
    const formData = new FormData();
    formData.append("finalCost", completionDetails.finalCost);
    formData.append("endDate", completionDetails.endDate);

    completionDetails.images.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      await axios.post(
        `http://localhost:8080/completeProject/${project.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Project marked as completed!");
      onBack();
    } catch (err) {
      console.error("Error marking project as completed:", err);
      alert("Failed to mark project as completed.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Complete Project Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Final Cost:</label>
        <input
          type="text"
          name="finalCost"
          value={completionDetails.finalCost}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project End Date:</label>
        <input
          type="date"
          name="endDate"
          value={completionDetails.endDate}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Upload Images:</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-1"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {completionDetails.images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.preview}
              alt={`Upload Preview ${index}`}
              className="h-20 w-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitCompletion}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Submit Completion
      </button>
    </div>
  );
}
