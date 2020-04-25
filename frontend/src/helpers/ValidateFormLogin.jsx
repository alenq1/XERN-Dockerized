import * as Yup from 'yup'

const ValidateFormLogin = Yup.object({
    
    username: Yup.string()
        .min(4, 'Min 4 characters')
        .max(12, 'Max 12 Characaters')
        .required('Field Required'),

    password: Yup.string()
        .min(6, 'Min is 6 Chars')
        .max(100, 'Max is 100 Chars')
        .required('Password Required'),
    //repeat_password: Yup.ref('password'),
    email: Yup.string()
        .email()


})

export default ValidateFormLogin