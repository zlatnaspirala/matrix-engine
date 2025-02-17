REM --------------------------------------------------------
REM Setup script for matrix-engine native builds for windows
REM --------------------------------------------------------

REM dotnet nuget locals all --list

@echo off
@REM setlocal enabledelayedexpansion

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

:found
@REM endlocal 

@REM set msBuildDir=C:\Program Files (x86)\MSBuild\14.0\Bin
SET mypath=%~dp0
echo %mypath:~0,-1%
set PROJECT=%mypath%multiplatform\win\cef-sharp
echo "Check packages..."
call cd %PROJECT%
echo %PROJECT%
@REM Standard win tool bitsadmin.exe https://www.nuget.org/downloads
@REM call bitsadmin.exe /transfer "nuget" https://dist.nuget.org/win-x86-commandline/latest/nuget.exe %PROJECT%\nuget.exe
call curl -k https://dist.nuget.org/win-x86-commandline/latest/nuget.exe -o nuget.exe
@REM call bitsadmin /create myDownloadJob
@REM call bitsadmin /addfile myDownloadJob https://dist.nuget.org/win-x86-commandline/latest/nuget.exe %PROJECT%\nuget.exe
@REM call bitsadmin /resume myDownloadJob
@REM call bitsadmin /info myDownloadJob /verbose
@REM call bitsadmin /complete myDownloadJob
@REM call bitsadmin.exe /transfer myDownloadJob /download /priority normal https://dist.nuget.org/win-x86-commandline/latest/nuget.exe nuget.exe

call nuget restore
call "%msBuildDir%\msbuild.exe" "%mypath%\multiplatform\win\cef-sharp\matrix-engine.sln" /p:Configuration=Release

PAUSE
