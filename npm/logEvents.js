// if we need to install another npm package ot repo
// & we we have package-lock.json file but dont have the node_modules folder
// in the package, then we need to run 'npm install' command.

// 'npm update' to update all the dependencies
// 'npm init' used to create new dependencies
// 'npm uninstall <package name> used to uninstall the specific package
// whenever we need to install or uninstall dev-dependencies then we have to use '-D' at the end of the command

// 'npm run dev' to run nodemon

// "scripts": {
//     "start": "node index", // index.js will run
//     "dev": "nodemon index" 
// } :-> There can multiple scripts as start, dev (nodemon) & build script. 
//       We are running the applicatrion using script & it is used by server.

// "dependencies": {
//     "date-fns": "^2.29.3",
//     "uuid": "^9.0.0"
//  } :-> currently the project installed 'date-fns' & 'uuid' package

// "devDependencies": {
//     "nodemon": "^2.0.20"
//  } :-> nodemon is a dev dependecy

const { format } = require("date-fns");
const { v4: uuid, __esModule} = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message)=> {
    const dateTime = ''+format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logTime = ''+dateTime+'\n'+uuid()+'\n'+message;
    console.log(logTime);

    try {
        if(!fs.existsSync(path.join(__dirname, "logFiles"))) {
            await fsPromises.mkdir(path.join(__dirname, "logFiles"));
        }
        
        await fsPromises.appendFile(path.join(__dirname, "logFiles", "eventLog.txt"), logTime);
    }catch(err) {
        console.error(err);
    }
}

// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// console.log(uuid());
// console.log(uuid());

module.exports = logEvents;