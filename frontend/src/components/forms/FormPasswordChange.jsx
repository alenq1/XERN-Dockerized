import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import {Col, InputGroup, Button, Form} from 'react-bootstrap'
import ValidatePasswordChange from '../../helpers/ValidatePasswordChange'
import Swal from 'sweetalert2'
import {sources} from '../../settings/config'


const FormPasswordChange = ({data, formType, fetchCrudApi, id}) => {

    return (
      <Formik
        initialValues={data}
        validationSchema={ValidatePasswordChange}
        onSubmit={
          (values, {resetForm}) => {
            
            if(formType === 'change password'){
              fetchCrudApi(`${sources.UsersUrl}${id}`, 'patch', values)
            //console.log(`${sources.UsersUrl}${id}`, 'patch', values, "Register values")
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: `ACTION FALIED ON ${formType}`,
                icon: 'error',
                confirmButtonText: 'OK'
              })
              resetForm()
            }              
              //actions.setSubmitting(false);
          }
                  
        }
      >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        touched,
        isValid,
        errors,
      }) => (
        
        
        <Form noValidate onSubmit={handleSubmit}>    
            <Form.Group  controlId="validationFormikPassword">              
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationFormikpasswordConfirm">
              <InputGroup>
            
                <Form.Control
                  type="password"
                  placeholder="Password Confirmation"
                  aria-describedby="inputGroupPrepend"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <center><Button type="submit">{formType}</Button></center>
        </Form>
      )}
    </Formik>
    );
  };

export default FormPasswordChange