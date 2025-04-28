import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Sistema
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                href="/dashboard"
                className={`nav-link ${router.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/certificados"
                className={`nav-link ${router.pathname === '/certificados' ? 'active' : ''}`}
              >
                Certificados Digitais
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/notas-fiscais"
                className={`nav-link ${router.pathname === '/notas-fiscais' ? 'active' : ''}`}
              >
                Notas Fiscais
              </Link>
            </li>
          </ul>
          <span className="navbar-text me-3">{user.email}</span>
          <button onClick={logout} className="btn btn-outline-light">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}