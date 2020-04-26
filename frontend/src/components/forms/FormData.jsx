import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik';
import {Col, InputGroup, Button, Form} from 'react-bootstrap'
import ValidateFormData from '../../helpers/ValidateFormData'
import Swal from 'sweetalert2'
import {sources, StyleSettings} from '../../settings/config'
import styled from 'styled-components'


const StyledCreateButton = styled.div`

button {
  margin: 2% 35%;
  color: white;
  text-shadow: 1px 1px darkslategray;
  width: 150px;
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {
  margin: 1rem 7rem 1rem 1rem;
}
`
const StyledUpdateButton = styled.div`

button{
  margin: 2% 35%;
  color: white;
  text-shadow: 1px 1px darkslategray;
  width: 150px;
}

@media screen and (max-width: 550px) {
  margin: 1rem 7rem 1rem 1rem;
}
`

const CreateButton = () => {

  return(
  <StyledCreateButton>
    <Button 
      type="submit" 
      className='mt-3' 
      variant='success'     
    >
      Create
    </Button>
  </StyledCreateButton>)
}


const UpdateButton = () => {

  return(
  <StyledUpdateButton>
    <Button 
      type="submit" 

      variant='warning'        
    >
      Update
    </Button>
  </StyledUpdateButton>)
}



const FormData = ({data, fetchCrudApi, action, handleClose, idparam}) => {
  
    //console.log(data.email, "email value")
    //console.log(action, "action to execute")

    return (
      <Formik
        validationSchema={ValidateFormData}
        initialValues={data}
        onSubmit={
          (values, actions) => {
          
            if(action === 'post'){
              fetchCrudApi(sources.dataAdmin, action, values)
            //console.log(sources.datAdmin, action, values, "create action values")
              handleClose()
            }
            else if(action === 'patch'){
              fetchCrudApi(sources.dataAdmin+idparam, action, values)
            //console.log(sources.dataAdmin, action, values, "update action values")
              handleClose()
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: `The action ${action} is invalid`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }          
            //actions.setSubmitting(false);          
          }
        }
      >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>            
            <Form.Group controlId="validationFormikName">
              <Form.Label>Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ex Phone"
                  aria-describedby="inputGroupPrepend"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group  controlId="validationprice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
              />

              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationquantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                isInvalid={!!errors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationDescruption">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Ex Electronic Device"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          <Form.Group>            
          </Form.Group>
          {
            {
            'post': <CreateButton/>,
            'patch': <UpdateButton/>
            }[action]
          }
        </Form>
      )}
    </Formik>
    );
  };

export default FormData