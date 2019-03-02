import fs from "fs";
import path from 'path';

export default function cssBundler(cssPath) {
    console.debug(`Bundle files in ${cssPath}`);
    const bundleName = 'bundle.css';
    const banleFilePath = path.join(cssPath, bundleName);
    fs.readdir(cssPath, {withFileTypes: true}, (err, files) => {

        if (err) {
            console.log(`Error reading import dir: ${err}`);
            throw err;
        } else {
            let promise = Promise.resolve();
            for (const file of files) {
                if (file.isFile() && file.name.endsWith('.css') && file.name !== bundleName) {
                    console.log(`CSS file detected: ${file.name}`);
                    promise = promise
                        .then(() => fs.promises.readFile(path.join(cssPath, file.name))
                            .then(data => fs.promises.appendFile(banleFilePath, data)));
                }
            }
            promise.then(() => fs.promises.appendFile(banleFilePath,
                '.ngmp18 {\n' +
                '  background-color: #fff;\n' +
                '  overflow: hidden;\n' +
                '  width: 100%;\n' +
                '  height: 100%;\n' +
                '  position: relative;\n' +
                '}\n' +
                '\n' +
                '.ngmp18__hw3 {\n' +
                '  color: #333;\n' +
                '}\n' +
                '\n' +
                '.ngmp18__hw3--t7 {\n' +
                '  font-weight: bold;\n' +
                '}'));
        }
    });
}