import {default as UserM, IUser} from './nosql/Users'
import {default as Users, IUserSQL} from './sql/Users'
import {getRepository} from 'typeorm';
import config from '../settings/config'


export const CreateAdmin = async(dbtype: 'mongo' | 'sql') => {

    //console.log(config.adminCredentials.email, config.adminCredentials.username, "passed values to check admin")

    if (dbtype === 'mongo'){
        
        const AdminExists = await UserM.findOne({ email: config.adminCredentials.email, $or: [{username: config.adminCredentials.username}]});
        if (AdminExists) return console.info(`ADMIN USER ${AdminExists.username} ALREADY EXISTS`)
                
        const AdminUser: IUser = new UserM({
            username: config.adminCredentials.username,
            email: config.adminCredentials.email,
            password: config.adminCredentials.password,
            role: config.adminCredentials.role,
            active: config.adminCredentials.active
        })
        
        AdminUser.password = await AdminUser.encryptPassword(config.adminCredentials.password)
        
        try {
            const registerAdmin = await AdminUser.save()
            console.info(`ADMIN USER ${registerAdmin.username} WAS CREATED SUCESSFULLY`)
        } 
        catch (error) {
            console.error(error, 'ERROR ON CREATE ADMIN')
        }
    
    }
    


    if (dbtype === 'sql'){
        
        const AdminExists = await getRepository(Users).findOne({
            where: [
                { email: config.adminCredentials.email, username: config.adminCredentials.username}                
            ]
        })    
        //console.log(AdminExists, "ADMIN EXITS VARIABLE")
        if (AdminExists) return console.info(`ADMIN USER ${AdminExists.username} ALREADY EXISTS`)
    
        const AdminUser = await getRepository(Users).create({
            username: config.adminCredentials.username,
            email: config.adminCredentials.email,
            password: config.adminCredentials.password,
            role: config.adminCredentials.role,
            active: config.adminCredentials.active
        })
            
        AdminUser.password = await AdminUser.encryptPassword(config.adminCredentials.password)

        try {

            const registerAdmin = await getRepository(Users).save(AdminUser)
            console.info(`ADMIN USER ${registerAdmin.username} WAS CREATED SUCESSFULLY`)
        } 
        catch (error) {
            console.error(error, 'ERROR ON CREATE ADMIN')
        }

    }
}