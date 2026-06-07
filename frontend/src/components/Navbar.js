import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="text-xl font-bold">
            🌾 FarmAssist
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
            <Link to="/disease-detection" className="hover:text-green-200">Disease Detection</Link>
            <Link to="/fertilizer" className="hover:text-green-200">Fertilizer</Link>
            <Link to="/pest-alerts" className="hover:text-green-200">Pest Alerts</Link>
            <button onClick={handleLogout} className="hover:text-green-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;