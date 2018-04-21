const fs = require('fs');
const { exec, spawn } = require('child_process');
const uuid = require('uuid');
const Exercise = require('./entities/exercise');

const invokeCompiler = (code, extension) => {
  const fileName = uuid();

  fs.writeFile(`${fileName}.${extension}`, code, err => {
    if (err) return console.log(err);
  });

  if (extension === 'c' || extension === 'cpp') {
    // if C gcc --Wall file.c -o program.o
    return new Promise((resolve, reject) => {
      // add .o

      exec(`g++ --std=c++11 ${fileName}.${extension} -o ${fileName}.o`, (err, stdout, stderr) => {
        if (err && err.signal !== null) {
          console.log('rejected');
          fs.unlink(`${fileName}.${extension}`);
          reject(err);
        }

        if (stderr) {
          resolve({fileName, failed: true, errors: stderr});
        } else {
          resolve({fileName, failed: false});
        }
      });
    });
  }
};

module.exports = {
  compile(code, extension) {
    return invokeCompiler(code, extension).then(result => {
      // add .o
      console.log(result);
      // this.deleteFiles(result.fileName, extension);
      return result;
    });
  },

  // compileAndRun(code, extension) {
  //   invokeCompiler(code, extension).then(fileName => {
  //     // console.log(fileName);
  //     // add .o

  //     exec(`${fileName}.o`, (err, stdout, stderr) => {
  //       this.deleteFiles(fileName, extension);
  //       if (stderr) {
  //         // return false | "string" ??
  //         console.log('deu erro');
  //         return;
  //       }
  //       console.log(stdout);
  //       return stdout;
  //     });
  //   }).catch(stderr => {
  //     // do something with stderr
  //   });
  // },

  compareCaseTest(code, extension, testCases) {
    return invokeCompiler(code, extension).then(fileName => {
      // console.log(fileName);
      // add .o
      const promises = testCases.map(testCase => new Promise((resolve, reject) => {
        const process = spawn(`${fileName}.o`);

        process.stdout.on('data', output => {
          output = output.toString();
          console.log(output);

          // console.log("Comparing", output, "with", testCase.output);
          resolve({
            testCase,
            output,
            result: output === testCase.output,
          });
        });

        process.stdin.write(testCase.input + '\n');
      }));

      return Promise.all(promises).then(result => {
        console.log(result);
        this.deleteFiles(fileName, extension);
      });
    });
  },

  deleteFiles(fileName, extension) {
    fs.unlink(`${fileName}.${extension}`);
    fs.unlink(`${fileName}.o`);
  },
};

// verificar qual entrada do caso de test

// compileAndRun(`#include <iostream> \nint main(){std::cout<<"5"; return 1;}`, 'cpp', [{in: 5, out: 7}]);

// compile(`#include <iostream> \n int main(){std::cout<<"5"; return 1;}`, 'cpp');

// compareCaseTest(`#include <iostream> \nint main(){std::cout<<"7"; return 1;}`, 'cpp', [{in: 6, out: 7}]);

// console.log(process.platform);
