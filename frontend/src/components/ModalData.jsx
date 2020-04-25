import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import styled from 'styled-components';


export const useModal = () =>{

    const [show, setShow] = useState(false);
    const [data, setData] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    

return {show,  handleShow, handleClose, setData, data}
}


const style={

  title:{
    background: 'linear-gradient(to bottom, rgba(82,82,82,1) 0%, rgba(46,46,46,1) 1%, rgba(97,97,97,1) 12%, rgba(110,110,110,1) 25%, rgba(77,77,77,1) 39%, rgba(20,20,20,1) 73%, rgba(31,31,31,1) 91%, rgba(46,46,46,1) 98%, rgba(20,20,20,1) 100%)',
    color: 'white'
  },

  body: {
    position: 'relative',
    zIndex: '2',
    background: 'linear-gradient(to bottom, rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%)',
  },

  svg: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    color: '#28a745',
    top: '0',
    zIndex: '-1',
    margin: '-4rem 0rem 0rem 24rem'
  }
}


const StyledModal = styled.div`

position: relative;


`


export const ModalData = ({children, show, handleClose, title}) => ReactDOM.createPortal (

      <StyledModal>
        <Modal show={show} onHide={()=> handleClose()} centered>
          <Modal.Header style={style.title} closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={style.body}>
            {children}
          </Modal.Body>          
        </Modal>
      </StyledModal>
      , document.body
  
) 

export const ModalContent = ({data}) => {
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}
