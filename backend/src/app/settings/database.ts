import mongoose from 'mongoose'
import config from './config'
//import { ProcessEnvOptions } from 'child_process'

mongoose.connect(config.services.db, 
                { useNewUrlParser: true, 
                  useCreateIndex: true,
                  useUnifiedTopology: true
                })

.catch(error => console.log(error, "DATABASE CONNECT ERROR"))

mongoose.Promise = global.Promise;
const db = mongoose.connection

export default db