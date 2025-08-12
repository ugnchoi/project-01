import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ShadcnLayout from './layouts/ShadcnLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ShadcnLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ShadcnLayout>
      </Router>
    </AuthProvider>
  );
};

export default App;
