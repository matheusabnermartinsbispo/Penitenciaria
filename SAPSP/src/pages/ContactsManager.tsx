import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Search, 
  Users, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  Building,
  Gavel
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  position: string;
  institution: string;
  type: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

const ContactsManager: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Dr. João Silva Pereira',
      position: 'Juiz de Execuções Criminais',
      institution: 'Vara de Execuções Criminais de São Paulo',
      type: 'Judiciário',
      email: 'joao.pereira@tjsp.jus.br',
      phone: '(11) 3333-4444',
      address: 'Foro Criminal - Barra Funda, São Paulo - SP',
      notes: 'Responsável pelos processos de progressão de regime'
    },
    {
      id: '2',
      name: 'Dra. Maria Santos Oliveira',
      position: 'Promotora de Justiça',
      institution: 'Ministério Público de São Paulo',
      type: 'Judiciário',
      email: 'maria.oliveira@mpsp.mp.br',
      phone: '(11) 2222-3333',
      address: 'Promotoria Criminal, São Paulo - SP'
    },
    {
      id: '3',
      name: 'Carlos Roberto Costa',
      position: 'Diretor Técnico',
      institution: 'Penitenciária I de Guarulhos',
      type: 'Administrativo',
      email: 'carlos.costa@sap.sp.gov.br',
      phone: '(11) 4444-5555',
      address: 'Rodovia Presidente Dutra, Guarulhos - SP'
    },
    {
      id: '4',
      name: 'Dr. Paulo Henrique Lima',
      position: 'Médico Psiquiatra',
      institution: 'Hospital de Custódia e Tratamento',
      type: 'Médico',
      email: 'paulo.lima@saude.sp.gov.br',
      phone: '(11) 5555-6666',
      address: 'Hospital de Custódia - Franco da Rocha, SP',
      notes: 'Especialista em avaliações psiquiátricas forenses'
    },
    {
      id: '5',
      name: 'Ana Carolina Ferreira',
      position: 'Defensora Pública',
      institution: 'Defensoria Pública do Estado',
      type: 'Judiciário',
      email: 'ana.ferreira@defensoria.sp.def.br',
      phone: '(11) 6666-7777',
      address: 'Núcleo de Execução Criminal - São Paulo, SP'
    },
    {
      id: '6',
      name: 'Roberto Almeida Santos',
      position: 'Coordenador de Segurança',
      institution: 'Centro de Detenção Provisória',
      type: 'Administrativo',
      email: 'roberto.santos@sap.sp.gov.br',
      phone: '(11) 7777-8888',
      address: 'CDP - Pinheiros, São Paulo - SP'
    }
  ]);

  const contactTypes = ['all', 'Judiciário', 'Administrativo', 'Médico'];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || contact.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleEditContact = (contactId: string) => {
    console.log('Editando contato:', contactId);
    toast.info('Função de edição será implementada');
  };

  const handleDeleteContact = (contactId: string) => {
    console.log('Excluindo contato:', contactId);
    toast.success('Contato excluído com sucesso');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Judiciário': 'bg-purple-100 text-purple-800',
      'Administrativo': 'bg-blue-100 text-blue-800',
      'Médico': 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Judiciário':
        return <Gavel className="h-4 w-4" />;
      case 'Administrativo':
        return <Building className="h-4 w-4" />;
      case 'Médico':
        return <Plus className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
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
            <Users className="h-6 w-6 text-sap-blue" />
            <h1 className="text-2xl font-bold text-gray-900">Contatos Frequentes</h1>
          </div>
          
          <Button className="bg-sap-blue hover:bg-sap-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
        </div>

        {/* Filtros e Busca */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar contatos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por Tipo */}
              <div className="flex gap-2 flex-wrap">
                {contactTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-sap-blue hover:bg-sap-blue/90" : ""}
                  >
                    {type === 'all' ? 'Todos' : type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Contatos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{contact.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{contact.position}</p>
                    <Badge className={`${getTypeColor(contact.type)} mb-2`}>
                      <span className="mr-1">{getTypeIcon(contact.type)}</span>
                      {contact.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                
                {/* Instituição */}
                <div className="flex items-start space-x-2">
                  <Building className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{contact.institution}</span>
                </div>
                
                {/* Email */}
                {contact.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 break-all">{contact.email}</span>
                  </div>
                )}
                
                {/* Telefone */}
                {contact.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{contact.phone}</span>
                  </div>
                )}
                
                {/* Endereço */}
                {contact.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{contact.address}</span>
                  </div>
                )}
                
                {/* Observações */}
                {contact.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 italic">{contact.notes}</p>
                  </div>
                )}
                
                {/* Ações */}
                <div className="flex gap-2 pt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditContact(contact.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum contato encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou adicionar um novo contato.</p>
          </div>
        )}

        {/* Estatísticas */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-sap-blue">{contacts.length}</p>
                <p className="text-sm text-gray-600">Total de Contatos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {contacts.filter(c => c.type === 'Judiciário').length}
                </p>
                <p className="text-sm text-gray-600">Judiciário</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {contacts.filter(c => c.type === 'Administrativo').length}
                </p>
                <p className="text-sm text-gray-600">Administrativo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {contacts.filter(c => c.type === 'Médico').length}
                </p>
                <p className="text-sm text-gray-600">Médico</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactsManager;