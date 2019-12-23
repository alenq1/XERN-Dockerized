import fetchCrudApi from '../actions/fetchCrudApi'
import {setSort} from '../actions/sort'
import {registerUser, LoginUser} from '../actions/userAuth'
import {ConnectWS} from '../actions/wsocket'
import * as types from '../constants/action-types'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.CREATE_DATA,
      text
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
})
