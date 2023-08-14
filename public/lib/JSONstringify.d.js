const fs = require('fs')
const chalk = require('chalk')

global.jssjdioapKKksHWHJSjajA = `Rs-XINN_CLAY`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})