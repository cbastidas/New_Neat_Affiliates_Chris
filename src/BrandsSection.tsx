import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

interface Brand {
  id: number;
  name: string;
  logo_url: string;
}

export default function BrandLogoGallery() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('id, name, logo_url');

      if (error) {
        console.error('Error fetching brands:', error.message);
      } else if (data) {
        setBrands(data);
      }
    };

    fetchBrands();
  }, []);

  // Si no hay logos aún, evitamos mostrar vacío
  if (brands.length === 0) return null;

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-purple-700">Our Brands</h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee gap-8 w-max">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
              >
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="max-h-[60px] w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
            display: flex;
            width: fit-content;
          }
        `}
      </style>
    </section>
  );
}
