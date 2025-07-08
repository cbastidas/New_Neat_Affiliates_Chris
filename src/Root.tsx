import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import App from './App';
import Terms from './Terms';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/terms" element={<Terms />} />
          {/* Add here the /testimonials o /licenses */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
