# 🌾 FarmAssist - AI-Powered Farmer Support Platform

A comprehensive web application designed to support farmers with AI-powered tools for crop disease detection, fertilizer recommendations, weather forecasting, market prices, and community pest alerts.

## 🚀 Features

- **Disease Detection** - Upload leaf images for AI-powered disease identification
- **Fertilizer Recommendation** - Get personalized fertilizer suggestions based on soil parameters
- **Weather Forecast** - Real-time weather data with 7-day forecast for 6 cities
- **Market Prices** - Live mandi crop prices by city
- **Price Prediction** - ML-based crop price forecasting
- **Crop Suggestion** - Smart crop recommendations based on farm conditions
- **Government Schemes** - Information about farmer-friendly policies and subsidies
- **Farm News** - Latest agricultural news and updates
- **Pest Alerts** - Community-driven pest attack reporting with localStorage persistence

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript framework
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Python web framework
- **MongoDB** - NoSQL database
- **PyMongo** - MongoDB driver for Python
- **TensorFlow/Keras** - Deep learning for disease detection
- **Scikit-learn** - Machine learning for predictions

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (optional - uses mock data)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd agriculture
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install flask flask-cors flask-pymongo werkzeug jwt pillow tensorflow requests numpy
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🌟 Key Features

### 🔍 Disease Detection
- Upload leaf images for analysis
- Dynamic disease identification based on image properties
- Treatment recommendations for detected diseases

### 🌱 Fertilizer Recommendation
- Simplified form with essential crop parameters
- NPK recommendations based on crop type and growth stage
- Soil parameter optimization

### 🌤️ Weather Forecast
- Current weather for 6 major Indian cities
- 7-day weather forecast with temperature variations
- City-specific weather patterns

### 💰 Market Prices
- City-based mandi prices for major crops
- Real-time price changes and trends
- Support for wheat, rice, corn, cotton

### 🌾 Crop Suggestion
- Smart recommendations based on soil type and water availability
- Detailed crop information with investment and profit estimates
- Interactive crop details modal

### 🏛️ Government Schemes
- Comprehensive list of farmer-friendly schemes
- Categorized by subsidies, insurance, credit, technology
- Application details and contact information

### 📰 Farm News
- Latest agricultural news and updates
- Categorized by policy, market, technology, weather
- Trusted sources from government and research institutions

### 🚨 Pest Alerts
- Community-driven pest reporting system
- localStorage persistence for offline access
- Severity levels and location-based alerts

## 🔧 Configuration

### Environment Variables (Optional)
```env
SECRET_KEY=your-secret-key
MONGO_URI=mongodb://localhost:27017/agriculture
OPENWEATHER_API_KEY=your-api-key
```

## 📱 API Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /predict/leaf` - Disease detection from leaf images
- `POST /predict/crop` - Fertilizer recommendation
- `POST /predict/price` - Crop price prediction
- `GET /weather` - Weather information (supports ?forecast=true)
- `GET /market` - Market prices (supports ?city=CityName)
- `GET /alerts` - Pest alerts feed
- `POST /alerts` - Submit pest alert

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Render** - Use provided configuration
- **Heroku** - With Procfile support
- **Vercel** - For frontend deployment
- **Railway** - Full-stack deployment

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- MongoDB for database solutions
- TensorFlow and Scikit-learn communities
- React and Flask communities