const fileSys = require('node:fs');
const {currentDate} = require('./date');

function makeDirectory() {
    fileSys.mkdir("./test", (err) => {
        console.log(err)
    });
}

function createATextFile() {
    fileSys.appendFileSync("./test/first.txt", "My First node js txt file" + currentDate(), {
        encoding: 'utf8'
    });
}

module.exports = {
    makeDirectory,
    createATextFile
};