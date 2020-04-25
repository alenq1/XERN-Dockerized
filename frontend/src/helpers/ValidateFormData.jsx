import * as Yup from 'yup'

const ValidateFormData = Yup.object({

     name: Yup.string()
          .min(4, 'Min 4 characters')
          .max(12, 'Max 12 Characaters')
          .required('Field Required'),

     price: Yup.number()
          .integer()
          .min(0, 'Min is Zero')
          .max(1000000, 'Max is 1000000')
          .required('price required'),
    //repeat_password: Yup.ref('password'),

     quantity: Yup.number()
          .integer()
          .min(0, 'Min is Zero')
          .max(1000, 'Max is 1000')   
          .required('quantity required'),
               
     description: Yup.string()
          .min(4, 'Min description is 4 characters')
          .max(300)

})

export default ValidateFormData