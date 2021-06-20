import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './state'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import getLibrary from './utils/getLibrary';
import { NetworkContextName } from './constants/misc';
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <App />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
