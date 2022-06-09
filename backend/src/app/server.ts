import app from './settings/app'
import config from './settings/config'

const server = app.listen(config.ports.serverPort, () => {

    console.log(`Example app listening on port ${config.ports.serverPort}!`)  
})

server.on('error', error =>{
  
    console.error(error, "Example app has an error")
    process.exit(1)
})
