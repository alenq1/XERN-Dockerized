import 'reflect-metadata'
import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from '../apiRoutes/routes'
import mongodb from './mongodb'
import {sql} from './sql'
import {CreateAdmin} from '../models/AdminUser'
import { UI, setQueues } from 'bull-board'
import {newJobs} from '../helpers/queuelist'
import config from '../settings/config'


//setQueues(Object.values(newJobs).map( single => {single.queue})  )
//const clientSession = require('client-sessions');
//const {SESSION_SECRET} = require('./config');

const app: express.Application = express();
app.set('trust proxy', 'loopback') // specify a single subnet
app.use(cors(config.misc.corsOptions))
app.use(cookieParser())
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// MAIN ROUTES
app.use('/api/', routes)

//TASK JOBS BOARD
setQueues(Object.values(newJobs).map( job => job.queue))
app.use('/admin/queues', UI)


// app.use(
//   clientSession({
//     cookieName: 'session',
//     secret: SESSION_SECRET,
//     duration: 24 * 60 * 60 * 1000
//   })
// );
//

if (config.services.dbtype === 'mongo'){
// MONGODB DATABASE CONNECTION

    mongodb.once('open', () => {
        console.log('connected to MONGO database')
        CreateAdmin('mongo')
    })
    mongodb.on('error', (error) => {console.error(error, 'MONGO CONNECTION ERROR')})
}

///SQL CONNECTION
if (config.services.dbtype === 'sql'){
    sql.then( async connection => {
        console.log(`${connection.options.type} SQL CONNECTION is`, connection.isConnected)
        CreateAdmin('sql')
    })
        .catch( error => console.log(error, "SQL CONNECTION ERROR"))
    //
}


export default app