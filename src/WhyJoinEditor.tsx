import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface WhyJoinCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export default function WhyJoinEditor() {
  const [cards, setCards] = useState<WhyJoinCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('why_join')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching cards:', error);
    } else {
      setCards(data || []);
    }
    setLoading(false);
  };

  const handleChange = (id: string, field: keyof WhyJoinCard, value: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const handleSave = async (card: WhyJoinCard) => {
    const { error } = await supabase.from('why_join').update({
      icon: card.icon,
      title: card.title,
      description: card.description,
      order: card.order,
    }).eq('id', card.id);

    if (error) {
      alert('Error updating card: ' + error.message);
    } else {
      alert('✅ Card updated!');
      fetchCards();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('why_join').delete().eq('id', id);
    if (error) {
      alert('Error deleting card: ' + error.message);
    } else {
      fetchCards();
    }
  };

  const handleAdd = async () => {
    const { data, error } = await supabase.from('why_join').insert({
      icon: '✨',
      title: 'New Title',
      description: 'New description',
      order: cards.length,
    }).select();

    if (error) {
      alert('Error adding card: ' + error.message);
    } else {
      fetchCards();
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="flex items-center justify-between flex-wrap mb-6">
      <div className="w-full text-center mb-2">
        <h2 className="text-2xl font-bold">Edit "Why Join Neat Affiliates"</h2>
      </div>

      <div className="w-full flex justify-end">
        <button
           onClick={handleAdd}
           className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
           ➕ Add Card
        </button>
        </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="border rounded p-4 shadow">
              <div className="mb-2">
                <label className="block text-sm font-medium">Icon (emoji)</label>
                <input
                  type="text"
                  value={card.icon}
                  onChange={(e) => handleChange(card.id, 'icon', e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleChange(card.id, 'title', e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={card.description}
                  onChange={(e) => handleChange(card.id, 'description', e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleSave(card)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
