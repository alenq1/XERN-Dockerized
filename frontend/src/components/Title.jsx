import React from 'react'

export const Title = ({content}) => {
    
    const style={
        margin: 20,
        textAlign: 'center'
    }
    
    return (
        
        <div style={style}>
            <h1>
            {content}
            </h1>
        </div>
    )
}

export default Title