console.log("Hey I am Aditya Dey from West Bengal");
// console.log(global);

const os = require("os");
console.log(os.type());
console.log(os.version());
console.log(os.homedir()); // C:\Users\hp

const path = require("path");
console.log(path.dirname(__filename)); // C:\Users\hp\Documents\Node JS
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js
console.log(path.parse(__filename));

console.log(__dirname); // C:\Users\hp\Documents\Node JS
console.log(__filename); // C:\Users\hp\Documents\Node JS\server.js

const math = require("./math.js");

console.log(math.add(6, 3));
console.log(math.subtract(6, 3));
console.log(math.multiply(6, 3));
console.log(math.divide(6, 3));

const {add, subtract, multiply, divide} = require("./math.js"); // sequence does not matter, function name matter

console.log(add(6, 3));
console.log(subtract(6, 3));
console.log(multiply(6, 3));
console.log(divide(6, 3));