import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import config from '../settings/config'
import {customResponse} from '../apiRoutes/routes'

export interface IPayload {

    user: string,
    iat: number
}


export const validateAccessToken = async(req: Request, res: Response, next: NextFunction) => {

    try {
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    console.log(req.headers['access-token'], "VIENE DE HEADERS ACCESS")
    const accesstoken = <string>req.headers['access-token']
    //const accesstoken: any = req.headers['access-token']
    if (!accesstoken || accesstoken === undefined) return res.status(400).send(customResponse('error','no token gived'))
  
    const payload = await jwt.verify(accesstoken, config.tokens.accessSecret) as IPayload;
    req.body.username = payload.user
    console.log(payload, "TOKEN ACCESO VALIDADO")
    next()

    } catch (error) {
        console.log(error, "ERROR VALIDANDO TOKEN ACESO")
        res.status(401).send(customResponse('Access Denied',error.name))
    }
    
  }


export const validateRefreshToken = async (req:Request, res:Response, next:NextFunction) => {
  
try {
    
    
    console.log(req.headers['refresh-token'], "VIENE DE HEADERS REFRESH")
    const refreshToken = <string>req.headers['refresh-token']
    //const refreshToken: string = req.body.refreshToken
  console.log(refreshToken, "SE RECIBE TOKEN REFRESH")
  if (!refreshToken || refreshToken === undefined) return res.status(400).send(customResponse('error','no token gived'))
  //if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  const payload: any = await jwt.verify(refreshToken, config.tokens.refreshSecret)
  console.log(payload, "TOKEN REFRESH DECIFRADO")
//    if (err) return res.sendStatus(403)
  
  console.log(payload.user, "USUARIO EN EL REFRESH PARA FIRMAR EL DE ACCESS")
  req.body.user = payload.user
  next()
  //const user = new User()
  //const accessToken = user.generateAccessToken(payload.user)
  //  res.status(200).send({ accessToken: accessToken })
} catch (error) {
  console.log(error, "ERROR VALIDANDO TOKEN REFRESH")
    res.status(401).send(customResponse('access denied','you are not authorized'))
}
  
  

}