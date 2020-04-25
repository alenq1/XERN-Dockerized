//import { get } from 'lodash'
import { SORTED } from '../constants/action-types'


export const setSort = (sortKey) => (dispatch, getState) => {

  //debugger;  
  const sortParams = getState().example.sortDirection
  //debugger;

  //console.log(sortParams, "SORT PARAMS")
  
  //const order = get(sortParams, "ordered params");
  
  //console.log(sortKey, "SORTKEY")
  //console.log(order, "ORDER")

  dispatch({
    type: SORTED,
    payload: {
      sortKey: sortKey,
      sortDirection: sortParams === "desc" ? "asc" : "desc"
    }
  })

}