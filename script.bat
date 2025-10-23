@echo off
setlocal EnableExtensions
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0export-src.ps1" %*
set ERR=%ERRORLEVEL%
if not "%ERR%"=="0" (
  echo [ERRORE] Uscita con codice %ERR%
  exit /b %ERR%
)
endlocal
