REM --------------------------------------------------------
REM Setup script for matrix-engine native builds for windows
REM --------------------------------------------------------

@echo off
setlocal

REM Replace "toolname.exe" with the name of the executable you want to check
set "TOOL_NAME=msbuild.exe"

REM Check if the tool exists
where %TOOL_NAME% >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo %TOOL_NAME% is installed globaly.
) else (
    echo %TOOL_NAME% is not installed globaly.
)

endlocal

rem List of possible paths for msbuild.exe
set paths=("C:\Program Files (x86)\MSBuild\12.0\Bin" "C:\Program Files (x86)\MSBuild\14.0\Bin" "C:\Program Files\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin" "C:\Program Files\Microsoft Visual Studio\2022\Preview\MSBuild\Current\Bin" "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\MSBuild\Current\Bin" "C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\MSBuild\15.0\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2017\Enterprise\MSBuild\15.0\Bin" "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin" "C:\Windows\Microsoft.NET\Framework\v4.0.30319" "C:\Windows\Microsoft.NET\Framework\v4.0.30319" "C:\Windows\Microsoft.NET\Framework\v3.5" "C:\Windows\Microsoft.NET\Framework\v2.0.50727")

@rem Check each path for msbuild.exe
for %%p in %paths% do (
  if exist %%~dpnxp (
    echo msbuild.exe found in: %%~p
    set msBuildDir=%%~p
    set msbuild_path=%%~p
    goto :found
  )
)

echo "NOT FOUND"
goto :notFound

:found
echo ">%msBuildDir%<"
echo "You can use desktop-build.bat file now."

:notFound
PAUSE