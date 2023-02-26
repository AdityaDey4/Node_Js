const fs = require("fs");
const path = require("path");
console.log(__dirname);

fs.readFile(path.join(__dirname, "text", "text1.txt"), "utf8", (err, data)=> {

    if(err) console.error(err);
    console.log(data);
});

if(fs.existsSync(path.join(__dirname, "text", "delete.txt"))) {

    console.log(path.join(__dirname, "text", "delete.txt")+" present");
}

console.log("Hello World");

//UNCAUGHT ERROR
process.on('unCaughtException', err=> {
    console.error("There was an uncaught error, "+err);
    process.exit(1);
})
