@echo off
title Francis and Linda wedding site
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then double-click this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing the site. This takes a minute or two the first time...
  call npm install
)
echo.
echo Starting the wedding site. Your browser will open http://localhost:1912 in a few seconds.
echo Keep this window open while you look at the site. Close it to stop.
echo.
start "" cmd /c "timeout /t 10 >nul & start http://localhost:1912"
call npm run dev
pause
