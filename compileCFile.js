const fs = require("fs");
const {exec} = require("child_process");

const fileName = "helloWrite";

fs.readFile("helloRead.c", (err, data) => {
  if(err) return console.log(err);

  fs.writeFile(`${fileName}.c`, data, (err) => {
    if(err) return console.log(err);

  })

  exec(`gcc ${fileName}.c -o ${fileName}.o`, (err, stdout, stderr) => {
    if(err){
        console.log(stderr);
        return exec(`rm ${fileName}.c`);
    }

    //console.log(stdout);

    exec(`./${fileName}.o`, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      exec(`rm ${fileName}.c`);
      exec(`rm ${fileName}.o`);
    })

  });

});
