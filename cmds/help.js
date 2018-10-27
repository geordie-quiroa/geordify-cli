var chalk = require('chalk');
const menus = {
  main: `
    
    usage: ${chalk.cyan('geordify')} ${chalk.yellow('[command]')} ${chalk.cyan('<options>')}

    ${chalk.yellow('albums')} .............. displays the albums of the group/singer
    ${chalk.yellow('songs')} ............... displays the artist/group's songs
    ${chalk.yellow('version')} ............ shows package version
    ${chalk.yellow('help')} ............... shows help menu for a command`,

  albums: `
    geordify albums <options>

    --name, -n ..... the group/singer's albums`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main);
}
