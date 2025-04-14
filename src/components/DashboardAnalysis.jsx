import React, { useState, useRef } from "react";

const DashboardAnalysis = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState("oil-spill");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = "http://localhost:8000";

  const dashboardData = {
    "oil-spill": {
      title: "Oil Spill Analytics",
      metrics: [
        { label: "Active Incidents", value: "12", change: "+2" },
        { label: "Affected Area (km²)", value: "874", change: "-5%" },
        { label: "Recovery Progress", value: "68%", change: "+3%" },
      ],
      description:
        "Real-time monitoring and analysis of marine oil pollution incidents across global shipping routes.",
    },
    "illegal-fishing": {
      title: "Illegal Fishing Monitor",
      metrics: [
        { label: "Suspicious Vessels", value: "28", change: "+4" },
        { label: "Protected Zone Violations", value: "7", change: "-2" },
        { label: "Estimated Catch Value", value: "$1.2M", change: "+8%" },
      ],
      description:
        "Comprehensive tracking and reporting of unauthorized fishing activities in protected waters.",
    },
    "ocean-trafficking": {
      title: "Maritime Security Intel",
      metrics: [
        { label: "High-Risk Routes", value: "5", change: "0" },
        { label: "Interdictions", value: "3", change: "+1" },
        { label: "Threat Level", value: "Moderate", change: "↓" },
      ],
      description:
        "Intelligence on maritime routes frequently used for illegal trafficking and transport.",
    },
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setUploading(true);
    setApiResult(null);
    setApiError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setApiResult(result);
    } catch (error) {
      console.error("Upload failed:", error);
      setApiError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-8 bg-[#121A27] text-white h-screen">
      <div className="bg-[#1A2535] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Maritime Intelligence Dashboard</h2>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Back to Home
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          {["oil-spill", "illegal-fishing", "ocean-trafficking"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mr-2 rounded-t ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-[#2a3545] text-gray-300"
              }`}
            >
              {dashboardData[tab].title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {dashboardData[activeTab].title}
          </h3>
          <p className="text-gray-300 mb-4">
            {dashboardData[activeTab].description}
          </p>
        </div>

        {/* Upload section only for oil-spill */}
        {activeTab === "oil-spill" && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Oil Spill Documentation</h3>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            </div>

            {/* Image Preview & Result */}
            <div className="bg-[#2a3545] p-4 rounded">
              {uploadedImage ? (
                <div>
                  <p className="text-gray-300 mb-2">Uploaded Image:</p>
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-w-full max-h-96 rounded mb-4"
                  />
                  {uploading && (
                    <p className="text-yellow-400">Processing image...</p>
                  )}
                  {apiResult && (
                    <div className="text-sm text-gray-300 mt-2">
                      <p><strong>Prediction:</strong> {apiResult.prediction}</p>
                      {apiResult.confidence && (
                        <p><strong>Confidence:</strong> {apiResult.confidence}</p>
                      )}
                      {apiResult.alert && (
                        <p className="text-red-400 mt-2">
                          🚨 <strong>Alert:</strong> {apiResult.alert}
                        </p>
                      )}
                    </div>
                  )}
                  {apiError && (
                    <div className="text-red-400 mt-2">
                      ❌ Error: {apiError}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-600 rounded text-center">
                  <p className="text-gray-400 mb-2">No image uploaded yet</p>
                  <p className="text-gray-500 text-sm max-w-md">
                    Upload photos of oil spill incidents. Our system can analyze
                    the extent, type of oil, and suggest actions.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardAnalysis;