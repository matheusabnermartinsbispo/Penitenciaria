import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Clock, 
  Shield,
  BookOpen,
  PlusCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log('Dashboard carregado para usuário:', user?.name);

  const quickActions = [
    {
      title: 'Novo Documento',
      description: 'Criar documento a partir de template',
      icon: <Plus className="h-6 w-6" />,
      action: () => navigate('/editor'),
      color: 'bg-sap-blue hover:bg-sap-blue/90'
    },
    {
      title: 'Gerenciar Templates',
      description: 'Criar e editar modelos de documentos',
      icon: <BookOpen className="h-6 w-6" />,
      action: () => navigate('/templates'),
      color: 'bg-sap-gray hover:bg-sap-gray/90'
    },
    {
      title: 'Contatos Frequentes',
      description: 'Gerenciar lista de contatos',
      icon: <Users className="h-6 w-6" />,
      action: () => navigate('/contacts'),
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const recentTemplates = [
    { name: 'Relatório de Ocorrência Disciplinar', lastUsed: '2 dias atrás', type: 'Relatório' },
    { name: 'Ofício para Vara de Execuções', lastUsed: '3 dias atrás', type: 'Ofício' },
    { name: 'Comunicação de Óbito', lastUsed: '1 semana atrás', type: 'Comunicação' },
    { name: 'Relatório Médico Prisional', lastUsed: '1 semana atrás', type: 'Relatório' },
  ];

  const systemStats = [
    { label: 'Documentos Criados', value: '127', icon: <FileText className="h-5 w-5" /> },
    { label: 'Templates Disponíveis', value: '24', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Contatos Cadastrados', value: '43', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho de Boas-vindas */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role} - {user?.unit}
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={action.action}
                  className={`w-full mt-4 ${action.color} text-white`}
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Estatísticas do Sistema */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-sap-blue" />
                <span>Estatísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="text-sap-blue">{stat.icon}</div>
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold text-sap-blue">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Templates Recentes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-sap-blue" />
                <span>Templates Utilizados Recentemente</span>
              </CardTitle>
              <CardDescription>
                Acesso rápido aos modelos mais utilizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.type} • Usado {template.lastUsed}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/editor')}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Usar Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Avisos e Informações do Sistema */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-sap-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-sap-blue">Informações Importantes</h3>
                <div className="mt-2 space-y-2 text-sm text-blue-800">
                  <p>• Todos os documentos são armazenados localmente e criptografados</p>
                  <p>• Sempre valide os dados antes de gerar documentos oficiais</p>
                  <p>• Templates seguem as normas ABNT e padrões da SAP</p>
                  <p>• Para suporte técnico, entre em contato com a TI da unidade</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;