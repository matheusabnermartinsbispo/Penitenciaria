import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Shield, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricula || !password) {
      return;
    }

    setLoading(true);
    console.log('Processando login...');
    
    try {
      await login(matricula, password);
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { matricula: 'admin', role: 'Administrador', unit: 'Centro de Detenção' },
    { matricula: 'servidor01', role: 'Agente de Segurança', unit: 'Penitenciária I' },
    { matricula: 'analista01', role: 'Analista Judiciário', unit: 'Vara de Execuções' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sap-blue to-sap-gray flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Painel Esquerdo - Informações do Sistema */}
        <div className="text-white space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="h-12 w-12 text-white" />
            <div>
              <h1 className="text-3xl font-bold">Sistema de Gestão Penal</h1>
              <p className="text-blue-100">Secretaria de Administração Penitenciária</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Automação Documental para Servidores Penais</h2>
            <div className="space-y-3 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Geração automática de relatórios e ofícios</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Templates específicos do sistema penitenciário</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Conformidade com normas ABNT e legislação</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Interface intuitiva tipo Microsoft Word</span>
              </div>
            </div>
          </div>

          {/* Credenciais Demo */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-8">
            <h3 className="text-lg font-semibold mb-3">Credenciais Demo</h3>
            <div className="space-y-2 text-sm">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="bg-white/5 rounded p-2">
                  <div className="font-medium">{cred.matricula} / senha: {cred.matricula}123</div>
                  <div className="text-blue-100 text-xs">{cred.role} - {cred.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Painel Direito - Formulário de Login */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-sap-blue">Acesso ao Sistema</CardTitle>
            <CardDescription>
              Entre com suas credenciais de servidor público
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="matricula" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Matrícula</span>
                </Label>
                <Input
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Senha</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-sap-blue hover:bg-sap-blue/90" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  'Entrar no Sistema'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Sistema destinado exclusivamente a servidores públicos</p>
              <p className="mt-1">da Secretaria de Administração Penitenciária</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;