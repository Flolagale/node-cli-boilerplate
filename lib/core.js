'use strict';

var _ = require('lodash');
var events = require('events');
var fs = require('fs');
var http = require('http');
var shell = require('shelljs');
var util = require('util');

var logger = require('./logger');

var Core = function () {
    events.EventEmitter.call(this);

    /* Set up the default options. */
    this.options = {
        port: 3000,
        tmp: '.tmp',
        logFile: null,
        verbose: false,
    };
};
util.inherits(Core, events.EventEmitter);

Core.prototype.start = function (options, callback) {
    var _this = this;

    options = options || {};
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }

    this.options = _.defaults(options, this.options);

    callback = callback || function () {};

    /* Create tmp dir if necessary. */
    if (!fs.existsSync(this.options.tmp)) {
        shell.mkdir('-p', this.options.tmp);
    }

    /* Log to a file if necessary. */
    if (this.options.logFile) {
        logger.setLogFile(this.options.logFile);
    }

    /* Set log level if necessary. */
    if (this.options.verbose) {
        logger.setLevel('verbose');
        logger.info('Log level set to verbose.');
    }


    http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n');
    }).listen(this.options.port, function (err) {
        if (!err) {
            logger.info('Core server listening on port ' + _this.options.port);
        } else {
            logger.error('Could not start server on port ' + _this.options.port + '.');
            if (_this.options.port < 1000) {
                logger.error('Ports under 1000 require root privileges.');
            }

            logger.error(err.message);
        }

        callback(err);
    });
};

module.exports = new Core();
