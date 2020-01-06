import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from '../apiRoutes/routes'
import db from './database'
import { UI, setQueues } from 'bull-board'
import {newJobs} from '../helpers/queuelist'

//setQueues(Object.values(newJobs).map( single => {single.queue})  )
//const clientSession = require('client-sessions');
//const {SESSION_SECRET} = require('./config');

const app: express.Application = express();
app.set('trust proxy', 'loopback') // specify a single subnet
app.use(cors({
    origin: [
      //`${process.env.FRONT_URL}`,
      'http://localhost:3000',
    ],
    credentials: true
  }
))
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

// DATABASE CONNECTION
db.once('open', () => console.log('connected to database'))
db.on('error', (error) => console.error(error))

// app.use(
//   clientSession({
//     cookieName: 'session',
//     secret: SESSION_SECRET,
//     duration: 24 * 60 * 60 * 1000
//   })
// );
//

export default app