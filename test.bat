
@echo off
setlocal 
call:vs%1 2>nul
if "%n%" == "" (
    echo Visual studio is not supported.
    exit /b
)
for /f "tokens=1,2*" %%a in ('reg query "HKLM\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7" /v "%n%.0" 2^>nul') do set "VSPATH=%%c"
if "%VSPATH%" == "" (
    echo Visual studio %1 is not installed on this machine
    exit /b
)

echo Visual studio %1 path is "%VSPATH%"

@echo OFF 
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x86
echo "Starting Build for all Projects with proposed changes"
echo .
devenv "multiplatform\win\cef-sharp\matrix-engine.sln" /build Debug
echo .
echo "All builds completed." 
pause

NEW
C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvarsall.bat

endlocal & exit /b

:vs2017
    set /a "n=%n%+1"
:vs2015
    set /a "n=%n%+2"
:vs2013
    set /a "n=%n%+1"
:vs2012
    set /a "n=%n%+1"
:vs2010
    set /a "n=%n%+10"



