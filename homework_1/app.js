const fs = require('fs');

const sortFiles = (oldPath, newPath, gender) => {
    fs.readdir(oldPath, (err, files) => {

        if (err) {
            console.log(err);
            return err;
        }

        for (const file of files) {
            fs.readFile(`${oldPath}/${file}`, (err1, data) => {

                if (err1) {
                    console.log(err1);
                    return err1;
                }

                if (data.toString().includes(`gender: '${gender}'`)) {

                    fs.rename(`${oldPath}/${file}`, `${newPath}/${file}`, err2 => {

                        if (err2) {
                            console.log(err2)
                        }

                    })
                }
            })
        }
    });
}

sortFiles('./boys', './girls', 'female');
sortFiles('./girls', './boys', 'male');
