// LoginSignupSection.tsx
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface AuthLink {
  id: string;
  instance: string;
  login: string;
  signup: string;
  order: number;
}

export default function LoginSignupSection() {
  const [authLinks, setAuthLinks] = useState<AuthLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase
        .from('auth_links')
        .select('*')
        .order('order');

      if (!error && data) {
        setAuthLinks(data);
      }
    };

    fetchLinks();
  }, []);

  const renderCard = (instance: string, url: string, label: string, color: string) => (
    <div className="bg-white p-4 rounded shadow" key={instance + label}>
      <h3 className="text-lg font-semibold mb-2">{instance}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-${color}-600 underline`}
      >
        {label}
      </a>
    </div>
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Login Section */}
        <h2 className="text-2xl font-bold text-center mb-6">🔐 Login</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {authLinks.map((link) => link.login && renderCard(link.instance, link.login, 'Login', 'blue'))}
        </div>

        {/* Signup Section */}
        <h2 className="text-2xl font-bold text-center mb-6">📝 Signup Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authLinks.map((link) => link.signup && renderCard(link.instance, link.signup, 'Signup', 'green'))}
        </div>
      </div>
    </section>
  );
}
