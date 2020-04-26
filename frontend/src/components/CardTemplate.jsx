import React from 'react'
import { Card, Spinner, Button} from 'react-bootstrap'
import {StyleSettings} from '../settings/config';
import styled from 'styled-components'


const StyledCard = styled.div`

    width: ${props => props.width ? props.width : '50%'};
    margin: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    position: relative;

    
    .card-template-header {
    
        background: var(--theme-color);
        color: var(--background-app);
        padding: 1.5rem;
        height: 5rem;

    h1 {
        color: var(--background-app);
    }
    
}

svg {
    color: var(--background-app);
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 0;        
    margin: 2rem 2rem;
    transition: all .2s ease-in-out;
}

svg:hover{
    transform: scale(1.5);
}


.normal-content, .api-request {

    background: linear-gradient(to bottom, rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%);

    /* background: darkgray;*/
    padding: 0;
    margin: 0;
    color: blanchedalmond;
    height: 7.5rem;
    
    

    &:first-child {
        padding: 5rem;
        text-align: center;
    }

}

.card-content {
    padding: 1rem 1rem 1rem 1rem;

}

.healthy {
    background: linear-gradient(to bottom, rgba(127,173,0,1) 0%, rgba(75,136,17,1) 100%);
    padding: 0;
    margin: 0;
    color: white;
    height: 7.5rem;
    
}

.error{
    background: linear-gradient(to bottom, rgba(236,43,9,1) 0%, rgba(236,61,34,1) 34%, rgba(207,31,7,1) 51%, rgba(206,36,13,1) 71%, rgba(197,37,22,1) 100%);
    padding: 0;
    margin: 0;
    color: white;
    height: 7.5rem;
    
    &:first-child {
        padding: 3rem;
        text-align: center;
    }
}


button, a{
    background: darkblue;
    margin: 1rem 2rem 1rem 2rem;
    justify-content: center;
    color: white;
}


@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

    width: ${props => props.smWidth ? props.smWidth : '45%'};
    margin: 1rem .4rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    position: relative;

    .card-template-header {
    
        background: black;
        color: whitesmoke;
        padding: .5rem;
        height: 4rem;
        font-size: .9rem;
    
    h1 {    
        color: whitesmoke;
    }
}

svg {
    color: whitesmoke;
    width: 4rem;
    height: 4rem;
    position: absolute;
    right: 0;
    margin: 1rem 1rem;
    transition: all .2s ease-in-out;
}

svg:hover{
    transform: scale(1.5);
}

.healthy { 
    height: 7.5rem;
}

.error {

}

.normal-content, .api-request {


}

}

`


const CardTemplate = ({title, children, customStyle, width, smWidth}) => {

    return (
        <StyledCard width={width} smWidth={smWidth}>
            <div className="card-template-header">{title}</div>
            <div className={customStyle}>
                {children}    
            </div>
        </StyledCard>
    )
}
export default CardTemplate