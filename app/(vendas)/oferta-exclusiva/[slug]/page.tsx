"use client";

import { useState, useEffect, use, Suspense, useRef } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams, useRouter } from 'next/navigation';

import { funis } from '@/data/funis';
import SmartVsl from '@/components/SmartVsl';

// ==========================================
// MÁQUINA DE LEITURA DE SLUGS (Agora com cálculo de Etapas)
// ==========================================
function extrairOfertaDoSlug(slugCompleto: string) {
  const partes = slugCompleto.split('-');
  const etapaAbreviada = partes.pop(); 
  const slugBase = partes.join('-'); 

  if (!etapaAbreviada || !slugBase) return { oferta: null, suporte: null, totalEtapas: 0, numeroEtapa: 0 };

  const funilPai = funis.find(f => f.slug === slugBase);
  if (!funilPai) return { oferta: null, suporte: null, totalEtapas: 0, numeroEtapa: 0 };

  const tipo = etapaAbreviada.startsWith('u') ? 'upsell' : etapaAbreviada.startsWith('d') ? 'downsell' : null;
  const numero = etapaAbreviada.slice(1); 

  if (!tipo || !numero) return { oferta: null, suporte: null, totalEtapas: 0, numeroEtapa: 0 };

  const chaveDaEtapa = `${tipo}${numero}`; 
  
  // Calcula o total de Upsells dinamicamente vasculhando o funil
  let totalUpsells = 0;
  while (funilPai[`upsell${totalUpsells + 1}` as keyof typeof funilPai]) {
    totalUpsells++;
  }
  
  // Total de etapas = compra principal (1) + quantidade de upsells
  const totalEtapas = totalUpsells + 1;
  const numeroEtapa = parseInt(numero, 10);

  return {
    oferta: funilPai[chaveDaEtapa as keyof typeof funilPai] as any,
    suporte: funilPai.suporteUrl,
    totalEtapas,
    numeroEtapa
  };
}

