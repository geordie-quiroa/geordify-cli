const minimist = require('minimist');


module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0] || 'help';
    console.log('Bienvenido a Geordify!');
    console.log(args);
    if (args.version || args.v) {
        cmd = 'version';
      }    
    
    if (args.help || args.h) {
        cmd = 'help'
    }
    
    switch (cmd){
        case 'sID':
            require('./cmds/sID')(args);
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
        default: 
            console.error(`"${cmd}" no es un comando valido...`);
            break
    }
  }
