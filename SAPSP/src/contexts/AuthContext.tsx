import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  role: string;
  unit: string;
  matricula: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (matricula: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados simulados de usuários (em produção seria integrado com sistema real)
const mockUsers = [
  {
    id: '1',
    matricula: 'admin',
    password: 'admin123',
    name: 'Administrador do Sistema',
    role: 'Diretor',
    unit: 'Centro de Detenção Provisória'
  },
  {
    id: '2',
    matricula: 'servidor01',
    password: 'servidor123',
    name: 'João Silva Santos',
    role: 'Agente de Segurança Penitenciária',
    unit: 'Penitenciária I de Guarulhos'
  },
  {
    id: '3',
    matricula: 'analista01',
    password: 'analista123',
    name: 'Maria Oliveira Costa',
    role: 'Analista Judiciário',
    unit: 'Vara de Execuções Criminais'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      // Verifica se há sessão salva no localStorage
      const savedUser = localStorage.getItem('sap_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        console.log('Sessão recuperada para usuário:', userData.name);
      }
    } catch (error) {
      console.error('Erro ao recuperar sessão:', error);
      localStorage.removeItem('sap_user');
    }
  }, []);

  const login = async (matricula: string, password: string): Promise<boolean> => {
    console.log('Tentativa de login para matrícula:', matricula);
    
    try {
      // Simula validação de credenciais
      const foundUser = mockUsers.find(
        u => u.matricula === matricula && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          role: foundUser.role,
          unit: foundUser.unit,
          matricula: foundUser.matricula
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('sap_user', JSON.stringify(userData));
        
        toast.success(`Bem-vindo, ${foundUser.name}!`);
        console.log('Login realizado com sucesso');
        return true;
      } else {
        toast.error('Matrícula ou senha inválida');
        console.log('Falha na autenticação');
        return false;
      }
    } catch (error) {
      console.error('Erro no processo de login:', error);
      toast.error('Erro interno do sistema');
      return false;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('sap_user');
      toast.info('Sessão encerrada');
      console.log('Logout realizado');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};