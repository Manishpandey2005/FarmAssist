import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const FarmNews = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock news data - in real app, fetch from news API
    const mockNews = [
      {
        id: 1,
        title: 'New Crop Insurance Scheme Launched for Kharif Season',
        category: 'policy',
        summary: 'Government announces enhanced coverage under PMFBY with reduced premium rates for farmers.',
        date: '2024-01-15',
        source: 'Agriculture Ministry'
      },
      {
        id: 2,
        title: 'Wheat Prices Rise 15% in Major Mandis',
        category: 'market',
        summary: 'Strong demand and reduced supply push wheat prices higher across North Indian markets.',
        date: '2024-01-14',
        source: 'Market Watch'
      },
      {
        id: 3,
        title: 'Drone Technology for Precision Farming Gains Momentum',
        category: 'technology',
        summary: 'Farmers increasingly adopting drone-based solutions for crop monitoring and pesticide application.',
        date: '2024-01-13',
        source: 'AgriTech News'
      },
      {
        id: 4,
        title: 'Monsoon Forecast: Normal Rainfall Expected This Year',
        category: 'weather',
        summary: 'IMD predicts normal monsoon with good distribution across farming regions.',
        date: '2024-01-12',
        source: 'Weather Department'
      },
      {
        id: 5,
        title: 'Organic Farming Subsidies Increased by 25%',
        category: 'policy',
        summary: 'Central government boosts financial support for organic farming practices and certification.',
        date: '2024-01-11',
        source: 'Rural Development'
      },
      {
        id: 6,
        title: 'Cotton Exports Hit Record High',
        category: 'market',
        summary: 'Indian cotton exports reach new milestone driven by quality improvements and global demand.',
        date: '2024-01-10',
        source: 'Export Council'
      },
      {
        id: 7,
        title: 'AI-Powered Soil Testing Launched in 100 Districts',
        category: 'technology',
        summary: 'New artificial intelligence system provides instant soil health analysis and recommendations.',
        date: '2024-01-09',
        source: 'Digital India'
      },
      {
        id: 8,
        title: 'Heatwave Alert: Protective Measures for Crops',
        category: 'weather',
        summary: 'Agricultural experts advise farmers on protecting crops during upcoming heatwave conditions.',
        date: '2024-01-08',
        source: 'Crop Advisory'
      }
    ];
    
    setNews(mockNews);
  }, []);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'policy', label: 'Policy & Schemes' },
    { value: 'market', label: 'Market Updates' },
    { value: 'technology', label: 'Technology' },
    { value: 'weather', label: 'Weather & Climate' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      policy: 'bg-blue-100 text-blue-800',
      market: 'bg-green-100 text-green-800',
      technology: 'bg-purple-100 text-purple-800',
      weather: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📰 Farm News</h1>
        
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {filteredNews.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                    <span className="text-sm text-gray-500">• {item.source}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* News Sources */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trusted News Sources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-800">Government</h3>
              <p className="text-gray-600">Ministry of Agriculture</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Market Data</h3>
              <p className="text-gray-600">APMC & Mandi Boards</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Weather</h3>
              <p className="text-gray-600">IMD & Meteorology</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Research</h3>
              <p className="text-gray-600">ICAR & Universities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmNews;