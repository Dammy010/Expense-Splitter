import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Expense Splitter
        </Link>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/about" className="hover:underline">About</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/add-bill" className="hover:underline">Add Bill</Link>
              <Link to="/view-shares" className="hover:underline">View Shares</Link>
              <Link to="/settle" className="hover:underline">Settle</Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="hover:underline">Signup</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-blue-700 px-4 py-4 space-y-4 text-base transition-all duration-200 rounded-b shadow">
          <Link to="/about" onClick={closeMenu} className="block">About</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="block">Dashboard</Link>
              <Link to="/add-bill" onClick={closeMenu} className="block">Add Bill</Link>
              <Link to="/view-shares" onClick={closeMenu} className="block">View Shares</Link>
              <Link to="/settle" onClick={closeMenu} className="block">Settle</Link>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-white text-blue-600 px-3 py-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={closeMenu} className="block">Signup</Link>
              <Link to="/login" onClick={closeMenu} className="block">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
