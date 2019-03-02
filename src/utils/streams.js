import program from 'commander';
import reverse from './reverse';
import transform from './transform';

program
    .version('1.0.0', '-v, --version')
    .option('-a, --action <actionName>', 'Action to processing <reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler>',
        /^(reverse|transform|outputFile|convertFromFile|convertToFile|cssBundler)$/i)
    .option('-f, --file <filePath>', 'File to process')
    .option('-p, --file <path>', 'Path to process')
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
                break;
            case 'convertFromFile':
                break;
            case 'convertToFile':
                break;
            case 'cssBundler':
                break;
        }
    else
        printErrorAndExit('There is no action specified.');
} catch (e) {
    printErrorAndExit(e.message);
}
