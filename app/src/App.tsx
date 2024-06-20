import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/home';
import SetupPage from './pages/setup';
import Authenticate from './pages/login/Authenticate';
import NearPage from './pages/login/Near';
import MetamaskPage from './pages/login/Metamask';

export default function App() {
  return (
    <BrowserRouter basename="/core-app-template/">
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/auth/near" element={<NearPage />} />
        <Route path="/auth/metamask" element={<MetamaskPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
