import {Schema, model, Document} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import config from '../settings/config'



export interface IUser extends Document{
    username: string,
    password: string,
    email: string,
    role: number,
    created: Date,
    updated: Date,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>,
    generateAccessToken(user: string): Promise<string>,
    generateRefreshToken(user: string): Promise<string>
    
}



//const schema = Schema
const userSchema = new Schema({

    username: {
        type: String, 
        minlength: 4, 
        maxlength: 12, 
        required: true, 
        lowercase: true,
        unique: true
    }, 
    password: {
        type: String, 
        minlength: 4, 
        maxlength: 150, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    role: {
        type: String, 
        enum: ['Admin', 'normal', 'privileged'],
        required: true,
        default: 'normal'
    },
    created: {
        type: Date, 
        default: Date.now()},
    updated: { 
        type: Date, 
        default: Date.now(), 
        required:true}
}
)

userSchema.methods.generateAccessToken = async function(user: string): Promise<string> { 
    console.log(user, "PARA FIRMAR ACCESS")
    const accessToken = await jwt.sign(
        { user: user }, config.tokens.accessSecret, {expiresIn: config.tokens.expireAccess}); //get the private key from the config file -> environment variable
    return accessToken;
  }

userSchema.methods.generateRefreshToken = async function(user: string): Promise<string> { 
    console.log(user, "PARA FIRMAR REFRESH")
    const refreshToken = await jwt.sign(
        { user: user }, config.tokens.refreshSecret, {expiresIn: config.tokens.expireRefresh}); //get the private key from the config file -> environment variable
    return refreshToken;
  }

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcryptjs.compareSync(password, this.password);
};
  

export default model<IUser>('users', userSchema)