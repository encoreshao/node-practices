// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l');
const colors = require('colors/safe');

// Working with log levels
async function info(msg) {
  return output(colors.green(msg));
}

async function debug(msg) {
  return output(colors.yellow(msg));
}

async function warn(msg) {
  return output(colors.blue(msg));
}

async function error(msg) {
  return output(colors.red(msg));
}

async function unknown(msg) {
  return output(colors.magenta(msg));
}

async function output(msg) {
  console.log(msg);
}

module.exports = {
  info: info,
  debug: debug,
  error: error,
  warn: warn,
  unknown: unknown
};
