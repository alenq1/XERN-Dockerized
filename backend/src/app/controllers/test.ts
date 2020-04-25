import {Request, Response} from 'express'
import config from '../settings/config';
import axios from 'axios'
import {customResponse} from '../apiRoutes/routes'
import {newJobs} from '../helpers/queuelist'


const {urls: {externalApi, scrapUrls}} = config


// CONTROLLER FOR CHECK BACKEND REQUEST TO EXTERNAL API

export const testApi = async (req:Request,res:Response) => {

    //console.log(req.body)
    
    try{
        await axios(externalApi)
        .then(result => {console.log(result, 'RESPONSE'), res.status(200).send(customResponse('ok', result.data))})
        .catch((error) => {console.log(error, 'ERROR'), res.status(404).send(customResponse('error', error))})
    }
    catch (error){
        console.log(error, "error fetch url")
        res.status(500).send(customResponse('error', error))
    }
}

// EXECUTE JOB FOR SCRAP PAGE 

export const scrap = async (req:Request,res:Response) => {
    
    try{
        
        await newJobs.TestJob.queue.add({url: `${scrapUrls.site}${scrapUrls.channels[Math.floor(Math.random()*scrapUrls.channels.length)]}`})
        res.status(200).send(customResponse('ok', 'initializing page scrap...'))
    }
    catch (error){
        console.log(error, "error on scraping")
        res.status(500).send(customResponse('error', error))
    }
}