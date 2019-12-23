import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import config from '../settings/config'
import {customResponse} from '../apiRoutes/routes'

export interface IPayload {
    id: string,
    user: string,
    iat: number,

}

export const validateAccessToken = async(req: Request, res: Response, next: NextFunction) => {

    try {

    console.log(req.cookies.tkcookie, "COOKIES FROM BROWSER")  
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    console.log(req.headers['access-token'], "from header access token")
    const accesstoken = <string>req.headers['access-token']
    //const accesstoken: any = req.headers['access-token']
    if (!accesstoken || accesstoken === undefined) return res.status(400).send(customResponse('error','no token gived'))
  
    const payload = await jwt.verify(accesstoken, config.tokens.accessSecret) as IPayload;
    req.body.username = payload.user
    console.log(payload, "access tokens validated")
    next()

    } 
    catch (error) {
        console.log(error, "error on token validation")
        res.status(401).send(customResponse('Access Denied',error.name))
    }    
  }

export const validateRefreshToken = async (req:Request, res:Response, next:NextFunction) => {
  
    try {
            
      console.log(req.headers['refresh-token'], "from header refresh token")
      const refreshToken = <string>req.headers['refresh-token']
        //const refreshToken: string = req.body.refreshToken
      console.log(refreshToken, "token refresh received")
      if (!refreshToken || refreshToken === undefined) return res.status(400).send(customResponse('error','no token gived'))
      //if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
      const payload: any = await jwt.verify(refreshToken, config.tokens.refreshSecret)
      console.log(payload, "token refresh decipher")
    //    if (err) return res.sendStatus(403)
      
      console.log(payload.user, "user on refresh for sign access token")
      req.body.user = payload.user
      next()
      //const user = new User()
      //const accessToken = user.generateAccessToken(payload.user)
      //  res.status(200).send({ accessToken: accessToken })
    } catch (error) {
      console.log(error, "error on token validation")
        res.status(401).send(customResponse('access denied','you are not authorized'))
    }
}