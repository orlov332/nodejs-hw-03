import csv from 'csvtojson';
import fs from "fs";

export default function convertToFile(inFile) {
    csv()
        .fromFile(inFile)
        .then((jsonObj) => {
            fs.writeFile(inFile.replace(/(.*)\.csv$/, '$1.json'), JSON.stringify(jsonObj), (err) => {
                if (err) throw err;
            });
        });
};