import Link from 'next/link';
import { produtos } from '@/data/produtos';

export const metadata = {
  title: 'Nossos Protocolos | Stack Saúde',
  description: 'Catálogo completo de soluções em biohacking, neurociência e nutrição.',
};

export default function ProtocolosPage() {
  // Puxando TODOS os produtos do seu banco (sem limitar a 3 como na Home)
  const todosOsProdutos = produtos;

  return (
    <div className="bg-slate-50 text-slate-900 font-sans pb-24">
      
      {/* ========================================== */}
      {/* HERO DA PÁGINA DE PROTOCOLOS               */}
      {/* ========================================== */}
      <section className="bg-white border-b border-slate-200 py-16 px-6 relative overflow-hidden">
        {/* Efeito de luz sutil no fundo para manter a identidade visual */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sky-500 font-bold uppercase tracking-widest text-sm mb-4 block">
            Catálogo Oficial
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Escolha o protocolo ideal para a sua <span className="text-sky-500">saúde.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Navegue por todas as nossas soluções validadas pela ciência. Cada protocolo foi desenhado para atacar a causa raiz de um problema específico.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* GRID COMPLETO DE PRODUTOS                  */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-6 mt-16">
        
        {/* Filtros visuais de Categorias */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-md cursor-default">
            Todos os Protocolos
          </button>
          <button className="px-5 py-2 bg-white border border-slate-200 text-slate-400 rounded-full text-sm font-bold opacity-50 cursor-not-allowed">
            Foco & Cognição (Em breve)
          </button>
          <button className="px-5 py-2 bg-white border border-slate-200 text-slate-400 rounded-full text-sm font-bold opacity-50 cursor-not-allowed">
            Energia & Sono (Em breve)
          </button>
        </div>

        {/* A Grade (Grid) que vai listar tudo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {todosOsProdutos.map((produto) => (
            <div 
              key={produto.slug} 
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Meta informação do card */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Acesso Imediato
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                  {produto.oferta.nomeProduto}
                </h2>
                
                <p className="mt-4 text-slate-600 leading-relaxed line-clamp-4">
                  {produto.subheadline.replace('...', '')}
                </p>
              </div>
              
              {/* Link direto para a VSL do produto específico */}
              <Link 
                href={`/${produto.slug}`} 
                className="mt-8 px-6 py-4 bg-slate-50 text-slate-900 border border-slate-200 text-center font-black text-sm uppercase rounded-xl group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-white transition-all flex justify-center items-center gap-2 shadow-sm"
              >
                Assistir ao Vídeo <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Fallback caso o banco de dados de produtos esteja vazio */}
        {todosOsProdutos.length === 0 && (
          <div className="text-center py-20 bg-white border-2 border-dashed border-slate-300 rounded-2xl">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Catálogo em atualização</h3>
            <p className="text-slate-500 text-lg">Nossa equipe científica está preparando novos protocolos. Volte em breve.</p>
          </div>
        )}
      </main>

    </div>
  );
}