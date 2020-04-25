import mongoose from 'mongoose'
import config from './config'
//import { ProcessEnvOptions } from 'child_process'

mongoose.connect(config.services.nosqldb, 
                { useNewUrlParser: true, 
                  useCreateIndex: true,
                  useFindAndModify: false,
                  useUnifiedTopology: true,                  
                })

.catch(error => console.log(error, "DATABASE CONNECT ERROR"))

mongoose.Promise = global.Promise;
const mongodb = mongoose.connection

export default mongodb