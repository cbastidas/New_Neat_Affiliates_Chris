import { useEffect, useState } from 'react';
import './styles.css';
import BackgroundAnimation from './BackgroundAnimation';
import BrandCard from './BrandCard';
import { supabase } from './lib/supabaseClient';
import BrandsSection from './BrandsSection';
import AdminDashboard from './AdminDashboard';
import WhyJoin from './WhyJoin';
import AdminLogin from './AdminLogin';
import { Session } from '@supabase/supabase-js';
import Contact from './Contact';
import Faq from './Faq';
import LoginSignupSection from './LoginSignupSection';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching brands:', error.message);
      } else {
        setBrands(data || []);
      }
    };

    fetchBrands();

    // 🟣 Admin Authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const isAdmin = window.location.search.includes('admin=true');

  if (isAdmin) {
    return session ? <AdminDashboard /> : <AdminLogin />;
  }

  const groupOrder = ['Realm', 'Throne', 'Neatplay', 'Neatplay-Latam'];

  const groupedBrands = groupOrder.map((groupName) => ({
    groupName,
    brands: brands.filter((b) => b.group === groupName),
  }));

  // return


  return (
    
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Navbar */}
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
          flexWrap: 'wrap', // 
          zIndex: 20,
        }}
      >
        {/*Logo */}
        <div
          onClick={() => scrollToSection('Home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img src="/logo.png" alt="Logo" style={{ height: '28px' }} />
        </div>

        {/* Desktop nav */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap', // ✅ que los botones se acomoden
            maxWidth: '100%', // ✅ evita que desborde
            justifyContent: 'flex-end',
          }}
        >
          {[
            'WhyJoin',
            'CommissionRate',
            'Brands',
            'Contact',
            'FAQ',
            'Login',
            'SignupNow',
          ].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#374151',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                transition: 'background 0.2s, color 0.2s',
                whiteSpace: 'nowrap', // ✅ evita corte feo de palabras
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f3f4f6')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {id === 'SignupNow' ? (
                <strong>Signup</strong>
              ) : (
                id.replace(/([A-Z])/g, ' $1').trim()
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (

        <div className="md:hidden fixed top-16 w-full bg-white shadow-md px-4 py-2 z-10">
          {[
            'WhyJoin',
            'CommissionRate',
            'Contact',
            'FAQ',
            'Login',
            'SignupNow',
          ].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="block w-full text-left text-gray-700 py-2 hover:bg-gray-100 rounded-md transition"
            >
              {id === 'SignupNow' ? (
                <strong>Signup</strong>
              ) : (
                id.replace(/([A-Z])/g, ' $1').trim()
              )}
            </button>
          ))}
        </div>
      )}
      


      {/* Main content */}
      <div><BackgroundAnimation /></div>

      <main className="pt-24 max-w-5xl mx-auto px-4">
        {
          <WhyJoin />
        }

{/* ✅ Commission Rate with dynamic cards */}
        <section id="CommissionRate" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem', color: '#1f2937' }}>
              Commission Rate
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem', fontSize: '1rem' }}>
              Earn more as you grow. Our laddered commission system rewards your success.
            </p>
            <div className="space-y-16 mt-8">
               {groupedBrands.map(({ groupName, brands }) => (
                 brands.length > 0 && (
                   <section
                     key={groupName}
                     className="p-6 bg-white rounded-lg border shadow-sm"
                   >
                     <h3 className="text-2xl sm:text-3xl font-bold text-purple-800 text-center mb-6 underline decoration-purple-300 underline-offset-4">
                       {groupName}
                     </h3>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  id={brand.id}
                  logoUrl={brand.logo_url}
                  name={brand.name}
                  commissionTiers={brand.commission_tiers || []}
                  commissionType={brand.commission_type}
                  //about={brand.about}
                  isVisible={brand.is_visible}
                  commission_tiers_label={brand.commission_tiers_label}
                  onSave={() => {}}
                  isPublicView={true} // 👈 IMPORTANT: Public Mode
                />
              ))}
            </div>
        </section>
                 )
              ))}
            </div>
          </div>  
        </section>
        <BrandsSection />

        <Contact />    

        <Faq />



        <LoginSignupSection />

    </main>
    </div>
  );
}
