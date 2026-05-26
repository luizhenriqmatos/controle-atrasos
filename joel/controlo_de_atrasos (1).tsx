import React, { useState, useEffect } from 'react';

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

// Gera a tabela inicial com a ordem alfabética
const getInitialData = () => {
  return COLABORADORES.map(nome => ({
    nome,
    atrasoData: "",
    remotosPerdidos: 0
  }));
};
interface ColaboradorDados {
  nome: string;
  atrasoData: string;
  remotosPerdidos: number;
}
export default function App() {
  const [dados, setDados] = useState<ColaboradorDados[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [senhaInput, setSenhaInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);


  // Carrega os dados guardados localmente para simular a base de dados
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('atrasos_escritorio');
    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    } else {
      setDados(getInitialData());
    }
    setIsLoaded(true);
  }, []);

  // Guarda as alterações sempre que a variável "dados" muda
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('atrasos_escritorio', JSON.stringify(dados));
    }
  }, [dados, isLoaded]);

  // Funções de Edição (Apenas para o Admin)
  const handleChangeAtraso = (index: number, novoTexto: string) => {
    const novosDados = [...dados];
    novosDados[index].atrasoData = novoTexto;
    setDados(novosDados);
  };

  const handleMudarRemoto = (index: number, valor: number) => {
    const novosDados = [...dados];
    const novoValor = novosDados[index].remotosPerdidos + valor;
    novosDados[index].remotosPerdidos = novoValor >= 0 ? novoValor : 0;
    setDados(novosDados);
  };

  const handleLimparTudo = () => {
    if (window.confirm("Tem certeza que deseja apagar todos os registos?")) {
      setDados(getInitialData());
    }
  };

  const handleLogin = () => {
    if (senhaInput === "admin123") {
      setIsAdmin(true);
      setSenhaInput("");
    } else {
      alert("Palavra-passe incorreta. Dica: admin123");
    }
  };


  if (!isLoaded) return <div className="bg-black text-white h-screen flex items-center justify-center">A carregar...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      
      {/* BARRA LATERAL (CONTROLO DE ACESSO) */}
      <div className="w-full md:w-64 bg-[#000033] border-b md:border-b-0 md:border-r border-white/20 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-white border-b border-white/20 pb-4">
          {isAdmin ? "🔒 Painel Admin" : "🔑 Acesso Restrito"}
        </h2>
        
        {!isAdmin ? (
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-300">Introduza a palavra-passe para editar a tabela.</p>
            <input 
              type="password" 
              placeholder="Palavra-passe" 
              value={senhaInput}
              onChange={(e) => setSenhaInput(e.target.value)}
              className="px-3 py-2 bg-black border border-[#000033] rounded text-white focus:outline-none focus:border-white transition-colors"
            />
            <button 
              onClick={handleLogin}
              className="bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Entrar
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-[#00D2FF]">Modo de edição ativado. Todas as alterações são guardadas instantaneamente.</p>
            <button 
              onClick={handleLimparTudo}
              className="border border-red-500 text-red-500 font-bold py-2 rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              🚨 Limpar Tabela
            </button>
            <button 
              onClick={() => setIsAdmin(false)}
              className="bg-transparent border border-white text-white font-bold py-2 rounded mt-auto hover:bg-white/10 transition-colors"
            >
              Sair do Modo Admin
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
              {dados.map((linha, index) => (
                <tr key={linha.nome} className="border-b border-[#000033]/50 hover:bg-[#000033]/30 transition-colors">
                  
                  {/* COLUNA: NOME */}
                  <td className="p-5 font-bold text-2xl text-white">
                    {linha.nome}
                  </td>
                  
                  {/* COLUNA: ATRASOS */}
                  <td className="p-0 border-l border-[#000033]/30 relative">
                    {isAdmin ? (
                      <textarea
                        value={linha.atrasoData}
                        onChange={(e) => handleChangeAtraso(index, e.target.value)}
                        placeholder="Clique para adicionar atraso (Ex: 15 min - 26/05)"
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
                    {isAdmin ? (
                      <div className="flex items-center justify-center space-x-4">
                        <button 
                          onClick={() => handleMudarRemoto(index, -1)}
                          className="w-10 h-10 rounded bg-[#000033] text-white flex items-center justify-center font-bold text-2xl hover:bg-blue-900 border border-white/20"
                        >
                          -
                        </button>
                        <span className="text-3xl font-black w-10 text-center">{linha.remotosPerdidos}</span>
                        <button 
                          onClick={() => handleMudarRemoto(index, 1)}
                          className="w-10 h-10 rounded bg-white text-black flex items-center justify-center font-bold text-2xl hover:bg-gray-300"
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