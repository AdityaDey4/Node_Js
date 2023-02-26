const fs = require("fs");

if(!fs.existsSync("./newDir")) { // checking newDir is present or not

    fs.mkdir("./newDir", (err)=> { // create newDir (folder)

        if(err) console.error(err);
        console.log("Directory Created");
    });
}else console.log("Directory already exist");

fs.rmdir("./newDir2", (err)=>{
    if(err) console.log("Directory does not exist");
});