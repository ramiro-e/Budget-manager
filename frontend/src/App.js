import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/homepage/Home';
import Account from './components/account/Account'
import Register from './components/user/Register'
import Login from './components/user/Login'
import RouteGuard from './RouteGuard';

function App() {


  const [loginToken, setLoginToken] = useState(null);

  useEffect(() => {
    if(loginToken !== null){
      let now = new Date()
      let ttl = 21600000 // (6hs como el token)
      let newToken = {token: loginToken, expiration: now.getTime() + ttl}
      console.log(newToken)
      localStorage.setItem('loginToken', JSON.stringify(newToken));
    }
  }, [loginToken]);

   

  return (
    <div className="container-md min-vh-100">

      <Routes>
        <Route element={<RouteGuard />}>
          <Route exact path="/" element={<Home />} />
          <Route path="account/:id" element={<Account />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login setLoginToken={setLoginToken}/>} />
      </Routes>

      

    </div>
  );
}

export default App;
