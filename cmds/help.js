var chalk = require('chalk');
const menus = {
  main: `
    
    usage: ${chalk.cyan('geordify')} ${chalk.yellow('[command]')} ${chalk.cyan('<options>')}

    ${chalk.yellow('albums')} .............. displays the albums of the group/singer
    ${chalk.yellow('songs')} ............... displays the artist/group's songs
    ${chalk.yellow('version')} ............ shows package version
    ${chalk.yellow('help')} ............... shows help menu for a command`,

  albums: `
    ${chalk.bgCyan('usage:')} ${chalk.cyan('geordify albums')} ${chalk.yellow('<options>')} ${chalk.cyan('"artist/group name"')}

    ${chalk.yellow('--singer')} || ${chalk.yellow('--artist')} || ${chalk.yellow('--a')}  ........ the singer's albums
    ${chalk.yellow('--band')} || ${chalk.yellow('--b')} || ${chalk.yellow('--group')}  ........... the singer's albums
    `,
  songs: `
  ${chalk.bgCyan('usage:')} ${chalk.cyan('geordify songs')} ${chalk.yellow('<options>')} ${chalk.cyan('"artist/group name"')} ${chalk.green('<flags> (optional)')}

  ${chalk.bgYellow('                       ')} ${chalk.yellow.underline('Options')} ${chalk.bgYellow('                         ')}
  
    ${chalk.yellow('--artist')} || ${chalk.yellow('--a')} || ${chalk.yellow('--singer')} ${chalk.yellow('--s')} ..... the singer's songs
    ${chalk.yellow('--band')} || ${chalk.yellow('--b')} .length...................................................... the group's songs

  ${chalk.bgGreen('                        ')} ${chalk.green.underline('Flags')} ${chalk.bgGreen('                           ')}
  
    ${chalk.green('Default (none)')} ................................. Just retrieve the singer/group's songs.
    ${chalk.green('--t')} || ${chalk.green('--top')} ................. retrieves the singer/group's top 10 songs > ${chalk.magenta('can specify country')}
    ${chalk.magenta('Default Country')} ............................... The default country is US (United States)
  `
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main);
}
