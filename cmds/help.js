const menus = {
  main: `
    geordify [command] <options>

    albums .............. displays the albums of the group/singer
    songs
    version ............ shows package version
    help ............... shows help menu for a command`,

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
