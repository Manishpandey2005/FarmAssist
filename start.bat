@echo off
echo Starting FarmAssist Application...
echo.

echo Installing dependencies...
cd backend
pip install -r requirements.txt
cd ..\frontend
call npm install
cd ..

echo.
echo Starting MongoDB (make sure MongoDB is installed)...
start "MongoDB" mongod

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && python app.py"

echo.
echo Starting Frontend Development Server...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo All services started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause