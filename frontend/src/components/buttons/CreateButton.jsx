import React, {memo} from 'react'
import {Button} from 'react-bootstrap'
import {FaPlusSquare} from 'react-icons/fa'

const CreateButton = ({handleShow, setAction}) => {
    
    return (
        <Button variant='success'
            onClick={() => {                                    
            //console.log("PUSHED BUTTON CREATE")
            handleShow()
            setAction('create')
        }}>
            <FaPlusSquare/>
            Create      
        </Button>
    )
}

export default CreateButton