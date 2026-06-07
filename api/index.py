from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/api/predict/leaf', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
    
    diseases = [
        {'name': 'Healthy', 'confidence': 0.92, 'treatment': 'Continue current care practices'},
        {'name': 'Bacterial Blight', 'confidence': 0.87, 'treatment': 'Apply copper-based fungicide'},
        {'name': 'Leaf Spot', 'confidence': 0.83, 'treatment': 'Use neem oil spray'},
        {'name': 'Rust', 'confidence': 0.79, 'treatment': 'Apply sulfur-based fungicide'},
        {'name': 'Powdery Mildew', 'confidence': 0.85, 'treatment': 'Use baking soda spray'}
    ]
    
    image = Image.open(file.stream)
    avg_color = np.mean(np.array(image))
    
    if avg_color < 100:
        selected = diseases[3]
    elif avg_color < 150:
        selected = diseases[1]
    elif avg_color < 200:
        selected = diseases[2]
    else:
        selected = diseases[0]
        
    return jsonify({
        'disease': selected['name'],
        'confidence': selected['confidence'],
        'treatment': selected['treatment']
    })

@app.route('/api/predict/crop', methods=['POST'])
def recommend_fertilizer():
    return jsonify({
        'fertilizer': 'NPK',
        'dosage': '200-250 kg/hectare',
        'application_method': 'Apply as per soil test recommendations'
    })

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'Delhi')
    forecast = request.args.get('forecast', 'false') == 'true'
    
    base_weather = {
        'Delhi': {'temperature': 28, 'humidity': 65, 'description': 'partly cloudy', 'wind_speed': 3.2},
        'Mumbai': {'temperature': 32, 'humidity': 78, 'description': 'humid', 'wind_speed': 2.1},
        'Bangalore': {'temperature': 24, 'humidity': 58, 'description': 'pleasant', 'wind_speed': 1.8},
        'Chennai': {'temperature': 30, 'humidity': 72, 'description': 'hot', 'wind_speed': 2.5},
        'Kolkata': {'temperature': 29, 'humidity': 68, 'description': 'cloudy', 'wind_speed': 2.8},
        'Pune': {'temperature': 26, 'humidity': 55, 'description': 'clear', 'wind_speed': 2.0}
    }
    
    city_data = base_weather.get(city, base_weather['Delhi'])
    
    if forecast:
        forecast_data = []
        base_temp = city_data['temperature']
        
        for i in range(7):
            date = datetime.now() + timedelta(days=i)
            temp_variation = random.randint(-5, 5)
            forecast_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'day': date.strftime('%A'),
                'temperature': base_temp + temp_variation,
                'description': random.choice(['sunny', 'cloudy', 'rainy', 'partly cloudy']),
                'humidity': city_data['humidity'] + random.randint(-10, 10)
            })
        
        return jsonify({'city': city, 'forecast': forecast_data})
    
    return jsonify({**city_data, 'city': city})

@app.route('/api/market', methods=['GET'])
def get_market_prices():
    city = request.args.get('city', 'Delhi')
    
    city_prices = {
        'Delhi': {
            'wheat': {'price': 2100, 'change': '+50'},
            'rice': {'price': 3200, 'change': '-30'},
            'corn': {'price': 1800, 'change': '+20'},
            'cotton': {'price': 5500, 'change': '-100'}
        },
        'Mumbai': {
            'wheat': {'price': 2200, 'change': '+80'},
            'rice': {'price': 3400, 'change': '+20'},
            'corn': {'price': 1900, 'change': '+40'},
            'cotton': {'price': 5700, 'change': '+50'}
        }
    }
    
    prices = city_prices.get(city, city_prices['Delhi'])
    return jsonify({'prices': prices, 'unit': 'per quintal', 'city': city})

if __name__ == '__main__':
    app.run()
