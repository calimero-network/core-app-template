import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AccessTokenWrapper } from '@calimero-network/calimero-client';

import HomePage from './pages/home';
import SetupPage from './pages/setup';
import Authenticate from './pages/login/Authenticate';
import ContextPage from './pages/context';

export default function App() {
  return (
    <AccessTokenWrapper>
      <BrowserRouter basename="/core-app-template/">
        <Routes>
          <Route path="/" element={<SetupPage />} />
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/context" element={<ContextPage />} />
        </Routes>
      </BrowserRouter>
    </AccessTokenWrapper>
  );
}
