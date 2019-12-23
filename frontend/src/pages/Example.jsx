import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap'
import {sources} from '../settings/config';

const Example = ({weather, scrap}) => {

    const[scrapStatus, setscrapStatus] = useState('Inactive')
    const scrapNews = (url) => {

        fetch(url)
        .then(response => response.json())
        .then(response => setscrapStatus(response.message))
        .catch(error => setscrapStatus(error))
    }
    
    const style = {
        //justifyContent: 'center',
        //width: 450,
        marginRight: 35,
        //marginTop: 100,
        
        title:{
            textAlign: 'center',
            marginTop: 50
        },
        card:{
            marginRight: 50,
            marginLeft: 50,
            marginTop: 50,
            width: '25%',
            textAlign: 'center'
        },
        emptyCard:{
            marginRight: 50,
            marginLeft: 50,
            marginTop: 50,
            width: '25%',
            textAlign: 'center'
        },
        button:{
            width: '15%',
            height: '15%',
            textAlign: 'center',
            justifyContent: 'center'
        }
    }

    
    useEffect(() => {
        
        scrapNews(sources.scrapUrl)
    }, [])

    //console.log(scrapStatus, "SCRAP STATUS")
    //console.log(weather, "DATA WEATHER");
    return (
        <>
        <h3 style={style.title}>Socket Example</h3>
        <div className="row container-fluid justify-content-center col-4 col-sm-12">
            
        {weather && weather.length > 0 ?
        weather.map((data) => (
        <Card style={style.card}>
        <Card.Header>{data.name} </Card.Header>
        <Card.Body>
            <>
        <p><h5>Weather:</h5>{data.weather[0].main}</p>
        <p><h5>Temp:</h5>{data.main.temp}</p>
        <p><h5>Wind:</h5>{data.wind.speed}</p>
            </>
            

        </Card.Body>
        </Card>
         ) )
        :
        <Card style={style.card}>
        <Card.Header>Weather info</Card.Header>
        <Card.Body> NO DATA</Card.Body>
        </Card>
        
        
        }
        </div>
        <h3 style={style.title}>Scrap Example</h3>
        <center><p><Button style={style.button} onClick={() => scrapNews(sources.scrapUrl)}>
            Scrap News</Button></p>
        </center>
        <div className="row container-fluid justify-content-center col-4 col-sm-12">            
            
            {scrap && scrap.length > 0 ?
        scrap.map((data) => (
        <Card style={style.card}>
        <Card.Header>Reddit News </Card.Header>
        <Card.Body>
            <>
        <p><h5>Title</h5>{data.title}</p>
        <p><Button href={`${sources.scrapPage}${data.link}`}>go to page</Button></p>
        
            </>
            

        </Card.Body>
        </Card>
         ) )
        :
        <Card style={style.card}>
        <Card.Header>Scrap Info</Card.Header>
        <Card.Body> NO DATA</Card.Body>
        </Card>
        
        
        }
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
      weather: state.socketdata.wsData.job,
      scrap: state.socketdata.wsData.otherjob
    }
  }

export default connect(mapStateToProps, null)(withRouter(Example))