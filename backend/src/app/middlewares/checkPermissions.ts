import { Request, Response, NextFunction } from 'express';
import config from '../settings/config'
import {default as UserM, IUser} from '../models/nosql/Users'
import {default as Users, IUserSQL} from '../models/sql/Users'
import {getRepository} from 'typeorm';
import {updateUser} from '../controllers/user'
import {customResponse} from '../apiRoutes/routes'



let db: 'sql' | 'mongo' = config.services.dbtype


export default async(req: Request, res: Response, next: NextFunction) => {
    
    console.log(req.body.username, "CHECK USERNAME ROLE")

    let user    


    if(db === 'mongo'){

        user = await UserM.findOne({ username: req.body.username });
        if (!user) return res.status(401).send(customResponse('Access Denied', 'Invalid User'));

    }

    if(db === 'sql'){
        
        const userRepository = getRepository(Users)
    
        try {
            user = await userRepository.findOneOrFail({ where: { username: req.body.username } });
        } 
        catch (error) {
            console.log('Access Denied', 'Invalid User')
            return res.status(401).send(customResponse('Access Denied', 'Invalid User'));            
        }
    }
        
    if (user.role === 'admin' && user.active === true){
        
        updateUser(req, res)
        //console.log("PERMISION MIDDLEWARE EXECUTED")
        //console.log(req.body, "REQUIRES FROM PERMISSIONS")      
    }    
    else {
            console.log( "error on permission")
            res.status(401).send(customResponse('Access Denied','Not allowed'))
    }
}    
