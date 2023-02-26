const logEvents = require("./logEvent");

// Event Emitter declared in official documetation
const EventEmitter = require("events");
class Emitter extends EventEmitter {};
const myEmitter = new Emitter();

const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

myEmitter.on("log", (msg, fileName)=> logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, content_type, responce) => {

    try {

        const rawData = await fsPromises.readFile(
            filePath,
            !content_type.includes('image')? "utf-8": "");

        const data = content_type==='application/json'?JSON.parse(rawData):rawData;

        responce.writeHead(
            filePath.includes("404.html")?404: 200, 
            {"Content-Type": content_type});
        // 200: all is ok, sreve the data to server

        responce.end(
            content_type==='application/json'? JSON.stringify(data):data
        );
    } catch(err) {
        console.log(err);
        myEmitter.emit("log", err.name+': '+err.message, "errLog.txt");
        responce.statusCode = 500;
        //500: error in server
        responce.end();
    }
}

const server = http.createServer((req, res)=> {
    // console.log(req.url+' '+req.method);

    myEmitter.emit("log", req.url+'\t'+req.method, "reqLog.txt");

    const extension = path.extname(req.url);
    let content_type;

    switch(extension) {

        case '.css':
            content_type = "text/css";
            break;

        case '.js':
            content_type = "text/javascript";
            break;

        case '.json':
            content_type = "application/json";
            break;

        case '.jpg':
            content_type = "image/jpeg";
            break;

        case '.png':
            content_type = "image/png";
            break;

        case '.txt':
            content_type = "text/plain";
            break;

        default:
            content_type = "text/html"
    }

    let filePath = 
        content_type === 'text/html' && req.url === '/'
            ? path.join(__dirname, "views", 'index.html')
            : content_type === 'text/html' && req.url.slice(-1) === '/' //  req.url.slice(-1): last character of url
                ? path.join(__dirname, "views", req.url, "index.html") // sub directory needed
                : content_type === 'text/html'
                    ? path.join(__dirname, "views", req.url)
                    : path.join(__dirname, req.url); // may be other folder requested

    
    if(!extension && req.url.slice(-1) !== '/') {
        filePath+=".html";
    }

    const fileExist = fs.existsSync(filePath);
    if(fileExist) {
        serveFile(filePath, content_type, res);
    }else {
        // console.log(path.parse(filePath));
        // path.parse(filePath): shows related file/folder with details

        switch(path.parse(filePath).base) {

            case 'biology.html':
                res.writeHead(301, {"Location": "/check.html"});
                //301: redirect
                res.end();
                break;

            case 'math.html':
                res.writeHead(301, {"Location": '/myPage.html'}); 
                res.end();
                break;

            default:
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        }
    }
});

server.listen(PORT, ()=> {
    console.log("Server running on port "+PORT);
});





// const server = http.createServer((req, res)=> {
//     console.log(req.url+' '+req.method);

//     let filePath;

//     if(req.url === '/' || req.method == 'GET') {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/html");

//         filePath = path.join(__dirname, "views", "index.html");
//         fs.readFile(filePath, "UTF-8", (err, data)=> {
//              res.end(data); // sending the data only
//         })
//     }
// });