const fsPromises = require("fs").promises;
const path = require("path");

const fileOp = async ()=> {

    try {

        let data = await fsPromises.readFile(path.join(__dirname, "text", "rename.txt"), "utf-8");
        console.log(data);

        await fsPromises.unlink(path.join(__dirname, "text", "delete.txt"));
        await fsPromises.appendFile(path.join(__dirname, "text", "rename.txt"), "\n Thank You.");

        let newData = await fsPromises.readFile(path.join(__dirname, "text", "rename.txt"), "utf-8");
        console.log(newData);

    } catch(err) {
        console.error(err);
    }
}

fileOp();