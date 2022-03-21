const fs = require('fs');
const chalk = require('chalk');

const mainFunction = (app, dir) => {
    const assets = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];

    assets.forEach(async(item) => {
        if (item.isDirectory()) {
            files = [
                ...files,
                ...mainFunction(app, `${dir}/${item.name}`)
            ]
        } else {
            files.push(item.name);
        };
    });

    files.forEach(async(item) => {
        app.get(`/${item.replace(/.html/, '')}`, async(req, res) => {
            res.sendFile(`${dir}/${item}`, { root: __dirname });
        });
    });

    console.log(`${chalk.green('!')} Following files were detected:`);
    console.log(files);

    return files;
};

module.exports = mainFunction;