import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const navItems = [
    { id: 'Terms', label: 'Terms & Conditions', route: '/terms' },
    { id: 'Licenses', label: 'Licenses', route: '/licenses' },
    { id: 'Testimonials', label: 'Testimonials', route: '/testimonials' },
    { id: 'Home', label: 'Home' }, // este no tiene route, solo scroll
  ];

  return (
    <footer
      style={{
        padding: '2rem 1rem',
        backgroundColor: '#f3f4f6',
        textAlign: 'center',
        marginTop: '4rem',
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {navItems.map((item) =>
          item.route ? (
            <Link
              key={item.id}
              to={item.route}
              style={{
                fontSize: '0.95rem',
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.id}
              onClick={() => {
                const section = document.getElementById(item.id);
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.95rem',
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </footer>
  );
}
