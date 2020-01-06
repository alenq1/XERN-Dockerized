import { Request, Response, NextFunction } from 'express';
import config from '../settings/config'
import User, {IUser} from '../models/users'
import {updateUser} from '../controllers/user'
import {customResponse} from '../apiRoutes/routes'


export default async(req: Request, res: Response, next: NextFunction) => {
    
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send(customResponse('Access Denied', 'User doesnt exists'));
    if (user.role === 'admin'){
    updateUser(req, res)
        
            //console.log("PERMISION MIDDLEWARE")
        ///////////console.log(req.body, "REQUIRES FROM  PERMISSIONS")      
    }    
    else {
            console.log( "error on permission")
            res.status(401).send(customResponse('Access Denied','Not allowed'))
        }
    }    
  

