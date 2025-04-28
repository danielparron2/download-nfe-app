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
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main className="container py-4">{children}</main>
      </div>
    </ProtectedRoute>
  ) : (
    <div className="min-vh-100 bg-light">
      <main className="container py-4">{children}</main>
    </div>
  );
}
