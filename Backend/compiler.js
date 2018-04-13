const fs = require("fs");
const { exec } = require("child_process");
const uuid = require('uuid');
var Promise = require('promise');

const _compile = (code, extension) => {
    if ('c' === extension || 'cpp' === extension) {
        const fileName = uuid();

        fs.writeFile(`${fileName}.${extension}`, code, (err) => {
            if (err) return console.log(err);

        })

        return new Promise((resolve, reject) => {
            exec(`g++ ${fileName}.${extension} -o ${fileName}.o`, (err, stdout, stderr) => {
                if (err) {
                    console.log(stderr);
                    fs.unlink(`${fileName}.${extension}`);
                    return stderr;
                }
                resolve(fileName);
            });             
        });
    }
}

const compile = (code, extension) => {

    _compile(code, extension)
    .then( fileName => {
        fs.unlink(`${fileName}.${extension}`);
        fs.unlink(`${fileName}.o`);
    }).catch(stderr => {
        //do something with stderr
    })
}

const compileAndRun = (code, extension) => {
    _compile(code, extension).then(fileName => {
         console.log(fileName)
        exec(`${fileName}.o`, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            fs.unlink(`${fileName}.${extension}`);
            fs.unlink(`${fileName}.o`);
        })
    }).catch(stderr => {
        //do something with stderr
    })
}

compileAndRun(`#include <iostream> \n int main(){std::cout<<"Hello, world!"<<std::endl; return 1;}`, 'cpp');

module.exports =
    {
        compile
    }