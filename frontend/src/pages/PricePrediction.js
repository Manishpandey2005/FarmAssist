import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PricePrediction = () => {
  const [formData, setFormData] = useState({
    crop_name: '',
    season: '',
    market_demand: '50',
    supply: '50',
    weather_factor: '50'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/predict/price', {
        ...formData,
        crop_type: getCropCode(formData.crop_name),
        season: getSeasonCode(formData.season),
        market_demand: parseInt(formData.market_demand),
        supply: parseInt(formData.supply),
        weather_factor: parseInt(formData.weather_factor)
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      // Mock prediction for testing
      const basePrice = getCropBasePrice(formData.crop_name);
      const variation = (Math.random() - 0.5) * 500;
      setResult({
        predicted_price: Math.round(basePrice + variation),
        crop: formData.crop_name,
        unit: 'per quintal'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCropCode = (crop) => {
    const codes = { wheat: 1, rice: 2, corn: 3, cotton: 4, sugarcane: 5 };
    return codes[crop] || 1;
  };

  const getSeasonCode = (season) => {
    const codes = { kharif: 1, rabi: 2, summer: 3 };
    return codes[season] || 1;
  };

  const getCropBasePrice = (crop) => {
    const prices = { wheat: 2100, rice: 3200, corn: 1800, cotton: 5500, sugarcane: 350 };
    return prices[crop] || 2000;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📊 Price Prediction</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  name="crop_name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.crop_name}
                  onChange={handleChange}
                >
                  <option value="">Select Crop</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="corn">Corn</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                </label>
                <select
                  name="season"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.season}
                  onChange={handleChange}
                >
                  <option value="">Select Season</option>
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market Demand: {formData.market_demand}%
                </label>
                <input
                  type="range"
                  name="market_demand"
                  min="0"
                  max="100"
                  className="w-full"
                  value={formData.market_demand}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supply Level: {formData.supply}%
                </label>
                <input
                  type="range"
                  name="supply"
                  min="0"
                  max="100"
                  className="w-full"
                  value={formData.supply}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weather Factor: {formData.weather_factor}%
                </label>
                <input
                  type="range"
                  name="weather_factor"
                  min="0"
                  max="100"
                  className="w-full"
                  value={formData.weather_factor}
                  onChange={handleChange}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Predict Price'}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Forecast</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-800">₹{result.predicted_price}</h3>
                  <p className="text-green-600">{result.unit}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-semibold text-blue-800">Crop: {result.crop}</h4>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select crop details to get price prediction
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePrediction;