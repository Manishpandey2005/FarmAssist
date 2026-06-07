import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PestAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pest_type: '',
    crop_affected: '',
    severity: 'Medium',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAlertsFromStorage();
    fetchAlerts();
  }, []);

  const loadAlertsFromStorage = () => {
    const storedAlerts = localStorage.getItem('pestAlerts');
    if (storedAlerts) {
      setAlerts(JSON.parse(storedAlerts));
    }
  };

  const saveAlertsToStorage = (alertsData) => {
    localStorage.setItem('pestAlerts', JSON.stringify(alertsData));
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/alerts');
      const alertsData = response.data.alerts;
      setAlerts(alertsData);
      saveAlertsToStorage(alertsData);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const newAlert = {
        ...formData,
        timestamp: new Date().toISOString(),
        _id: Date.now().toString(),
        verified: false
      };
      
      // Add to local storage immediately
      const updatedAlerts = [newAlert, ...alerts];
      setAlerts(updatedAlerts);
      saveAlertsToStorage(updatedAlerts);
      
      // Try to submit to server
      await axios.post('http://localhost:8000/alerts', formData);
      
      setFormData({
        pest_type: '',
        crop_affected: '',
        severity: 'Medium',
        location: '',
        description: ''
      });
      setShowForm(false);
      fetchAlerts();
    } catch (error) {
      console.error('Error submitting alert:', error);
      // Alert is already saved locally, so user sees it even if server fails
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🚨 Pest Alerts</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
          >
            {showForm ? 'Cancel' : 'Report Pest'}
          </button>
        </div>

        {/* Alert Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Report New Pest Alert</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pest Type
                  </label>
                  <input
                    type="text"
                    name="pest_type"
                    required
                    placeholder="e.g., Aphids, Bollworm, Locust"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.pest_type}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crop Affected
                  </label>
                  <input
                    type="text"
                    name="crop_affected"
                    required
                    placeholder="e.g., Wheat, Rice, Cotton"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.crop_affected}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Severity Level
                  </label>
                  <select
                    name="severity"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Village, District, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  placeholder="Describe the pest attack, damage level, and any other relevant details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Alert'}
              </button>
            </form>
          </div>
        )}

        {/* Alerts Feed */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Alerts</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert._id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {alert.pest_type} on {alert.crop_affected}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(alert.timestamp)}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">📍 {alert.location}</span>
                  </div>
                  
                  <p className="text-gray-700">{alert.description}</p>
                  
                  {!alert.verified && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        ⏳ Pending Verification
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No pest alerts reported yet. Be the first to report!
              </div>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Reporting Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Report pest attacks as soon as you notice them</li>
            <li>Provide accurate location information to help nearby farmers</li>
            <li>Include details about damage severity and affected area</li>
            <li>Mention any control measures you've already tried</li>
            <li>Upload photos if possible (feature coming soon)</li>
            <li>Verify information before submitting to maintain community trust</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PestAlerts;