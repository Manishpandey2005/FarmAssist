import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const CropSuggestion = () => {
  const [formData, setFormData] = useState({
    land_area: '',
    soil_type: '',
    water_availability: '',
    climate: '',
    budget: '',
    experience: ''
  });
  const [suggestions, setSuggestions] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cropData = getCropSuggestions(formData);
    setSuggestions(cropData);
  };

  const getCropSuggestions = (data) => {
    const { soil_type, water_availability, climate, land_area, budget } = data;
    
    let crops = [];
    
    // Logic based on soil type
    if (soil_type === 'clay') {
      crops.push({ name: 'Rice', suitability: 95, reason: 'Clay soil retains water well' });
      crops.push({ name: 'Wheat', suitability: 85, reason: 'Good for clay soil' });
    } else if (soil_type === 'sandy') {
      crops.push({ name: 'Groundnut', suitability: 90, reason: 'Thrives in sandy soil' });
      crops.push({ name: 'Millet', suitability: 85, reason: 'Drought resistant' });
    } else if (soil_type === 'loamy') {
      crops.push({ name: 'Cotton', suitability: 95, reason: 'Perfect for loamy soil' });
      crops.push({ name: 'Sugarcane', suitability: 90, reason: 'High yield potential' });
    }
    
    // Add based on water availability
    if (water_availability === 'high') {
      crops.push({ name: 'Sugarcane', suitability: 95, reason: 'High water requirement' });
    } else if (water_availability === 'low') {
      crops.push({ name: 'Bajra', suitability: 90, reason: 'Drought tolerant' });
    }
    
    // Filter duplicates and sort by suitability
    const uniqueCrops = crops.filter((crop, index, self) => 
      index === self.findIndex(c => c.name === crop.name)
    ).sort((a, b) => b.suitability - a.suitability);
    
    return uniqueCrops.slice(0, 4);
  };

  const getCropDetails = (cropName) => {
    const cropData = {
      'Rice': {
        name: 'Rice',
        season: 'Kharif (June-October)',
        duration: '120-150 days',
        yield: '40-60 quintals/hectare',
        investment: '₹25,000-35,000/hectare',
        profit: '₹15,000-25,000/hectare',
        waterReq: 'High (1200-1500mm)',
        soilPH: '5.5-7.0',
        temperature: '20-35°C',
        practices: ['Transplanting', 'Direct seeding', 'SRI method'],
        diseases: ['Blast', 'Bacterial blight', 'Brown spot'],
        fertilizer: 'NPK 120:60:40 kg/ha'
      },
      'Wheat': {
        name: 'Wheat',
        season: 'Rabi (November-April)',
        duration: '120-140 days',
        yield: '35-50 quintals/hectare',
        investment: '₹20,000-30,000/hectare',
        profit: '₹12,000-20,000/hectare',
        waterReq: 'Medium (450-600mm)',
        soilPH: '6.0-7.5',
        temperature: '15-25°C',
        practices: ['Broadcasting', 'Line sowing', 'Zero tillage'],
        diseases: ['Rust', 'Smut', 'Aphids'],
        fertilizer: 'NPK 120:60:40 kg/ha'
      },
      'Cotton': {
        name: 'Cotton',
        season: 'Kharif (May-October)',
        duration: '180-200 days',
        yield: '15-25 quintals/hectare',
        investment: '₹35,000-45,000/hectare',
        profit: '₹20,000-35,000/hectare',
        waterReq: 'Medium (700-1000mm)',
        soilPH: '6.0-8.0',
        temperature: '21-35°C',
        practices: ['Ridge planting', 'Drip irrigation', 'IPM'],
        diseases: ['Bollworm', 'Whitefly', 'Leaf curl'],
        fertilizer: 'NPK 120:60:60 kg/ha'
      },
      'Sugarcane': {
        name: 'Sugarcane',
        season: 'Year round',
        duration: '12-18 months',
        yield: '700-1000 quintals/hectare',
        investment: '₹60,000-80,000/hectare',
        profit: '₹40,000-60,000/hectare',
        waterReq: 'Very High (1500-2500mm)',
        soilPH: '6.5-7.5',
        temperature: '20-35°C',
        practices: ['Ratoon management', 'Drip irrigation', 'Mechanization'],
        diseases: ['Red rot', 'Smut', 'Borer'],
        fertilizer: 'NPK 280:90:90 kg/ha'
      }
    };
    return cropData[cropName] || cropData['Rice'];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🌾 Crop Suggestion</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Farm Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land Area (acres)</label>
                <input
                  type="number"
                  name="land_area"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.land_area}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <select
                  name="soil_type"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.soil_type}
                  onChange={handleChange}
                >
                  <option value="">Select Soil Type</option>
                  <option value="clay">Clay Soil</option>
                  <option value="sandy">Sandy Soil</option>
                  <option value="loamy">Loamy Soil</option>
                  <option value="silt">Silt Soil</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Water Availability</label>
                <select
                  name="water_availability"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.water_availability}
                  onChange={handleChange}
                >
                  <option value="">Select Water Availability</option>
                  <option value="high">High (Irrigation available)</option>
                  <option value="medium">Medium (Seasonal water)</option>
                  <option value="low">Low (Rain-fed)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Climate</label>
                <select
                  name="climate"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.climate}
                  onChange={handleChange}
                >
                  <option value="">Select Climate</option>
                  <option value="tropical">Tropical</option>
                  <option value="subtropical">Subtropical</option>
                  <option value="temperate">Temperate</option>
                  <option value="arid">Arid</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary"
              >
                Get Crop Suggestions
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Crops</h2>
            
            {suggestions ? (
              <div className="space-y-4">
                {suggestions.map((crop, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedCrop(getCropDetails(crop.name));
                      setShowModal(true);
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-green-800">{crop.name}</h3>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {crop.suitability}% suitable
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{crop.reason}</p>
                    <p className="text-blue-600 text-xs mt-2">Click for details →</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Fill in your farm details to get crop suggestions
              </div>
            )}
          </div>
        </div>

        {/* Crop Details Modal */}
        {showModal && selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-green-800">{selectedCrop.name} Details</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded">
                      <h4 className="font-semibold text-blue-800">Season</h4>
                      <p className="text-blue-700">{selectedCrop.season}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h4 className="font-semibold text-green-800">Duration</h4>
                      <p className="text-green-700">{selectedCrop.duration}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded">
                      <h4 className="font-semibold text-yellow-800">Expected Yield</h4>
                      <p className="text-yellow-700">{selectedCrop.yield}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <h4 className="font-semibold text-purple-800">Investment</h4>
                      <p className="text-purple-700">{selectedCrop.investment}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded">
                      <h4 className="font-semibold text-red-800">Expected Profit</h4>
                      <p className="text-red-700">{selectedCrop.profit}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded">
                      <h4 className="font-semibold text-indigo-800">Water Requirement</h4>
                      <p className="text-indigo-700">{selectedCrop.waterReq}</p>
                    </div>
                    <div className="p-3 bg-pink-50 rounded">
                      <h4 className="font-semibold text-pink-800">Soil pH</h4>
                      <p className="text-pink-700">{selectedCrop.soilPH}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-gray-800">Temperature</h4>
                      <p className="text-gray-700">{selectedCrop.temperature}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-teal-50 rounded">
                    <h4 className="font-semibold text-teal-800">Recommended Practices</h4>
                    <p className="text-teal-700">{selectedCrop.practices.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded">
                    <h4 className="font-semibold text-orange-800">Common Diseases</h4>
                    <p className="text-orange-700">{selectedCrop.diseases.join(', ')}</p>
                  </div>
                  <div className="p-3 bg-lime-50 rounded">
                    <h4 className="font-semibold text-lime-800">Fertilizer Recommendation</h4>
                    <p className="text-lime-700">{selectedCrop.fertilizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSuggestion;