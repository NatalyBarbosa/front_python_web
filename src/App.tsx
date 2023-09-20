import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';

import "bootstrap/dist/css/bootstrap.min.css"
import 'font-awesome/css/font-awesome.min.css'
import Routes from './views/Routes';
import Header from './components/Header';
import { useAuth } from './features/auth/authHook';
// import { useNavigate } from 'react-router-dom';
function App() {

  return (
    <div className="container">

      <Header />
      <Routes />
    </div>
  );
}

export default App;
