const fs = require("fs");
const path = require("path");

fs.writeFile("./text/reply.txt", "Nice to meet you",(err)=> { // pathname , text, callback

    if(err) throw err;
    console.log("write complete");
});

fs.appendFile("./text/text2.txt", " Some text has been appended successfully.",(err)=> { // it will create a new file if the passed file does not exist.

    if(err) throw err;
    console.log("append complete");

    fs.rename(path.join(__dirname, "text", "text2.txt"), path.join(__dirname, "text", "rename.txt"), (err)=> {

        if(err) throw err;
        console.log("rename complete");
    });
});