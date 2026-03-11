import Link from 'next/link';
import Image from 'next/image';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-10';

export const metadata = {
  title: 'Blog & Inteligência | Stack Saúde',
  description: 'Artigos científicos, biohacking e neurociência para otimização humana.',
};

// ==========================================
// FUNÇÃO DE BUSCA
// ==========================================
async function getArtigosDoSanity() {
  const query = encodeURIComponent(`
    *[_type == "artigo"] | order(dataPublicacao desc) {
      _id,
      titulo,
      "slug": slug.current,
      categoria,
      tempoLeitura,
      resumo,
      "capaUrl": capa.asset->url,
      dataPublicacao
    }
  `);

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch (error) {
    return [];
  }
}

// ==========================================
// PÁGINA PRINCIPAL COM PARÂMETROS DE URL
// ==========================================
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }> | { categoria?: string };
}) {
  // Trata os parâmetros da URL de forma segura para Next.js 14 e 15
  const resolvedParams = await Promise.resolve(searchParams);
  const categoriaAtual = resolvedParams?.categoria || 'ultimos';

  const artigos = await getArtigosDoSanity();

  // 1. Extrai as categorias únicas baseadas no que já foi publicado
  // Usamos Set para não repetir e filter para tirar os nulos
  const categoriasUsadas = Array.from(
    new Set(artigos.map((a: any) => a.categoria).filter(Boolean))
  ) as string[];

  // 2. Lógica de Filtro (Últimos 3 vs Categoria Específica)
  let artigosExibidos = artigos;
  if (categoriaAtual === 'ultimos') {
    artigosExibidos = artigos.slice(0, 3); // Pega apenas os 3 primeiros
  } else {
    artigosExibidos = artigos.filter((a: any) => a.categoria === categoriaAtual);
  }

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
        
        {/* Filtros de Categorias Dinâmicos */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          
          {/* Botão Fixo: Últimos Artigos */}
          <Link 
            href="/blog" 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              categoriaAtual === 'ultimos' 
                ? 'bg-slate-900 text-white shadow-md cursor-default scale-105' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5'
            }`}
          >
            Últimos Artigos
          </Link>

          {/* Botões Gerados pelo Sanity */}
          {categoriasUsadas.map((cat: string) => (
            <Link 
              key={cat}
              href={`/blog?categoria=${encodeURIComponent(cat)}`} 
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                categoriaAtual === cat 
                  ? 'bg-slate-900 text-white shadow-md cursor-default scale-105' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grade de Posts Dinâmica */}
        {artigosExibidos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artigosExibidos.map((artigo: any) => {
              const dataFormatada = artigo.dataPublicacao 
                ? new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                : 'Recente';

              return (
                <Link 
                  href={`/blog/${artigo.slug}`} 
                  key={artigo._id || artigo.slug} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                     {artigo.capaUrl ? (
                       <Image 
                         src={artigo.capaUrl} 
                         alt={artigo.titulo} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-500" 
                       />
                     ) : (
                       <div className="absolute inset-0 bg-sky-500/10 group-hover:bg-sky-500/0 transition-colors"></div>
                     )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                        {artigo.categoria || 'Artigo'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {artigo.tempoLeitura ? `${artigo.tempoLeitura} min de leitura` : ''}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-3">
                      {artigo.titulo}
                    </h2>
                    
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {artigo.resumo}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400">
                        {dataFormatada}
                      </span>
                      <span className="text-sm font-black text-slate-900 group-hover:text-sky-500 transition-colors flex items-center gap-1">
                        Ler Artigo <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-20 bg-white rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-4">🧪</span>
            <p className="text-slate-500 font-medium">Nenhum artigo encontrado nesta categoria.</p>
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* CAPTURA DE LEADS (NEWSLETTER)              */}
      {/* ========================================== */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
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