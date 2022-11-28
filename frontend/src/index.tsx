import ReactDOM from 'react-dom/client';
import App from './App';
import stores from './redux/stores'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
  <Provider store={stores}>
    <App />
  </Provider>
  </Router>
);
