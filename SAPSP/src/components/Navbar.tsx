import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Home, FileText, BookOpen, Users, Settings, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <Home className="h-4 w-4" />, path: '/' },
    { label: 'Editor', icon: <FileText className="h-4 w-4" />, path: '/editor' },
    { label: 'Templates', icon: <BookOpen className="h-4 w-4" />, path: '/templates' },
    { label: 'Contatos', icon: <Users className="h-4 w-4" />, path: '/contacts' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo e Nome do Sistema */}
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-sap-blue" />
            <div>
              <h1 className="text-lg font-bold text-sap-blue">Sistema de Gestão Penal</h1>
              <p className="text-xs text-gray-500">Secretaria de Administração Penitenciária</p>
            </div>
          </div>

          {/* Menu de Navegação */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-2 text-gray-600 hover:text-sap-blue hover:bg-blue-50"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Informações do Usuário e Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;