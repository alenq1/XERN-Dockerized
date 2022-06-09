import {Schema, model, Document} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import config from '../../settings/config'


export interface IUser extends Document{
    username: string,
    password: string,
    email: string,
    role: string,
    active: boolean,
    created: Date,
    updated: Date,
    save(): any,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>,
    generateAccessToken(user: string, id: string): Promise<string>,
    generateRefreshToken(user: string, id: string): Promise<string>
    
}

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
        enum: ['admin', 'normal', 'privileged'],
        required: true,
        default: 'normal'
    },
    active:{
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date, 
        default: Date.now()
    },
    updated: { 
        type: Date, 
        default: Date.now(), 
        required:true
    }
})

userSchema.methods.generateAccessToken = async function(user: string, id: string): Promise<any> { 
    console.log(user, "to sign access")
    const accessToken = await jwt.sign(
        { user, id }, config.tokens.accessSecret, {expiresIn: config.tokens.expireAccess}); //get the private key from the config file -> environment variable
    return accessToken;
  }

userSchema.methods.generateRefreshToken = async function(user: string, id: string): Promise<any> { 
    console.log(user, "to sign request")
    const refreshToken = await jwt.sign(
        { user, id }, config.tokens.refreshSecret, {expiresIn: config.tokens.expireRefresh}); //get the private key from the config file -> environment variable
    return refreshToken;
  }

userSchema.methods.encryptPassword = async function(password: string): Promise<string> {
    const salt = await bcryptjs.genSaltSync(10);
    return await bcryptjs.hashSync(password, salt);
};


// userSchema.pre<IUser>('save', async function(next) {
//     var user = this;
//     console.log(user.password, "PASSWORD TO CHANGE")
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//     // generate a salt
//     await bcryptjs.genSalt(10, async function(err, salt) {
//      if (err) return next(err);
//      // hash the password using our new salt
//      await bcryptjs.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//      });
//     });
//    });


userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcryptjs.compareSync(password, this.password);
};

export default model<IUser>('Users', userSchema)