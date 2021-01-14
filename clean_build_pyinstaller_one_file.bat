rmdir /Q /S dist\server_app
rmdir /Q /S build
pyinstaller --noconfirm app_onefile.spec
