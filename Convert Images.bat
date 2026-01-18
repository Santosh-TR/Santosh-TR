@echo off
title PNG to AVIF Converter
color 0A
cls

echo.
echo ========================================
echo    PNG to AVIF Image Converter
echo ========================================
echo.
echo This tool converts PNG images to AVIF
echo (96%% smaller files!)
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo Starting converter...
echo.

node scripts\convert-images.js

echo.
echo ========================================
echo.
echo Press any key to close...
pause >nul
