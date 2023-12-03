REM set msBuildDir=%WINDIR%\Microsoft.NET\Framework\v2.0.50727
REM set msBuildDir=%WINDIR%\Microsoft.NET\Framework\v3.5
REM set msBuildDir=%WINDIR%\Microsoft.NET\Framework\v4.0.30319
REM set msBuildDir=C:\Program Files (x86)\MSBuild\12.0\Bin
set msBuildDir=C:\Program Files (x86)\MSBuild\14.0\Bin

SET mypath=%~dp0
echo %mypath:~0,-1%

call "%msBuildDir%\msbuild.exe" "%mypath%\multiplatform\win\cef-sharp\matrix-engine.sln" /p:Configuration=Release /l:FileLogger,Microsoft.Build.Engine;logfile=Manual_MSBuild_ReleaseVersion_LOG.log
