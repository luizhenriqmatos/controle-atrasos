import { useState, useEffect } from 'react';

// Cores Oficiais: Preto, Azul Escuro (#000033) e Branco
const COLABORADORES = [
  "André",
  "Cleyton",
  "Danilo",
  "Henrique Lebre",
  "Henrique Matos",
  "Kostantinos",
  "Liesley",
  "Nailson",
  "Thiago Sodré",
  "Thiago Vitoria"
];

// ⚠️ SEGURANÇA: Senha deve vir de variáveis de ambiente durante build
// Use hashing (bcrypt) em produção
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || "admin123"; // Temporário para dev

interface ColaboradorDados {
  nome: string;
  atrasoData: string;
  remotosPerdidos: number;
}

interface AppState {
  dados: ColaboradorDados[];
  isAdmin: boolean;
  senhaInput: string;
  isLoaded: boolean;
  sessionTimeout: number;
  tentativasFalhadas: number;
}

const STORAGE_KEY = 'atrasos_escritorio';
const MAX_TENTATIVAS = 5;
const TIMEOUT_SESSAO = 30 * 60 * 1000; // 30 minutos

/**
 * Gera a tabela inicial com dados padrão
 */
const getInitialData = (): ColaboradorDados[] => {
  return COLABORADORES.map(nome => ({
    nome,
    atrasoData: "",
    remotosPerdidos: 0
  }));
};

/**
 * Valida e sanitiza dados antes de salvar
 */
const validateAndSanitize = (data: ColaboradorDados[]): ColaboradorDados[] => {
  return data.map(item => ({
    nome: String(item.nome).trim().substring(0, 100),
    atrasoData: String(item.atrasoData || "").trim().substring(0, 500),
    remotosPerdidos: Math.max(0, Math.floor(item.remotosPerdidos || 0))
  }));
};

/**
 * Carrega dados do localStorage com fallback
 */
