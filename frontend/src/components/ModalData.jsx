import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Modal, Button} from 'react-bootstrap'


export const useModal = () =>{

    const [show, setShow] = useState(false);
    const [data, setData] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    

return {show,  handleShow, handleClose, setData, data}
}

const style={

  title:{
    backgroundColor: 'black',
    color: 'white'
  }
}


export const ModalData = ({children, show, handleClose, title}) => ReactDOM.createPortal (

      <>
        <Modal show={show} onHide={()=> handleClose()} centered>
          <Modal.Header style={style.title} closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
      </>
      , document.body
  
 ) 

export const ModalContent = ({data}) => {
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
