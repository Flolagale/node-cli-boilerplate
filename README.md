#node-cli-boilerplate

__A boilerplate for building node command line modules that run forever.__

Is a boilerplate for building node command line interface modules. Module based on this repo can be installed via ```npm install -g mymodule``` and used from the command line or required locally in an application.

The entry point is run-cli.js, which will run the cli.js file with [forever](https://github.com/nodejitsu/forever), restarting it when it crashes.

They come bundled with ```grunt lint``` and ```grunt test``` commands to either lint all the files or run the tests.
To run the tests, you will need to install the grunt-cli globally ```npm install -g grunt-cli```.

If you use it, feel free to improve it or report bugs here.
