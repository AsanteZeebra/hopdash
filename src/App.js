/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Layout from "./Layout/Layout";
import { Branch_Layout,User_layout } from "./Layout/Layout";
import { Branch } from "./Dashbaord";
import { User } from "./Dashbaord";
import Dashboard from "./Dashbaord";
import Overview from "./Components/Overview";
import Signup from "./Components/authentication/signup";
 import Login from "./Components/authentication/login"; 
import RequestReset from "./Components/authentication/request_reset";
import ResetPassword from "./Components/authentication/Reset_Password";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} /> 
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/password-reset/:token" element={<ResetPassword />} />

        
        <Route path="/overview" element={<Layout><Overview/></Layout>} />
        <Route path="/user" element={<User_layout><User/></User_layout>} />
        <Route path="/branch" element={<Branch_Layout><Branch/></Branch_Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />
        
        
        <Route path="*" element={<h1>Page Not Found</h1>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;