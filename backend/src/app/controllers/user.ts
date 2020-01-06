import {Request, Response} from 'express'
import User, {IUser} from '../models/users'
import {registerValidation, loginValidation, userValidation} from '../helpers/validateUsers'
import {customResponse} from '../apiRoutes/routes'
import config from '../settings/config'


export const register = async(req:Request, res:Response) => {
    
    const { error } = await registerValidation(req.body);
    if (error) return res.status(400).send(customResponse('Invalid Data', error));
    
    const userExists = await User.findOne({ email: req.body.email, $or: [{username: req.body.username}]});
    if (userExists) return res.status(400).send(customResponse('Error', 'user exists'));;
    
    try {   
        
        //const isRegistered =  User.find({username: req.body.username})
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            
        })

        newUser.password = await newUser.encryptPassword(newUser.password)
        const registerUser = await newUser.save()      
        res.status(201).send(customResponse(
            'Register Success', 
            `your user ${registerUser.username} has been registered`
        ))
        //console.log('USER REGISTER')

    } 
    catch (error) {
        res.status(500).send(customResponse('Register Error', error));
        console.log(error.stack, 'REGISTER USER ERROR')
    }
}

export const login = async (req:Request, res:Response) => {
    
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(customResponse('Login Failed', 'Invalid Data'));
    
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send(customResponse('Login Failed', 'User doesnt exists'));
    
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).send(customResponse('Login Failed', 'Invalid Password'));

    if (user.active === false) return res.status(403).send(customResponse('User Disabled', 'Please Contact with the Admin to activate your account'));
    
    const accessToken: string = await user.generateAccessToken(req.body.username, user.id)
    const refreshToken: string = await user.generateRefreshToken(req.body.username, user.id)
    // if want to work with cookie 
    res.cookie('tkcookie', accessToken, config.authCookie)
    const {username, id} = user
    //res.append('access-token', accessToken)
    //res.append('refresh-token', refreshToken)
    res.status(200).send(customResponse('Login Success',{username, id, accessToken, refreshToken}));
    //console.log(req.body, 'login sucess')

}


export const refreshToken = async (req:Request, res:Response) => {
    
    try {
        //console.log(req.body.user, "user from middleware with token dechipher")
        //const user = new User()
        const user = await User.findOne({ username: req.body.user });
        if (!user) return res.status(400).send(customResponse('Login Failed', 'User doesnt exists'));
        
        const accessToken = await user.generateAccessToken(req.body.user, user.id)
        //res.append('access-token', accessToken)
        res.status(200).send(customResponse('Token Generated', accessToken));
    } 
    catch (error) {
        res.status(401).send(customResponse('Token Error', error));
    }
}

export const listUsers = async (req:Request, res:Response) => {

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send(customResponse('Access Denied', 'User doesnt exists'));
    if (user.role === 'admin') {
    
        try {
        const all: IUser[] = await User.find()
        //const all = new exampleData()
        res.status(200).send(customResponse('ok', all));
        } 
    
        catch (error) {
        res.status(404).send(customResponse('error find users', error));
        }
    }

    else{
        res.status(403).send(customResponse('Access Denied', 'You are not allowed to access this page'));
   }
}


export const updateUser = async (req:Request, res:Response) => {

    //console.log(req.body, "BODY FROM MIDLEWARE VALIDATE UPADTE")
    
    const {rawdata} = req.body

    try {
        const toUpdate = await User.findByIdAndUpdate(req.params.id, 
            rawdata,
            {new: true})
        //console.log(toUpdate, "DATA MODIFIED")
        res.status(200).send(customResponse('updated', toUpdate))  
    }  
    catch (error) {
        console.log(error, "UPDATE ERROR")
        res.status(500).send(customResponse('error', error))
    }
}

export const userProfile = async(req: Request, res:Response): Promise<void>  => {

    //console.log(req.params, "get single")
    
    try {
        
        const data = await User.findOne({_id: req.params.id})
        res.status(200).send(customResponse('ok', [data]))    
    } 
    catch (error) {
        res.status(404).send(customResponse('error', error))
        
    }
}

export const deleteUser = async(req: Request, res:Response): Promise<void> => {

    //console.log(req.params, "delete")
    try {
      
        //const toDelete = await User.findByIdAndRemove(req.params.id)
        //console.log(toDelete, "DATA DELETED")
        res.status(404).send(customResponse('Option Disabled', 'Temporal maintenance disabled'))  
    } 
    catch (error) {
        res.status(500).send(customResponse('error', error))
      }
}


