import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import config from '../../settings/config'



export interface IUserSQL{
    username: string,
    password: string,
    email: string,
    role: string,
    active: boolean,
    created: Date,
    updated: Date,
    encryptPassword(password: string): Promise<string>,
    validatePassword(password: string): Promise<boolean>,
    generateAccessToken(user: string, id: string): Promise<string>,
    generateRefreshToken(user: string, id: string): Promise<string>
    
}



export enum UserRole {
    ADMIN = "admin",
    NORMAL = "normal",
    PRIVILEGED = "privileged"
}

@Entity("Users")
export default class Users{

    @PrimaryGeneratedColumn("uuid")
    _id!: string;

    @Column({type: "varchar", length: 12, unique: true})
    username!: string;

    @Column()
    password!: string;

    @Column({type: "varchar", length: 150, unique: true})
    email!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.NORMAL
    })
    role!: UserRole;

    @Column({type: "boolean", default: false})
    active!: boolean;

    async generateAccessToken(user: string, id: string): Promise<any> { 
        console.log(user, "to sign access")
        const accessToken = await jwt.sign(
            { user, id }, config.tokens.accessSecret, {expiresIn: config.tokens.expireAccess}); //get the private key from the config file -> environment variable
        return accessToken;
    }
    
    async generateRefreshToken(user: string, id: string): Promise<any> { 
        console.log(user, "to sign request")
        const refreshToken = await jwt.sign(
            { user, id }, config.tokens.refreshSecret, {expiresIn: config.tokens.expireRefresh}); //get the private key from the config file -> environment variable
        return refreshToken;
    }
    
    async encryptPassword(password: string): Promise<string> {
        const salt = await bcryptjs.genSaltSync(10);
        return await bcryptjs.hashSync(password, salt);
    };
    
    async validatePassword(password: string): Promise<boolean> {
        return await bcryptjs.compareSync(password, this.password);
    };

}