const loadDataFromStorage = (): ColaboradorDados[] => {
  try {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
      const parsed = JSON.parse(dadosSalvos);
      if (Array.isArray(parsed)) {
        return validateAndSanitize(parsed);
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  return getInitialData();
};

/**
 * Salva dados no localStorage com validação
 */
const saveDataToStorage = (data: ColaboradorDados[]): void => {
  try {
    const sanitized = validateAndSanitize(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export default function App() {
  const [state, setState] = useState<AppState>({
    dados: [],
    isAdmin: false,
    senhaInput: "",
    isLoaded: false,
    sessionTimeout: 0,
    tentativasFalhadas: 0
  });

  // Carrega dados ao montar componente
  useEffect(() => {
    const dados = loadDataFromStorage();
    setState(prev => ({ ...prev, dados, isLoaded: true }));
  }, []);

  // Salva dados sempre que mudam
  useEffect(() => {
    if (state.isLoaded) {
      saveDataToStorage(state.dados);
    }
  }, [state.dados, state.isLoaded]);

  // Timer de sessão - logout automático após inatividade
  useEffect(() => {
    if (!state.isAdmin) return;

    const timer = setTimeout(() => {
      handleLogout();
    }, TIMEOUT_SESSAO);

    return () => clearTimeout(timer);
  }, [state.isAdmin]);

  /**
   * Autentica usuário (implementação simples - melhorar em produção)
   */
  const handleLogin = () => {
    if (state.tentativasFalhadas >= MAX_TENTATIVAS) {
      alert("Demasiadas tentativas falhadas. Tente novamente mais tarde.");
      return;
    }

    if (state.senhaInput === ADMIN_PASSWORD) {
      setState(prev => ({
        ...prev,
        isAdmin: true,
        senhaInput: "",
        tentativasFalhadas: 0
      }));
    } else {
      const tentativas = state.tentativasFalhadas + 1;
      setState(prev => ({
        ...prev,
        senhaInput: "",
        tentativasFalhadas: tentativas
      }));
      alert(`Palavra-passe incorreta. Tentativas restantes: ${MAX_TENTATIVAS - tentativas}`);
    }
  };

  /**
   * Logout seguro
   */
  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      isAdmin: false,
      senhaInput: "",
      tentativasFalhadas: 0
    }));
  };

  /**
   * Edita atraso com validação
   */
  const handleChangeAtraso = (index: number, novoTexto: string) => {
    if (!state.isAdmin || index < 0 || index >= state.dados.length) return;

    const novosDados = [...state.dados];
    novosDados[index].atrasoData = novoTexto.substring(0, 500); // Limita tamanho
    setState(prev => ({ ...prev, dados: novosDados }));
  };

  /**
   * Incrementa/decrementa remotos perdidos
   */
  const handleMudarRemoto = (index: number, valor: number) => {
    if (!state.isAdmin || index < 0 || index >= state.dados.length) return;

    const novosDados = [...state.dados];
    const novoValor = novosDados[index].remotosPerdidos + valor;
    novosDados[index].remotosPerdidos = Math.max(0, novoValor);
    setState(prev => ({ ...prev, dados: novosDados }));
  };

  /**
   * Limpa todos os registos com confirmação
   */
  const handleLimparTudo = () => {
    if (window.confirm("⚠️ Tem certeza que deseja apagar TODOS os registos?\n\nEsta ação NÃO pode ser desfeita.")) {
      setState(prev => ({
        ...prev,
        dados: getInitialData()
      }));
    }
  };

  /**
   * Exporta dados em JSON
   */
  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(state.dados, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `atrasos_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      alert('Erro ao exportar dados');
    }
  };

  if (!state.isLoaded) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">⏳</div>
          <p>A carregar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      
      {/* BARRA LATERAL (CONTROLO DE ACESSO) */}
      <div className="w-full md:w-64 bg-[#000033] border-b md:border-b-0 md:border-r border-white/20 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-white border-b border-white/20 pb-4">
          {state.isAdmin ? "🔒 Painel Admin" : "🔑 Acesso Restrito"}
        </h2>
        
        {!state.isAdmin ? (
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-300">Introduza a palavra-passe para editar a tabela.</p>
            <input 
              type="password" 
              placeholder="Palavra-passe" 
              value={state.senhaInput}
              onChange={(e) => setState(prev => ({ ...prev, senhaInput: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="px-3 py-2 bg-black border border-[#000033] rounded text-white focus:outline-none focus:border-white transition-colors"
              disabled={state.tentativasFalhadas >= MAX_TENTATIVAS}
            />
            <button 
              onClick={handleLogin}
              disabled={state.tentativasFalhadas >= MAX_TENTATIVAS}
              className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Entrar
            </button>
            {state.tentativasFalhadas > 0 && (
              <p className="text-xs text-red-400">Tentativas restantes: {MAX_TENTATIVAS - state.tentativasFalhadas}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-[#00D2FF]">Modo de edição ativado. Alterações guardadas automaticamente.</p>
            <button 
              onClick={handleExportData}
              className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition-colors text-sm"
            >
              📥 Exportar Dados
            </button>
            <button 
              onClick={handleLimparTudo}
              className="border border-red-500 text-red-500 font-bold py-2 rounded hover:bg-red-500 hover:text-white transition-colors text-sm"
            >
              🚨 Limpar Tabela
            </button>
            <button 
              onClick={handleLogout}
              className="bg-transparent border border-white text-white font-bold py-2 rounded mt-auto hover:bg-white/10 transition-colors text-sm"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      {/* CORPO PRINCIPAL (TABELA) */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-wider uppercase mb-1">⏰ Controlo de Atrasos</h1>
            <p className="text-[#00D2FF] text-lg">Monitorização oficial do escritório em tempo real</p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-[#000033] rounded-full border border-white/20 flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-sm font-bold tracking-widest text-green-400">ONLINE</span>
          </div>
        </div>

        <div className="bg-[#000000] border-2 border-[#000033] rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="bg-[#000033] text-white p-5 text-xl font-bold border-b-2 border-white/20 w-[25%] uppercase tracking-wider">Colaborador</th>
                <th className="bg-[#000033] text-white p-5 text-xl font-bold border-b-2 border-white/20 w-[55%] uppercase tracking-wider">Atraso e Data</th>
                <th className="bg-[#000033] text-white p-5 text-xl font-bold border-b-2 border-white/20 w-[20%] text-center uppercase tracking-wider">Remotos Perdidos</th>
              </tr>
            </thead>
            <tbody>
              {state.dados.map((linha, index) => (
                <tr key={`${linha.nome}-${index}`} className="border-b border-[#000033]/50 hover:bg-[#000033]/30 transition-colors">
                  
                  {/* COLUNA: NOME */}
                  <td className="p-5 font-bold text-2xl text-white">
                    {linha.nome}
                  </td>
                  
                  {/* COLUNA: ATRASOS */}
                  <td className="p-0 border-l border-[#000033]/30 relative">
                    {state.isAdmin ? (
                      <textarea
                        value={linha.atrasoData}
                        onChange={(e) => handleChangeAtraso(index, e.target.value)}
                        placeholder="Clique para adicionar atraso (Ex: 15 min - 26/05)"
                        maxLength={500}
                        className="w-full h-full min-h-[70px] p-5 bg-transparent border-none text-white text-xl placeholder-gray-600 focus:outline-none focus:bg-[#000033]/50 resize-y"
                      />
                    ) : (
                      <div className="p-5 text-xl text-gray-300 whitespace-pre-wrap">
                        {linha.atrasoData || <span className="italic text-gray-600">Sem registos</span>}
                      </div>
                    )}
                  </td>
                  
                  {/* COLUNA: REMOTOS */}
                  <td className="p-5 border-l border-[#000033]/30 text-center">
                    {state.isAdmin ? (
                      <div className="flex items-center justify-center space-x-4">
                        <button 
                          onClick={() => handleMudarRemoto(index, -1)}
                          className="w-10 h-10 rounded bg-[#000033] text-white flex items-center justify-center font-bold text-2xl hover:bg-blue-900 border border-white/20"
                          aria-label="Diminuir remotos perdidos"
                        >
                          −
                        </button>
                        <span className="text-3xl font-black w-10 text-center">{linha.remotosPerdidos}</span>
                        <button 
                          onClick={() => handleMudarRemoto(index, 1)}
                          className="w-10 h-10 rounded bg-white text-black flex items-center justify-center font-bold text-2xl hover:bg-gray-300"
                          aria-label="Aumentar remotos perdidos"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span className={`px-4 py-2 rounded-lg text-3xl font-black inline-block min-w-[60px] text-center ${linha.remotosPerdidos > 0 ? 'bg-white text-black' : 'text-gray-500'}`}>
                        {linha.remotosPerdidos}
                      </span>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
