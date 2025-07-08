import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';

export default function Layout() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ paddingTop: '6rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
