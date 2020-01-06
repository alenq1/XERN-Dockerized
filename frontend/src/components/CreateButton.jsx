import React, {memo} from 'react'
import {Button} from 'react-bootstrap'
import {FaPlusSquare} from 'react-icons/fa'

const CreateButton = ({handleShow, setAction}) => {

    const style =  {

        margin: 20, //marg        
        btnCreate: {
            //marginLeft: '50%',
            //marginRight: '50%'
            marginLeft: '47%',             
        }
    }
    
    return (
        <Button variant='success'
            style={style.btnCreate}
            onClick={() => {                                    
            console.log("PUSHED BUTTON CREATE")
            handleShow()
            setAction('create')
         }}>
            <FaPlusSquare/>
            Create      
        </Button>
    )
}

export default CreateButton