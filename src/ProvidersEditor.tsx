import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface ProvidersEditor {
  id: string;
  name: string;
  type: 'payment' | 'game';
  logo_url: string;
}

export default function ProvidersEditor() {
  const [providers, setProviders] = useState<ProvidersEditor[]>([]);
  const [newProvider, setNewProvider] = useState<Partial<ProvidersEditor> & { file?: File | null }>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProvider, setEditedProvider] = useState<Partial<ProvidersEditor> & { file?: File | null }>({});

  const fetchProviders = async () => {
    const { data, error } = await supabase.from('providers').select('*');
    if (!error) setProviders(data || []);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const uploadLogo = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('providerlogos').upload(fileName, file);
    if (error) throw new Error(error.message);
    return `https://acjvweypsumucqdjpwol.supabase.co/storage/v1/object/public/providerlogos/${fileName}`;
  };

  const handleAdd = async () => {
    let logo_url = '';
    if (newProvider.file) {
      try {
        logo_url = await uploadLogo(newProvider.file);
      } catch {
        alert('❌ Failed to upload logo');
        return;
      }
    }

    const { error } = await supabase.from('providers').insert({
      name: newProvider.name,
      type: newProvider.type,
      logo_url,
    });

    if (!error) {
      alert('✅ Provider added successfully');
      setNewProvider({});
      fetchProviders();
    } else {
      alert('❌ Failed to add provider');
    }
  };

  const handleSave = async (id: string) => {
    let logo_url = editedProvider.logo_url || '';
    if (editedProvider.file) {
      try {
        logo_url = await uploadLogo(editedProvider.file);
      } catch {
        alert('❌ Failed to upload logo');
        return;
      }
    }

    const { error } = await supabase
      .from('providers')
      .update({
        name: editedProvider.name,
        type: editedProvider.type,
        logo_url,
      })
      .eq('id', id);

    if (!error) {
      alert('✅ Provider updated');
      setEditingId(null);
      fetchProviders();
    } else {
      alert('❌ Failed to update provider');
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('providers').delete().eq('id', id);
    if (!error) {
      alert('🗑️ Provider deleted');
      fetchProviders();
    } else {
      alert('❌ Failed to delete provider');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">🧩 Edit Providers</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Name"
          className="border px-2 py-1 rounded"
          value={newProvider.name || ''}
          onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
        />
        <select
          value={newProvider.type || ''}
          className="border px-2 py-1 rounded"
          onChange={(e) => setNewProvider({ ...newProvider, type: e.target.value as 'payment' | 'game' })}
        >
          <option value="">Type</option>
          <option value="payment">Payment</option>
          <option value="game">Game</option>
        </select>
        <input
          type="file"
          onChange={(e) => setNewProvider({ ...newProvider, file: e.target.files?.[0] || null })}
        />
        <button onClick={handleAdd} className="bg-purple-600 text-white px-4 py-1 rounded">
          ➕ Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white p-4 rounded shadow">
            {editingId === provider.id ? (
              <>
                <input
                  value={editedProvider.name || ''}
                  onChange={(e) => setEditedProvider({ ...editedProvider, name: e.target.value })}
                  className="w-full mb-2 border px-2 py-1 rounded"
                />
                <select
                  value={editedProvider.type || ''}
                  onChange={(e) => setEditedProvider({ ...editedProvider, type: e.target.value as 'payment' | 'game' })}
                  className="w-full mb-2 border px-2 py-1 rounded"
                >
                  <option value="payment">Payment</option>
                  <option value="game">Game</option>
                </select>
                <input
                  type="file"
                  onChange={(e) => setEditedProvider({ ...editedProvider, file: e.target.files?.[0] || null })}
                  className="mb-2"
                />
                <button onClick={() => handleSave(provider.id)} className="text-green-600 mr-2">Save</button>
                <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
              </>
            ) : (
              <>
                {provider.logo_url && (
                  <img src={provider.logo_url} alt={provider.name} className="h-12 object-contain mb-2" />
                )}
                <h4 className="font-bold text-sm mb-1">{provider.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{provider.type}</p>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setEditingId(provider.id);
                    setEditedProvider(provider);
                  }} className="text-blue-600 text-sm">Edit</button>
                  <button onClick={() => handleDelete(provider.id)} className="text-red-600 text-sm">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
