import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './app';
import App from './App';
import './index.css';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //   <React.StrictMode>
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ChakraProvider>,
  //   </React.StrictMode>,
);
