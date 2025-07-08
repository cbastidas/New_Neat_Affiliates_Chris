import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface ContactInfo {
  id: string;
  icon: string;
  label: string;
  value: string;
  type: string;
}

export default function ContactEditor() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [newContact, setNewContact] = useState<Omit<ContactInfo, 'id'>>({
    icon: '',
    label: '',
    value: '',
    type: '',
  });

  // Control de edición
  const [editedContacts, setEditedContacts] = useState<Record<string, ContactInfo>>({});

  const fetchContacts = async () => {
    const { data } = await supabase.from('contact_info').select('*');
    if (data) setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    const { error } = await supabase.from('contact_info').insert([newContact]);
    if (!error) {
      setNewContact({ icon: '', label: '', value: '', type: '' });
      fetchContacts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('contact_info').delete().eq('id', id);
    if (!error) fetchContacts();
  };

  const handleEditChange = (id: string, field: keyof ContactInfo, value: string) => {
    setEditedContacts((prev) => ({
      ...prev,
      [id]: {
        ...contacts.find((c) => c.id === id)!,
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (id: string) => {
    const updated = editedContacts[id];
    if (!updated) return;

    const { error } = await supabase.from('contact_info').update(updated).eq('id', id);
    if (!error) {
      const updatedContacts = { ...editedContacts };
      delete updatedContacts[id];
      setEditedContacts(updatedContacts);
      fetchContacts();
    }
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex flex-wrap gap-2">
        <input
          placeholder="Icon (emoji)"
          value={newContact.icon}
          onChange={(e) => setNewContact({ ...newContact, icon: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Label"
          value={newContact.label}
          onChange={(e) => setNewContact({ ...newContact, label: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Value"
          value={newContact.value}
          onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <select
          value={newContact.type}
          onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Type</option>
          <option value="email">Email</option>
          <option value="telegram">Telegram</option>
          <option value="teams">Teams</option>
        </select>
        <button onClick={handleAdd} className="bg-purple-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      {contacts.map((c) => {
        const edited = editedContacts[c.id] || c;

        return (
          <div key={c.id} className="flex gap-2 items-center">
            <input
              value={edited.icon}
              onChange={(e) => handleEditChange(c.id, 'icon', e.target.value)}
              className="border p-1 rounded w-16 text-center"
            />
            <input
              value={edited.label}
              onChange={(e) => handleEditChange(c.id, 'label', e.target.value)}
              className="border p-1 rounded"
            />
            <input
              value={edited.value}
              onChange={(e) => handleEditChange(c.id, 'value', e.target.value)}
              className="border p-1 rounded flex-1"
            />
            <select
              value={edited.type}
              onChange={(e) => handleEditChange(c.id, 'type', e.target.value)}
              className="border p-1 rounded"
            >
              <option value="email">Email</option>
              <option value="telegram">Telegram</option>
              <option value="teams">Teams</option>
            </select>

            <button
              onClick={() => handleUpdate(c.id)}
              className="text-green-600 hover:underline ml-2"
            >
              Update
            </button>

            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-500 hover:underline ml-2"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
