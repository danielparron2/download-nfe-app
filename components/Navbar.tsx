import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { FaFileDownload, FaIdCard, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">Sistema</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  Dashboard
                </Link>
                <Link href="/certificados" className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/certificados' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  <span className="flex items-center">
                    <FaIdCard className="mr-2" /> Certificados Digitais
                  </span>
                </Link>
                <Link href="/notas-fiscais" className={`px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/notas-fiscais' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  <span className="flex items-center">
                    <FaFileDownload className="mr-2" /> Notas Fiscais
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-gray-300 mr-4">{user.email}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-300 hover:text-white flex items-center"
              >
                <FaSignOutAlt className="mr-1" /> Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu responsivo para mobile */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${
            router.pathname === '/dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}>
            Dashboard
          </Link>
          <Link href="/certificados" className={`block px-3 py-2 rounded-md text-base font-medium ${
            router.pathname === '/certificados' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}>
            <span className="flex items-center">
              <FaIdCard className="mr-2" /> Certificados Digitais
            </span>
          </Link>
          <Link href="/notas-fiscais" className={`block px-3 py-2 rounded-md text-base font-medium ${
            router.pathname === '/notas-fiscais' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}>
            <span className="flex items-center">
              <FaFileDownload className="mr-2" /> Notas Fiscais
            </span>
          </Link>
          <button
            onClick={logout}
            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <span className="flex items-center">
              <FaSignOutAlt className="mr-2" /> Sair
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}