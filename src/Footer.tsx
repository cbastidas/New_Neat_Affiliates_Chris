// Footer.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === 'true');
  }, []);

  const handleClick = () => {
    if (isAdmin) {
      navigate('/terms?admin=true');
    } else {
      navigate('/terms');
    }
  };

  return (
    <footer className="w-full bg-white text-center py-6 mt-20 border-t">

      <button
        onClick={handleClick}
        className="mt-2 text-sm text-purple-600 hover:underline"
      >
        Terms & Conditions
      </button>
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Neat Affiliates. All rights reserved.
      </p>
      
    </footer>
  );
}
