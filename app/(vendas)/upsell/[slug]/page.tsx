"use client";

import { useState, useEffect, use, Suspense, useRef } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { produtos } from '@/data/produtos';
import SmartVsl from '@/components/SmartVsl';

function UpsellConteudo({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const produto = produtos.find((p) => p.slug === slug);

  if (!produto || !produto.upsell) {
    notFound();
  }

  const { upsell } = produto;

  const parametrosAtuais = searchParams.toString();
  const linkSimFinal = parametrosAtuais ? `${upsell.linkCheckout}?${parametrosAtuais}` : upsell.linkCheckout;
  const linkNaoFinal = parametrosAtuais ? `${upsell.rotaDownsell}/${slug}?${parametrosAtuais}` : `${upsell.rotaDownsell}/${slug}`;

  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [ofertaExpirada, setOfertaExpirada] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(upsell.tempoTimer * 60);

  // ==========================================
  // O "CRACHÁ VIP" (Permite sair sem alerta)
  // ==========================================
  const permitirSaidaRef = useRef(false);

  // ==========================================
  // 1. ARMADILHA DO BOTÃO VOLTAR (Re-armável)
  // ==========================================
  useEffect(() => {
    // 1. Injeta um estado falso no histórico assim que ele entra
    window.history.pushState({ preso: true }, '', window.location.href);

    const bloquearVoltar = (e: PopStateEvent) => {
      // Se ele comprou ou recusou oficialmente, deixa ele ir
      if (permitirSaidaRef.current) return;

      // 2. RE-ARMA A ARMADILHA: Empurra a página de volta pro histórico
      window.history.pushState({ preso: true }, '', window.location.href);
      
      // 3. Dá o susto
      alert("Atenção: Seu pedido anterior já foi processado. Por favor, conclua esta etapa para não travar sua entrega.");
    };

    window.addEventListener('popstate', bloquearVoltar);
    return () => window.removeEventListener('popstate', bloquearVoltar);
  }, []);

  // ==========================================
  // 2. ALERTA DE RECARREGAMENTO (Anti-F5)
  // ==========================================
  useEffect(() => {
    const bloquearRefresh = (e: BeforeUnloadEvent) => {
      if (permitirSaidaRef.current) return; // Passe livre
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

    const storageKey = `upsell_deadline_${slug}`;
    let deadlineFinal = localStorage.getItem(storageKey);

    if (!deadlineFinal) {
      const tempoEmMilissegundos = upsell.tempoTimer * 60 * 1000;
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
  }, [mostrarOferta, slug, upsell.tempoTimer]);

  const minutosExibicao = Math.floor(tempoRestante / 60);
  const segundosExibicao = tempoRestante % 60;

  // ==========================================
  // CONTROLES DE BOTÕES (Garantem a ordem de execução)
  // ==========================================
  
  // O botão verde redireciona sem disparar o alerta de F5/Sair
  const handleCompra = (e: React.MouseEvent) => {
    e.preventDefault();
    permitirSaidaRef.current = true; // Desativa as armadilhas
    window.location.href = linkSimFinal; // Envia pro gateway de pagamento
  };

  // O botão cinza dá a última chance de ficar
  const handleRecusa = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmarSaida = window.confirm(
      "ESPERE UM SEGUNDO! 🛑\n\nTem certeza que deseja recusar essa oferta e pagar mais caro depois?\n\n• Clique em CANCELAR para ficar na página e aproveitar.\n• Clique em OK para descartar a oportunidade."
    );

    if (confirmarSaida) {
      permitirSaidaRef.current = true; // Desativa as armadilhas
      router.push(linkNaoFinal); // Envia pro Downsell
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
          dangerouslySetInnerHTML={{ __html: upsell.headline }}
        />

        <p className="mt-6 text-lg md:text-xl text-slate-600 font-medium max-w-3xl leading-relaxed mb-10">
          {upsell.subheadline}
        </p>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-full bg-sky-600 text-white text-center py-2 md:py-3 text-xs md:text-sm font-black uppercase tracking-widest rounded-t-xl shadow-md border border-b-0 border-sky-700">
            ✅ Etapa 1 de 2 Concluída
          </div>
          <div className="w-full bg-slate-200 h-2 md:h-3 border-x border-slate-300">
            <div className="bg-emerald-500 h-full w-[50%] shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          </div>
          <div className="w-full -mt-1 relative z-10">
            <SmartVsl 
              videoId={upsell.videoId} 
              tempoDelaySegundos={upsell.delaySegundos}
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
                      {upsell.subtextoBotaoSim}
                    </p>
                  </div>

                  {/* ADICIONADO: onClick com handleCompra */}
                  <button 
                    onClick={handleCompra}
                    className="w-full py-5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.5)] transition-all hover:-translate-y-1 group cursor-pointer"
                  >
                    <span className="block text-2xl font-black uppercase tracking-wide">
                      {upsell.textoBotaoSim}
                    </span>
                  </button>

                  {/* ADICIONADO: onClick com handleRecusa */}
                  <button 
                    onClick={handleRecusa}
                    className="w-full py-4 px-6 border-2 border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all font-bold text-lg md:text-xl rounded-xl text-center mt-2 cursor-pointer"
                  >
                    {upsell.textoBotaoNao}
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
                href={upsell.linkSuporte} 
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

export default function UpsellDinamicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center pb-20 selection:bg-red-100 selection:text-red-900">
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Carregando sua oferta segura...</div>}>
        <UpsellConteudo slug={slug} />
      </Suspense>
    </div>
  );
}