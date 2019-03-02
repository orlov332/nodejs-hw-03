import fs from 'fs';

export default function outputFile(file, outStream) {
    const inStream = fs.createReadStream(file);
    inStream.pipe(outStream);
};