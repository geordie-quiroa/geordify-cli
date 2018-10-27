const packageJson = require('../package.json');

module.exports = (args) => {
  console.log('Geordify v.'+packageJson.version);
}
