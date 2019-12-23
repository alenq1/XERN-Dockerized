import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import config from '../settings/config'
import {customResponse} from '../apiRoutes/routes'

export interface IPayload {

    user: string,
    iat: number
}

export const checkPermissions = async(req: Request, res: Response, next: NextFunction) => {

    try {

    console.log(req, "REQUIRES FROM  PERMISSIONS")  
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    //console.log(req.headers['access-token'], "from header access token")
    //const accesstoken = <string>req.headers['access-token']
    //const accesstoken: any = req.headers['access-token']
    //if (!accesstoken || accesstoken === undefined) return res.status(400).send(customResponse('error','no token gived'))
  
    //const payload = await jwt.verify(accesstoken, config.tokens.accessSecret) as IPayload;
    //req.body.username = payload.user
    //console.log(payload, "access tokens validated")
    
    next()

    } 
    catch (error) {
        console.log(error, "error on token validation")
        res.status(401).send(customResponse('Access Denied',error.name))
    }    
  }

