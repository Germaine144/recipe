import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, User, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-gray-800">RecipeHub</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-amber-600">
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-amber-600">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user?.image && (
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-gray-700">
                      {user?.firstName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;