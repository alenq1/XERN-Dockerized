import React from 'react'
import styled from 'styled-components'
import { withRouter, Link, NavLink } from 'react-router-dom';
import {FaNotesMedical, FaBusinessTime, FaThList, 
    FaUsersCog, FaGlobeAmericas, FaNetworkWired, FaCubes, FaHome} from 'react-icons/fa'
import {sources, StyleSettings} from '../settings/config'



const StyledSideBar = styled.nav`


.navbar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    
}

.item-list {
    width: 100%;
    margin: .5rem 0;

}

.item-list:last-child {
    margin-top: auto;

}

.link {
    display: flex;
    align-items: center;
    height: var(--width-header-sidebar);
    color: var(--background-app);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: 600ms;
}

.link:hover {
    filter: grayscale(0%) opacity(1);
    background: #141414;
    color: #ececec;
}

.link svg {
    width: 2rem;
    min-width: 2rem;
    margin: 0 1.5rem;
}

.link-text {
    display: none;
    margin-left: 1rem;
}

@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {

.navbar-list {
    flex-direction: row;
    margin: 0rem;
    
}

.item-list {
    width: 100%;
    margin: 0;
    justify-content: center;
}

.item-list:last-child {
    margin-top: 0rem;

}

.link {
    display: flex;
    align-items: center;
    height: var(--width-header-sidebar);
    color: var(--background-app);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: 600ms;

}

.link svg {
    margin: 0 .5rem;
}

.link-text {
    display: none;
    margin-right: 1.5rem;
    font-size: .75rem;
}


}
`

const links= [
    {name: 'Home', icon: <FaHome/>, link: '/'},
    {name: 'Tasks', icon: <FaBusinessTime/>, link: sources.taskMonitor},
    {name: 'Crud', icon: <FaThList/>, link: '/list'},
    {name: 'Users', icon: <FaUsersCog/>, link: '/users'},
    {name: 'Scrap & Socket', icon: <FaGlobeAmericas/>, link: '/example'},
    {name: 'Theme', icon: <FaCubes/>, link: '#'},

]

const Sidebar = () => {
    return (
        <StyledSideBar>
                <ul className="navbar-list">
                    {links.map( (link, index) => (
                        <li className="item-list" key={index}>
                            <Link to={link.link} className="link">
                                {link.icon}
                                <span className="link-text">
                                    {link.name}
                                </span>
                            </Link>                    
                        </li>
                    ))}                    
                </ul>            
        </StyledSideBar>
    )
}

export default Sidebar