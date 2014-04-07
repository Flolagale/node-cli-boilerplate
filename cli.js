#!/usr/bin/env node
'use strict';

var logger = require('./lib/logger');
var program = require('commander');

/* Here come the core module of your command line app. Change this to something
 * that really suit your needs. */
var core = require('./lib/core');

var pkg = require('./package.json');

program.version(pkg.version)
    .option('-p, --port <n>', 'The port to which the server should listen to. Default to 3000.', parseInt)
    .option('-l, --log-file [file path]', "The log file path. Default to './.tmp/" + pkg.name + ".log'.")
    .option('--verbose', 'Set the logging level to verbose.');

/* Hack the argv object so that commander thinks that this script is called
 * 'pkg.name'. The help info will look nicer. */
process.argv[1] = pkg.name;
program.parse(process.argv);

logger.info(pkg.name + ' v' + pkg.version);
core.start({
    port: program.port || 3000,
    logFile: program.logFile || './.tmp/' + pkg.name + '.log',
    verbose: program.verbose,
}, function (err) {
    if (err) process.exit(1);

    if (core.options.logFile) logger.info('Log file: ' + core.options.logFile);
});
