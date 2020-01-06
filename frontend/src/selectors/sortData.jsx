import { createSelector } from 'reselect'
import { orderBy } from 'lodash'
import {display} from '../settings/config'

const rawData = state => state && state.data
const getKey = state => state && state.sortKey
const getDirection = state => state && state.sortDirection
const keysearch = [...display.crudNamesCols, ...display.usersNamesCols]

export const sortData = createSelector(

    [rawData, getKey, getDirection],
    (data, sortKey, direction) => {

        //console.log(data, "RAWDAT")
        //console.log(sortKey, "GETKEY")
        //console.log(direction, "DIRECTION")

    //     for (const key of keysearch){

    //     if (sortKey === key && data.length > 1) {
    //         //console.log("SORT ORDER BY PRICE")
    //         //console.log(data, "data to sort")
    //         return orderBy(data, function (e) { return e[key.toLowercase()] }, direction)
    //     }
    // }
        if(keysearch.includes(sortKey)){
            return orderBy(data, function (field) { return field[sortKey.toLowerCase()] }, direction)
        }
        // if (sortKey === 'Price' && data.length > 1) {
        //     //console.log("SORT ORDER BY PRICE")
        //     //console.log(data, "data to sort")            
        // }
        // if (sortKey === 'Quantity' && data.length > 1) {
        //     //console.log("SORT ORDER BY QUANTITY")
        //     //console.log(data, "data to sort")
        //     return orderBy(data, function (e) { return e.quantity }, direction)
        // }
        // if (sortKey === 'Name' && data.length > 1) {
        //     //console.log("SORT ORDER BY NAME")
        //     //console.log(data, "data to sort")

        //     return orderBy(data, function (e) { return e.name }, direction)
        // }
        else {
            //console.log("SKIP SORT")
            //console.log(data, "data to sort")
            return data
        }
    }
)
