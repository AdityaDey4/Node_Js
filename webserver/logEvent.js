const { format } = require("date-fns");
const { v4: uuid} = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName)=> {
    const dateTime = ''+format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logTime = ''+dateTime+'\t'+uuid()+'\t'+message+'\n';
    console.log(logTime);

    try {
        if(!fs.existsSync(path.join(__dirname, "logFiles"))) {
            await fsPromises.mkdir(path.join(__dirname, "logFiles"));
        }
        
        await fsPromises.appendFile(path.join(__dirname, "logFiles", logName), logTime);
    }catch(err) {
        console.error(err);
    }
}

module.exports = logEvents;