import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import Index from './pages/index/Index'
import Login from './pages/login/Login'
import Home from './pages/userDashBoard/Home'
import NotFound from './pages/theme/NotFound'
import Register from './pages/register/Register'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );

};

export default RoutesApp;
