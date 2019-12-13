import { get } from 'lodash'
import { SORTED } from '../constants/action-types'


export const setSort = (sortKey) => (dispatch, getState) => {

  //debugger;  
  const sortParams = getState().example.sortDirection
  //debugger;

  console.log(sortParams, "SORT PARAMS PARa GET DEL ESTADO")
  const order = get(sortParams, "order");
  console.log(sortKey, "KEY PARA SORTEAR")
  console.log(order, "ORDEN PARA SORTEAR")

  dispatch({
    type: SORTED,
    payload: {
      sortKey: sortKey,
      sortDirection: sortParams === "desc" ? "asc" : "desc"
    }
  })

}