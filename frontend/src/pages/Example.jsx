import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Card, Button, Spinner} from 'react-bootstrap'
import {sources, StyleSettings} from '../settings/config';
import {FaCity, FaCloud, FaSun, FaTemperatureHigh, FaTemperatureLow,FaWind, FaCloudRain, FaSnowflake,
    FaMoon, FaRedditAlien
} 

from 'react-icons/fa'
import {IoIosThunderstorm} from 'react-icons/io'
import {FiCloudDrizzle} from 'react-icons/fi'

import styled from 'styled-components'


const StyledExample = styled.div`

    
    h1 {
        font-size: 2rem;
        text-align: center;
        margin: 2rem auto;
    }


    .list-card-socket, .list-card-scrap {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        justify-content: center;
        text-align: center;
    }

    .list-card-socket > div , .list-card-scrap > div{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
    }


    .card-example-weather, .card-example-empty, .card-example-scrap  {
        width: 25%;
        margin: 2rem;
        background: var(--card-background);
        transition: all 0.75s ease;
    }

    .weather-header{
        display: flex;
        flex-direction: row;
    
        span{
            margin:2rem;
            width: 40%;
            color: black;
        }
    
        h2{
            margin: 2rem 2rem .5rem 2rem;
            width: 60%;
            color: black;

            svg{
                margin-left: 2rem;
                color: black;
            }
        }
    }

    .weather-body{
        display: flex;
        flex-direction: row;
    
        span{
            margin:.1rem;
            width: 65%
        }

        svg {
            width: 4rem;
            height: 4rem;
            color: black;
        }
    
        p {
            margin: 2rem;
            width: 35%;
            color: black;
        }
    }

    button {
        background: darkblue;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        width: 9rem;
    }


    a {
        text-decoration: none;
    }

    .scrap-header {
        background: var(--theme-color);
        color: var(--background-app);
        padding: 1.5rem;
        height: 5rem;
    }

    .scrap-body{
    
        margin: 2rem auto auto auto;
        height: 100%;
        position: relative;
    
        p {
            z-index: 2;
            position: relative;
            margin: 2rem 1rem;
            color: black;
        }

        svg {
            position: absolute;
            color: rgba(248,102,11,0.2);
            top: 0;       
            margin: 1rem 3rem 1rem 3rem;
            z-index: 1;
            width: 3rem;
            height: 3rem;
        }
    }


    .card-example-scrap:hover{
        background: linear-gradient(to bottom, rgba(82,82,82,1) 0%, rgba(46,46,46,1) 1%, rgba(97,97,97,0.99) 12%, rgba(110,110,110,0.88) 25%, rgba(77,77,77,0.75) 39%, rgba(20,20,20,0.61) 73%, rgba(31,31,31,0.27) 91%, rgba(46,46,46,0.09) 98%, rgba(20,20,20,0.02) 100%);
        transform: scale(1.1);
        p{
            color: white;
        }
    }


@media screen and (max-width: ${StyleSettings.MaxDisplayMobile}) {


    h1 {
        font-size: 1.5rem;
        text-align: center;
        margin: 2rem auto;
    }

    .card-example-weather, .card-example-empty, .card-example-scrap {
        width: 45%;
        margin: 2rem .5rem;    
    }

    .weather-header{
    
        span{
            margin: 1rem .5rem .5rem;
            width: 40%
        }
    
        h2  {
            margin: 2rem 2rem .5rem .5rem;
            width: 60%;
            font-size: 1.5rem;

            svg {
                margin-left: 2rem;
            }
        }
    }

    .weather-body{

        p{
            margin: 2rem 2rem 2rem 1rem;
            width: 35%;
        }
}

    .scrap-body{
    
        svg {
            margin: 1rem;
        }

        p {
            font-size: .75rem
        }

    }

    .scrap-header {
        background: black;
        color: whitesmoke;
        padding: 1.5rem;
        height: 5rem;
    }
} 

`

const Example = ({weather, scrap}) => {

    const[scrapStatus, setscrapStatus] = useState('Inactive')
    const scrapNews = (url) => {

        fetch(url)
        .then(response => response.json())
        .then(response => setscrapStatus(response.message))
        .catch(error => setscrapStatus(error))
    }
    
    
    useEffect(() => {
        
        scrapNews(sources.scrapUrl)
        setscrapStatus('scraping')
    }, [])

    //console.log(scrapStatus, "SCRAP STATUS")
    //console.log(weather, "DATA WEATHER");
    return (
        <StyledExample>
            <h1>Socket Example</h1>
            <div className="list-card-socket">
                
                {weather && weather.length > 0 ?
                weather.map((data) => (
                <div className="card-example-weather" key={data.name}>
                    <div className="weather-header">
                        <span>{data.name}</span>
                        <h2>{data.main.temp}
                            {                        
                                data.main.temp > 15 ?
                                    <FaTemperatureHigh/>
                                    :
                                    <FaTemperatureLow/>
                            }                        
                        </h2>                        
                    </div>
                    <div className="weather-body">
                        <span>
                        {
                            {
                                'Clear': <FaSun/>,
                                'Clouds': <FaCloud/>,
                                'Snow': <FaSnowflake/>,
                                'Rain': <FaCloudRain/>,
                                'Drizzle': <FiCloudDrizzle/>,
                                'Thunderstorm': <IoIosThunderstorm/>
                            }[data.weather[0].main]
                            
                        } 
                        </span>                               
                        <p>{data.wind.speed}m/s</p>                        
                    </div>
                </div>
                ))
                :
                <div className="card-example-empty">
                    <div className="card-example-header">Weather info</div>
                    <div className="card-example-body">NO DATA</div>
                </div>                
                }
            </div>
            <h1>Scrap Example</h1>            
                <p>
                    <Button onClick={() => 
                        {scrapNews(sources.scrapUrl)
                        setscrapStatus('scraping')}
                    }>
                        Scrap Now
                    </Button>
                </p>            
            <div className="list-card-scrap">
                
                {scrap && scrap.length > 0 ?
            
                scrap.map((data) => (
                <div className="card-example-scrap" key={data.link}>
                    <a href={data.link}>
                    <div className="scrap-header">Reddit News</div>
                    <div className="scrap-body">                        
                        <p>{data.title}</p>                        
                            <FaRedditAlien/>                        
                    </div>
                    </a>
                </div>
                ))
                :
                scrapStatus === 'scraping' ?
                <div className="card-example-loading">
                    <div className="card-exmaple-header">Scrap Info</div>
                    <div className="card-exmaple-body"> Scraping . . .<Spinner animation="border" variant="dark" /> </div>
                </div>
                :    
                <div className="card-example-empty">
                    <div className="card-exmaple-header">Scrap Info</div>
                    <div className="card-exmaple-body"> NO DATA</div>
                </div>
                }
            </div>
        </StyledExample>
    )
}

const mapStateToProps = state => {
    return {
        weather: state.socketdata.wsData.job,
        scrap: state.socketdata.wsData.otherjob
    }
}

export default connect(mapStateToProps, null)(withRouter(Example))