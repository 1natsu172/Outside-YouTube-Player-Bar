const shell = require('shelljs')
const version = require('../dist/manifest.json').version

const fileName = `Outside-YouTube-Player-Bar-${version}`

shell.exec(`zip -9 -r packages/${fileName}.zip dist/*`)
