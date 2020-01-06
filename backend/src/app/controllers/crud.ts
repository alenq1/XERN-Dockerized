import {Request, Response, NextFunction} from 'express'
import {dataValidation} from '../helpers/validateData'
import exampleData, {IExample} from '../models/exampleData'
import { customResponse } from '../apiRoutes/routes'



export const getData = async(req: Request, res:Response): Promise<void>  => {

    //console.log(req.params, "get single")
    try {
        
        const data = await exampleData.findOne({_id: req.params.id})
        res.status(200).send(customResponse('ok', data))    

    } 
    catch (error) {
        res.status(404).send(customResponse('error', error))        
    }
}

export const getAll = async(req: Request, res:Response): Promise<void> =>  {

    //console.log(req.params, "get all")
    //res.status(200).send({message: 'GET ALL'})
    
    try {        
    
        const all: IExample = new exampleData()
        const getAll = await all.findSorted()
        res.status(200).send(customResponse('ok', getAll))
    } 
    catch (error) {
        res.status(404).send(customResponse('error', error))
    }
}

export const createData = async(req: Request, res:Response) => {

    //console.log(req.body, "create")
    
    const { error } = await dataValidation(req.body);
    if (error) return res.status(400).send(customResponse('Invalid Data', error));
    
    try {
        const newData: IExample = new exampleData(req.body)
        await newData.save()
        res.status(201).send(customResponse('created', newData))    
    } 
    catch (error) {
        console.log(error, 'create error')
        res.status(500).send(customResponse('Create error on', error.keyValue))    
    }
}


export const updateData = async(req: Request, res:Response) => {

    //console.log(req.body, "update")
    //console.log(req.params, "params")
    const { error } = await dataValidation(req.body);
    if (error) {
        console.log(error, "ERROR GETTING UPDATE")
        return res.status(400).send(customResponse('Invalid Data', error));}
    try {
    
        const toUpdate = await exampleData.findByIdAndUpdate(req.params.id, req.body, {new: true})
        //console.log(toUpdate, "DATA MODIFIED")
        res.status(200).send(customResponse('updated', toUpdate))  
    } 
    catch (error) {
        
        console.log(error, "UPDATE ERROR")
        res.status(500).send(customResponse('error', error))
  }
}

export const deleteData = async(req: Request, res:Response): Promise<void> => {

    //console.log(req.params, "delete")
    try {
      
        const toDelete = await exampleData.findByIdAndRemove(req.params.id)
        console.log(toDelete, "DATA DELETED")
        res.status(200).send(customResponse('deleted', toDelete))  
    } 
    catch (error) {
        res.status(500).send(customResponse('error', error))
      }
}
