import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LandingPage from '@/features/landing/LandingPage';
import LoginForm from '@/features/auth/LoginForm';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ProtectedRoute from '@/features/auth/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginForm />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;