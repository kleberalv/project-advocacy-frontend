import React from 'react';
import './App.css';
import RoutesApp from './routesApp';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import logo from './images/icone.png';

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/home') {
      // Não permitir cache nas páginas que requerem autenticação
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', function (event) {
        window.history.pushState(null, null, window.location.pathname);
      });
    }
  }, [location]);
  return (
    <div className="Body">
      <RoutesApp />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
  );
}

export default App;
