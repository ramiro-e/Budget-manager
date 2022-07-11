import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/homepage/Home';
import Account from './components/account/Account'
import Register from './components/user/Register'
import Login from './components/user/Login'
import RouteGuard from './RouteGuard';

function App() {

  return (
    <div className="container-md min-vh-100">

      <Routes>
        <Route element={<RouteGuard />}>
          <Route exact path="/" element={<Home />} />
          <Route path="account/:id" element={<Account />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>

      

    </div>
  );
}

export default App;
