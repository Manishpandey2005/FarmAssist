import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import PestAlerts from './pages/PestAlerts';
import PricePrediction from './pages/PricePrediction';
import CropSuggestion from './pages/CropSuggestion';
import GovernmentSchemes from './pages/GovernmentSchemes';
import FarmNews from './pages/FarmNews';
import './index.css';

function ProtectedRoute({ children }) {
  // Temporarily disable authentication
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/disease-detection" element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            } />
            <Route path="/fertilizer" element={
              <ProtectedRoute>
                <FertilizerRecommendation />
              </ProtectedRoute>
            } />
            <Route path="/pest-alerts" element={
              <ProtectedRoute>
                <PestAlerts />
              </ProtectedRoute>
            } />
            <Route path="/price-prediction" element={
              <ProtectedRoute>
                <PricePrediction />
              </ProtectedRoute>
            } />
            <Route path="/crop-suggestion" element={
              <ProtectedRoute>
                <CropSuggestion />
              </ProtectedRoute>
            } />
            <Route path="/government-schemes" element={
              <ProtectedRoute>
                <GovernmentSchemes />
              </ProtectedRoute>
            } />
            <Route path="/farm-news" element={
              <ProtectedRoute>
                <FarmNews />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;