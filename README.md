# Django & NW.js Template

Only working for windows right now.



## How to use

You need to tune up some files to adapt to your particular project, like:

- release.iss
- app.spec
- app_nwjs/index.html

Also, you need to have a folder named `django_app` containing your django app(`manage.py`). And a folder `nwjs` containing a version of node-webkit.

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

