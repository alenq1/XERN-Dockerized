import React from 'react'
import styled from 'styled-components'
import {Spinner} from 'react-bootstrap'

const StyledSpinner = styled.div`


background: lightgray;
display: flex;
padding: 26% 40%;


span {
    
}

h1 {
    margin-top: -.5rem;
    margin-left: 2rem;
    color: black;
}
`


const Loading = ({message}) => {
    return (
        <StyledSpinner>
            <span><Spinner animation='border' role='status'/></span>
            <h1>{message}</h1>            
        </StyledSpinner>
    )
}

export default Loading