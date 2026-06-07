import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    crop_type: '',
    stage: '',
    land_area: '',
    temperature: '',
    nitrogen: '40',
    phosphorus: '30',
    potassium: '25',
    ph: '6.5',
    humidity: '65',
    rainfall: '100'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/predict/crop', {
        ...formData,
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to get recommendation. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🌱 Fertilizer Recommendation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Soil & Crop Parameters</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crop Type
                  </label>
                  <select
                    name="crop_type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.crop_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Crop</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                    <option value="cotton">Cotton</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="potato">Potato</option>
                    <option value="tomato">Tomato</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Growth Stage
                  </label>
                  <select
                    name="stage"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.stage}
                    onChange={handleChange}
                  >
                    <option value="">Select Stage</option>
                    <option value="sowing">Sowing</option>
                    <option value="vegetative">Vegetative</option>
                    <option value="flowering">Flowering</option>
                    <option value="fruiting">Fruiting</option>
                    <option value="maturity">Maturity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land Area (acres)
                  </label>
                  <input
                    type="number"
                    name="land_area"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.land_area}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.temperature}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Soil Parameters (Optional - defaults provided)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">N (kg/ha)</label>
                    <input
                      type="number"
                      name="nitrogen"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.nitrogen}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">P (kg/ha)</label>
                    <input
                      type="number"
                      name="phosphorus"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.phosphorus}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">K (kg/ha)</label>
                    <input
                      type="number"
                      name="potassium"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.potassium}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">pH</label>
                    <input
                      type="number"
                      name="ph"
                      step="0.1"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.ph}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Humidity (%)</label>
                    <input
                      type="number"
                      name="humidity"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.humidity}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Rainfall (mm)</label>
                    <input
                      type="number"
                      name="rainfall"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                      value={formData.rainfall}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendation</h2>
            
            {result ? (
              result.error ? (
                <div className="text-red-600 p-4 bg-red-50 rounded-md">
                  {result.error}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-md">
                    <h3 className="font-semibold text-green-800">Recommended Fertilizer:</h3>
                    <p className="text-green-700 text-lg">{result.fertilizer}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h3 className="font-semibold text-blue-800">Dosage:</h3>
                    <p className="text-blue-700">{result.dosage}</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-md">
                    <h3 className="font-semibold text-yellow-800">Application Method:</h3>
                    <p className="text-yellow-700">{result.application_method}</p>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 py-8">
                Fill in the parameters to get fertilizer recommendation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;