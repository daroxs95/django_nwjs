var path = require('path');
let dir_to_nw_exe = path.dirname(process.execPath); //check if this only works for windows
var subpy = require('child_process').spawn(dir_to_nw_exe + '/server_app/server', ['runserver'], { detached: false }); //shell option does not work on windows 8S
var http = require('http');
var tree_kill = require('tree-kill');

const options = {
    hostname: "localhost",
    port: 8000,
    method: 'HEAD'
};

const max_tries = 10; //max tries checking if server is alive
let try_number = 1; //number of current try
let main_app_open = false; //true if main windows is opened
let loading_windows = null; //will hold instance of loading windows
let main_windows = null; //will hold instance of main windows

//get logic out of this function, and start reusing request, thus avoid recreating variable and a new request every time,
function try_connect() {
    const req = http.request(options, (res => {
        if (res.statusCode >= 200 && res.statusCode < 300) { //dont know much of status codes, fix later on
            open_app();
            loading_windows.close();
        } else {
            console.log("server error, status code: " + res.statusCode);
        }
    }));

    req.on("error", (err) => {
        try_number = try_number + 1;
        //alert(err);
        console.log("Error: ", err.message);
        if (!main_app_open) {
            if (try_number <= max_tries) try_connect();
            else {
                alert("no se encuentra servidor en la direccion por defecto, probablemente no se haya iniciado correctamente.");
                loading_windows.close();
            }
        } else {
            console.log("Main windows is already opened");
            loading_windows.close();
        }
    });

    req.end();
};


function open_app() {
    main_app_open = true; //set main windows status as opened
    // Create a new window and get it
    nw.Window.open('http://localhost:8000', { "position": "center", "width": 800, "height": 600, "new_instance": true, "focus": true }, function(main_win) {
        main_windows = main_win; //seting main_win global
        main_win.maximize();
        // And listen to new window's focus event
        main_win.on('focus', function() {
            console.log('Turquino window is focused');
        });

        main_win.on('close', function() {
            console.log('Turquino window is close');
            tree_kill(subpy.pid, 'SIGINT', function(err) {
                console.log('Server was killed');
                main_win.close(true);
            });
            //alert(process.kill(-subpy.pid));
        });
    });
};


//open loading windows
nw.Window.open('index.html', { "position": "center", "width": 400, "height": 400, "icon": "icon.png", "frame": false, "new_instance": true, "focus": true }, function(load_windows) {
    loading_windows = load_windows;
    // And listen to new window's focus event
    load_windows.on('focus', function() {
        console.log('loading');
    });

    load_windows.on('closed', function() {
        console.log('done loading');
        //load_windows.close();
    });
});


try_connect();

//somewhere the try_connect is executing double, the duplicated request to server throws Error: Parse Error: Expected HTTP/, this is if the firs request was unsuccessful