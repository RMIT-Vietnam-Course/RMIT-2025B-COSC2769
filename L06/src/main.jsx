import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store';
import Counter from './components/Counter';
import AuthStatus from './components/AuthStatus';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthStatus />
      <Counter />
    </Provider>
  </StrictMode>,
)
