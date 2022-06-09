import {Request, Response} from 'express'
import {default as UserM, IUser} from '../models/nosql/Users'
import {default as Users, IUserSQL} from '../models/sql/Users'
import {getRepository} from 'typeorm';
import {registerValidation, loginValidation, userValidation} from '../helpers/validateUsers'
import {customResponse} from '../apiRoutes/routes'
import config from '../settings/config'


let db: 'sql' | 'mongo' = config.services.dbtype
console.log(db, "CURRENT DB SERVICE")


export const register = async(req:Request, res:Response) => {
    
    //console.log(req.body, "FORM DATA FOR REGISTER")

    //COMMON VALIDATION
    const { error } = await registerValidation(req.body);
    
    if (error) {
        console.log(error, "ERROR VALIDATING REGISTER DATA")
        return res.status(400).send(customResponse('Invalid Data', 'ERROR VALIDATING REGISTER DATA'))
    }
    
    if (db === 'mongo'){

        //MONGO
        const userExists = await UserM.findOne({ email: req.body.email, $or: [{username: req.body.username}]});
        if (userExists) return res.status(400).send(customResponse('Error', 'user error'));

        try {
            
            const isRegistered =  UserM.find({username: req.body.username})
            const newUser: IUser = new UserM({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                
            })

            newUser.password = await newUser.encryptPassword(newUser.password)

            
            const registerUser = await newUser.save()

            console.log(registerUser, "USUARIO REGISTRADO")


            res.status(201).send(customResponse(
                'Register Success', 
                `your user ${newUser.username} has been registered`
            ))
            console.log('USER REGISTER')


        } catch (error) {
            res.status(500).send(customResponse('Register Error', error));
            console.log(error.stack, 'REGISTER USER ERROR')
        }

        //END MONGO METHOD
    }
    
    
    if (db === 'sql') {

        //SQL
    
        try {
            const userExists = await getRepository<Users>("Users").find({
                where: [
                    { email: req.body.email },
                    { username: req.body.username }
                ]
            })
        } catch (error) {
            console.log(error, "ERROR FIND USER TO REGISTER")
            return res.status(400).send(customResponse('Error', 'user error'));
        }
            
        try {   
            
            //SQL
            const newUser = await getRepository<Users>("Users").create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                
            })

            newUser.password = await newUser.encryptPassword(newUser.password)

            const registerUser = await getRepository<Users>("Users").save(newUser)
            console.log(registerUser, "USUARIO REGISTRADO")
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
        //END SQL METHOD
        
    }
}


export const login = async (req:Request, res:Response) => {
    
    //COMMON VALIDATION
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(customResponse('Login Failed', 'Invalid Data'));
    
    if (db === 'mongo') {
        
        const user = await UserM.findOne({ username: req.body.username });
        if (!user) return res.status(400).send(customResponse('Login Failed', 'User or password error'));
        
        const correctPassword = await user.validatePassword(req.body.password);
        
        if (!correctPassword) return res.status(400).send(customResponse('Login Failed', 'User or password error'));
        if (user.active === false) return res.status(403).send(customResponse('User Disabled', 'Please Contact with the Admin to activate your account'));

        const accessToken: string = await user.generateAccessToken(req.body.username, user.id)
        const refreshToken: string = await user.generateRefreshToken(req.body.username, user.id)
        const {username, _id} = user
        
        // if want to work with cookies 
        /////res.cookie('tkcookie', accessToken, config.authCookie)
        /////res.append('access-token', accessToken)
        ////res.append('refresh-token', refreshToken)
        
        res.status(200).send(customResponse('Login Success',{username, _id, accessToken, refreshToken}));
        console.log(req.body, 'login sucess')

    //END MONGO METHOD

    }
    
    if (db === 'sql') {
        //SQL
    const userRepository = getRepository<Users>("Users")
    let user: Users
    try {
        user = await userRepository.findOneOrFail({ where: { username: req.body.username } });
    } catch (error) {
        return res.status(400).send(customResponse('Login Failed', 'User or password error'));
    }
        
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).send(customResponse('Login Failed', 'User or password error'));
    if (user.active === false) return res.status(403).send(customResponse('User Disabled', 'Please Contact with the Admin to activate your account'));

    
    const accessToken: string = await user.generateAccessToken(req.body.username, user._id)
    const refreshToken: string = await user.generateRefreshToken(req.body.username, user._id)

    // if want to work with cookies 
    //res.cookie('tkcookie', accessToken, config.authCookie)
    //res.append('access-token', accessToken)
    //res.append('refresh-token', refreshToken)
    const {username, _id} = user
    
    res.status(200).send(customResponse('Login Success',{username, _id, accessToken, refreshToken}));
    //console.log(req.body, 'login sucess')

    //END SQL METHOD
    }
    

}


