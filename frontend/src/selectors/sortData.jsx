import { createSelector } from 'reselect'
import { orderBy } from 'lodash'

const rawData = state => state && state.data
const getKey = state => state && state.sortKey
const getDirection = state => state && state.sortDirection

export const sortData = createSelector(

    [rawData, getKey, getDirection],
    (data, sortKey, direction) => {

        //console.log(data, "RAWDAT")
        //console.log(sortKey, "GETKEY")
        //console.log(direction, "DIRECTION")

        if (sortKey === 'Price' && data.length > 1) {
            //console.log("SORT ORDER BY PRICE")
            //console.log(data, "data to sort")
            return orderBy(data, function (e) { return e.price }, direction)
        }
        if (sortKey === 'Quantity' && data.length > 1) {
            //console.log("SORT ORDER BY QUANTITY")
            //console.log(data, "data to sort")
            return orderBy(data, function (e) { return e.quantity }, direction)
        }
        if (sortKey === 'Name' && data.length > 1) {
            //console.log("SORT ORDER BY NAME")
            //console.log(data, "data to sort")

            return orderBy(data, function (e) { return e.name }, direction)
        }
        else {
            //console.log("SKIP SORT")
            //console.log(data, "data to sort")
            return data
        }
    }
)
