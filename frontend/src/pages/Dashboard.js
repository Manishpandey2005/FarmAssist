import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [marketPrices, setMarketPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedCity]);

  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard data...');
      
      // Fetch current weather
      try {
        const weatherRes = await axios.get(`http://localhost:8000/weather?city=${selectedCity}`);
        setWeather(weatherRes.data);
      } catch (weatherError) {
        console.error('Weather API error:', weatherError);
        // Fallback weather data
        const mockWeather = {
          Delhi: { temperature: 28, description: 'partly cloudy', humidity: 65, wind_speed: 3.2 },
          Mumbai: { temperature: 32, description: 'humid', humidity: 78, wind_speed: 2.1 },
          Bangalore: { temperature: 24, description: 'pleasant', humidity: 58, wind_speed: 1.8 },
          Chennai: { temperature: 30, description: 'hot', humidity: 72, wind_speed: 2.5 },
          Kolkata: { temperature: 29, description: 'cloudy', humidity: 68, wind_speed: 2.8 },
          Pune: { temperature: 26, description: 'clear', humidity: 55, wind_speed: 2.0 }
        };
        setWeather({ city: selectedCity, ...mockWeather[selectedCity] });
      }
      
      // Fetch 7-day forecast
      try {
        const forecastRes = await axios.get(`http://localhost:8000/weather?city=${selectedCity}&forecast=true`);
        setWeatherForecast(forecastRes.data);
      } catch (forecastError) {
        console.error('Forecast API error:', forecastError);
        // Fallback forecast data
        const mockForecast = {
          city: selectedCity,
          forecast: [
            { date: '2024-01-15', day: 'Monday', temperature: 28, description: 'sunny', humidity: 65 },
            { date: '2024-01-16', day: 'Tuesday', temperature: 30, description: 'cloudy', humidity: 70 },
            { date: '2024-01-17', day: 'Wednesday', temperature: 26, description: 'rainy', humidity: 80 },
            { date: '2024-01-18', day: 'Thursday', temperature: 29, description: 'partly cloudy', humidity: 68 },
            { date: '2024-01-19', day: 'Friday', temperature: 31, description: 'sunny', humidity: 62 },
            { date: '2024-01-20', day: 'Saturday', temperature: 27, description: 'cloudy', humidity: 75 },
            { date: '2024-01-21', day: 'Sunday', temperature: 25, description: 'rainy', humidity: 85 }
          ]
        };
        setWeatherForecast(mockForecast);
      }
      
      // Fetch market data for selected city
      try {
        const marketRes = await axios.get(`http://localhost:8000/market?city=${selectedCity}`);
        setMarketPrices(marketRes.data);
      } catch (marketError) {
        console.error('Market API error:', marketError);
        // Fallback market data
        setMarketPrices({
          prices: {
            wheat: { price: 2100, change: '+50' },
            rice: { price: 3200, change: '-30' },
            corn: { price: 1800, change: '+20' },
            cotton: { price: 5500, change: '-100' }
          },
          unit: 'per quintal',
          city: selectedCity
        });
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Link to="/disease-detection" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-800">Disease Detection</h3>
              <p className="text-gray-600 text-sm">Upload leaf images for analysis</p>
            </div>
          </Link>
          
          <Link to="/fertilizer" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-semibold text-gray-800">Fertilizer Guide</h3>
              <p className="text-gray-600 text-sm">Get personalized recommendations</p>
            </div>
          </Link>
          
          <Link to="/pest-alerts" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-lg font-semibold text-gray-800">Pest Alerts</h3>
              <p className="text-gray-600 text-sm">Community pest warnings</p>
            </div>
          </Link>
          
          <Link to="/price-prediction" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-800">Price Prediction</h3>
              <p className="text-gray-600 text-sm">Forecast crop prices</p>
            </div>
          </Link>
          
          <Link to="/crop-suggestion" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-lg font-semibold text-gray-800">Crop Suggestion</h3>
              <p className="text-gray-600 text-sm">Get crop recommendations</p>
            </div>
          </Link>
          
          <Link to="/government-schemes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-lg font-semibold text-gray-800">Gov Schemes</h3>
              <p className="text-gray-600 text-sm">Policies & subsidies</p>
            </div>
          </Link>
          
          <Link to="/farm-news" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-lg font-semibold text-gray-800">Farm News</h3>
              <p className="text-gray-600 text-sm">Latest agriculture updates</p>
            </div>
          </Link>
        </div>

        {/* Weather & Market Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">🌤️ Weather</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowForecast(!showForecast)}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                >
                  {showForecast ? 'Current' : '7-Day'}
                </button>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : showForecast && weatherForecast ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {weatherForecast.forecast.map((day, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{day.day}</div>
                      <div className="text-xs text-gray-500">{day.date}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{day.temperature}°C</div>
                      <div className="text-xs capitalize">{day.description}</div>
                    </div>
                    <div className="text-xs text-gray-500">{day.humidity}%</div>
                  </div>
                ))}
              </div>
            ) : weather ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">{weather.city}</span>
                  <span className="text-2xl font-bold text-primary">{weather.temperature}°C</span>
                </div>
                <p className="text-gray-600 capitalize mb-2">{weather.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Humidity:</span>
                    <span className="ml-2 font-medium">{weather.humidity}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Wind:</span>
                    <span className="ml-2 font-medium">{weather.wind_speed} m/s</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">Weather data unavailable</div>
            )}
          </div>

          {/* Market Prices Widget */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">💰 Market Prices</h2>
              {marketPrices && (
                <span className="text-sm text-gray-500">{marketPrices.city} Mandi</span>
              )}
            </div>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : marketPrices ? (
              <div className="space-y-3">
                {Object.entries(marketPrices.prices).map(([crop, data]) => (
                  <div key={crop} className="flex justify-between items-center">
                    <span className="capitalize font-medium">{crop}</span>
                    <div className="text-right">
                      <div className="font-semibold">₹{data.price}</div>
                      <div className={`text-sm ${data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {data.change}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-gray-500 mt-2">
                  Prices per quintal
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">Market data unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;