# Django & NW.js Template

Convert your django app, to a desktop app using nw-js(node-webki).

Only working for windows right now.



## How to use

### Setup

You need to have this apps registered on path, ready to use from `cmd`:

- 7z
- iscc (inno_setup bin folder)
- pyinstaller
- a python environment capable of running your django project (never has used the scripts from a virtual env, just globally, but this should not be difficult to accomplish).

You also need to tune up some files to adapt to your particular project, like:

- release.iss
- app.spec
- app_nwjs/index.html

Finally, you need to have a folder named `django_app` containing your django app(`manage.py`). And a folder `nwjs` containing a version of node-webkit (`nw.exe`).

### Building

Run `bundle.bat` or `bundle_7zipped.bat`.

## Permissions issues

The most usual problem is that the application requires a user to have write permissions to application folder. As on modern versions of Windows a user typically does not have write permissions to the `Program Files` folder, the application does not work.

Workarounds:

- (very bad) Set the executable of nwjs to start with admin privileges.

- (less bad) (Default) Or set this on inno_setup:

  ```
  [Dirs]
  Name: {app}; Permissions: users-full
  ```

- (not bad) Install the app to another path where there is no violation of the Windows guidelines .

