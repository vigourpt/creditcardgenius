import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User, X } from 'lucide-react';

export default function AuthButton() {
  const { user, signInWithGoogle, logout, isAdmin, error, clearError } = useAuth();

  return (
    <div className="relative">
      {/* Error Alert */}
      {error && (
        <div className="absolute top-0 right-0 transform translate-y-[-120%] w-72 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-sm">{error}</p>
            <button
              onClick={clearError}
              className="ml-2 inline-flex text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Auth Button */}
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="h-8 w-8 rounded-full border-2 border-white/20"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="text-sm">
              <p className="font-medium text-white">
                {user.displayName || user.email?.split('@')[0]}
              </p>
              {isAdmin && (
                <p className="text-xs text-indigo-200">Admin</p>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center px-3 py-1.5 border border-white/20 text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In with Google
        </button>
      )}
    </div>
  );
}