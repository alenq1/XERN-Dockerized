import mongoose from 'mongoose'
import config from './config'
//import { ProcessEnvOptions } from 'child_process'

//console.log(config.services.db, "CONFIG")


mongoose.connect(config.services.db, 
                { useNewUrlParser: true, 
                  useCreateIndex: true,
                  useUnifiedTopology: true
                })

.catch(error => console.log(error, "CONNECT ERROR"))
mongoose.Promise = global.Promise;

const db = mongoose.connection


export default db