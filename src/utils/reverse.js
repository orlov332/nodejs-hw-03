export default function reverseStream(inStream, outStream) {

    inStream.setEncoding('utf8');

    let data = [];
    inStream.on('data', (chunk) => {
        data.push(chunk);
    });

    inStream.on('end', () => {
        writeReverse(data.length - 1)
    });

    function writeReverse(fromIndex) {
        if (fromIndex < 0)
            outStream.end();
        else if (outStream.write([...data[fromIndex]].reverse().join(''))) {
            writeReverse(--fromIndex);
        } else
            outStream.once('drain', () => writeReverse(fromIndex));
    }
}
