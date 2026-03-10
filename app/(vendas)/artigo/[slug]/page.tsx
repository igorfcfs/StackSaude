"use client";

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { produtos } from '@/data/produtos';
import Tracking from '@/components/Tracking';
import FooterLegais from '@/components/FooterLegais';

export default function AdvertorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const produto = produtos.find((p) => p.slug === resolvedParams.slug);
  
  // Controle de estado para expandir a leitura
  const [mostrarMais, setMostrarMais] = useState(false);

  // ==========================================
  // LÓGICA DE BLOQUEIO DA SETINHA DE VOLTAR (ANTI-FUGA)
  // ==========================================
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const recarregarPagina = () => {
      window.history.pushState(null, "", window.location.href);
      // Se ele tentar voltar para o Facebook, a página apenas recarrega, 
      // mantendo ele no seu ecossistema.
      window.location.reload();
    };

    window.addEventListener('popstate', recarregarPagina);

    return () => {
      window.removeEventListener('popstate', recarregarPagina);
    };
  }, []);

  if (!produto || !produto.presell) return notFound();

  const { presell } = produto;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-sky-100 selection:text-sky-900 pb-12">
      
      {/* INJETANDO A ANIMAÇÃO DE ESCALA PERSONALIZADA PARA O BOTÃO */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-scale-pulse {
          animation: scalePulse 2s infinite ease-in-out;
        }
      `}} />

      {/* HEADER ESTILO PORTAL */}
      <header className="bg-white border-b border-slate-200 py-5 text-center shadow-sm">
        <div className="font-serif text-[1.6rem] font-black text-slate-900 tracking-wide uppercase">
          <span>Stack <span className="text-sky-500">Saúde</span></span>
        </div>
      </header>

      {/* CONTAINER DO ARTIGO */}
      <main className="max-w-[800px] mx-auto mt-8 md:mt-12 bg-white p-6 md:p-12 rounded-xl border border-slate-200 shadow-sm">
        
        <span className="text-sky-500 font-bold uppercase text-sm mb-4 inline-block tracking-wider bg-sky-50 px-3 py-1 rounded-full">
          {presell.categoria}
        </span>
        
        <h1 className="font-serif text-[1.8rem] md:text-[2.4rem] text-slate-900 leading-tight mb-6 font-black">
          {presell.titulo}
        </h1>
        
        {/* Meta Dados com IMAGEM DO AUTOR */}
        <div className="text-sm text-slate-500 border-b border-slate-100 pb-5 mb-8 flex items-center gap-3">
          <Image 
            src={'/LogoStackSaude.png'} 
            alt="Foto de Stack Saúde"
            width={32}
            height={32}
            className="rounded-full object-cover shadow-sm ring-1 ring-slate-100"
          />
          <div>
            <strong className="text-slate-700">Por Stack Saúde</strong> <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Atualizado em {presell.dataPublicacao}
          </div>
        </div>

        {/* ========================================== */}
        {/* 1. PRIMEIRO PARÁGRAFO E LINK APRESSADO     */}
        {/* ========================================== */}
        {presell.paragrafos.length > 0 && (
          <p className="text-[1.1rem] md:text-[1.15rem] leading-relaxed mb-4 text-slate-700" dangerouslySetInnerHTML={{ __html: presell.paragrafos[0] }} />
        )}

        <div className="mb-6">
          <Link 
            href={`/${produto.slug}`} 
            className="text-sky-600 font-bold text-[1.1rem] md:text-[1.15rem] underline hover:text-sky-800 transition-colors"
          >
            » Assista aqui à apresentação vazada do método (Vídeo)
          </Link>
        </div>

        {/* ========================================== */}
        {/* 2. SEGUNDO PARÁGRAFO COM DEGRADÊ E BOTÃO   */}
        {/* ========================================== */}
        <div className="relative">
          {presell.paragrafos.length > 1 && (
            <p className="text-[1.1rem] md:text-[1.15rem] leading-relaxed mb-0 text-slate-700" dangerouslySetInnerHTML={{ __html: presell.paragrafos[1] }} />
          )}

          {!mostrarMais && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-1">
              <button 
                onClick={() => setMostrarMais(true)}
                className="bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition-colors px-6 py-2 rounded-full text-[0.85rem] font-black uppercase flex items-center gap-2 shadow-sm"
              >
                Ler matéria completa
                <span className="animate-bounce mt-1">▼</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* 3. CONTEÚDO EXPANSÍVEL (SÓ O TEXTO)        */}
        {/* ========================================== */}
        {mostrarMais && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-700 mt-6">
            
            <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-sky-500 p-6 my-8 rounded-r-lg text-slate-800 text-[1.15rem] md:text-[1.25rem] font-serif italic shadow-sm">
              {presell.citacaoDestacada}
            </div>

            {presell.paragrafos.slice(2).map((p, i) => (
              <p key={i + 2} className="text-[1.1rem] md:text-[1.15rem] leading-relaxed mb-6 text-slate-700" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        )}

        {/* ========================================== */}
        {/* 4. BOTÃO CTA (SEMPRE VISÍVEL NO FINAL)     */}
        {/* ========================================== */}
        <div className="text-center mt-12 mb-2 p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase">
            {presell.chamadaCta}
          </h3>
          
          <Link 
            href={`/${produto.slug}`} 
            className="block md:inline-block bg-emerald-500 text-white py-4 px-8 text-[1.1rem] md:text-[1.3rem] font-black uppercase rounded-md shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors w-full md:w-auto animate-scale-pulse"
          >
            Assistir ao Vídeo Explicativo »
          </Link>
          <p className="text-xs text-red-500 font-bold mt-5">
            ⚠️ O vídeo pode ser retirado do ar a qualquer momento devido à alta demanda.
          </p>
        </div>
      </main>

      {/* RODAPÉ COMPLIANCE COM MODAL */}
      <FooterLegais />
      
    </div>
  );
}