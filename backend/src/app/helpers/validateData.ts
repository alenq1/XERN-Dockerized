import Joi from '@hapi/joi'
import {IExample} from '../models/nosql/exampleData'
import {IExampleSQL} from '../models/sql/exampleData'

export const dataValidation = (data: IExample) => {

     const dataSchema = Joi.object({
          name: Joi.string()
               .alphanum()
               .min(4)
               .max(12)
               .required(),

          price: Joi.number()
               .integer()
               .min(0)
               .max(1000000)
               .required(),
       //repeat_password: Joi.ref('password'),

          quantity: Joi.number()
               .integer()
               .min(0)
               .max(1000)   
               .required(),

          description: Joi.string()
               .alphanum()
               .min(4)
               .max(300),

   // the fields below are additional for every request, on create or update for log activity, 
   //ex: identifiying who perform these actions

          username: Joi.string()
               .alphanum()
               .min(4)
               .max(12),

          _id: Joi.string()
               .alphanum()

     })

return dataSchema.validate(data);

}