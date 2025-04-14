import React, { useState, useRef } from "react";

const DashboardAnalysis = ({ onBackToHome }) => {
  // Sample data for the dashboard
  const [activeTab, setActiveTab] = useState("oil-spill");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const dashboardData = {
    "oil-spill": {
      title: "Oil Spill Analytics",
      metrics: [
        { label: "Active Incidents", value: "12", change: "+2" },
        { label: "Affected Area (km²)", value: "874", change: "-5%" },
        { label: "Recovery Progress", value: "68%", change: "+3%" }
      ],
      description: "Real-time monitoring and analysis of marine oil pollution incidents across global shipping routes."
    },
    "illegal-fishing": {
      title: "Illegal Fishing Monitor",
      metrics: [
        { label: "Suspicious Vessels", value: "28", change: "+4" },
        { label: "Protected Zone Violations", value: "7", change: "-2" },
        { label: "Estimated Catch Value", value: "$1.2M", change: "+8%" }
      ],
      description: "Comprehensive tracking and reporting of unauthorized fishing activities in protected waters."
    },
    "ocean-trafficking": {
      title: "Maritime Security Intel",
      metrics: [
        { label: "High-Risk Routes", value: "5", change: "0" },
        { label: "Interdictions", value: "3", change: "+1" },
        { label: "Threat Level", value: "Moderate", change: "↓" }
      ],
      description: "Intelligence on maritime routes frequently used for illegal trafficking and transport."
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    // Create a FileReader to read the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setUploading(false);
    };
    reader.onerror = () => {
      console.error("Error reading the file");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-8 bg-[#121A27]">
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
        
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-700">
          <button 
            onClick={() => setActiveTab("oil-spill")}
            className={`px-4 py-2 mr-2 ${activeTab === "oil-spill" ? "bg-blue-600 text-white" : "bg-[#2a3545] text-gray-300"} rounded-t`}
          >
            Oil Spill
          </button>
          <button 
            onClick={() => setActiveTab("illegal-fishing")}
            className={`px-4 py-2 mr-2 ${activeTab === "illegal-fishing" ? "bg-blue-600 text-white" : "bg-[#2a3545] text-gray-300"} rounded-t`}
          >
            Illegal Fishing
          </button>
          <button 
            onClick={() => setActiveTab("ocean-trafficking")}
            className={`px-4 py-2 ${activeTab === "ocean-trafficking" ? "bg-blue-600 text-white" : "bg-[#2a3545] text-gray-300"} rounded-t`}
          >
            Ocean Trafficking
          </button>
        </div>
        
        {/* Active Tab Content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{dashboardData[activeTab].title}</h3>
          <p className="text-gray-300 mb-4">{dashboardData[activeTab].description}</p>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {dashboardData[activeTab].metrics.map((metric, index) => (
            <div key={index} className="bg-[#2a3545] p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{metric.label}</span>
                <span className={`text-sm ${metric.change.includes('+') ? 'text-green-400' : metric.change.includes('-') ? 'text-red-400' : 'text-gray-400'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold mt-2">{metric.value}</div>
            </div>
          ))}
        </div>
        
        {/* Oil Spill Photo Upload Section */}
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
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white flex items-center"
                disabled={uploading}
              >
                {uploading ? (
                  <span>Uploading...</span>
                ) : (
                  <span>Upload Photo</span>
                )}
              </button>
            </div>
            
            {/* Image Display Area */}
            <div className="bg-[#2a3545] p-4 rounded">
              {uploadedImage ? (
                <div>
                  <p className="text-gray-300 mb-2">Uploaded Image:</p>
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded oil spill" 
                    className="max-w-full max-h-96 rounded" 
                  />
                  <div className="mt-2 text-sm text-gray-400">
                    <p>This image has been uploaded for analysis. Our system will process this image to assess the extent of the oil spill and provide relevant analytics.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-600 rounded">
                  <p className="text-gray-400 mb-2">No image uploaded yet</p>
                  <p className="text-gray-500 text-sm text-center max-w-md">
                    Upload photos of oil spill incidents for documentation and analysis. Our system can help identify the type of oil, estimate the affected area, and suggest containment strategies.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Data Visualization Placeholder */}
        <div className="bg-[#2a3545] p-6 rounded h-64 flex items-center justify-center">
          <p className="text-gray-400">Data visualization for {dashboardData[activeTab].title}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalysis;