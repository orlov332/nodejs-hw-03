import csv from 'csvtojson';
import fs from "fs";

export default function convertFromFile(file, outStream) {
    const inStream = fs.createReadStream(file);
    inStream.pipe(csv()).pipe(outStream);
};