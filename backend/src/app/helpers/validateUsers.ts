import Joi from '@hapi/joi'
import {IUser} from '../models/nosql/Users'
import {IUserSQL} from '../models/sql/Users'

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


export const userValidation = (data: IUser) => {
    const userSchema = Joi.object({
        username: Joi
            .string()
            .required(),
        active: Joi
            .boolean(),
        role: Joi
            .string()
            .valid('admin','privileged','normal'),
        password: Joi
            .string()
            .min(6),
        passwordConfirmation: Joi.any().valid(Joi.ref('password'))
    });
    return userSchema.validate(data);
};
