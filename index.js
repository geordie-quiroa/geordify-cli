const minimist = require('minimist');
const chalk = require('chalk');


module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0] || 'help';
    console.log('\x1b[36m%s\x1b[0m',`
    ${chalk.bgYellow('                                                                                                          ')}
    ${chalk.bgYellow('  ')}                                                                                                      ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} /===========l  ll==========    ========   /========-     ||=====->>      ||  ||/////////  \\\\      // ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} ||             ||             ||      ||  ||       |=|   ||        >>        ||            \\\\    //  ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} ||  [======|l  ||=======      ||      ||  ||        |=|  ||         >>   ||  ||//////       \\\\  //   ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} ||         ||  ||             ||      ||  ||======|=|    ||          >>  ||  ||              \\\\//    ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} ||         ||  ||             ||      ||  ||       ||    ||         >>   ||  ||               ||     ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')} l===========l  ll==========    ========   ||         ||  ||=======->>    ||  ||               ||     ${chalk.bgYellow('  ')}
    ${chalk.bgYellow('  ')}                                                                                                      ${chalk.bgYellow('  ')}`);
    console.log(`    ${chalk.bgYellow('                                                                                                          ')}`);
    console.log(`
     ${chalk.bgCyan("Please wait a few seconds...")}
    `);
    console.log(args);
    if (args.version || args.v) {
        cmd = 'version';
      }    
    
    if (args.help || args.h) {
        cmd = 'help'
    }
    
    switch (cmd){
        case 'songs':
            if (!(args.band  || args.b || args.artist  || args.a || args.singer ||args.s) && args._.length <2){
                console.log(' ');
                console.log(`        ${chalk.bgRed('ERROR:')} ${chalk.red('Missing params or wrong option.')}`)
                require('./cmds/help')(args);
            } else if ( (args.band  || args.b || args.artist  || args.a || args.singer ||args.s)== true || (args._.length>1)) {
                console.log(' ');
                console.log(`  ${chalk.bgRed('ERROR:')} ${chalk.red('Missing ',chalk.yellow('<options>') ,' and ', chalk.yellow('artist/group'), 'name within')}  ${chalk.yellow('" "  (double or simple quotes)')}`);
                require('./cmds/help')(args);
            } else if (args.country == true) {
                console.log(' ');
                console.log(`  ${chalk.bgRed('ERROR:')} ${chalk.red('Missing ')} ${chalk.yellow('<country code>')}`);
                require('./cmds/help')(args);
            } else {
                require('./cmds/searchArtistSongs')(args);
            }
            break;
        case 'help':
            require('./cmds/help')(args);
            break;
        case 'version':
            require('./cmds/version')(args);
            break;
        case 'testAPI':
            require('./cmds/test')(args);
            break;
        case 'albums':
            if (!(args.singer || args.band || args.artist || args.a || args.b || args.group) && args._.length <2) {
                console.log(' ');
                console.log(`        ${chalk.bgRed('ERROR:')} ${chalk.red('Missing params or wrong option.')}`);
                require('./cmds/help')(args);
            } else if ((args.singer || args.band || args.artist || args.a || args.b || args.group) == true || (args._.length>1 )) {
                console.log(' ');
                console.log(`    ${chalk.red('ERROR: Missing ',chalk.yellow('<options>') ,' and/or ', chalk.yellow('artist/group'), 'name within')}  ${chalk.yellow('" "  (double or simple quotes)')}`);
                require('./cmds/help')(args);
            } else {
                require('./cmds/searchArtistAlbums')(args);
            }
            break;
        default: 
            console.error(`"${cmd}" no es un comando valido... ${chalk.yellow('Comandos validos')}:`);
            require('./cmds/help')(args);
            break
    }
  }
