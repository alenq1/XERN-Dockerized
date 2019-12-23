import app from './settings/app'
import config from './settings/config'

app.listen(config.ports.serverPort, (err) =>
  {
  if(err){
    console.log(err)
    process.exit(1);
    return;
  }  
    console.log(`Example app listening on port ${config.ports.serverPort}!`)
  
  }
);
