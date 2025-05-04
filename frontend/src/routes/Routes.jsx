import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllChats from '../components/AllChats';
import SingleChat from '../components/SingleChat';
import Login from '../components/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/api/:id" element={<SingleChat />} /> */}
    </Routes>
  );
};

export default AppRoutes;
