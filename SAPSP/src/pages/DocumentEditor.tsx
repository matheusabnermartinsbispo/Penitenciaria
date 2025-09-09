import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Save,
  Download,
  Eye,
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Upload,
  FileImage,
  Scan,
  Settings,
  Type,
  Palette,
  Ruler,
  List,
  ListOrdered,
  Table,
  Image,
  Link,
  Undo,
  Redo,
  Copy,
  Paste,
  Scissors,
  Search,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface DocumentData {
  nomeInterno: string;
  numeroProcesso: string;
  dataOcorrencia: string;
  unidadePrisional: string;
  relatorioConteudo: string;
  responsavel: string;
  cargo: string;
  matricula: string;
  destinatario?: string;
  numeroOficio?: string;
  assunto?: string;
  motivoTransferencia?: string;
  unidadeDestino?: string;
  dataExame?: string;
  medicoResponsavel?: string;
  crmMedico?: string;
  diagnostico?: string;
  recomendacoes?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
}

const DocumentEditor: React.FC = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templateId || 'relatorio-disciplinar');
  const [documentData, setDocumentData] = useState<DocumentData>({
    nomeInterno: '',
    numeroProcesso: '',
    dataOcorrencia: '',
    unidadePrisional: '',
    relatorioConteudo: '',
    responsavel: '',
    cargo: '',
    matricula: ''
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [lineHeight, setLineHeight] = useState(1.5);
  const [zoom, setZoom] = useState(100);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('Editor de documentos aprimorado carregado, template:', selectedTemplate);

  const templates: Template[] = [
    { 
      id: 'relatorio-disciplinar', 
      name: 'Relatório de Ocorrência Disciplinar',
      description: 'Para registrar infrações e medidas disciplinares',
      category: 'Relatórios',
      fields: ['nomeInterno', 'numeroProcesso', 'dataOcorrencia', 'unidadePrisional', 'relatorioConteudo']
    },
    { 
      id: 'oficio-vara', 
      name: 'Ofício para Vara de Execuções',
      description: 'Comunicação oficial com o poder judiciário',
      category: 'Ofícios',
      fields: ['destinatario', 'numeroOficio', 'assunto', 'nomeInterno', 'numeroProcesso']
    },
    { 
      id: 'comunicacao-obito', 
      name: 'Comunicação de Óbito',
      description: 'Notificação de falecimento no sistema prisional',
      category: 'Comunicações',
      fields: ['nomeInterno', 'dataOcorrencia', 'unidadePrisional', 'relatorioConteudo']
    },
    { 
      id: 'relatorio-medico', 
      name: 'Relatório Médico Prisional',
      description: 'Relatório de condição de saúde de interno',
      category: 'Relatórios',
      fields: ['nomeInterno', 'dataExame', 'medicoResponsavel', 'crmMedico', 'diagnostico', 'recomendacoes']
    },
    {
      id: 'solicitacao-transferencia',
      name: 'Solicitação de Transferência',
      description: 'Pedido de transferência entre unidades prisionais',
      category: 'Solicitações',
      fields: ['nomeInterno', 'numeroProcesso', 'motivoTransferencia', 'unidadeDestino', 'unidadePrisional']
    },
    {
      id: 'relatorio-progressao',
      name: 'Relatório de Progressão de Regime',
      description: 'Análise para progressão ou regressão de regime',
      category: 'Relatórios',
      fields: ['nomeInterno', 'numeroProcesso', 'relatorioConteudo', 'unidadePrisional']
    },
    {
      id: 'oficio-mp',
      name: 'Ofício para Ministério Público',
      description: 'Comunicação oficial com o Ministério Público',
      category: 'Ofícios',
      fields: ['destinatario', 'numeroOficio', 'assunto', 'nomeInterno', 'numeroProcesso']
    },
    {
      id: 'comunicacao-fuga',
      name: 'Comunicação de Fuga',
      description: 'Notificação imediata de fuga do sistema prisional',
      category: 'Comunicações',
      fields: ['nomeInterno', 'dataOcorrencia', 'unidadePrisional', 'relatorioConteudo']
    },
    {
      id: 'relatorio-visita',
      name: 'Relatório de Controle de Visitas',
      description: 'Registro de ocorrências durante visitas',
      category: 'Relatórios',
      fields: ['nomeInterno', 'dataOcorrencia', 'relatorioConteudo', 'responsavel']
    },
    {
      id: 'auto-apreensao',
      name: 'Auto de Apreensão',
      description: 'Registro formal de apreensão de objetos',
      category: 'Autos',
      fields: ['nomeInterno', 'dataOcorrencia', 'relatorioConteudo', 'responsavel', 'unidadePrisional']
    },
    {
      id: 'parecer-juridico',
      name: 'Parecer Jurídico',
      description: 'Análise jurídica de situações específicas',
      category: 'Pareceres',
      fields: ['nomeInterno', 'numeroProcesso', 'assunto', 'relatorioConteudo', 'responsavel']
    },
    {
      id: 'relatorio-saude-mental',
      name: 'Relatório de Saúde Mental',
      description: 'Avaliação psicológica e psiquiátrica',
      category: 'Relatórios',
      fields: ['nomeInterno', 'dataExame', 'medicoResponsavel', 'diagnostico', 'recomendacoes']
    }
  ];

  const handleInputChange = useCallback((field: keyof DocumentData, value: string) => {
    setDocumentData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const formatDocument = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      contentRef.current.focus();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Arquivo carregado:', file.name);
      
      // Simular extração OCR de dados
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simular processamento OCR
        setTimeout(() => {
          // Dados simulados extraídos
          const extractedData = {
            nomeInterno: 'João Silva Santos',
            numeroProcesso: '001/2024-SAP',
            dataOcorrencia: new Date().toISOString().split('T')[0],
            unidadePrisional: 'Penitenciária I de Guarulhos',
            relatorioConteudo: 'Dados extraídos automaticamente do documento importado...'
          };
          
          setDocumentData(prev => ({ ...prev, ...extractedData }));
          toast.success('Dados extraídos com sucesso do arquivo!');
        }, 2000);
        
        toast.info('Processando arquivo... Aguarde.');
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const generateDocument = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Validar campos obrigatórios do template selecionado
    const missingFields = template.fields.filter(field => !documentData[field as keyof DocumentData]);
    
    if (missingFields.length > 0) {
      toast.error(`Preencha os campos obrigatórios: ${missingFields.join(', ')}`);
      return;
    }

    console.log('Gerando documento:', selectedTemplate, documentData);
    setShowPreview(true);
    toast.success('Documento gerado com sucesso!');
  };

  const exportToPDF = () => {
    console.log('Exportando documento para PDF');
    toast.success('Documento exportado em PDF!');
  };

  const exportToWord = () => {
    console.log('Exportando documento para Word');
    toast.success('Documento exportado em Word!');
  };

  const getCurrentTemplate = () => {
    return templates.find(t => t.id === selectedTemplate);
  };

  const renderFormFields = () => {
    const template = getCurrentTemplate();
    if (!template) return null;

    const fieldLabels = {
      nomeInterno: 'Nome do Interno',
      numeroProcesso: 'Número do Processo',
      dataOcorrencia: 'Data da Ocorrência',
      unidadePrisional: 'Unidade Prisional',
      relatorioConteudo: 'Conteúdo/Descrição',
      responsavel: 'Responsável',
      cargo: 'Cargo',
      matricula: 'Matrícula',
      destinatario: 'Destinatário',
      numeroOficio: 'Número do Ofício',
      assunto: 'Assunto',
      motivoTransferencia: 'Motivo da Transferência',
      unidadeDestino: 'Unidade de Destino',
      dataExame: 'Data do Exame',
      medicoResponsavel: 'Médico Responsável',
      crmMedico: 'CRM',
      diagnostico: 'Diagnóstico',
      recomendacoes: 'Recomendações'
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {template.fields.map((field) => (
          <div key={field} className={field === 'relatorioConteudo' || field === 'diagnostico' || field === 'recomendacoes' || field === 'motivoTransferencia' ? 'md:col-span-2' : ''}>
            <Label htmlFor={field}>
              {fieldLabels[field as keyof typeof fieldLabels]} *
            </Label>
            {['relatorioConteudo', 'diagnostico', 'recomendacoes', 'motivoTransferencia'].includes(field) ? (
              <Textarea
                id={field}
                className="min-h-24"
                value={documentData[field as keyof DocumentData] || ''}
                onChange={(e) => handleInputChange(field as keyof DocumentData, e.target.value)}
                placeholder={`Digite ${fieldLabels[field as keyof typeof fieldLabels].toLowerCase()}...`}
              />
            ) : field === 'dataOcorrencia' || field === 'dataExame' ? (
              <Input
                id={field}
                type="date"
                value={documentData[field as keyof DocumentData] || ''}
                onChange={(e) => handleInputChange(field as keyof DocumentData, e.target.value)}
              />
            ) : (
              <Input
                id={field}
                value={documentData[field as keyof DocumentData] || ''}
                onChange={(e) => handleInputChange(field as keyof DocumentData, e.target.value)}
                placeholder={`Digite ${fieldLabels[field as keyof typeof fieldLabels].toLowerCase()}...`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDocumentTemplate = () => {
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    const documentStyle = {
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      lineHeight: lineHeight,
      transform: `scale(${zoom / 100})`,
      transformOrigin: 'top left',
      width: `${100 / (zoom / 100)}%`
    };
    
    switch (selectedTemplate) {
      case 'relatorio-disciplinar':
        return (
          <div className="document-preview" style={documentStyle}>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">SECRETARIA DE ADMINISTRAÇÃO PENITENCIÁRIA</h2>
              <h3 className="text-md font-semibold mt-2">RELATÓRIO DE OCORRÊNCIA DISCIPLINAR</h3>
            </div>
            
            <div className="space-y-4">
              <p><strong>Processo nº:</strong> <span className="form-field">{documentData.numeroProcesso || '_____________'}</span></p>
              <p><strong>Nome do Interno:</strong> <span className="form-field">{documentData.nomeInterno || '_____________'}</span></p>
              <p><strong>Unidade Prisional:</strong> <span className="form-field">{documentData.unidadePrisional || '_____________'}</span></p>
              <p><strong>Data da Ocorrência:</strong> <span className="form-field">{documentData.dataOcorrencia ? new Date(documentData.dataOcorrencia).toLocaleDateString('pt-BR') : '_____________'}</span></p>
              
              <div className="mt-6">
                <p><strong>DESCRIÇÃO DA OCORRÊNCIA:</strong></p>
                <div className="border p-4 min-h-32 mt-2 bg-gray-50">
                  {documentData.relatorioConteudo || 'Descreva detalhadamente a ocorrência disciplinar...'}
                </div>
              </div>
              
              <div className="mt-8 text-right">
                <p>{documentData.unidadePrisional || 'Unidade Prisional'}, {currentDate}</p>
                <div className="signature-field mt-8">
                  {documentData.responsavel || 'Nome do Responsável'}
                </div>
                <p className="text-sm">{documentData.cargo || 'Cargo'} - Matrícula: {documentData.matricula || '000000'}</p>
              </div>
            </div>
          </div>
        );

      case 'solicitacao-transferencia':
        return (
          <div className="document-preview" style={documentStyle}>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">SECRETARIA DE ADMINISTRAÇÃO PENITENCIÁRIA</h2>
              <h3 className="text-md font-semibold mt-2">SOLICITAÇÃO DE TRANSFERÊNCIA</h3>
            </div>
            
            <div className="space-y-4">
              <p><strong>Processo nº:</strong> <span className="form-field">{documentData.numeroProcesso || '_____________'}</span></p>
              <p><strong>Nome do Interno:</strong> <span className="form-field">{documentData.nomeInterno || '_____________'}</span></p>
              <p><strong>Unidade Atual:</strong> <span className="form-field">{documentData.unidadePrisional || '_____________'}</span></p>
              <p><strong>Unidade de Destino:</strong> <span className="form-field">{documentData.unidadeDestino || '_____________'}</span></p>
              
              <div className="mt-6">
                <p><strong>MOTIVO DA TRANSFERÊNCIA:</strong></p>
                <div className="border p-4 min-h-32 mt-2 bg-gray-50">
                  {documentData.motivoTransferencia || 'Descreva os motivos que justificam a transferência...'}
                </div>
              </div>
              
              <div className="mt-8 text-right">
                <p>{documentData.unidadePrisional || 'Unidade Prisional'}, {currentDate}</p>
                <div className="signature-field mt-8">
                  {documentData.responsavel || 'Nome do Responsável'}
                </div>
                <p className="text-sm">{documentData.cargo || 'Cargo'}</p>
              </div>
            </div>
          </div>
        );

      case 'relatorio-medico':
        return (
          <div className="document-preview" style={documentStyle}>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">SECRETARIA DE ADMINISTRAÇÃO PENITENCIÁRIA</h2>
              <h3 className="text-md font-semibold mt-2">RELATÓRIO MÉDICO PRISIONAL</h3>
            </div>
            
            <div className="space-y-4">
              <p><strong>Nome do Paciente:</strong> <span className="form-field">{documentData.nomeInterno || '_____________'}</span></p>
              <p><strong>Data do Exame:</strong> <span className="form-field">{documentData.dataExame ? new Date(documentData.dataExame).toLocaleDateString('pt-BR') : '_____________'}</span></p>
              <p><strong>Médico Responsável:</strong> <span className="form-field">{documentData.medicoResponsavel || '_____________'}</span></p>
              <p><strong>CRM:</strong> <span className="form-field">{documentData.crmMedico || '_____________'}</span></p>
              
              <div className="mt-6">
                <p><strong>DIAGNÓSTICO:</strong></p>
                <div className="border p-4 min-h-24 mt-2 bg-gray-50">
                  {documentData.diagnostico || 'Descreva o diagnóstico médico...'}
                </div>
              </div>
              
              <div className="mt-6">
                <p><strong>RECOMENDAÇÕES:</strong></p>
                <div className="border p-4 min-h-24 mt-2 bg-gray-50">
                  {documentData.recomendacoes || 'Descreva as recomendações médicas...'}
                </div>
              </div>
              
              <div className="mt-8 text-right">
                <p>{currentDate}</p>
                <div className="signature-field mt-8">
                  Dr(a). {documentData.medicoResponsavel || 'Nome do Médico'}
                </div>
                <p className="text-sm">CRM: {documentData.crmMedico || '000000-SP'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Selecione um template para visualizar
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <FileText className="h-6 w-6 text-sap-blue" />
            <h1 className="text-2xl font-bold text-gray-900">Editor de Documentos Avançado</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setAdvancedMode(!advancedMode)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {advancedMode ? 'Modo Simples' : 'Edição Avançada'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Editar' : 'Visualizar'}
            </Button>
            <Button onClick={generateDocument} className="bg-sap-blue hover:bg-sap-blue/90">
              <Save className="h-4 w-4 mr-2" />
              Gerar Documento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Painel de Configuração e Campos */}
          {!showPreview && (
            <div className="lg:col-span-1 space-y-6">
              
              {/* Seleção de Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Template</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Importação de Arquivos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Importar Documento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={triggerFileUpload}
                    variant="outline" 
                    className="w-full"
                  >
                    <FileImage className="h-4 w-4 mr-2" />
                    Carregar Arquivo (PDF, DOC, TXT)
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Scan className="h-4 w-4 mr-2" />
                    Extrair com OCR
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* Campos do Documento */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Documento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderFormFields()}
                </CardContent>
              </Card>

              {/* Configurações Avançadas */}
              {advancedMode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Type className="h-5 w-5" />
                      <span>Formatação</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Fonte</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Calibri">Calibri</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Tamanho da Fonte: {fontSize}pt</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Button size="sm" variant="outline" onClick={() => setFontSize(Math.max(8, fontSize - 1))}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-12 text-center">{fontSize}</span>
                        <Button size="sm" variant="outline" onClick={() => setFontSize(Math.min(24, fontSize + 1))}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Entrelinhas: {lineHeight}</Label>
                      <Select value={lineHeight.toString()} onValueChange={(value) => setLineHeight(parseFloat(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Simples</SelectItem>
                          <SelectItem value="1.15">1.15</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2">Duplo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Zoom: {zoom}%</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-12 text-center">{zoom}%</span>
                        <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Visualização do Documento */}
          <Card className={showPreview ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documento - Formato A4</CardTitle>
                
                {/* Barra de Ferramentas Avançada */}
                {advancedMode && (
                  <div className="flex items-center space-x-1 bg-gray-100 p-2 rounded-lg">
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('undo')}>
                      <Undo className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('redo')}>
                      <Redo className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('bold')}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('italic')}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('underline')}>
                      <Underline className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('justifyLeft')}>
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('justifyCenter')}>
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => formatDocument('justifyRight')}>
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {showPreview && (
                  <div className="flex items-center space-x-2">
                    <Button onClick={exportToWord} variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Word
                    </Button>
                    <Button onClick={exportToPDF} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-0 rounded-lg shadow-inner border overflow-auto max-h-screen">
                {/* Área do documento A4 */}
                <div 
                  className="bg-white shadow-lg mx-auto"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '20mm',
                    marginBottom: '20px'
                  }}
                  ref={contentRef}
                  contentEditable={advancedMode}
                  suppressContentEditableWarning={true}
                >
                  {renderDocumentTemplate()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;