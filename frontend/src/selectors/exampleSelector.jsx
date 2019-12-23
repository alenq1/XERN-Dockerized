import { createSelector } from 'reselect'

const rawData = state => state.example && state.example.data

export const exampleSelector = createSelector(

    [rawData],
    (data) => {
            //console.log(data, "data")
            // Format the data result to json string special format to display on the home page
            return JSON.stringify(data, null, 2)    
    }
)
