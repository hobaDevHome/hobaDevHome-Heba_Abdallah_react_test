import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { clientScandiweb } from './Apollo';
import { Provider } from 'react-redux';
import store from './store/index';

import App from './App';

ReactDOM.render(
  <ApolloProvider client={clientScandiweb}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
