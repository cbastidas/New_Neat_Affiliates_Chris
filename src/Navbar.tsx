//Navbar.tsx is the one that configures the admin navbar. 
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === 'true');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 20,
      }}
    >
          <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMenuOpen(false);
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <img src="/logo.png" alt="Logo" style={{ height: '28px' }} />
          {isAdmin && (
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                whiteSpace: 'nowrap',
              }}
            >
              Admin Dashboard
            </span>
          )}
        </div>



      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {[
          'WhyJoin',
          'CommissionRate',
          'Our Brands',
          'Contact',
          'FAQ',
          'Login',
          'Signup',
        ].map((id) => {
          const targetId = (() => {
            if (isAdmin && id === 'WhyJoin') return 'why-join-editor';
            if (id === 'Our Brands') return 'OurBrands';
            return id;
          })();

          return (
            <button
              key={id}
              onClick={() => scrollToSection(targetId)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#374151',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f3f4f6')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {id === 'Signup' ? (
                <strong>Signup</strong>
              ) : (
                id.replace(/([A-Z])/g, ' $1').trim()
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
