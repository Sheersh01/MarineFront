// src/utils/geocode.js
import axios from 'axios';

/**
 * Returns true if the given lat/lon falls on water.
 */
export async function isWater(lat, lon) {
    try {
      console.log(`Checking if coordinates are water: ${lat}, ${lon}`);
      
      const resp = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon,
          format: 'jsonv2',
          zoom: 10,
          addressdetails: 1,
        }
      });
      
      // Log the complete response for debugging
      console.log("Nominatim response:", JSON.stringify(resp.data, null, 2));
      
      // Check if we have explicit land features
      const address = resp.data.address || {};
      
      // List of land features
      const landFeatures = [
        'country', 'state', 'city', 'town', 'village', 'road',
        'highway', 'residential', 'building', 'house_number'
      ];
      
      // Check if any land features exist in the address
      const hasLandFeature = landFeatures.some(feature => address[feature] !== undefined);
      
      // Look for water-related features
      const isExplicitWater = 
        resp.data.category === 'water' ||
        (resp.data.category === 'natural' && resp.data.type === 'water') ||
        resp.data.category === 'waterway' ||
        address.water !== undefined ||
        address.sea !== undefined ||
        address.ocean !== undefined ||
        address.bay !== undefined;
      
      const result = isExplicitWater || !hasLandFeature;
      console.log(`Result: isWater = ${result}`);
      return result;
    } catch (error) {
      console.error("Error checking water status:", error);
      // Log complete error for debugging
      console.error("Full error details:", error.response ? error.response.data : error);
      
      // If API fails, we should handle this more explicitly
      alert("Couldn't verify if location is water. Proceeding anyway.");
      return true;
    }
  }