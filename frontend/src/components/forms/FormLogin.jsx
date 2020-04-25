import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import {Col, InputGroup, Button, Form} from 'react-bootstrap'
import ValidateFormLogin from '../../helpers/ValidateFormLogin'
import Swal from 'sweetalert2'
import {sources} from '../../settings/config'


const FormLogin = ({data, formType, action}) => {

    //console.log(data.email, "email value")
    //console.log(action, "action to execute")
    //console.log(formType, "form type")

    return (
      <Formik
        initialValues={data}
        validationSchema={ValidateFormLogin}
        onSubmit={
          (values, {resetForm}) => {
                        
            if(formType === 'login'){
              action(sources.LoginUrl, 'post', values)
              //console.log(sources.LoginUrl, 'post', values, "Login Values")
            }
            else if(formType === 'register'){
              action(sources.RegisterUrl, 'post', values)
              resetForm()
              //console.log(sources.RegisterUrl, 'post', values, "Register values")
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: `ACTION FALIED ON ${formType}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              resetForm()
            }                    
              //{resetForm}.setSubmitting(false);
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
            <Form.Group controlId="validationFormikUsername">
              
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