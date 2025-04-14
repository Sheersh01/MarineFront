import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { isWater } from "../utils/geocode.js"; 
// Fix for Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});
// This component will handle updating the map center
const MapCenterHandler = ({ lat, lng }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && lat && lng) {
      // Give a small timeout to ensure container is fully rendered
      setTimeout(() => {
        map.invalidateSize();
        map.setView([lat, lng], map.getZoom());
      }, 100);
    }
  }, [map, lat, lng]);
  
  return null;
};

const DashboardAnalysis = ({ onBackToHome = () => console.warn("onBackToHome not provided") }) => {
  const [activeTab, setActiveTab] = useState("illegal-fishing");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const fileInputRef = useRef(null);
  const mapRef = useRef(null);
  // State for vessel data form
  const [vesselData, setVesselData] = useState({
    mmsi: "123456789",
    timestamp: "",
    distance_from_shore: "12.5",
    distance_from_port: "24.9",
    speed: "8.4",
    course: "140.4",
    lat: "-12.345",
    lon: "78.901",
    source: "AIS"
  });
  const [vessels, setVessels] = useState([]);
  // State for current alert
  const [currentAlert, setCurrentAlert] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("Never");
  const [responseText, setResponseText] = useState("No data sent yet.");
  const [checkingLand, setCheckingLand] = useState(false);
  // Add new state for land/water status
  const [locationStatus, setLocationStatus] = useState(null);
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

  // Set default timestamp to current time on component mount
  useEffect(() => {
    const now = new Date();
    const tzoffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);
    setVesselData(prevData => ({
      ...prevData,
      timestamp: localISOTime
    }));
  }, []);

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

  // Added console log to debug the onBackToHome function
  const handleBackClick = () => {
    console.log("Back to Home clicked");
    onBackToHome();
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVesselData(prevData => ({
      ...prevData,
      [id]: value
    }));
    // Reset location status when coordinates are changed
    if (id === 'lat' || id === 'lon') {
      setLocationStatus(null);
    }
  };
  
  const handleVesselSubmit = async (e) => {
    e.preventDefault();
    setCheckingLand(true);
    setResponseText("Validating location…");
    setLocationStatus("checking");

    const latNum = parseFloat(vesselData.lat);
    const lonNum = parseFloat(vesselData.lon);

    let water = true;
    try {
      water = await isWater(latNum, lonNum);
      // Set location status based on water check result
      setLocationStatus(water ? "water" : "land");
      
      if (!water) {
        setResponseText("⚠️ That point is on land. Analysis skipped.");
        setCurrentAlert({
          mmsi: parseInt(vesselData.mmsi),
          timestamp: new Date(vesselData.timestamp).toISOString(),
          lat: latNum,
          lon: lonNum,
          message: "LOCATION ERROR: The specified coordinates are on land.",
          is_illegal_fishing: false,
          is_fishing_probability: 0,
          alert_needed: true
        });
        setCheckingLand(false);
        return;
      }
    } catch (err) {
      console.warn("Geocode failed, assuming water", err);
      water = true;
      setLocationStatus("unknown");
      setResponseText("⚠️ Location validation failed. Proceeding with analysis assuming water.");
    }

    // now do your normal POST
    setResponseText("Sending data...");
    try {
      const formattedData = {
        mmsi: parseInt(vesselData.mmsi),
        timestamp: new Date(vesselData.timestamp).toISOString(),
        distance_from_shore: parseFloat(vesselData.distance_from_shore),
        distance_from_port: parseFloat(vesselData.distance_from_port),
        speed: parseFloat(vesselData.speed),
        course: parseFloat(vesselData.course),
        lat: latNum,
        lon: lonNum,
        source: vesselData.source,
      };

      const response = await fetch("/api/vessel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
      const data = await response.json();
      setResponseText(JSON.stringify(data, null, 2));

      if (data.is_fishing_probability > 0.5 || data.is_illegal_fishing) {
        data.alert_needed = true;
        data.message = data.is_illegal_fishing
          ? "ILLEGAL FISHING ALERT: Vessel detected in restricted zone!"
          : "HIGH FISHING PROBABILITY ALERT: Vessel likely engaged in fishing activity.";
        setCurrentAlert(data);
      }

      updateMap();
    } catch (error) {
      setResponseText("Error: " + error.message);
    } finally {
      setCheckingLand(false);
    }
  };

  
  // Update map
  const updateMap = async () => {
    try {
      // Add the current vessel to our vessels list
      const newVessel = {...vesselData};
      setVessels(prevVessels => [...prevVessels, newVessel]);
      
      // If we have a map reference, invalidate size and update
      if (mapRef.current) {
        const map = mapRef.current;
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      }
      
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Map update error:', error);
    }
  };
 

  // Simulate response
  const handleSimulate = () => {
    // First check if the location is on land
    const checkLandWater = async () => {
      setCheckingLand(true);
      setLocationStatus("checking");
      
      const latNum = parseFloat(vesselData.lat);
      const lonNum = parseFloat(vesselData.lon);
      
      try {
        const water = await isWater(latNum, lonNum);
        setLocationStatus(water ? "water" : "land");
        
        if (!water) {
          setResponseText("⚠️ That point is on land. Analysis skipped.");
          setCurrentAlert({
            mmsi: parseInt(vesselData.mmsi),
            timestamp: new Date(vesselData.timestamp).toISOString(),
            lat: latNum,
            lon: lonNum,
            message: "LOCATION ERROR: The specified coordinates are on land.",
            is_illegal_fishing: false,
            is_fishing_probability: 0,
            alert_needed: true
          });
          setCheckingLand(false);
          return;
        }
        
        // Continue with simulation
        simulateResponse();
      } catch (err) {
        console.warn("Geocode failed, assuming water", err);
        setLocationStatus("unknown");
        setResponseText("⚠️ Location validation failed. Proceeding with simulation assuming water.");
        simulateResponse();
      } finally {
        setCheckingLand(false);
      }
    };
    
    const simulateResponse = () => {
      const formattedData = {
        mmsi: parseInt(vesselData.mmsi),
        timestamp: new Date(vesselData.timestamp).toISOString(),
        distance_from_shore: parseFloat(vesselData.distance_from_shore),
        distance_from_port: parseFloat(vesselData.distance_from_port),
        speed: parseFloat(vesselData.speed),
        course: parseFloat(vesselData.course),
        lat: parseFloat(vesselData.lat),
        lon: parseFloat(vesselData.lon),
        source: vesselData.source
      };
      
      const fishingProb = Math.random();
      const isIllegal = Math.random() > 0.7;
      const alertNeeded = fishingProb > 0.5 || isIllegal;
      
      const data = {
        ...formattedData,
        is_fishing_probability: fishingProb,
        is_illegal_fishing: isIllegal,
        alert_needed: alertNeeded,
        message: alertNeeded ? 
          (isIllegal ? "ILLEGAL FISHING ALERT: Vessel detected in restricted zone!" : 
                      "HIGH FISHING PROBABILITY ALERT: Vessel likely engaged in fishing activity.") :
          "Normal vessel activity detected."
      };
      
      setResponseText(JSON.stringify(data, null, 2));
      if (data.alert_needed) setCurrentAlert(data);
      
      // Update map with simulated vessel
      updateMap();
    };
    
    // Start the process
    checkLandWater();
  };
  
  // Clear current alert
  const clearAlert = () => {
    setCurrentAlert(null);
  };

  // Function to render location status indicator
  const renderLocationStatus = () => {
    switch (locationStatus) {
      case "checking":
        return <span className="py-1 px-2 bg-yellow-600 text-white text-xs rounded">Checking location...</span>;
      case "water":
        return <span className="py-1 px-2 bg-blue-600 text-white text-xs rounded">✓ Water confirmed</span>;
      case "land":
        return <span className="py-1 px-2 bg-red-600 text-white text-xs rounded">⚠️ Land detected</span>;
      case "unknown":
        return <span className="py-1 px-2 bg-gray-600 text-white text-xs rounded">? Location status unknown</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-[#121A27] text-white h-screen overflow-auto">
      <div className="bg-[#1A2535] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Maritime Intelligence Dashboard</h2>
          <button
            onClick={handleBackClick}
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

        {/* Illegal Fishing Detection Section */}
        {activeTab === "illegal-fishing" && (
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Vessel Data Input Panel */}
              <div className="bg-[#2a3545] p-4 rounded flex-1">
                <h3 className="text-lg font-medium mb-4">Vessel Data Input</h3>
                <form onSubmit={handleVesselSubmit}>
                  <div className="mb-3">
                    <label htmlFor="mmsi" className="block text-sm font-medium mb-1">MMSI:</label>
                    <input 
                      type="number" 
                      id="mmsi" 
                      value={vesselData.mmsi} 
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="timestamp" className="block text-sm font-medium mb-1">Timestamp (UTC):</label>
                    <input 
                      type="datetime-local" 
                      id="timestamp" 
                      value={vesselData.timestamp} 
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="distance_from_shore" className="block text-sm font-medium mb-1">
                      Distance from Shore (nm):
                    </label>
                    <input 
                      type="number" 
                      id="distance_from_shore" 
                      value={vesselData.distance_from_shore} 
                      onChange={handleInputChange}
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="distance_from_port" className="block text-sm font-medium mb-1">
                      Distance from Port (nm):
                    </label>
                    <input 
                      type="number" 
                      id="distance_from_port" 
                      value={vesselData.distance_from_port} 
                      onChange={handleInputChange}
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="speed" className="block text-sm font-medium mb-1">Speed (knots):</label>
                    <input 
                      type="number" 
                      id="speed" 
                      value={vesselData.speed} 
                      onChange={handleInputChange}
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="course" className="block text-sm font-medium mb-1">Course (degrees):</label>
                    <input 
                      type="number" 
                      id="course" 
                      value={vesselData.course} 
                      onChange={handleInputChange}
                      min="0"
                      max="360"
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="lat" className="block text-sm font-medium mb-1">
                      Latitude: {renderLocationStatus()}
                    </label>
                    <input 
                      type="number" 
                      id="lat" 
                      value={vesselData.lat} 
                      onChange={handleInputChange}
                      min="-90"
                      max="90"
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="lon" className="block text-sm font-medium mb-1">Longitude:</label>
                    <input 
                      type="number" 
                      id="lon" 
                      value={vesselData.lon} 
                      onChange={handleInputChange}
                      min="-180"
                      max="180"
                      step="0.0000000001"
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="source" className="block text-sm font-medium mb-1">Source:</label>
                    <select 
                      id="source" 
                      value={vesselData.source} 
                      onChange={handleInputChange}
                      className="w-full p-2 bg-[#1A2535] border border-gray-700 rounded text-white"
                    >
                      <option value="AIS">AIS</option>
                      <option value="VMS">VMS</option>
                      <option value="SAR">SAR</option>
                      <option value="RADAR">RADAR</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={checkingLand}
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
                  >
                    {checkingLand ? "Validating…" : "Submit Vessel Data"}
                  </button>
                  
                  <div className="flex gap-2 mt-4">
                    <button 
                      type="button" 
                      onClick={updateMap}
                      className="flex-1 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Update Map
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSimulate}
                      className="flex-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Simulate
                    </button>
                    <button 
                      type="button" 
                      onClick={clearAlert}
                      className="flex-1 p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                    >
                      Clear Alert
                    </button>
                  </div>
                </form>
              </div>
              
              {/* API Response Panel */}
              <div className="bg-[#2a3545] p-4 rounded flex-1">
                <h3 className="text-lg font-medium mb-4">API Response</h3>
                <pre className="bg-[#1A2535] p-3 rounded text-sm text-gray-300 overflow-auto max-h-64">
                  {responseText}
                </pre>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Vessel Map</h3>
                  <div className="bg-[#1A2535] p-3 rounded">
                    <div style={{ height: "300px", width: "100%" }}>
                      <MapContainer 
                        center={[parseFloat(vesselData.lat), parseFloat(vesselData.lon)]} 
                        zoom={5} 
                        style={{ height: "100%", width: "100%" }}
                        ref={mapRef}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[parseFloat(vesselData.lat), parseFloat(vesselData.lon)]}>
                          <Popup>
                            MMSI: {vesselData.mmsi}<br />
                            Speed: {vesselData.speed} knots<br />
                            Course: {vesselData.course}°
                            {locationStatus === "land" && <div className="font-bold text-red-500">⚠️ LAND LOCATION</div>}
                          </Popup>
                        </Marker>
                        {vessels.map((vessel, index) => (
                          <Marker 
                            key={`${vessel.mmsi}-${index}`} 
                            position={[parseFloat(vessel.lat), parseFloat(vessel.lon)]}
                          >
                            <Popup>
                              MMSI: {vessel.mmsi}<br />
                              Speed: {vessel.speed} knots<br />
                              Course: {vessel.course}°
                            </Popup>
                          </Marker>
                        ))}
                        
                        {/* Add this line */}
                        <MapCenterHandler lat={parseFloat(vesselData.lat)} lng={parseFloat(vesselData.lon)} />
                      </MapContainer>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-400 mt-2">
                        Last updated: <span>{lastUpdated}</span>
                      </p>
                      {locationStatus === "land" && (
                        <div className="mt-2 bg-red-800 text-white px-3 py-1 rounded-md text-sm">
                          ⚠️ Current location is on land! Maritime analysis unavailable.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Alert */}
            <div className="bg-[#2a3545] p-4 rounded mt-6">
              <h3 className="text-lg font-medium mb-4">Current Alert</h3>
              
              {!currentAlert ? (
                <p className="text-gray-400">No current alert.</p>
              ) : (
                <div className={`border-l-4 p-3 rounded bg-[#1A2535] ${
                  locationStatus === "land" ? "border-red-600" :
                  currentAlert.is_illegal_fishing ? "border-red-600" : 
                  currentAlert.is_fishing_probability > 0.7 ? "border-yellow-600" : "border-blue-600"
                }`}>
                  <h4 className="text-md font-semibold">
                    {locationStatus === "land" ? "Location Error" : "Alert"}
                  </h4>
                  <p className="text-sm"><strong>MMSI:</strong> {currentAlert.mmsi}</p>
                  <p className="text-sm"><strong>Time:</strong> {new Date(currentAlert.timestamp).toLocaleString()}</p>
                  <p className="text-sm">
                    <strong>Location:</strong> {parseFloat(currentAlert.lat).toFixed(4)}, {parseFloat(currentAlert.lon).toFixed(4)}
                    {locationStatus === "land" && (
                      <span className="ml-2 text-red-400 font-bold">ON LAND</span>
                    )}
                  </p>
                  {locationStatus !== "land" && (
                    <p className="text-sm"><strong>Fishing Probability:</strong> {(currentAlert.is_fishing_probability * 100).toFixed(1)}%</p>
                  )}
                  <p className="text-sm"><strong>Message:</strong> {currentAlert.message}</p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Ocean Trafficking Section placeholder */}
        {activeTab === "ocean-trafficking" && (
          <div className="mb-6">
            <div className="bg-[#2a3545] p-4 rounded">
              <h3 className="text-lg font-medium mb-4">Maritime Security Dashboard</h3>
              <p className="text-gray-300">
                This section provides intelligence on maritime routes frequently used for illegal trafficking and transport.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalysis;