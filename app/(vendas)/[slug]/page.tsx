"use client";

import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import SmartVsl from '@/components/SmartVsl';
import FaqAccordion from '@/components/FaqAccordion';
import { produtos } from '@/data/produtos';
import Tracking from '@/components/Tracking';

export default function PaginaGenericaDeVendas({ params }: { params: Promise<{ slug: string }> }) {
  const [conteudoLiberado, setConteudoLiberado] = useState(false);
  const resolvedParams = use(params);
  const produto = produtos.find((p) => p.slug === resolvedParams.slug);

  // ==========================================
  // LÓGICA DE BLOQUEIO DA SETINHA DE VOLTAR (100% LIMPA)
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

  if (!produto) return notFound();

  return (
    // Adicionado pb-24 no mobile para o conteúdo não ficar escondido atrás do Sticky CTA
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans leading-relaxed pb-24 md:pb-0">
      
      {/* ========================================== */}
      {/* 1. ABOVE THE FOLD (100dvh Real)            */}
      {/* ========================================== */}
      <section className="min-h-[100dvh] flex flex-col justify-center max-w-[800px] mx-auto py-6 px-5">
        
        {/* HEADER DINÂMICO */}
        <header className="text-center mb-6">
          <h1 className="text-[1.5rem] md:text-[2.5rem] font-black uppercase leading-tight mb-3 text-slate-900">
            {produto.headlineStart} <span className="text-sky-500">{produto.headlineHighlight}</span>
          </h1>
          <p className="text-[1rem] md:text-[1.2rem] text-slate-500">
            {produto.subheadline}
          </p>
        </header>

        {/* VSL COM DELAY */}
        <SmartVsl 
          videoId={produto.videoId} 
          tempoDelaySegundos={produto.delaySegundos} 
          onLiberarConteudo={() => setConteudoLiberado(true)} 
        />
      </section>

      {/* ========================================== */}
      {/* 2. LAZY LOADING AGRESSIVO                  */}
      {/* (Só existe no código após o delay bater)   */}
      {/* ========================================== */}
      {conteudoLiberado && (
        <div className="max-w-[800px] mx-auto px-5 animate-in fade-in duration-1000">
          
          {/* CTA IMEDIATO */}
          <div className="text-center mt-2 md:mt-8">
            <a href="#checkout" className="inline-block bg-emerald-500 text-white py-4 px-8 text-[1.2rem] md:text-[1.4rem] font-black uppercase rounded-md shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors animate-pulse-green w-full md:w-auto">
              Quero Acessar Agora
            </a>
            <p className="text-[0.85rem] text-slate-500 mt-3">🔒 Ambiente Seguro & Acesso Imediato</p>
          </div>

          {/* STORY BOXES DINÂMICAS */}
          <div className="mt-12">
            {produto.copySecoes.map((secao, index) => (
              <section 
                key={index} 
                className={`p-6 md:p-[30px] rounded-lg mb-8 border ${secao.destaque ? 'bg-slate-100 border-slate-200 border-l-4 border-l-sky-500' : 'bg-white border-slate-200'}`}
              >
                <h2 className="text-sky-500 mb-4 text-[1.5rem] md:text-[1.8rem] font-bold leading-tight">{secao.titulo}</h2>
                {secao.paragrafos.map((paragrafo, pIndex) => (
                  <p key={pIndex} className="mb-4 text-[1.05rem] md:text-[1.1rem] text-slate-700" dangerouslySetInnerHTML={{ __html: paragrafo }} />
                ))}
              </section>
            ))}
          </div>

          {/* CHECKOUT BOX DINÂMICO (A MÁQUINA DE VENDAS) */}
          <div id="checkout" className="text-center bg-white p-6 md:p-[40px_30px] rounded-xl mt-[50px] border-2 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.08)]">
            <h2 className="text-slate-900 mb-6 font-bold text-xl md:text-2xl uppercase">O ACORDO FINAL</h2>
            
            <div className="text-left bg-slate-50 p-4 md:p-5 rounded-md mb-[30px] border border-slate-200 text-[1rem] md:text-[1.1rem]">
              <p className="mb-2 flex justify-between">
                <span>📚 {produto.oferta.nomeProduto}</span> 
                <span className="text-slate-500">R$ {produto.oferta.precoOriginal}</span>
              </p>
              
              {/* Renderiza os bônus dinamicamente */}
              {produto.oferta.bonus.map((bonus, index) => (
                <p key={index} className="mb-2 flex justify-between">
                  <span>🎁 Bônus: {bonus.nome}</span> 
                  <span className="text-slate-500">R$ {bonus.valor}</span>
                </p>
              ))}
              
              <hr className="border-t border-slate-200 my-4" />
              <p className="text-right text-slate-500 font-bold flex justify-between">
                <span>Valor Total:</span>
                <span className="line-through text-red-500">R$ {produto.oferta.valorTotalFalso}</span>
              </p>
            </div>

            <p className="text-[2.5rem] md:text-[3.5rem] font-black text-emerald-500 leading-none my-3">
              {produto.oferta.parcelas}
            </p>
            <p className="mb-[30px] text-slate-500 font-medium text-sm md:text-base">
              ou {produto.oferta.precoVista} à vista
            </p>
            
            <a href={produto.checkoutUrl} className="block w-full bg-emerald-500 text-white py-4 px-4 md:px-8 text-[1.1rem] md:text-[1.4rem] font-black uppercase rounded-md shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors animate-pulse-green">
              SIM! QUERO ACESSAR AGORA
            </a>
            <p className="mt-6 text-red-500 font-bold text-[0.85rem] md:text-[0.95rem]">⚠️ Aviso: Vagas limitadas para este lote promocional.</p>
          </div>

          {/* GARANTIA */}
          <section className="flex flex-col md:flex-row items-center justify-start bg-slate-50 border border-dashed border-yellow-500 p-6 md:p-8 rounded-xl my-10 gap-6 md:gap-8 text-center md:text-left">
            <div className="shrink-0 flex justify-center items-center">
               <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-yellow-400 rounded-full flex items-center justify-center font-black text-xl md:text-2xl text-white shadow-lg shadow-yellow-400/30">7 DIAS</div>
            </div>
            <div className="flex-1">
              <h3 className="text-yellow-500 text-[1.3rem] md:text-[1.5rem] font-black mb-3 leading-tight uppercase">GARANTIA BLINDADA DE 7 DIAS</h3>
              <p className="text-[0.95rem] md:text-[1rem] text-slate-500 leading-relaxed m-0">Eu confio tanto na nossa metodologia que o risco é todo meu. Acesse o material e, se em 7 dias você não sentir resultados reais, eu devolvo 100% do seu dinheiro sem burocracia.</p>
            </div>
          </section>

          {/* FAQ DINÂMICO */}
          {produto.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sky-500 mb-5 text-[1.5rem] md:text-[1.8rem] font-bold text-center mt-12">Dúvidas Frequentes</h2>
              <FaqAccordion faqs={produto.faqs} />
            </div>
          )}

        </div>
      )}

      {/* ========================================== */}
      {/* 3. STICKY CTA MOBILE (Botão Pegajoso)      */}
      {/* ========================================== */}
      {conteudoLiberado && (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 z-50 md:hidden animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <a 
            href={produto.checkoutUrl} 
            className="block w-full py-4 bg-emerald-500 text-white text-center text-[1.1rem] font-black uppercase rounded-lg shadow-lg"
          >
            ACESSAR PROTOCOLO
          </a>
        </div>
      )}

      {/* RASTREAMENTO DINÂMICO ISOLADO (META + GOOGLE) */}
      {/* Puxa os IDs exatos deste produto para separar a inteligência das campanhas */}
      <Tracking
        pixelMetaId={produto.pixelMetaId} 
        googleAnalyticsId={produto.googleAnalyticsId} 
      />

    </main>
  );
}