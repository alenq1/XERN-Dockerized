import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Main from '../layout/Main';
import Header from '../layout/Header'
import Home from '../pages/Home'
import Crud from '../pages/Crud'
import Login from '../pages/Login';
import Example from '../pages/Example'
import Footer from '../layout/Footer'


const mockStore = configureStore([]);

describe('Header', () => {
  let store;
  let component;
  
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  });
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('should dispatch an action on button click', () => {
    renderer.act(() => {
      component.root.findByType('button').props.onClick();
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      myAction({ payload: 'sample text' })
    );
  });
   
  });


  