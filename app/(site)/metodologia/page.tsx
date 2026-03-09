import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Nossa Metodologia | Stack Saúde',
  description: 'Entenda a ciência e a engenharia biológica por trás dos nossos protocolos de alta performance.',
};

export default function MetodologiaPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans pb-24 min-h-screen">
      
      {/* ========================================== */}
      {/* HERO DA PÁGINA DE METODOLOGIA              */}
      {/* ========================================== */}
      <section className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
        {/* Efeito visual tecnológico de fundo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4 block">
            Engenharia Biológica
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Nós tratamos o corpo humano como o <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">sistema mais avançado</span> do mundo.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A medicina tradicional foca em silenciar sintomas. A Stack Saúde utiliza dados biológicos, neurociência e nutrição avançada para otimizar o sistema na causa raiz.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* O PROBLEMA VS A SOLUÇÃO                    */}
      {/* ========================================== */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase">A Abordagem Comum</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Você está cansado, então toma café. Você não consegue dormir, então toma remédio tarja preta. O mercado atual empurra "soluções" que apenas mascaram falhas no seu metabolismo, criando dependência química e sobrecarregando o seu fígado e sistema nervoso.
            </p>
            <ul className="space-y-3 text-sm font-bold text-slate-500">
              <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Foco apenas no sintoma</li>
              <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Achismos e opiniões de "gurus"</li>
              <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Efeitos colaterais em cascata</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-sky-500"></div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase">O Método Stack</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Nós analisamos as vias metabólicas. Se falta energia, investigamos as mitocôndrias e a regulação hormonal. Criamos um empilhamento (Stack) preciso de nutrientes, comportamentos e suplementação que força o seu corpo a voltar para a homeostase e operar em pico de performance.
            </p>
            <ul className="space-y-3 text-sm font-bold text-slate-300">
              <li className="flex items-center gap-2"><span className="text-sky-400">✓</span> Otimização de sistemas biológicos</li>
              <li className="flex items-center gap-2"><span className="text-sky-400">✓</span> Protocolos baseados em artigos científicos</li>
              <li className="flex items-center gap-2"><span className="text-sky-400">✓</span> Resultados mensuráveis e sustentáveis</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* OS 3 PILARES (ESTRUTURA DETALHADA)         */}
      {/* ========================================== */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">Os 3 Pilares da Otimização</h2>
          <p className="text-slate-500 mt-4 text-lg">Como transformamos ciência complexa em resultados diários.</p>
        </div>

        <div className="space-y-12">
          
          {/* Pilar 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-200 transition-colors">
            <div className="flex-shrink-0 w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-md">
              1
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Mapeamento de Dados e Neuroquímica</h3>
              <p className="text-slate-600 leading-relaxed">
                Antes de adicionar qualquer coisa ao seu corpo, precisamos entender o que está faltando. Utilizamos dados de estudos clínicos de ponta para entender como o excesso de estímulos modernos destrói seus receptores de dopamina, desregula seu ciclo circadiano e aumenta o cortisol basal. A precisão no diagnóstico é o que garante o sucesso do protocolo.
              </p>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-200 transition-colors">
            <div className="flex-shrink-0 w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-md">
              2
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Empilhamento Estratégico (The Stack)</h3>
              <p className="text-slate-600 leading-relaxed">
                A biologia não funciona de forma isolada; ela funciona em redes. Um suplemento sozinho raramente faz milagre. Nós desenhamos "Stacks" — combinações exatas de nutrição, compostos bioativos e horários específicos. Se queremos aumentar o foco, combinamos precursores de acetilcolina com moduladores de estresse oxidativo para garantir que o cérebro não sofra "crashes".
              </p>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-200 transition-colors">
            <div className="flex-shrink-0 w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-md">
              3
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Aplicação e Consistência Sistêmica</h3>
              <p className="text-slate-600 leading-relaxed">
                Conhecimento sem aplicação não gera resultado. Nossos protocolos são desenhados para a vida real de quem produz, trabalha e estuda. Não exigimos rotinas de monges tibetanos. Fornecemos regras claras de sistemas de hábitos que se encaixam no seu dia, automatizando a sua saúde e blindando o seu corpo contra a procrastinação e a fadiga crônica.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* CALL TO ACTION FINAL                       */}
      {/* ========================================== */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <div className="bg-sky-50 rounded-3xl p-12 border border-sky-100 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">Pronto para resetar o seu sistema?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Acesse o nosso catálogo de protocolos e aplique a nossa metodologia hoje mesmo.
          </p>
          <Link 
            href="/protocolos" 
            className="inline-block px-10 py-5 bg-sky-500 text-white font-black uppercase tracking-wide rounded-xl hover:bg-sky-600 transition-all shadow-[0_8px_30px_rgb(14,165,233,0.3)] hover:-translate-y-1"
          >
            Ver Protocolos Disponíveis
          </Link>
        </div>
      </section>

    </div>
  );
}