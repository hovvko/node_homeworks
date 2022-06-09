const fs = require('fs');
const pathR = require('path');

function dirChanger(path) {

    fs.readdir(path, (err, files) => {

        if (err) {
            console.log(err)
        }

        if (files.length === 0) {

            fs.stat(path, (err1, stats) => {

                if (err1) {
                    return console.log(err1)
                }

                if (stats.isFile()) {

                    fs.rename(path, `./main/${files}`, err2 => {

                    })
                } else {
                    dirChanger(pathR.normalize(`${path}/${files}`))

                }
            })
        }

        for (const file of files) {

            fs.stat(pathR.normalize(`${path}/${file}`), (err1, stats) => {

                if (err1) {
                    return console.log(err1)
                }

                if (stats.isFile()) {

                    console.log(`${path}/${file}`, 'from if')
                    fs.rename(pathR.normalize(`${path}/${file}`), `./main/${file}`, err2 => {

                        if (err2) {
                            return console.log(err2)
                        }

                    });
                } else {

                    console.log(`${path}/${file}`, 'from else')
                    dirChanger(pathR.normalize(`${path}/${file}`))
                }
            })
        }
    })
}

dirChanger('./main');


