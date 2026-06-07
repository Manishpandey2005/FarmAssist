import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const DiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/predict/leaf', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Failed to analyze image. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🔍 Disease Detection</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Leaf Image</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-w-full h-48 mx-auto object-contain" />
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-gray-600">Click to upload leaf image</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
              
              <button
                type="submit"
                disabled={!selectedFile || loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Analyze Disease'}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
            
            {result ? (
              result.error ? (
                <div className="text-red-600 p-4 bg-red-50 rounded-md">
                  {result.error}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-md">
                    <h3 className="font-semibold text-green-800">Disease Detected:</h3>
                    <p className="text-green-700 text-lg">{result.disease}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h3 className="font-semibold text-blue-800">Confidence:</h3>
                    <p className="text-blue-700">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-md">
                    <h3 className="font-semibold text-yellow-800">Treatment Recommendation:</h3>
                    <p className="text-yellow-700">{result.treatment}</p>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 py-8">
                Upload an image to see analysis results
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Tips for Better Results</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Take clear, well-lit photos of affected leaves</li>
            <li>Ensure the leaf fills most of the frame</li>
            <li>Avoid blurry or dark images</li>
            <li>Include both healthy and affected parts if possible</li>
            <li>Take multiple photos from different angles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;