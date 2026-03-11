"use client";

import { useState, useEffect, use, Suspense, useRef } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import SmartVsl from '@/components/SmartVsl';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-10';

// ==========================================
// FUNÇÃO DE BUSCA NO SANITY (O CÉREBRO INFINITO)
// ==========================================
async function getLtvDoSanity(slugLtv: string) {
  // 1. Buscamos o LTV em si para ter os textos da página atual
  // 2. Buscamos o Funil que "hospeda" esse LTV na sua esteira (para calcular a etapa)
  const query = encodeURIComponent(`
    {
      "ofertaAtual": *[_type == "ltv" && configuracoesInternas.slug.current == "${slugLtv}"][0] {
        configuracoesInternas,
        headline,
        subheadlineHook,
        video,
        botoesAcao,
        elementosConfianca
      },
      "funilMae": *[_type == "funilConfig" && "${slugLtv}" in esteiraOfertas[]->configuracoesInternas.slug.current][0] {
        contatos,
        "esteiraSlugs": esteiraOfertas[]->configuracoesInternas.slug.current
      }
    }
  `);

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Erro ao buscar LTV:", error);
    return null;
  }
}

function OfertaConteudo({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [dadosDoSanity, setDadosDoSanity] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  // ==========================================
  // BUSCA OS DADOS
  // ==========================================
  useEffect(() => {
    async function fetchData() {
      const dados = await getLtvDoSanity(slug);
      setDadosDoSanity(dados);
      setCarregando(false);
    }
    fetchData();
  }, [slug]);

  const [mostrarOferta, setMostrarOferta] = useState(false);
  const [ofertaExpirada, setOfertaExpirada] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(0);

  const permitirSaidaRef = useRef(false);

  // ==========================================
  // MATEMÁTICA DA ESTEIRA E ANTI-FUGA
  // ==========================================
  useEffect(() => {
    if (carregando || !dadosDoSanity || !dadosDoSanity.funilMae) return;

    // A genialidade: A esteira do Sanity dita a ordem. 
    // O primeiro item (index 0) é SEMPRE o primeiro Upsell pós-venda.
    const indiceNaEsteira = dadosDoSanity.funilMae.esteiraSlugs?.indexOf(slug);
    const isPrimeiroUpsell = indiceNaEsteira === 0;

    // 1. ARMADILHA DO BOTÃO VOLTAR (Apenas se for o primeiro da lista)
    if (isPrimeiroUpsell) {
      window.history.pushState({ preso: true }, '', window.location.href);

      const bloquearVoltar = (e: PopStateEvent) => {
        if (permitirSaidaRef.current) return;
        window.history.pushState({ preso: true }, '', window.location.href);
        alert("Atenção: Seu pedido anterior já foi processado. Por favor, conclua esta etapa para não travar sua entrega.");
      };

      window.addEventListener('popstate', bloquearVoltar);
      
      // 2. ALERTA DE RECARREGAMENTO (Anti-F5)
      const bloquearRefresh = (e: BeforeUnloadEvent) => {
        if (permitirSaidaRef.current) return; 
        e.preventDefault();
        e.returnValue = ''; 
      };
      window.addEventListener('beforeunload', bloquearRefresh);

      return () => {
        window.removeEventListener('popstate', bloquearVoltar);
        window.removeEventListener('beforeunload', bloquearRefresh);
      };
    }
  }, [carregando, dadosDoSanity, slug]);


  // ==========================================
  // 3. LÓGICA DE ESCASSEZ
  // ==========================================
  useEffect(() => {
    if (!mostrarOferta || !dadosDoSanity || !dadosDoSanity.ofertaAtual) return;

    const tempoEmMinutos = dadosDoSanity.ofertaAtual.elementosConfianca?.tempoTimer || 15;
    
    setTempoRestante(tempoEmMinutos * 60);

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
  }, [mostrarOferta, slug, dadosDoSanity]);


  if (carregando) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Carregando sua oferta segura...</div>;
  }

  if (!dadosDoSanity || !dadosDoSanity.ofertaAtual) {
    return notFound();
  }

  const { ofertaAtual, funilMae } = dadosDoSanity;
  const isDownsell = ofertaAtual.configuracoesInternas?.tipoOferta?.includes('Downsell');

  // ==========================================
  // CÁLCULO DE TOPO (Dinâmico para listas infinitas)
  // ==========================================
  let textoTopo = '';
  if (isDownsell) {
    textoTopo = '⚠️ ÚLTIMA CHANCE ANTES DO ACESSO';
  } else {
    // Se for Upsell, calculamos a posição dele na esteira
    const posicao = funilMae?.esteiraSlugs?.indexOf(slug) ?? 0;
    // O total de etapas é o Produto Principal (1) + Quantidade de ofertas na esteira
    const totalEtapas = (funilMae?.esteiraSlugs?.length || 0) + 1;
    // A etapa atual é o Produto (1) + 1 (pois arrays começam em 0) + a posição dele
    const etapaAtual = posicao + 2; 

    textoTopo = `✅ Etapa ${etapaAtual} de ${totalEtapas} Concluída`;
  }

  const parametrosAtuais = searchParams.toString();
  
  const linkSimBase = ofertaAtual.botoesAcao?.ofertaSim?.checkoutUrl || '';
  const linkSimFinal = parametrosAtuais ? `${linkSimBase}?${parametrosAtuais}` : linkSimBase;
  
  const linkNaoBase = ofertaAtual.botoesAcao?.ofertaNao?.rotaDownsellUrl || '';
  const linkNaoFinal = parametrosAtuais ? `${linkNaoBase}?${parametrosAtuais}` : linkNaoBase;

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
      // Corrige a URL para garantir que não mande pra rota errada
      const rotaFormatada = linkNaoFinal.startsWith('/') ? linkNaoFinal : `/${linkNaoFinal}`;
      router.push(rotaFormatada); 
    }
  };

  // Prepara o link do Whatsapp
  const foneSuporte = funilMae?.contatos?.telefoneSuporte;
  const linkSuporte = foneSuporte ? `https://wa.me/${foneSuporte.replace(/\D/g, '')}` : null;

  return (
    <>
      <div className={`w-full text-white text-center py-2 text-xs md:text-sm font-bold uppercase tracking-widest shadow-md transition-colors ${ofertaExpirada ? 'bg-slate-800' : 'bg-red-600'}`}>
        {ofertaExpirada ? '❌ ESTA OFERTA FOI ENCERRADA.' : '⚠️ Não feche esta página ou você perderá seu acesso exclusivo.'}
      </div>

      <main className="w-full max-w-4xl px-4 mt-10 md:mt-16 flex flex-col items-center text-center">
        
        <h1 
          className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          dangerouslySetInnerHTML={{ __html: ofertaAtual.headline || '' }}
        />

        <p className="mt-6 text-lg md:text-xl text-slate-600 font-medium max-w-3xl leading-relaxed mb-10">
          {ofertaAtual.subheadlineHook?.textoSubheadline}
        </p>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          {/* TOPO DINÂMICO DE ETAPAS */}
          <div className={`w-full text-white text-center py-2 md:py-3 text-xs md:text-sm font-black uppercase tracking-widest rounded-t-xl shadow-md border border-b-0 ${isDownsell ? 'bg-amber-600 border-amber-700' : 'bg-sky-600 border-sky-700'}`}>
            {textoTopo}
          </div>

          <div className="w-full relative z-10">
            {ofertaAtual.video && (
              <SmartVsl 
                videoId={ofertaAtual.video.videoId} 
                tempoDelaySegundos={ofertaAtual.video.delaySegundos || 10}
                onLiberarConteudo={() => setMostrarOferta(true)} 
              />
            )}
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
                      {ofertaAtual.botoesAcao?.ofertaSim?.subtextoBotaoSim}
                    </p>
                  </div>

                  <button 
                    onClick={handleCompra}
                    className="w-full py-5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.5)] transition-all hover:-translate-y-1 group cursor-pointer"
                  >
                    <span className="block text-2xl font-black uppercase tracking-wide">
                      {ofertaAtual.botoesAcao?.ofertaSim?.textoBotaoSim || 'ADICIONAR AO MEU PEDIDO'}
                    </span>
                  </button>

                  <button 
                    onClick={handleRecusa}
                    className="w-full py-4 px-6 border-2 border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all font-bold text-lg md:text-xl rounded-xl text-center mt-2 cursor-pointer"
                  >
                    {ofertaAtual.botoesAcao?.ofertaNao?.textoBotaoNao || 'Não, obrigado.'}
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

            {/* BOTÃO DE SUPORTE INJETADO PELO MAESTRO */}
            {linkSuporte && (
              <div className="mt-16 pt-8 border-t border-slate-200 w-full flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-3">
                  Ficou com alguma dúvida sobre o seu pedido?
                </p>
                <a 
                  href={linkSuporte} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm"
                >
                  <span className="text-xl text-emerald-500">💬</span> Falar com o Suporte no WhatsApp
                </a>
              </div>
            )}

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