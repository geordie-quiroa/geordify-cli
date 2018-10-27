var chalk = require('chalk');
const menus = {
  main: `
    
    usage: ${chalk.cyan('geordify')} ${chalk.yellow('[command]')} ${chalk.cyan('<options>')}

    ${chalk.yellow('albums')} .............. displays the albums of the group/singer
    ${chalk.yellow('songs')} ............... displays the artist/group's songs
    ${chalk.yellow('version')} ............ shows package version
    ${chalk.yellow('help')} ............... shows help menu for a command`,

  albums: `
    usage: ${chalk.cyan('geordify albums')} ${chalk.yellow('<options>')} ${chalk.cyan('"artist/group name"')}

    ${chalk.yellow('--singer')} || ${chalk.yellow('--n')} || ${chalk.yellow('--artist')}..... the singer's albums
    ${chalk.yellow('--band')} || ${chalk.yellow('--n')} || ${chalk.yellow('--artist')}..... the singer's albums
    `,
  songs: `
    usage: ${chalk.cyan('geordify albums')} ${chalk.yellow('<options>')}

    ${chalk.yellow('--singer')} || ${chalk.yellow('--n')} || ${chalk.yellow('--artist')}..... the singer's albums
    ${chalk.yellow('--band')} || ${chalk.yellow('--n')} || ${chalk.yellow('--artist')}..... the group's albums
  `
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main);
}
