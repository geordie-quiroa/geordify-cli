const minimist = require('minimist');
const chalk = require('chalk');


module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0] || 'help';
    console.log('\x1b[36m%s\x1b[0m',`
      /===========l  ll==========    ========   /========-     ||=====->>      ||  ||/////////  \\\\      // 
      ||             ||             ||      ||  ||       |=|   ||        >>        ||            \\\\    //
      ||  [======|l  ||=======      ||      ||  ||        |=|  ||         >>   ||  ||//////       \\\\  //
      ||         ||  ||             ||      ||  ||======|=|    ||          >>  ||  ||              \\\\//
      ||         ||  ||             ||      ||  ||       ||    ||         >>   ||  ||               || 
      l===========l  ll==========    ========   ||         ||  ||=======->>    ||  ||               ||
    `);
    console.log( '\x1b[33m%s\x1b[0m', `     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
    console.log(args);
    if (args.version || args.v) {
        cmd = 'version';
      }    
    
    if (args.help || args.h) {
        cmd = 'help'
    }
    
    switch (cmd){
        case 'songs':
            require('./cmds/searchArtistSongs')(args);
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
            if (!(args.singer || args.band || args.artist || args.a || args.b) && args._.length <2) {
                console.log(' ')
                console.log(`${chalk.red('    ERROR: Missing params.')}`)
                require('./cmds/help')(args);
            } else if ((args.singer || args.band || args.artist || args.a || args.b) == true || (args._.length>1)) {
                console.log(' ');
                console.log(`    ${chalk.red('ERROR: Missing ',chalk.yellow('<options>') ,' and ', chalk.yellow('artist/group'), 'name within')}  ${chalk.yellow('" "  (double or simple quotes)')}`);
                require('./cmds/help')(args);
            } else {
                require('./cmds/searchArtistAlbums')(args);
            }
            break;
        default: 
            console.error(`"${cmd}" no es un comando valido...`);
            break
    }
  }
