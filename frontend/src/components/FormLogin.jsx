import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import {Col, InputGroup, Button, Form} from 'react-bootstrap'
import ValidateFormLogin from '../helpers/ValidateFormLogin'
import Swal from 'sweetalert2'
import {sources} from '../settings/config'




const FormLogin = ({data, formType, action}) => {

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    //console.log(data.email, "VALOR DE eMAIL")
    //console.log(formType, "TYPO DE FORM")
    console.log(action, "ACCION a EJECUTA/r")

    return (
      <Formik
      validationSchema={ValidateFormLogin}
      onSubmit={
        (values, actions) => {
          
            
          if(formType === 'login'){
          action(sources.LoginUrl, 'post', values)
          console.log(sources.LoginUrl, 'post', values, "VALORES PARa LOGIN")
          }
          else if(formType === 'register'){
            action(sources.RegisterUrl, 'post', values)
          console.log(sources.RegisterUrl, 'post', values, "VALORES PARa REGISTER")
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: `ACTION FALIED ON ${formType}`,
              icon: 'error',
              confirmButtonText: 'OK'
            })
            actions.handleReset()
          }
                    
            //actions.setSubmitting(false);
        }
                
        }
      initialValues={data}
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
            <Form.Group controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup>
            
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {formType === 'register' ?
            <Form.Group controlId="validationFormikEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
                : null
            }

            <Form.Group  controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
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
            <center><Button type="submit">{formType}</Button></center>
        </Form>
      )}
    </Formik>
    );
  };

export default FormLogin