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

        if(keysearch.includes(sortKey)){
            return orderBy(data, function (field) { return field[sortKey.toLowerCase()] }, direction)
        }
        
        else {
            //console.log("SKIP SORT")
            //console.log(data, "data to sort")
            return data
        }
    }
)
