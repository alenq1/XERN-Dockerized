import {Request, Response} from 'express'
import User, {IUser} from '../models/users'
import {registerValidation, loginValidation} from '../helpers/validateUsers'
import {customResponse} from '../apiRoutes/routes'


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
        console.log('USER REGISTER')

    } catch (error) {
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
    
    const accessToken = await user.generateAccessToken(req.body.username)
    const refreshToken = await user.generateRefreshToken(req.body.username)
    const {username} = user
    //res.append('access-token', accessToken)
    //res.append('refresh-token', refreshToken)
    res.status(200).send(customResponse('Login Success',{username, accessToken, refreshToken}));
    console.log(req.body, 'login sucess')

}


export const refreshToken = async (req:Request, res:Response) => {
    try {
        console.log(req.body.user, "USUARIO DEL MIDEWARE TOKEN DESCIFRADO")
        const user = new User()
        const accessToken = await user.generateAccessToken(req.body.user)
        //res.append('access-token', accessToken)
        res.status(200).send(customResponse('Token Generated', accessToken));
    } catch (error) {
        res.status(401).send(customResponse('Error', error));
    }
    
}

export const listUsers = async (req:Request, res:Response) => {

    try {
        const all: IUser[] = await User.find()
        //const all = new exampleData()

        res.status(200).send(customResponse('ok', all));
    } catch (error) {
        res.status(404).send(customResponse('error', error));
    }
    
}