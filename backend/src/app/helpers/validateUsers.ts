import Joi from '@hapi/joi'
import {IUser} from '../models/users'


export const registerValidation = (data: IUser) => {

 const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .max(12)
        .required(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    //repeat_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

return userSchema.validate(data);
}
// -> { value: { username: 'abc', birth_year: 1994 } }

export const loginValidation = (data: IUser) => {
    const userSchema = Joi.object({
        username: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};



