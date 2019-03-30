var fs = require("fs");
module.exports = function(data) {
    
    var url = data.url;
    var staticDir = (data.staticDir == undefined) ? "" : data.staticDir;
    var response = data.response;
    
    if(url === "/") {
        fs.readFile(staticDir + "/index.html", function (error, data) {
            if (error) console.error("I can not find the base file: '/index.html'");
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
            console.log("Loaded: '/index.html'");
        })
    }
    else if (url != "/favicon.ico") {
        fs.readFile( staticDir + url, function (error, data) {
            if(error) console.error("I can't load this file: '" + url + "' no such file or directory");
            else {
                response.writeHead(200, { 'Content-Type': getMIMEtype(url) });
                response.write(data);
                response.end();
                console.log("Loaded: '" + url + "'");
            }
        })
    }
}

function getMIMEtype(url) {
    url = url.split(".");
    var extension = url[url.length - 1];
    switch (extension) {
        case "css":
            return 'text/css';
        case "js":
            return 'application/javascript';
        case "jpg": case "jpeg":
            return 'image/jpeg';
        case "png":
            return 'image/png';
        case "txt": case "json":
            return 'text/plain';
        case "xml": case "dae":
            return 'text/xml';
        case "mp3":
            return 'audio/mpeg';
    }
}