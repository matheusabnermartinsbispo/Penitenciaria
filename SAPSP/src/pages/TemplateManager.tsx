import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Edit, 
  Trash2, 
  Copy,
  FileText,
  ArrowLeft,
  Calendar,
  Tag,
  Filter,
  SortAsc,
  Star,
  Clock,
  Users,
  Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  lastModified: string;
  usageCount: number;
  tags: string[];
  isOfficial: boolean;
  priority: 'high' | 'medium' | 'low';
}

const TemplateManager: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const [templates] = useState<Template[]>([
    {
      id: 'relatorio-disciplinar',
      name: 'Relatório de Ocorrência Disciplinar',
      description: 'Template para registro de infrações disciplinares no sistema prisional',
      category: 'Relatórios',
      lastModified: '2024-01-15',
      usageCount: 45,
      tags: ['disciplinar', 'infração', 'interno'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'oficio-vara',
      name: 'Ofício para Vara de Execuções',
      description: 'Comunicação oficial com o poder judiciário sobre situação de internos',
      category: 'Ofícios',
      lastModified: '2024-01-10',
      usageCount: 32,
      tags: ['vara', 'judicial', 'comunicação'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'comunicacao-obito',
      name: 'Comunicação de Óbito',
      description: 'Notificação oficial de falecimento no sistema prisional',
      category: 'Comunicações',
      lastModified: '2024-01-08',
      usageCount: 12,
      tags: ['óbito', 'notificação', 'família'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'relatorio-medico',
      name: 'Relatório Médico Prisional',
      description: 'Relatório detalhado sobre condição de saúde de interno',
      category: 'Relatórios',
      lastModified: '2024-01-05',
      usageCount: 28,
      tags: ['médico', 'saúde', 'tratamento'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'solicitacao-transferencia',
      name: 'Solicitação de Transferência',
      description: 'Pedido formal de transferência de interno entre unidades',
      category: 'Solicitações',
      lastModified: '2024-01-12',
      usageCount: 19,
      tags: ['transferência', 'unidade', 'remoção'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'relatorio-progressao',
      name: 'Relatório de Progressão de Regime',
      description: 'Análise para progressão ou regressão de regime prisional',
      category: 'Relatórios',
      lastModified: '2024-01-14',
      usageCount: 23,
      tags: ['progressão', 'regime', 'benefício'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'oficio-mp',
      name: 'Ofício para Ministério Público',
      description: 'Comunicação oficial com o Ministério Público',
      category: 'Ofícios',
      lastModified: '2024-01-11',
      usageCount: 16,
      tags: ['ministério público', 'promotoria', 'comunicação'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'comunicacao-fuga',
      name: 'Comunicação de Fuga',
      description: 'Notificação imediata de fuga do sistema prisional',
      category: 'Comunicações',
      lastModified: '2024-01-09',
      usageCount: 8,
      tags: ['fuga', 'segurança', 'emergência'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'relatorio-visita',
      name: 'Relatório de Controle de Visitas',
      description: 'Registro de ocorrências durante visitas familiares',
      category: 'Relatórios',
      lastModified: '2024-01-07',
      usageCount: 15,
      tags: ['visita', 'família', 'controle'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'auto-apreensao',
      name: 'Auto de Apreensão',
      description: 'Registro formal de apreensão de objetos ilícitos',
      category: 'Autos',
      lastModified: '2024-01-06',
      usageCount: 21,
      tags: ['apreensão', 'objetos', 'revista'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'parecer-juridico',
      name: 'Parecer Jurídico',
      description: 'Análise jurídica de situações específicas do interno',
      category: 'Pareceres',
      lastModified: '2024-01-04',
      usageCount: 11,
      tags: ['jurídico', 'análise', 'legal'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'relatorio-saude-mental',
      name: 'Relatório de Saúde Mental',
      description: 'Avaliação psicológica e psiquiátrica completa',
      category: 'Relatórios',
      lastModified: '2024-01-03',
      usageCount: 9,
      tags: ['psicológico', 'mental', 'avaliação'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'termo-audiencia',
      name: 'Termo de Audiência Disciplinar',
      description: 'Registro formal de audiência disciplinar com interno',
      category: 'Termos',
      lastModified: '2024-01-02',
      usageCount: 13,
      tags: ['audiência', 'disciplinar', 'defesa'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'comunicacao-internacao',
      name: 'Comunicação de Internação Hospitalar',
      description: 'Notificação de internação de interno em hospital',
      category: 'Comunicações',
      lastModified: '2024-01-01',
      usageCount: 7,
      tags: ['hospital', 'internação', 'saúde'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'relatorio-trabalho',
      name: 'Relatório de Atividade Laborativa',
      description: 'Avaliação de desempenho em atividades de trabalho',
      category: 'Relatórios',
      lastModified: '2023-12-30',
      usageCount: 18,
      tags: ['trabalho', 'laborterapia', 'avaliação'],
      isOfficial: true,
      priority: 'low'
    },
    {
      id: 'oficio-defensoria',
      name: 'Ofício para Defensoria Pública',
      description: 'Comunicação com a Defensoria Pública do Estado',
      category: 'Ofícios',
      lastModified: '2023-12-28',
      usageCount: 14,
      tags: ['defensoria', 'defensor', 'público'],
      isOfficial: true,
      priority: 'medium'
    },
    {
      id: 'relatorio-comportamental',
      name: 'Relatório de Avaliação Comportamental',
      description: 'Análise do comportamento carcerário do interno',
      category: 'Relatórios',
      lastModified: '2023-12-25',
      usageCount: 25,
      tags: ['comportamento', 'conduta', 'avaliação'],
      isOfficial: true,
      priority: 'high'
    },
    {
      id: 'comunicacao-nascimento',
      name: 'Comunicação de Nascimento',
      description: 'Registro de nascimento no sistema prisional feminino',
      category: 'Comunicações',
      lastModified: '2023-12-22',
      usageCount: 3,
      tags: ['nascimento', 'feminino', 'registro'],
      isOfficial: true,
      priority: 'low'
    }
  ]);

  const categories = ['all', 'Relatórios', 'Ofícios', 'Comunicações', 'Solicitações', 'Autos', 'Pareceres', 'Termos'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'usage':
        return b.usageCount - a.usageCount;
      case 'date':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleUseTemplate = (templateId: string) => {
    console.log('Usando template:', templateId);
    navigate(`/editor/${templateId}`);
    toast.success('Template carregado no editor');
  };

  const handleEditTemplate = (templateId: string) => {
    console.log('Editando template:', templateId);
    toast.info('Função de edição será implementada');
  };

  const handleDuplicateTemplate = (templateId: string) => {
    console.log('Duplicando template:', templateId);
    toast.success('Template duplicado com sucesso');
  };

  const handleDeleteTemplate = (templateId: string) => {
    console.log('Excluindo template:', templateId);
    toast.success('Template excluído com sucesso');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Relatórios': 'bg-blue-100 text-blue-800',
      'Ofícios': 'bg-green-100 text-green-800',
      'Comunicações': 'bg-purple-100 text-purple-800',
      'Solicitações': 'bg-orange-100 text-orange-800',
      'Autos': 'bg-red-100 text-red-800',
      'Pareceres': 'bg-yellow-100 text-yellow-800',
      'Termos': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <BookOpen className="h-6 w-6 text-sap-blue" />
            <h1 className="text-2xl font-bold text-gray-900">Biblioteca de Templates</h1>
          </div>
          
          <Button className="bg-sap-blue hover:bg-sap-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
        </div>

        {/* Filtros e Busca Aprimorados */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar templates por nome, descrição ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                {/* Categoria */}
                <div className="flex gap-1 flex-wrap">
                  {categories.slice(0, 4).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-sap-blue hover:bg-sap-blue/90" : ""}
                    >
                      {category === 'all' ? 'Todos' : category}
                    </Button>
                  ))}
                </div>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="name">Nome</option>
                  <option value="usage">Mais Usados</option>
                  <option value="date">Recentes</option>
                  <option value="priority">Prioridade</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Templates Aprimorada */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.isOfficial && (
                        <Shield className="h-4 w-4 text-sap-blue" title="Template Oficial SAP" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      <Badge className={getPriorityColor(template.priority)}>
                        {template.priority === 'high' ? 'Alta' : template.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-2">{template.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(template.lastModified).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{template.usageCount}</span>
                    </div>
                  </div>
                  
                  {template.usageCount > 20 && (
                    <Star className="h-4 w-4 text-yellow-500" title="Template Popular" />
                  )}
                </div>
                
                {/* Ações */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-sap-blue hover:bg-sap-blue/90"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Usar
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditTemplate(template.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDuplicateTemplate(template.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {sortedTemplates.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum template encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou criar um novo template.</p>
          </div>
        )}

        {/* Estatísticas Expandidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sap-blue">{templates.length}</p>
              <p className="text-sm text-gray-600">Templates Disponíveis</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sap-blue">{categories.length - 1}</p>
              <p className="text-sm text-gray-600">Categorias</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sap-blue">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total de Usos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sap-blue">
                {templates.filter(t => t.priority === 'high').length}
              </p>
              <p className="text-sm text-gray-600">Alta Prioridade</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sap-blue">
                {templates.filter(t => t.isOfficial).length}
              </p>
              <p className="text-sm text-gray-600">Oficiais SAP</p>
            </CardContent>
          </Card>
        </div>

        {/* Categorias Expandidas */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Filtrar por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? "bg-sap-blue hover:bg-sap-blue/90" : ""} ${
                    category !== 'all' ? getCategoryColor(category) : ''
                  }`}
                >
                  {category === 'all' ? 'Todos os Templates' : `${category} (${templates.filter(t => t.category === category).length})`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateManager;