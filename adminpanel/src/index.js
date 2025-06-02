import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthContext'; // ✅ import it
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider> {/* ✅ Wrap your entire app */}
      <App />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

