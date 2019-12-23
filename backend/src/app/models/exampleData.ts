//const mongoose = require('mongoose')
import {Schema, model, Document} from 'mongoose'

export interface IExample extends Document{
    name: string
    price: number
    quantity: number
    description: string
    created: Date,
    updated: Date,
    findSorted(): Promise<any>

}

//const schema = Schema
const exampleSchema = new Schema({

    name: {type: String, required: true, unique:true},
    price: {type: Number, min: 0, max: 1000000, required: true},
    quantity: {type: Number, min: 0, max: 1000, required: true},
    description: {type: String},
    created: {type: Date, default: Date.now()},
    updated: { type: Date, default: Date.now(), required:true}
}
)

exampleSchema.methods.findSorted = async function(): Promise<any> { 
    return await this.model('exampleData').find().sort({quantity: -1}) 
}

export default model<IExample>('exampleData', exampleSchema)