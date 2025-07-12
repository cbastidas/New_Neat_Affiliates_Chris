import React, { useEffect, useState, useRef } from 'react';
import { supabase } from './lib/supabaseClient';
import BrandCard from './BrandCard.tsx';
import AddBrandModal from './AddBrandModal.tsx';
import WhyJoinEditor from './WhyJoinEditor.tsx';
import './styles.css';
import ContactEditor from './ContactEditor';
import FaqEditor from './FaqEditor';
import AuthEditor from './AuthEditor';

interface CommissionTier {
  range: string;
  rate: string;
}

interface Brand {
  id: string;
  name: string;
  logo_url: string;
  commission_text: string;
  commission_type: string;
  about: string;
  is_visible: boolean;
  commission_tiers: CommissionTier[];
  group?: string;
}

export default function AdminDashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading brands:', error);
    } else {
      setBrands(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return;
    const { error } = await supabase.from('brands').delete().eq('id', id);
    if (error) {
      alert('Error deleting brand: ' + error.message);
    } else {
      fetchBrands();
    }
  };

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    const { error } = await supabase.from('brands').update({ is_visible: !isVisible }).eq('id', id);
    if (error) {
      alert('Error updating visibility: ' + error.message);
    } else {
      fetchBrands();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"></h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ✅ SECTION: WHY JOIN */}
      <div id="WhyJoin" className="mb-12">
        <h2 className="text-xl font-semibold mb-2">🟣 Why Join</h2>
        <WhyJoinEditor />
      </div>

      {/* ✅ SECTION: COMMISSION RATE */}
      <div id="CommissionRate" className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Our Brands</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            ➕ Add Brand
          </button>
        </div>
        <AddBrandModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={fetchBrands}
        />
        {loading ? (
          <p>Loading brands...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {brands.map((brand) => (
              <BrandCard
                key={brand.id}
                id={brand.id}
                logoUrl={brand.logo_url}
                name={brand.name}
                commissionTiers={brand.commission_tiers || []}
                commissionType={brand.commission_type}
                isVisible={brand.is_visible}
                onSave={fetchBrands}
                group={brand.group}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ SECTION: CONTACT */}
      <div id="Contact">
      <h2 className="text-xl font-semibold">Contact</h2>
      <ContactEditor />
      </div>

      {/* ✅ SECTION: FAQ */}
      <div id="FAQ" className="mb-12">
        <h2 className="text-xl font-semibold mb-2"></h2>
        <FaqEditor />
      </div>

      {/* ✅ SECTION: LOGIN */}
      <div id="Login" className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Login</h2>
        <AuthEditor />
      </div>

    </div>
  );
}
