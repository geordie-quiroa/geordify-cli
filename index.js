const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    console.log('Bienvenido a Geordify!');
    console.log(args);
  }
