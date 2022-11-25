# Install script for directory: G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "C:/Program Files/cef")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/libcef_dll_wrapper/cmake_install.cmake")
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/third_party/cef/cef_binary_107.1.11+g26c0b5e+chromium-107.0.5304.110_windows64/tests/cefclient/cmake_install.cmake")
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/third_party/cef/cef_binary_107.1.11+g26c0b5e+chromium-107.0.5304.110_windows64/tests/cefsimple/cmake_install.cmake")
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/third_party/cef/cef_binary_107.1.11+g26c0b5e+chromium-107.0.5304.110_windows64/tests/gtest/cmake_install.cmake")
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/third_party/cef/cef_binary_107.1.11+g26c0b5e+chromium-107.0.5304.110_windows64/tests/ceftests/cmake_install.cmake")
  include("G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/examples/cmake_install.cmake")

endif()

if(CMAKE_INSTALL_COMPONENT)
  set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
file(WRITE "G:/web_server/xampp/htdocs/PRIVATE_SERVER/cpp-wrap/test-make-for-cpp/desktop/cef-win/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
