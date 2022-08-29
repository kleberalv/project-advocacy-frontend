import React from "react";
import {Routes, Route } from "react-router-dom";
import Index from './pages/index/Index'
import Register from './pages/register/Register'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    );

};


export default RoutesApp;
