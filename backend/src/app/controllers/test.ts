import {Request, Response} from 'express'
import config from '../settings/config';
import axios from 'axios'
import {customResponse} from '../apiRoutes/routes'
import {newJobs} from '../helpers/queuelist'


const {urls: {externalApi, scrapUrls}} = config

export const testApi = async (req:Request,res:Response) => {

    
    
    console.log(req.body)
    
    try{
        await axios(externalApi)
        .then(result => {console.log(result, 'RESPONSE'), res.status(200).send(customResponse('ok', result.data))})
        .catch((error) => {console.log(error, 'ERROR'), res.status(404).send(customResponse('error', error))})
    }
    catch (error){
        res.status(500).send(customResponse('error', error))
    }
    
    
}

export const scrap = async (req:Request,res:Response) => {
    try{
        newJobs.TestJob.queue.add({url: scrapUrls[Math.floor(Math.random()*scrapUrls.length)]})
        res.status(200).send(customResponse('ok', 'initializing page scrap...'))
    }
    catch (error){
        res.status(500).send(customResponse('error', error))
    }
}