import {Request, Response, NextFunction} from 'express'
import {dataValidation} from '../helpers/validateData'
import {default as exampleDataM, IExample} from '../models/nosql/exampleData'
import {default as exampleData, IExampleSQL} from  '../models/sql/exampleData'
import {getRepository} from 'typeorm';
import { customResponse } from '../apiRoutes/routes'
import config from '../settings/config'


let db: 'sql' | 'mongo' = config.services.dbtype
console.log(db, "CURRENT DB SERVICE")


export const getData = async(req: Request, res:Response): Promise<void>  => {

    console.log(req.params, "get single")

    let data

    try {
        
        if (db === 'mongo') {
            data = await exampleDataM.findOne({_id: req.params.id})    
        }
        
        if (db === 'sql') {
            data = await getRepository(exampleData).findOne(req.params.id)
        }
        
        res.status(200).send(customResponse('ok', data))    

    } 
    catch (error) {
        res.status(404).send(customResponse('error', error))        
    }
}



export const getAll = async(req: Request, res:Response): Promise<void> =>  {

    console.log(req.params, "get all")
    //res.status(200).send({message: 'GET ALL'})
    
    let allData 

    try {        

        if(db === 'mongo'){
            allData = new exampleDataM()
        }
        if(db === 'sql'){
            allData = new exampleData()
        }
        
        //MONGO
        //const allData: IExample = new exampleData()
        
        //SQL
        //const allData = new exampleData()
        //
        
        
        const getAll = await allData.findSorted()
        res.status(200).send(customResponse('ok', getAll))
    } 
    catch (error) {
        res.status(404).send(customResponse('error', error))
    }
}

export const createData = async(req: Request, res:Response) => {

    console.log(req.body, "create request body")
    
    const { error } = await dataValidation(req.body);
    if (error) return res.status(400).send(customResponse('Invalid Data', error));

    let newData
    
    try {

        if (db === 'mongo'){
            //const newData: IExample = new exampleData(req.body)
            newData = new exampleDataM(req.body)
            await newData.save()
        }
        
        if (db === 'sql') {
            const data = await getRepository(exampleData).create(req.body);
            newData = await getRepository(exampleData).save(data);
        }
        
        res.status(201).send(customResponse('created', newData))    
    } 
    catch (error) {
        console.log(error, 'create error')
        res.status(500).send(customResponse('Create error on', error.keyValue))    
    }
}

export const updateData = async(req: Request, res:Response) => {

    console.log(req.body, "update")
    console.log(req.params, "params")
    
    const { error } = await dataValidation(req.body);
    
    if (error) {
        console.log(error, "ERROR GETTING UPDATE")
        return res.status(400).send(customResponse('Invalid Data', error));
    }
    
    let toUpdate: any

    try {
        console.log(req.body, "UPDATE DATA from FRONTEND")
        
        if (db === 'mongo'){
            // WITH MONGODB
            toUpdate = await exampleDataM.findByIdAndUpdate(req.params.id, req.body, {new: true})
        }
        
        if (db === 'sql'){
            //SQL
            const data: any = await getRepository(exampleData).findOne(req.params.id)
            getRepository(exampleData).merge(data, req.body)
            toUpdate = await getRepository(exampleData).save(data)
        }
        
        //
        //console.log(toUpdate, "DATA MODIFIED")
        res.status(200).send(customResponse('updated', toUpdate))  
    } 
    catch (error) {
        
        console.log(error, "UPDATE ERROR")
        res.status(500).send(customResponse('error', error))
    } 
}

export const deleteData = async(req: Request, res:Response): Promise<void> => {

    console.log(req.params, "delete")

    let toDelete

    try {
        
        if (db === 'mongo'){
            //WITH MONGODB
            toDelete = await exampleDataM.findByIdAndRemove(req.params.id)
            console.log(toDelete, "DATA DELETED")
            res.status(200).send(customResponse('deleted', toDelete))  
        }

        if (db === 'sql'){
            const findDelete: any = await getRepository(exampleData).findOne(req.params.id)
            console.log(findDelete, "PARA DELETEAR")
            toDelete = await getRepository(exampleData).delete(findDelete._id);
            console.log(toDelete, "DATA DELETED")
            res.status(200).send(customResponse('deleted', findDelete))  
        }               
    } 
    catch (error) {
        res.status(500).send(customResponse('error', error))
    }
}