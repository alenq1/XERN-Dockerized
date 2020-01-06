import React from 'react'
import { Accordion, Card} from 'react-bootstrap'
import {TiThMenu} from 'react-icons/ti'


const Result = ({type, message}) => {


    const style ={
        color: type === 'Success' ? 'green' : 'red',
        result: {
            textAlign: 'left'
        }

    }

    console.log(message, "result value");

    return (
        <div className='mt-3'>        
            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={TiThMenu} variant="link" eventKey="0">                        
                        </Accordion.Toggle>
                        <span style={style} className='ml-3'>{type}</span> 
                    </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={style.result}>
                                <pre>{message}</pre>
                            </Card.Body>
                        </Accordion.Collapse>
                </Card>
            </Accordion>                
        </div>
    )
}

export default Result