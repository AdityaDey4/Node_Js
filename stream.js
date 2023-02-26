// stream is used to pass a large amount of data bucket by bucket not all at once.

const fs = require("fs");

const rs = fs.createReadStream("./text/stream_read.txt", "utf-8");
const ws = fs.createWriteStream("./text/stream_write.txt");

rs.on("data", (dataChunk)=> {
    ws.write(dataChunk);
});

// rs.pipe(ws); // easy way