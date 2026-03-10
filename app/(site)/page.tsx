import Link from 'next/link';
import { funis } from '@/data/funis';

export default function Home() {
  // Garante que apenas os 3 primeiros produtos (funis) cadastrados apareçam na vitrine
  const funisDestaque = funis.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans scroll-smooth selection:bg-sky-100 selection:text-sky-900">

      <main>
        {/* ========================================== */}
        {/* HERO SECTION: PROMESSA AGRESSIVA + BADGE   */}
        {/* ========================================== */}
        <section className="bg-white py-24 md:py-32 px-6 text-center border-b border-slate-200 relative overflow-hidden">
          {/* Efeito visual de fundo (Blur) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            
            {/* Badge de Autoridade */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 font-bold text-xs uppercase tracking-widest mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Ciência e Alta Performance
            </div>

            <h1 className="text-5xl md:text-[4.5rem] font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Assuma o controle da sua <span className="text-sky-500">saúde.</span>
            </h1>
            
            <p className="mt-8 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
              Ciência, nutrição e protocolos de ponta para quem busca performance real. Sem achismos, apenas dados e metodologias que funcionam.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/protocolos" className="w-full sm:w-auto px-10 py-5 bg-sky-500 text-white font-black uppercase tracking-wide rounded-xl hover:bg-sky-600 transition-all shadow-[0_8px_30px_rgb(14,165,233,0.3)] hover:shadow-[0_8px_30px_rgb(14,165,233,0.5)] hover:-translate-y-1">
                Conhecer Protocolos
              </Link>
              <Link href="/metodologia" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 font-black uppercase tracking-wide rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all">
                Como Funciona
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* METODOLOGIA: OS 3 PILARES DA MARCA         */}
        {/* ========================================== */}
        <section id="metodologia" className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">O Sistema Stack</h2>
              <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">Nós não tratamos sintomas. Nós hackeamos as causas raízes do cansaço, da falta de foco e do envelhecimento precoce.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Pilar 1 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Diagnóstico Preciso</h3>
                <p className="text-slate-500 leading-relaxed">Identificamos as falhas metabólicas e hormonais que estão drenando a sua energia vital e foco diário.</p>
              </div>
              {/* Pilar 2 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Empilhamento (Stack)</h3>
                <p className="text-slate-500 leading-relaxed">Combinamos nutrientes exatos, higiene do sono e rotinas estratégicas para forçar seu corpo a se reequilibrar.</p>
              </div>
              {/* Pilar 3 */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Alta Performance</h3>
                <p className="text-slate-500 leading-relaxed">Você atinge o estado de "Flow": energia constante, mente afiada e imunidade blindada 24 horas por dia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* VITRINE DE PRODUTOS DINÂMICA               */}
        {/* ========================================== */}
        <section id="solucoes" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Nossas Soluções</h2>
              <p className="text-slate-500 mt-3 text-lg">Escolha seu objetivo e descubra a ciência por trás dos resultados.</p>
            </div>
            {/* Selo de Garantia visual */}
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm font-bold bg-slate-100 px-4 py-2 rounded-lg">
              <span className="text-emerald-500">✓</span> Acesso Imediato e Vitalício
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {funisDestaque.map((funil) => (
              <div 
                key={funil.slug} 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Tag de Categoria */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4 block">
                    Protocolo Científico
                  </span>

                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                    {funil.produto}
                  </h3>
                  
                  <p className="mt-5 text-slate-600 leading-relaxed line-clamp-4">
                    {funil.descricao}
                  </p>
                </div>
                
                <Link 
                  href={`/${funil.slug}`} // Aponta para a VSL direto ao invés da PRESELL
                  className="mt-10 px-6 py-4 bg-slate-900 text-white text-center font-black text-sm uppercase rounded-xl group-hover:bg-emerald-500 transition-colors shadow-md flex justify-center items-center gap-2"
                >
                  Descobrir o Método <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
          
          {funisDestaque.length === 0 && (
            <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-2xl">
              <p className="text-slate-500 font-bold text-lg">Nenhum protocolo disponível no momento.</p>
              <p className="text-slate-400 text-sm mt-2">Nossa equipe científica está preparando novidades.</p>
            </div>
          )}
        </section>

        {/* ========================================== */}
        {/* BANNER INSTITUCIONAL COMPACTO              */}
        {/* ========================================== */}
        <section className="py-24 px-6 bg-slate-900 text-white text-center border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200 tracking-tight">
              Ciência Acima de Opiniões
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              A Stack Saúde nasceu para traduzir a complexidade da biologia e da neurociência em protocolos práticos. Democratizamos o acesso à alta performance.
            </p>
            <Link href="#" className="text-sky-400 font-bold hover:text-white transition-colors underline underline-offset-8 decoration-sky-400/30 hover:decoration-sky-400">
              Ler a história da nossa fundação
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}