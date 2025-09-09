import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DocumentEditor from './pages/DocumentEditor';
import TemplateManager from './pages/TemplateManager';
import ContactsManager from './pages/ContactsManager';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  console.log('App carregado, usuário autenticado:', isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/editor" element={<DocumentEditor />} />
      <Route path="/editor/:templateId" element={<DocumentEditor />} />
      <Route path="/templates" element={<TemplateManager />} />
      <Route path="/contacts" element={<ContactsManager />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial do sistema
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('Sistema carregado com sucesso');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sap-blue to-sap-gray flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Sistema de Gestão Penal</h2>
          <p className="text-blue-100 mt-2">Carregando sistema...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#005F9A',
              color: 'white',
            },
          }}
        />
      </div>
    </AuthProvider>
  );
};

export default App;