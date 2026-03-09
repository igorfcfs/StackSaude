import Link from 'next/link';
import { produtos } from '@/data/produtos'; // Puxando direto do seu banco local

export default function Home() {
  // Garante que apenas os 3 primeiros produtos cadastrados apareçam na vitrine
  const produtosDestaque = produtos.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans scroll-smooth">
      
      <main>
        {/* HERO SECTION: Foco agressivo na promessa principal da marca */}
        <section className="bg-white py-24 px-6 text-center border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
              Assuma o controle da sua <span className="text-sky-500">biologia.</span>
            </h1>
            <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Ciência, nutrição e protocolos de ponta para quem busca performance real. Sem achismos, apenas o que funciona.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="#solucoes" className="px-8 py-4 bg-sky-500 text-white font-black uppercase tracking-wide rounded-lg hover:bg-sky-600 transition shadow-lg shadow-sky-500/30">
                Ver Protocolos
              </Link>
            </div>
          </div>
        </section>

        {/* VITRINE DE PRODUTOS DINÂMICA (Max 3) */}
        <section id="solucoes" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 uppercase">Nossas Soluções</h2>
            <p className="text-slate-500 mt-2 text-lg">Escolha seu objetivo e descubra a ciência por trás dos resultados.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {produtosDestaque.map((produto) => (
              <div 
                key={produto.slug} 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Usa o nome cadastrado na oferta */}
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-sky-500 transition-colors">
                    {produto.oferta.nomeProduto}
                  </h3>
                  
                  {/* Usa a subheadline como descrição para instigar a curiosidade */}
                  <p className="mt-4 text-slate-600 leading-relaxed line-clamp-4">
                    {produto.subheadline.replace('...', '')}
                  </p>
                </div>
                
                {/* O link aponta direto para a página dinâmica de vendas que acabamos de criar */}
                <Link 
                  href={`/${produto.slug}`} 
                  className="mt-8 px-6 py-4 bg-slate-900 text-white text-center font-bold uppercase rounded-lg group-hover:bg-emerald-500 transition-colors shadow-md"
                >
                  Descobrir o Método &rarr;
                </Link>
              </div>
            ))}
          </div>
          
          {/* Fallback caso não tenha produtos cadastrados ainda */}
          {produtosDestaque.length === 0 && (
            <div className="text-center py-10 bg-white border border-dashed border-slate-300 rounded-xl">
              <p className="text-slate-500">Nenhum protocolo disponível no momento. Em breve novidades.</p>
            </div>
          )}
        </section>

        {/* INSTITUCIONAL COMPACTO (Gera Autoridade) */}
        <section className="py-20 px-6 bg-slate-900 text-white text-center border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-6 uppercase text-sky-400">Ciência Acima de Opiniões</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              A Stack Saúde nasceu para traduzir a complexidade da biologia e da neurociência em protocolos práticos. Democratizamos o acesso à alta performance mental e física.
            </p>
            <Link href="/sobre" className="text-sky-400 font-bold hover:text-white transition underline underline-offset-4">
              Conheça nossa história
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}