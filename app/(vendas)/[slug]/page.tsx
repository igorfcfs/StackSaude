"use client";

import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import SmartVsl from '@/components/SmartVsl';
import FaqAccordion from '@/components/FaqAccordion';
import Tracking from '@/components/Tracking';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-10';

// ==========================================
// FUNÇÃO DE BUSCA NO SANITY
// ==========================================
async function getSalespageDoSanity(slugUrl: string) {
  // Busca o funil baseado no slug da URL e expande a Referência da Salespage
  const query = encodeURIComponent(`
    *[_type == "funilConfig" && slug.current == "${slugUrl}"][0] {
      "slug": slug.current,
      "salespage": salespageRef-> {
        configuracoesInternas,
        headline,
        vsl,
        lead,
        historia,
        pitch {
          ...,
          "mockupUrl": mockup.asset->url
        },
        evidencia {
          ...,
          "provaMidia": provaMidia[] { ..., "imagemUrl": printImagem.asset->url },
          "testemunhos": testemunhos[] { ..., "fotoUrl": fotoPrint.asset->url }
        },
        ofertaStack,
        acordo {
          ...,
          "garantia": garantia { ..., "seloUrl": selo.asset->url }
        },
        faqSection
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
    console.error("Erro ao buscar Salespage:", error);
    return null;
  }
}

export default function PaginaGenericaDeVendas({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  const [funil, setFunil] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [conteudoLiberado, setConteudoLiberado] = useState(false);

  // ==========================================
  // BUSCA OS DADOS AO CARREGAR
  // ==========================================
  useEffect(() => {
    async function fetchData() {
      const dados = await getSalespageDoSanity(resolvedParams.slug);
      setFunil(dados);
      setCarregando(false);
    }
    fetchData();
  }, [resolvedParams.slug]);

  // ==========================================
  // LÓGICA DE BLOQUEIO DA SETINHA DE VOLTAR
  // ==========================================
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const recarregarPagina = () => {
      window.history.pushState(null, "", window.location.href);
      window.location.reload();
    };

    window.addEventListener('popstate', recarregarPagina);

    return () => {
      window.removeEventListener('popstate', recarregarPagina);
    };
  }, []);

  if (carregando) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Preparando apresentação...</div>;
  }

  if (!funil || !funil.salespage) return notFound();

  const { salespage } = funil;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed pb-24 md:pb-0">
      
      {/* INJETANDO A ANIMAÇÃO DE ESCALA PARA O BOTÃO */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGreen {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 15px rgba(16,185,129,0.3); }
          50% { transform: scale(1.02); box-shadow: 0 4px 25px rgba(16,185,129,0.6); }
        }
        .animate-pulse-green {
          animation: pulseGreen 2s infinite ease-in-out;
        }
      `}} />

      {/* ========================================== */}
      {/* 1. ABOVE THE FOLD (100dvh Real)            */}
      {/* ========================================== */}
      <section className="min-h-[100dvh] flex flex-col justify-center max-w-[800px] mx-auto py-6 px-5 relative z-10">
        
        {/* HEADER DINÂMICO */}
        <header className="text-center mb-6">
          <h1 className="text-[1.5rem] md:text-[2.5rem] font-black uppercase leading-tight mb-3 text-slate-900">
            {salespage.headline?.headlineStart} <span className="text-sky-500">{salespage.headline?.headlineHighlight}</span>
          </h1>
          <p className="text-[1rem] md:text-[1.2rem] text-slate-600 font-medium">
            {salespage.headline?.subheadline}
          </p>
        </header>

        {/* VSL COM DELAY */}
        {salespage.vsl && (
          <SmartVsl 
            videoId={salespage.vsl.videoId} 
            tempoDelaySegundos={salespage.vsl.delaySegundos || 10} 
            onLiberarConteudo={() => setConteudoLiberado(true)} 
          />
        )}

        <a href={salespage.configuracoesInternas?.checkoutUrl || '#'} className="block w-full bg-emerald-500 text-white py-4 px-4 md:px-8 text-[1.1rem] md:text-[1.4rem] font-black uppercase rounded-md shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors animate-pulse-green">
          {salespage.ofertaStack.ancoragemPreco?.textoCta || 'SIM! QUERO ACESSAR AGORA'}
        </a>

      </section>

      {/* ========================================== */}
      {/* 2. LAZY LOADING AGRESSIVO (A COPY REVELADA)*/}
      {/* ========================================== */}
      {conteudoLiberado && (
        <div className="max-w-[800px] mx-auto px-5 animate-in fade-in duration-1000">
          
          {/* CTA IMEDIATO DA OFERTA (CORRIGIDO PARA BUSCAR DO LUGAR CERTO) */}
          {salespage.configuracoesInternas?.checkoutUrl && (
            <div className="text-center mt-2 md:mt-8 mb-12">
              <a href={salespage.configuracoesInternas.checkoutUrl} className="inline-block bg-emerald-500 text-white py-4 px-8 text-[1.2rem] md:text-[1.4rem] font-black uppercase rounded-md shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors animate-pulse-green w-full md:w-auto">
                {salespage.ofertaStack?.ancoragemPreco?.textoCta || 'Quero Acessar Agora'}
              </a>
              <p className="text-[0.85rem] text-slate-500 mt-3">🔒 Ambiente Seguro & Acesso Imediato</p>
            </div>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 3: O LEAD (Cenário e Empatia)        */}
          {/* ========================================== */}
          {salespage.lead && (
            <section className="p-6 md:p-[30px] rounded-xl mb-8 border bg-white border-slate-200 shadow-sm">
              <div className="prose prose-lg prose-p:text-slate-700 max-w-none mb-6">
                <PortableText value={salespage.lead.cenario} />
                <PortableText value={salespage.lead.vilao} />
              </div>
              
              {/* As Perguntas (Micro-compromissos) em destaque */}
              {salespage.lead.perguntas && salespage.lead.perguntas.length > 0 && (
                <div className="bg-slate-50 border-l-4 border-sky-500 p-5 rounded-r-lg mb-6">
                  {salespage.lead.perguntas.map((pergunta: string, idx: number) => (
                    <p key={idx} className="font-bold text-slate-800 text-lg mb-2 flex gap-2">
                      <span className="text-sky-500">?</span> {pergunta}
                    </p>
                  ))}
                </div>
              )}

              <div className="prose prose-lg prose-p:text-slate-700 max-w-none">
                <PortableText value={salespage.lead.historia} />
              </div>
            </section>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 4: HISTÓRIA E EPIFANIA               */}
          {/* ========================================== */}
          {salespage.historia?.jornadaHeroi && (
            <section className="p-6 md:p-[30px] rounded-xl mb-8 border bg-slate-100 border-slate-200 border-l-4 border-l-sky-500 shadow-sm">
              <h2 className="text-sky-500 mb-6 text-[1.5rem] md:text-[1.8rem] font-black leading-tight">Como eu descobri o código-fonte desse problema</h2>
              
              <p className="mb-4 text-[1.1rem] text-slate-700">{salespage.historia.jornadaHeroi.heroi}</p>
              <p className="mb-4 text-[1.1rem] text-slate-700">{salespage.historia.jornadaHeroi.obstaculos}</p>
              <div className="bg-white p-5 rounded-lg border border-slate-200 italic font-medium my-5 shadow-sm">
                "{salespage.historia.jornadaHeroi.epifania}"
              </div>
              <p className="text-[1.1rem] text-slate-700 font-bold">{salespage.historia.jornadaHeroi.vitoria}</p>
            </section>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 5: PITCH E REVELAÇÃO DO PRODUTO      */}
          {/* ========================================== */}
          {salespage.pitch && (
            <section className="p-6 md:p-[40px] rounded-xl mb-12 border bg-slate-900 border-slate-800 text-white shadow-xl text-center">
              
              {/* CORREÇÃO 1: Só mostra a transição (e as aspas) se o texto existir no Sanity */}
              {salespage.pitch.transicao && (
                <p className="text-slate-300 mb-6 text-lg italic">"{salespage.pitch.transicao}"</p>
              )}
              
              {/* Mockup do Produto */}
              {salespage.pitch.mockupUrl && (
                <div className="relative w-full max-w-xl mx-auto h-128 md:h-160 mb-8 flex justify-center">
                  <img 
                    src={salespage.pitch.mockupUrl} 
                    alt={salespage.pitch.nomeProduto || 'Mockup do Produto'} 
                    className="w-full h-full object-contain drop-shadow-2xl scale-110"
                  />
                </div>
              )}

              {/* CORREÇÃO 2: Só mostra o Título e a Revelação se estiverem preenchidos */}
              {salespage.pitch.nomeProduto && (
                <h2 className="text-sky-400 mb-4 text-[2rem] md:text-[2.8rem] font-black uppercase tracking-tight">
                  {salespage.pitch.nomeProduto}
                </h2>
              )}
              
              {salespage.pitch.revelacao && (
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-10">
                  {salespage.pitch.revelacao}
                </p>
              )}

              {/*Benefícios Dinâmicos*/}
              {/* CORREÇÃO 3: O "certinho" azul só aparece se você preencher o título do benefício */}
              {salespage.pitch.beneficios && salespage.pitch.beneficios.length > 0 && (
                <div className="text-left space-y-6">
                  {salespage.pitch.beneficios.map((ben: any, idx: number) => (
                    // A trava mágica: só renderiza a linha se houver um título escrito no Sanity
                    ben.titulo && (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="bg-sky-500/20 p-2 rounded-full shrink-0">
                          <span className="text-sky-400 font-bold">✓</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-white">{ben.titulo}</h4>
                          {ben.descricao && <p className="text-slate-400 mt-1">{ben.descricao}</p>}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 6: EVIDÊNCIA E PROVA SOCIAL          */}
          {/* ========================================== */}
          {salespage.evidencia && (
            <section className="mb-12">
              {salespage.evidencia.credibilidade && (
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Respaldado pela Ciência</h3>
                  <p className="text-slate-600 text-lg max-w-2xl mx-auto">{salespage.evidencia.credibilidade}</p>
                </div>
              )}
              
              {/* Prints da Mídia (Se houver) */}
              {salespage.evidencia.provaMidia && salespage.evidencia.provaMidia.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {salespage.evidencia.provaMidia.map((midia: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Visto em: {midia.fonte}</p>
                      <h4 className="font-black text-slate-800 mb-3">{midia.headline}</h4>
                      {midia.imagemUrl && (
                         <div className="relative w-full h-32 bg-slate-100 rounded-md overflow-hidden">
                           <Image src={midia.imagemUrl} alt={midia.headline} fill className="object-cover" />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 7: O GRANDE STACK DE OFERTA          */}
          {/* ========================================== */}
          {salespage.ofertaStack && (
            <div id="checkout" className="text-center bg-white p-6 md:p-[40px_30px] rounded-xl mt-[50px] border-2 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.08)]">
              <h2 className="text-slate-900 mb-6 font-bold text-xl md:text-2xl uppercase">O ACORDO FINAL</h2>
              
              <p className="text-slate-600 mb-6 text-lg italic px-4">"{salespage.ofertaStack.construcaoValor}"</p>

              <div className="text-left bg-slate-50 p-4 md:p-5 rounded-md mb-[30px] border border-slate-200 text-[1rem] md:text-[1.1rem]">
                <p className="mb-3 flex justify-between border-b border-slate-200 pb-3">
                  <span className="font-bold text-slate-800">📚 {salespage.ofertaStack.produtoPrincipal?.nome}</span> 
                  <span className="text-slate-500">{salespage.ofertaStack.produtoPrincipal?.valorPercebido}</span>
                </p>
                
                {salespage.ofertaStack.bonusStack?.map((bonus: any, idx: number) => (
                  <p key={idx} className="mb-2 flex justify-between">
                    <span>🎁 Bônus: {bonus.nome}</span> 
                    <span className="text-slate-500">{bonus.valorPercebido}</span>
                  </p>
                ))}
                
                <hr className="border-t border-slate-200 my-4" />
                
                <p className="text-right text-slate-500 font-bold flex flex-col md:flex-row justify-end items-end md:items-center gap-2">
                  <span>Valor Total Se Fosse Comprar Tudo:</span>
                  <span className="line-through text-red-500 text-xl">{salespage.ofertaStack.ancoragemPreco?.valorTotalAncorado}</span>
                </p>
              </div>

              <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">{salespage.ofertaStack.ancoragemPreco?.fraseAncoragem}</p>
              
              <p className="text-[2.5rem] md:text-[3.5rem] font-black text-emerald-500 leading-none my-3">
                {salespage.ofertaStack.ancoragemPreco?.parcelas}
              </p>
              <p className="mb-[30px] text-slate-500 font-medium text-sm md:text-base">
                ou {salespage.ofertaStack.ancoragemPreco?.precoVista} à vista
              </p>
              
              {/* BOTÃO PRINCIPAL (CORRIGIDO PARA BUSCAR DO LUGAR CERTO) */}
              <a href={salespage.configuracoesInternas?.checkoutUrl || '#'} className="block w-full bg-emerald-500 text-white py-4 px-4 md:px-8 text-[1.1rem] md:text-[1.4rem] font-black uppercase rounded-md shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors animate-pulse-green">
                {salespage.ofertaStack.ancoragemPreco?.textoCta || 'SIM! QUERO ACESSAR AGORA'}
              </a>

              {/* Aviso de Order Bump se ativado */}
              {salespage.ofertaStack.ancoragemPreco?.orderBumpAtivo && (
                <p className="mt-4 text-sky-600 font-bold text-[0.85rem] md:text-[0.95rem] bg-sky-50 py-2 rounded-md">
                   💡 Fique atento à próxima página para uma condição exclusiva!
                </p>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 8: A GARANTIA                        */}
          {/* ========================================== */}
          {salespage.acordo?.garantia && (
            <section className="flex flex-col md:flex-row items-center justify-start bg-slate-50 border border-dashed border-yellow-500 p-6 md:p-8 rounded-xl my-10 gap-6 md:gap-8 text-center md:text-left">
              <div className="shrink-0 flex justify-center items-center">
                {salespage.acordo.garantia.seloUrl ? (
                  <img 
                    src={salespage.acordo.garantia.seloUrl} 
                    alt="Selo de Garantia" 
                    className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-contain drop-shadow-lg" 
                  />
                ) : (
                  <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-yellow-400 rounded-full flex items-center justify-center font-black text-xl md:text-2xl text-white shadow-lg shadow-yellow-400/30">
                    {salespage.acordo.garantia.prazoDias} DIAS
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-yellow-500 text-[1.3rem] md:text-[1.5rem] font-black mb-3 leading-tight uppercase">GARANTIA DE RISCO ZERO</h3>
                <p className="text-[0.95rem] md:text-[1rem] text-slate-600 leading-relaxed m-0 font-medium">{salespage.acordo.garantia.textoGarantia}</p>
              </div>
            </section>
          )}

          {/* AVISO SEVERO E ESCASSEZ */}
          {salespage.acordo?.fechamento && (
             <div className="text-center max-w-2xl mx-auto my-12 p-6 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                <h4 className="text-red-600 font-black uppercase mb-2">Qual será a sua escolha?</h4>
                <p className="text-slate-700 italic">"{salespage.acordo.fechamento.avisoSevero}"</p>
             </div>
          )}

          {/* ========================================== */}
          {/* SEÇÃO 9: FAQ DINÂMICO                      */}
          {/* ========================================== */}
          {salespage.faqSection && salespage.faqSection.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sky-500 mb-8 text-[1.5rem] md:text-[1.8rem] font-black text-center mt-12 uppercase">Dúvidas Frequentes</h2>
              <FaqAccordion faqs={salespage.faqSection} />
            </div>
          )}

        </div>
      )}

      {/* STICKY CTA MOBILE (Botão Pegajoso) */}
      {conteudoLiberado && (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 z-50 md:hidden animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <a 
            href={salespage.configuracoesInternas?.checkoutUrl || '#'} 
            className="block w-full py-4 bg-emerald-500 text-white text-center text-[1.1rem] font-black uppercase rounded-lg shadow-lg animate-pulse-green"
          >
            {salespage.ofertaStack?.ancoragemPreco?.textoCta || 'SIM! QUERO ACESSAR AGORA'}
          </a>
        </div>
      )}

      <Tracking pixelMetaId={salespage.configuracoesInternas?.pixels?.pixelMetaId} googleAnalyticsId={salespage.configuracoesInternas?.pixels?.googleAnalyticsId} />

    </main>
  );
}