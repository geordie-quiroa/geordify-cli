var chalk = require('chalk');
const menus = {
  main: `
    
    usage: ${chalk.cyan('geordify')} ${chalk.yellow('[command]')} ${chalk.cyan('<options>')}

    ${chalk.yellow('albums')} .............. displays the albums of the group/singer
    ${chalk.yellow('songs')} ............... displays the artist/group's songs
    ${chalk.yellow('graphic')} ......... draw the song's audio features in a horizontal bar graph.
    ${chalk.yellow('version')} ............ shows package version
    ${chalk.yellow('help')} ............... shows help menu for a command`,

  albums: `
    ${chalk.bgCyan('usage:')} ${chalk.cyan('geordify albums')} ${chalk.yellow('<options>')} ${chalk.cyan('"artist/group name"')}

    ${chalk.yellow('--singer')} || ${chalk.yellow('--artist')} || ${chalk.yellow('--a')}  ........ displays the singer's albums
    ${chalk.yellow('--band')} || ${chalk.yellow('--b')} || ${chalk.yellow('--group')}  ........... displays the group's albums
    `,
  songs: `
  ${chalk.bgCyan('usage:')} ${chalk.cyan('geordify songs')} ${chalk.yellow('<options>')} ${chalk.cyan('"artist/group name"')} ${chalk.green('<flags> (optional)')}

  ${chalk.bgYellow('                       ')} ${chalk.yellow.underline('Options')} ${chalk.bgYellow('                         ')}
  
    ${chalk.yellow('--artist')} || ${chalk.yellow('--a')} || ${chalk.yellow('--singer')} ${chalk.yellow('--s')} ........... displays the artist's songs
    ${chalk.yellow('--band')} || ${chalk.yellow('--b')} ....................................................... displays the group's songs

  ${chalk.bgGreen('                        ')} ${chalk.green.underline('Flags')} ${chalk.bgGreen('                           ')}
  
    ${chalk.green('Default (none)')} ................................. Just retrieve the singer/group's songs.
    ${chalk.green('--t')} || ${chalk.green('--top')} ................. retrieves the singer/group's top 10 songs > ${chalk.magenta('can specify country')}
    ${chalk.magenta('Default Country')} ............................... The default country is US (United States)
    ${chalk.magenta('--country')} ${chalk.gray('<country code>')} ....................... Next to it, write the country code ISO 3166-1 alpha-2
    
    ${chalk.bgMagenta('ISO 3166-1 alpha-2 country code examples:')}
        ${chalk.gray.inverse('Code')}               ${chalk.gray.inverse('Country')}
         ${chalk.gray('US')}                 ${chalk.gray('United States')}
         ${chalk.gray('AU')}                 ${chalk.gray('Australia')}
         ${chalk.gray('GT')}                 ${chalk.gray('Guatemala')}
         ${chalk.gray('CL')}                 ${chalk.gray('Chile')}
         ${chalk.gray('CL')}                 ${chalk.gray('Chile')}
         ${chalk.gray('IR')}                 ${chalk.gray('Iran')}
         ${chalk.gray('CH')}                 ${chalk.gray('Switzerland')}
         ${chalk.gray('IL')}                 ${chalk.gray('Israel')} 
  `,
  graphic: `
  ${chalk.bgCyan('usage:')} ${chalk.cyan('geordify graphic')} ${chalk.yellow('<options>')} ${chalk.cyan('"song name"')} ${chalk.green('<flags> (optional)')}

  ${chalk.bgYellow('                       ')} ${chalk.yellow.underline('Options')} ${chalk.bgYellow('                         ')}
  
    ${chalk.yellow('--t')} || ${chalk.yellow('--track')} ............................. the song´s track name and its graphic.

  ${chalk.bgGreen('                        ')} ${chalk.green.underline('Flags')} ${chalk.bgGreen('                           ')}
  
    ${chalk.green('Default (none)')} ................................. Just draw the song´s graphic with its parameters.
    ${chalk.green('--m')} || ${chalk.green('--meaning')} ............. displays the meaning of each audio parameter in the graphic.
  `
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main);
}
