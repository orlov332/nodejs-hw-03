import program from 'commander';
import reverse from './reverse';
import transform from './transform';
import outputFile from './output-file';
import convertFromFile from './convert-from-file';
import convertToFile from './convert-to-file';
import cssBundler from './css-bundler';

program
    .version('1.0.0', '-v, --version')
    .option('-a, --action <actionName>', 'Action to processing <reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler>',
        /^(reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler)$/i)
    .option('-f, --file <filePath>', 'File to process')
    .option('-p, --path <dir_path>', 'Path to process')
    .parse(process.argv);

function printErrorAndExit(message) {
    console.error(`Error: ${message}`);
    program.outputHelp();
    process.exit(1);
}

try {
    if (program.action)
        switch (program.action) {
            case 'reverse':
                reverse(process.stdin, process.stdout);
                break;
            case 'transform':
                transform(process.stdin, process.stdout);
                break;
            case 'outputFile':
                outputFile(program.file, process.stdout);
                break;
            case 'convertFromFile':
                convertFromFile(program.file, process.stdout);
                break;
            case 'convertToFile':
                convertToFile(program.file);
                break;
            case 'cssBundler':
                cssBundler(program.path);
                break;
        }
    else
        printErrorAndExit('There is no action specified.');
} catch (e) {
    printErrorAndExit(e.message);
}
process.on('uncaughtException', (e) => printErrorAndExit(e.message));
