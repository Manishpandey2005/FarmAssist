#!/bin/bash

echo "Starting FarmAssist Application..."
echo

echo "Installing dependencies..."
cd backend
pip install -r requirements.txt
cd ../frontend
npm install
cd ..

echo
echo "Starting MongoDB..."
mongod --fork --logpath /var/log/mongodb.log

echo
echo "Starting Backend Server..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

echo
echo "Starting Frontend Development Server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo
echo "All services started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait