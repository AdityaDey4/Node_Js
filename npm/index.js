const logEvents = require("./logEvents");


// Event Emitter declared in official documetation
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

//add listener
myEmitter.on("log", (msg)=> {
    logEvents(msg);
});

setTimeout(()=> {
    myEmitter.emit("log", "log event emitted");
}, 5000);