const shell = require('shelljs')

shell.exec(`zip -9 -r dist.zip dist/*`)
