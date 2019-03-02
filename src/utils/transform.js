import through2 from 'through2';

export default function transform(inStream, outStream) {

    const ts = through2(function (chunk, enc, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    });

    inStream.pipe(ts).pipe(outStream);
};