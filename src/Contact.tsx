import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface ContactInfo {
  id: string;
  icon: string;
  label: string;
  value: string;
  type: string;
}

export default function Contact() {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('created_at', { ascending: true }); // Orden opcional

      if (error) {
        console.error('Error fetching contacts:', error.message);
      } else {
        setContacts(data || []);
      }
    };

    fetchContacts();
  }, []);

  return (
    <section id="Contact" className="text-center py-16">
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="text-gray-600 mb-8">
        Reach out to us via email, Telegram or Microsoft Teams.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {contacts.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow text-left">
            <p className="text-2xl mb-1">{item.icon}</p>
            <p className="font-semibold">{item.label}</p>
            <a
              href={
                item.type === 'email'
                  ? `mailto:${item.value}`
                  : item.type === 'telegram'
                  ? `https://t.me/${item.value.replace('@', '')}`
                  : item.value
              }
              className="text-blue-600 underline break-words"
              target="_blank" rel="noopener noreferrer"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
