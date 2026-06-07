import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const GovernmentSchemes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      category: 'subsidy',
      description: 'Direct income support of ₹6000 per year to farmer families',
      eligibility: 'All landholding farmer families',
      benefits: '₹2000 every 4 months',
      howToApply: 'Online at pmkisan.gov.in or through CSC centers'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'insurance',
      description: 'Crop insurance scheme providing financial support to farmers',
      eligibility: 'All farmers growing notified crops',
      benefits: 'Up to ₹2 lakh coverage per farmer',
      howToApply: 'Through banks, insurance companies, or online'
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      category: 'credit',
      description: 'Easy access to credit for agriculture and allied activities',
      eligibility: 'All farmers including tenant farmers',
      benefits: 'Low interest loans up to ₹3 lakh',
      howToApply: 'Apply at any bank branch with land documents'
    },
    {
      id: 4,
      name: 'Soil Health Card Scheme',
      category: 'technology',
      description: 'Provides soil health information to farmers',
      eligibility: 'All farmers',
      benefits: 'Free soil testing and recommendations',
      howToApply: 'Contact local agriculture department'
    },
    {
      id: 5,
      name: 'PM Kisan Maan Dhan Yojana',
      category: 'pension',
      description: 'Pension scheme for small and marginal farmers',
      eligibility: 'Farmers aged 18-40 years with up to 2 hectares land',
      benefits: '₹3000 monthly pension after 60 years',
      howToApply: 'Through CSC centers or online'
    },
    {
      id: 6,
      name: 'National Agriculture Market (e-NAM)',
      category: 'marketing',
      description: 'Online trading platform for agricultural commodities',
      eligibility: 'All farmers',
      benefits: 'Better price discovery and transparent trading',
      howToApply: 'Register at enam.gov.in'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Schemes' },
    { value: 'subsidy', label: 'Subsidies' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'credit', label: 'Credit & Loans' },
    { value: 'technology', label: 'Technology' },
    { value: 'pension', label: 'Pension' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      subsidy: 'bg-green-100 text-green-800',
      insurance: 'bg-blue-100 text-blue-800',
      credit: 'bg-yellow-100 text-yellow-800',
      technology: 'bg-purple-100 text-purple-800',
      pension: 'bg-red-100 text-red-800',
      marketing: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🏛️ Government Schemes</h1>
        
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

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map(scheme => (
            <div key={scheme.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{scheme.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                  {scheme.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">Eligibility:</h4>
                  <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">Benefits:</h4>
                  <p className="text-sm text-gray-600">{scheme.benefits}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">How to Apply:</h4>
                  <p className="text-sm text-gray-600">{scheme.howToApply}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-800">Kisan Call Center</h3>
              <p className="text-blue-600">Toll Free: 1800-180-1551</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-800">PM-KISAN Helpline</h3>
              <p className="text-blue-600">Phone: 011-24300606</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Agriculture Ministry</h3>
              <p className="text-blue-600">Website: agricoop.gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;