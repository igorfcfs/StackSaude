import Link from 'next/link';

export const metadata = {
  title: 'Blog & Inteligência | Stack Saúde',
  description: 'Artigos científicos, biohacking e neurociência para otimização humana.',
};

// ==========================================
// BANCO DE DADOS SIMULADO (MOCK) DE ARTIGOS
// No futuro, você pode mover isso para um arquivo src/data/posts.ts
// ==========================================
const artigos = [
  {
    slug: 'dopamina-barata-destruindo-foco',
    titulo: 'Como a "Dopamina Barata" está destruindo seu foco (e como resetar)',
    resumo: 'Entenda a biologia do vício em redes sociais e descubra o protocolo de 7 dias para restaurar seus receptores de dopamina e recuperar a concentração profunda.',
    categoria: 'Neurociência',
    data: '09 Mar 2026',
    tempoLeitura: '5 min de leitura',
  },
  {
    slug: 'mitos-sobre-o-sono-rem',
    titulo: 'Os 3 mitos sobre o sono que estão envelhecendo seu cérebro',
    resumo: 'Dormir 8 horas nem sempre é o suficiente. Descubra como a arquitetura do sono funciona e quais suplementos realmente induzem o sono REM reparador.',
    categoria: 'Biohacking',
    data: '05 Mar 2026',
    tempoLeitura: '7 min de leitura',
  },
  {
    slug: 'nutricao-para-alta-performance',
    titulo: 'A dieta do Vale do Silício: O que os executivos comem para focar?',
    resumo: 'Analisamos os padrões alimentares dos CEOs de alta performance. O segredo não está em comer menos, mas em evitar os picos de insulina no meio do dia.',
    categoria: 'Nutrição',
    data: '28 Fev 2026',
    tempoLeitura: '4 min de leitura',
  }
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans pb-24 min-h-screen">
      
      {/* ========================================== */}
      {/* HERO DA PÁGINA DO BLOG                     */}
      {/* ========================================== */}
      <section className="bg-white border-b border-slate-200 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sky-500 font-bold uppercase tracking-widest text-sm mb-4 block">
            Central de Inteligência
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            A ciência por trás da sua <span className="text-sky-500">evolução.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Artigos aprofundados sobre neurociência, biohacking e nutrição estratégica. Desvende os segredos biológicos da alta performance.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* GRID DE ARTIGOS DO BLOG                    */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-6 mt-16">
        
        {/* Filtros de Categorias (Visual) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-md cursor-default">
            Últimos Artigos
          </button>
          <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 rounded-full text-sm font-bold transition-colors">
            Neurociência
          </button>
          <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 rounded-full text-sm font-bold transition-colors">
            Biohacking
          </button>
          <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 rounded-full text-sm font-bold transition-colors">
            Nutrição
          </button>
        </div>

        {/* Grade de Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artigos.map((artigo) => (
            <Link 
              href={`/blog/${artigo.slug}`} 
              key={artigo.slug} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Espaço para Imagem de Capa (Placeholder com gradiente) */}
              <div className="h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-sky-500/10 group-hover:bg-sky-500/0 transition-colors"></div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                {/* Meta Dados (Categoria e Tempo) */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                    {artigo.categoria}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {artigo.tempoLeitura}
                  </span>
                </div>

                {/* Título e Resumo */}
                <h2 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-3">
                  {artigo.titulo}
                </h2>
                
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                  {artigo.resumo}
                </p>

                {/* Rodapé do Card */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400">
                    {artigo.data}
                  </span>
                  <span className="text-sm font-black text-slate-900 group-hover:text-sky-500 transition-colors flex items-center gap-1">
                    Ler Artigo <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* ========================================== */}
      {/* CAPTURA DE LEADS (NEWSLETTER)              */}
      {/* ========================================== */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Brilho de fundo para dar aspecto premium */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-3xl font-black text-white mb-4 relative z-10 tracking-tight">
            Assine a nossa <span className="text-sky-400">Newsletter Científica</span>
          </h3>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10 leading-relaxed">
            Receba semanalmente 1 protocolo acionável de neurociência ou biohacking para aplicar no seu dia a dia. Sem spam, apenas conhecimento puro.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-grow px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-sky-500 text-white font-black uppercase tracking-wide rounded-xl hover:bg-sky-400 transition-colors shadow-lg"
            >
              Inscrever
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}