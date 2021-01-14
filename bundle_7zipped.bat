::the nwjs folder must exists

::this builds the app with pyinstaller
call build_pyinstaller.bat

::this zips the app_nwjs
call zip_app.bat

::this setups nwjs app
xcopy /V /Y /E dist\* nwjs\

::this makes a inno setup executable
call inno.bat