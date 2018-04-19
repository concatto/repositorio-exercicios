const fs = require("fs");
const { exec } = require("child_process");
const uuid = require('uuid');
var Promise = require('promise');

const _compile = (code, extension) => {

    const fileName = uuid();

    fs.writeFile(`${fileName}.${extension}`, code, (err) => {
        if (err) return console.log(err);
    })

    if ('c' === extension || 'cpp' === extension) {
       
        return new Promise((resolve, reject) => {
            //add .o
            console.log(`g++ --std=c++11 ${fileName}.${extension} -o ${fileName}`)
            exec(`g++ --std=c++11 ${fileName}.${extension} -o ${fileName}`, (err, stdout, stderr) => {
                if (err || stderr) {
                    console.log(stderr);
                    fs.unlink(`${fileName}.${extension}`);
                    return err;
                }
                resolve(fileName);
            });             
        });
    }
}

const compile = (code, extension) => {

    _compile(code, extension)
    .then( fileName => {
        //add .o
        deleteFiles(fileName, extension);
    }).catch(stderr => {
        //do something with stderr
    })
}

const compileAndRun = (code, extension, testCase) => {
    _compile(code, extension)
    .then(fileName => {
        console.log(fileName);
        //add .o
  
        exec(`${fileName}`, (err, stdout, stderr) => {
            if (err || stderr) {
                //return false | "string" ??                    
                return;
            }
            return stdout;
        })
        
    }).catch(stderr => {
        //do something with stderr
    })
}

const compareCaseTest = (code, extension, testCase) => {
    
    _compile(code, extension)
    .then(fileName => {
        console.log(fileName);
        //add .o
        testCase.forEach(value => {
            exec(`${fileName} ${value.in}`, (err, stdout, stderr) => {
                if (err) { return err; }
                if (stderr) { return stderr; }

                if (caseTestOut != result) {
                  return false;
                }
            })
        })

        deleteFiles(fileName, extension);
        return true;

    }).catch(stderr => {
        //do something with stderr
    })
}

const deleteFiles = (fileName, extension) => {
    fs.unlink(`${fileName}.${extension}`);
    fs.unlink(`${fileName}`);
}


//verificar qual entrada do caso de test

//compileAndRun(`#include <iostream> \nint main(){std::cout<<"5"; return 1;}`, 'cpp', [{in: 5, out: 7}]);

compile(`#include <iostream> \n int main(){std::cout<<"5"; return 1;}`, 'cpp');

module.exports =
    {
        compile
    }
