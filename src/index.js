import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { store } from './Redux/store';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { rootReducer } from './Redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
