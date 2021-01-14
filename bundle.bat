::the nwjs folder must exists

::this builds the app with pyinstaller
call build_pyinstaller.bat

::this setups nwjs app
mkdir nwjs\server_app
xcopy /V /Y /E dist\server_app nwjs\server_app
mkdir nwjs\app_nwjs\
xcopy /V /Y /E app_nwjs nwjs\app_nwjs

::this makes a inno setup executable
call inno.bat