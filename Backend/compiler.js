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

const compileAndRun = (code, extension, testCase) => {
    _compile(code, extension)
    .then(fileName => {
         //console.log(fileName);
        exec(`${fileName}.o`, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            
            testCase.forEach(value => {
              //preencher coisa aqui
            })
          
            fs.unlink(`${fileName}.${extension}`);
            fs.unlink(`${fileName}.o`);
        })
       
    }).catch(stderr => {
        //do something with stderr
    })
}

const compareCaseTest = (testCase, result) => {
  //arrumar função comapare test
    if (testCase == result) {
      console.log("deu certo!", testCase)
      return true;
    }
    else {
      console.log("nap deu")
      return false;
    }
}


//verificar qual entrada do caso de test
compileAndRun(`#include <iostream> \n int main(){std::cout<<"Sua Mae"; return 1;}`, 'cpp', [{in: 5, out: 120}]);

module.exports =
    {
        compile
    }