export const refreshToken = async (req:Request, res:Response) => {
    
        //console.log(req.body.user, "user from middleware with token decipher")

    try {
        
        if (db === 'mongo') {
            //MONGO
            //const user = new User()
            const user = await UserM.findOne({ username: req.body.user });
            if (!user) return res.status(400).send(customResponse('Login Failed', 'Invalid User'));
            ///
            const accessToken = await user.generateAccessToken(req.body.user, user._id)
            //res.append('access-token', accessToken)
            res.status(200).send(customResponse('Token Generated', accessToken));
        }
        
        if (db === 'sql') {
            //SQL
        const userRepository = getRepository<Users>("Users")
        let user: Users
        try {
            user = await userRepository.findOneOrFail({ where: { username: req.body.user } });
        } catch (error) {
            return res.status(400).send(customResponse('Login Failed', 'Invalid User'));
        }

        const accessToken = await user.generateAccessToken(req.body.user, user._id)
        //res.append('access-token', accessToken)
        res.status(200).send(customResponse('Token Generated', accessToken));
        // END SQL     
        }
        
        
        
    } 
    catch (error) {
        res.status(401).send(customResponse('Token Error', error));
    }
}


export const listUsers = async (req:Request, res:Response) => {

    //MONGO
    if (db === 'mongo') {
        const user = await UserM.findOne({ username: req.body.username });
        if (!user) return res.status(401).send(customResponse('Access Denied', 'Invalid User'));

        if (user.role === 'admin' && user.active === true) {
        
            try {
            
                const all: IUser[] = await UserM.find()        
                res.status(200).send(customResponse('ok', all));

            } 
        
            catch (error) {

                res.status(404).send(customResponse('error find users', error));

            }
        }
        
        else{
            
            res.status(403).send(customResponse('Access Denied', 'You are not allowed to access this page'));
        
        }

        //END MONGO

    }
    
    if (db === 'sql') {
        
        const userRepository = getRepository<Users>("Users")
        let user: Users
        user = await userRepository.findOneOrFail({ where: { username: req.body.username } });
        
        if (!user) return res.status(401).send(customResponse('Access Denied', 'Invalid User'));
        
        
        if (user.role === 'admin' && user.active === true) {
        
            try {
            
                const all = await getRepository<Users>("Users").find()
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
}


export const updateUser = async (req:Request, res:Response) => {

    //console.log(req.body, "BODY FROM MIDLEWARE VALIDATE UPADTE")
    
    const {rawdata} = req.body
    
    if (db === 'mongo') {
        
        try {
            //MONGO
            const toUpdate: any = await UserM.findByIdAndUpdate(req.params.id, 
                rawdata,
                {new: true})

            const { _id, username, email, role, active} = toUpdate
            res.status(200).send(customResponse('updated', { _id, username, email, role, active}))  
            console.log(toUpdate, "DATA MODIFIED")
            
        } 
        catch (error) {
            console.log(error, "UPDATE ERROR")
            res.status(500).send(customResponse('error', error))
        }
    }
    
    if (db === 'sql') {
        
        try {
    
            //SQL
            const userRepository = getRepository<Users>("Users")
            let user: Users
            user = await userRepository.findOneOrFail(req.params.id);
            userRepository.merge(user, rawdata)
            const toUpdate = await userRepository.save(user)
            const { _id, username, email, role, active} = toUpdate
            //
            //console.log(toUpdate, "DATA MODIFIED")
    
            res.status(200).send(customResponse('updated', {_id, username, email, role, active}))  
        }  
        catch (error) {
            console.log(error, "UPDATE ERROR")
            res.status(500).send(customResponse('error', error))
        }
    }
}

export const userProfile = async(req: Request, res:Response): Promise<void>  => {

    //console.log(req.params, "get single")

    if (db === 'mongo') {
        try {
            
            const data = await UserM.findOne({_id: req.params.id})
            res.status(200).send(customResponse('ok', [data]))    

        } catch (error) {
            res.status(404).send(customResponse('error', error))
        }

    }
    
    if (db === 'sql') {
        try {
            
            const userRepository = getRepository<Users>("Users")
            let data: Users
            data = await userRepository.findOneOrFail(req.params.id);
            res.status(200).send(customResponse('ok', [data]))

        } 
        catch (error) {
            
            res.status(404).send(customResponse('error', error))
            
        }        
    }
}

export const deleteUser = async(req: Request, res:Response): Promise<void> => {

    //console.log(req.params, "delete")
    
    if (db === 'mongo') {
        try {
            //MONGO
            const toDelete = await UserM.findByIdAndRemove(req.params.id)
            console.log(toDelete, "DATA DELETED")
            //res.status(404).send(customResponse('Option Disabled', 'Temporal maintenance disabled'))  
            res.status(204).send(customResponse('Deleted', `User ${toDelete} has been deleted`))  

        } catch (error) {
            res.status(500).send(customResponse('error', error))
        }
        
    }

    if (db === 'sql') {
        try {

            const userRepository = getRepository<Users>("Users")
            let user: Users
            const toDelete = await userRepository.delete(req.params.id)
        
            //console.log(toDelete, "DATA DELETED")
            //res.status(404).send(customResponse('Option Disabled', 'Temporal maintenance disabled'))  
            res.status(204).send(customResponse('Deleted', `User ${toDelete} has been deleted`))  
        } 
        catch (error) {
            res.status(500).send(customResponse('error', error))
        }        
    }    
}
