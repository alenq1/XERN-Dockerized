import * as Yup from 'yup'

const ValidatePasswordChange = Yup.object({

     password: Yup.string()
          .min(6, 'Min is 6 Chars')
          .max(100, 'Max is 100 Chars')
          .required('Password Required'),
     passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default ValidatePasswordChange