function OfertaConteudo({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Recebe também a matemática das etapas
  const { oferta: ofertaAtual, suporte: linkSuporte, totalEtapas, numeroEtapa } = extrairOfertaDoSlug(slug);

  if (!ofertaAtual) {
    notFound();
  }

  const parametrosAtuais = searchParams.toString();
  
  const linkSimBase = ofertaAtual.checkoutUrl || '';
  const linkSimFinal = parametrosAtuais ? `${linkSimBase}?${parametrosAtuais}` : linkSimBase;
  
  const linkNaoBase = ofertaAtual.downsellUrl || '';
  const linkNaoFinal = parametrosAtuais ? `${linkNaoBase}?${parametrosAtuais}` : linkNaoBase;

  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [ofertaExpirada, setOfertaExpirada] = useState(false);
  
  const tempoEmMinutos = ofertaAtual.tempoTimer || 15;
  const [tempoRestante, setTempoRestante] = useState(tempoEmMinutos * 60);

  const permitirSaidaRef = useRef(false);

  // ==========================================
  // IDENTIFICADORES DE ETAPA
  // ==========================================
  const isDownsell = slug.includes('-d');
  const isPrimeiroUpsell = slug.endsWith('-u1'); 

  // Dinamiza o Topo com a matemática perfeita e tira a barra de progresso visual
  const textoTopo = isDownsell 
    ? '⚠️ ÚLTIMA CHANCE ANTES DO ACESSO' 
    : `✅ Etapa ${numeroEtapa} de ${totalEtapas} Concluída`;

  // ==========================================
  // 1. ARMADILHA DO BOTÃO VOLTAR (Apenas para o U1)
  // ==========================================
  useEffect(() => {
    if (!isPrimeiroUpsell) return;

    window.history.pushState({ preso: true }, '', window.location.href);

    const bloquearVoltar = (e: PopStateEvent) => {
      if (permitirSaidaRef.current) return;
      window.history.pushState({ preso: true }, '', window.location.href);
      alert("Atenção: Seu pedido anterior já foi processado. Por favor, conclua esta etapa para não travar sua entrega.");
    };

    window.addEventListener('popstate', bloquearVoltar);
    return () => window.removeEventListener('popstate', bloquearVoltar);
  }, [isPrimeiroUpsell]);

  // ==========================================
  // 2. ALERTA DE RECARREGAMENTO (Anti-F5)
  // ==========================================
  useEffect(() => {
    const bloquearRefresh = (e: BeforeUnloadEvent) => {
      if (permitirSaidaRef.current) return; 
      e.preventDefault();
      e.returnValue = ''; 
    };
    window.addEventListener('beforeunload', bloquearRefresh);
    return () => window.removeEventListener('beforeunload', bloquearRefresh);
  }, []);

  // ==========================================
  // 3. LÓGICA DE ESCASSEZ
  // ==========================================
  useEffect(() => {
    if (!mostrarOferta) return;

    const storageKey = `oferta_deadline_${slug}`;
    let deadlineFinal = localStorage.getItem(storageKey);

    if (!deadlineFinal) {
      const tempoEmMilissegundos = tempoEmMinutos * 60 * 1000;
      deadlineFinal = (Date.now() + tempoEmMilissegundos).toString();
      localStorage.setItem(storageKey, deadlineFinal);
    }

    const tempo = setInterval(() => {
      const agora = Date.now();
      const diferencaSegundos = Math.floor((parseInt(deadlineFinal as string) - agora) / 1000);

      if (diferencaSegundos <= 0) {
        clearInterval(tempo);
        setTempoRestante(0);
        setOfertaExpirada(true); 
      } else {
        setTempoRestante(diferencaSegundos);
      }
    }, 1000);

    return () => clearInterval(tempo);
  }, [mostrarOferta, slug, tempoEmMinutos]);

  const minutosExibicao = Math.floor(tempoRestante / 60);
  const segundosExibicao = tempoRestante % 60;

  // ==========================================
  // CONTROLES DE BOTÕES
  // ==========================================
  const handleCompra = (e: React.MouseEvent) => {
    e.preventDefault();
    permitirSaidaRef.current = true; 
    window.location.href = linkSimFinal; 
  };

  const handleRecusa = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmarSaida = window.confirm(
      "ESPERE UM SEGUNDO! 🛑\n\nTem certeza que deseja recusar essa oferta e pagar mais caro depois?\n\n• Clique em CANCELAR para ficar na página e aproveitar.\n• Clique em OK para descartar a oportunidade."
    );

    if (confirmarSaida) {
      permitirSaidaRef.current = true; 
      router.push(linkNaoFinal); 
    }
  };

  return (
    <>
      <div className={`w-full text-white text-center py-2 text-xs md:text-sm font-bold uppercase tracking-widest shadow-md transition-colors ${ofertaExpirada ? 'bg-slate-800' : 'bg-red-600'}`}>
        {ofertaExpirada ? '❌ ESTA OFERTA FOI ENCERRADA.' : '⚠️ Não feche esta página ou você perderá seu acesso exclusivo.'}
      </div>

      <main className="w-full max-w-4xl px-4 mt-10 md:mt-16 flex flex-col items-center text-center">
        
        <h1 
          className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          dangerouslySetInnerHTML={{ __html: ofertaAtual.headline }}
        />

        <p className="mt-6 text-lg md:text-xl text-slate-600 font-medium max-w-3xl leading-relaxed mb-10">
          {ofertaAtual.subheadline}
        </p>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          {/* TOPO DINÂMICO DE ETAPAS */}
          <div className={`w-full text-white text-center py-2 md:py-3 text-xs md:text-sm font-black uppercase tracking-widest rounded-t-xl shadow-md border border-b-0 ${isDownsell ? 'bg-amber-600 border-amber-700' : 'bg-sky-600 border-sky-700'}`}>
            {textoTopo}
          </div>
          
          {/* BARRA DE PROGRESSO REMOVIDA AQUI */}

          <div className="w-full relative z-10">
            <SmartVsl 
              videoId={ofertaAtual.videoId} 
              tempoDelaySegundos={ofertaAtual.delaySegundos || 10}
              onLiberarConteudo={() => setMostrarOferta(true)} 
            />
          </div>
        </div>

        {mostrarOferta && (
          <div className="w-full flex flex-col items-center animate-fade-in transition-all duration-1000 ease-in-out">
            
            <div className="mt-8 flex flex-col items-center">
              <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${ofertaExpirada ? 'text-slate-500' : 'text-red-600'}`}>
                {ofertaExpirada ? 'Tempo Esgotado' : 'Esta oferta expira em:'}
              </p>
              <div className={`flex gap-4 text-3xl md:text-4xl font-black ${ofertaExpirada ? 'text-slate-300' : 'text-slate-900'}`}>
                <div className="flex flex-col items-center">
                  <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    {minutosExibicao.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 uppercase">Min</span>
                </div>
                <span className="py-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    {segundosExibicao.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 uppercase">Seg</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl mt-12 flex flex-col items-center gap-5">
              {!ofertaExpirada ? (
                <>
                  <div className="w-full flex flex-col items-center mb-4 text-center">
                    <p className="text-slate-500 font-bold text-lg md:text-xl mb-1">
                      Preço Normal: <span className="line-through decoration-red-500 decoration-2">R$ 197,00</span>
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-slate-900">
                      {ofertaAtual.subtextoBotaoSim}
                    </p>
                  </div>

                  <button 
                    onClick={handleCompra}
                    className="w-full py-5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.5)] transition-all hover:-translate-y-1 group cursor-pointer"
                  >
                    <span className="block text-2xl font-black uppercase tracking-wide">
                      {ofertaAtual.textoBotaoSim}
                    </span>
                  </button>

                  <button 
                    onClick={handleRecusa}
                    className="w-full py-4 px-6 border-2 border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all font-bold text-lg md:text-xl rounded-xl text-center mt-2 cursor-pointer"
                  >
                    {ofertaAtual.textoBotaoNao}
                  </button>
                </>
              ) : (
                <div className="w-full p-8 bg-slate-100 border border-slate-300 rounded-xl text-center">
                  <span className="text-4xl mb-4 block">⏰</span>
                  <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Essa condição expirou</h3>
                  <p className="text-slate-500 mb-6 font-medium">
                    A janela de oportunidade para adicionar este produto com desconto encerrou.
                  </p>
                  <button 
                    onClick={() => {
                      permitirSaidaRef.current = true;
                      router.push(linkNaoFinal);
                    }}
                    className="inline-block py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Continuar para finalizar meu pedido inicial &rarr;
                  </button>
                </div>
              )}
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 w-full flex flex-col items-center">
              <p className="text-sm text-slate-500 mb-3">
                Ficou com alguma dúvida sobre o seu pedido?
              </p>
              <a 
                href={linkSuporte || ''} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
              >
                <span className="text-xl text-emerald-500">💬</span> Falar com o Suporte no WhatsApp
              </a>
            </div>

          </div>
        )}

      </main>
    </>
  );
}

export default function OfertaDinamicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center pb-20 selection:bg-red-100 selection:text-red-900">
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Carregando sua oferta segura...</div>}>
        <OfertaConteudo slug={slug} />
      </Suspense>
    </div>
  );
}