import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export default function Layout({ children, requireAuth = true }: LayoutProps) {
  return requireAuth ? (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  ) : (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}