"use client";

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import FooterLegais from '@/components/FooterLegais';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-10';

// ==========================================
// FUNÇÃO DE BUSCA NO SANITY (ATUALIZADA)
// ==========================================
async function getPresellDoSanity(slugUrl: string) {
  const query = encodeURIComponent(`
    *[_type == "funilConfig" && slug.current == "${slugUrl}"][0] {
      "slug": slug.current,
      "presell": presellRef-> {
        categoria,
        titulo,
        dataPublicacao,
        citacaoDestacada,
        ctas,
        paragrafos
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
    console.error("Erro ao buscar Presell:", error);
    return null;
  }
}

export default function AdvertorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  const [funil, setFunil] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [mostrarMais, setMostrarMais] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const dados = await getPresellDoSanity(resolvedParams.slug);
      setFunil(dados);
      setCarregando(false);
    }
    fetchData();
  }, [resolvedParams.slug]);

  // Anti-fuga
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const recarregarPagina = () => {
      window.history.pushState(null, "", window.location.href);
      window.location.reload();
    };
    window.addEventListener('popstate', recarregarPagina);
    return () => window.removeEventListener('popstate', recarregarPagina);
  }, []);

  if (carregando) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Carregando inteligência...</div>;
  }

  if (!funil || !funil.presell) return notFound();

  const { presell, slug } = funil;
  
  const dataFormatada = presell.dataPublicacao 
    ? new Date(presell.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Recentemente';

  // Garante que paragrafos é um array para não quebrar o .slice
  const arrayParagrafos = presell.paragrafos || [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-sky-100 selection:text-sky-900 pb-12">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-scale-pulse {
          animation: scalePulse 2s infinite ease-in-out;
        }
      `}} />

      <header className="bg-white border-b border-slate-200 py-5 text-center shadow-sm">
        <div className="font-serif text-[1.6rem] font-black text-slate-900 tracking-wide uppercase">
          <span>Stack <span className="text-sky-500">Saúde</span></span>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto mt-8 md:mt-12 bg-white p-6 md:p-12 rounded-xl border border-slate-200 shadow-sm">
        
        <span className="text-sky-500 font-bold uppercase text-sm mb-4 inline-block tracking-wider bg-sky-50 px-3 py-1 rounded-full">
          {presell.categoria || 'Artigo'}
        </span>
        
        <h1 className="font-serif text-[1.8rem] md:text-[2.4rem] text-slate-900 leading-tight mb-6 font-black">
          {presell.titulo}
        </h1>
        
        <div className="text-sm text-slate-500 border-b border-slate-100 pb-5 mb-8 flex items-center gap-3">
          <Image src={'/LogoStackSaude.png'} alt="Stack Saúde" width={32} height={32} className="rounded-full object-cover shadow-sm ring-1 ring-slate-100" />
          <div>
            <strong className="text-slate-700">Por Stack Saúde</strong> <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Atualizado em {dataFormatada}
          </div>
        </div>

        {/* ========================================== */}
        {/* RENDERIZAÇÃO INTELIGENTE DOS PARÁGRAFOS    */}
        {/* ========================================== */}
        <div className="prose prose-lg md:prose-xl max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-slate-900 prose-img:rounded-xl">
          
          {/* 1. PARTE SEMPRE VISÍVEL (2 parágrafos + Link Discreto) */}
          <PortableText value={arrayParagrafos.slice(0, 2)} />
          
          {presell.ctas?.urlCtaDiscreta && (
            <div className="mb-12 mt-4 relative z-20">
              <Link 
                href={`/${slug}`} 
                className="text-sky-600 font-bold text-[1.1rem] md:text-[1.15rem] underline hover:text-sky-800 transition-colors inline-block py-2"
              >
                {presell.ctas.urlCtaDiscreta}
              </Link>
            </div>
          )}

          {/* 2. PARTE EXPANSÍVEL COM DEGRADÊ */}
          <div className="relative">
            {!mostrarMais ? (
              <>
                {/* Mostra só uma lasquinha do 3º parágrafo borrado para instigar a leitura */}
                <div className="max-h-[90px] overflow-hidden opacity-30 select-none">
                  <PortableText value={arrayParagrafos.slice(2, 3)} />
                </div>
                
                {/* O Botão e o Degradê colados no texto cortado */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-0">
                  <button 
                    onClick={() => setMostrarMais(true)}
                    className="bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition-colors px-6 py-2 rounded-full text-[0.85rem] font-black uppercase flex items-center gap-2 shadow-sm relative z-30"
                  >
                    Ler matéria completa
                    <span className="animate-bounce mt-1">▼</span>
                  </button>
                </div>
              </>
            ) : (
              /* 3. CONTEÚDO EXPANDIDO (TEXTO COMPLETO) */
              <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                
                {/* Parágrafos 3 e 4 */}
                <PortableText value={arrayParagrafos.slice(2, 4)} />

                {/* A Citação Destacada (Após o 4º parágrafo) */}
                {presell.citacaoDestacada && (
                  <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-sky-500 p-6 my-8 rounded-r-lg text-slate-800 text-[1.15rem] md:text-[1.25rem] font-serif italic shadow-sm">
                    {presell.citacaoDestacada}
                  </div>
                )}

                {/* Todo o resto dos parágrafos do bloco 5 em diante */}
                <PortableText value={arrayParagrafos.slice(4)} />
              </div>
            )}
          </div>
        </div>

        {/* CTA FINAL DINÂMICO DO SANITY */}
        <div className="text-center mt-12 mb-2 p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 uppercase">
            {presell.ctas?.textoCta || 'Assista à apresentação completa do método:'}
          </h3>
          
          <Link 
            href={`/${slug}`} 
            className="block md:inline-block bg-emerald-500 text-white py-4 px-8 text-[1.1rem] md:text-[1.3rem] font-black uppercase rounded-md shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:bg-emerald-600 transition-colors w-full md:w-auto animate-scale-pulse"
          >
            {presell.ctas?.botaoCta || 'Assistir ao Vídeo Explicativo »'}
          </Link>
          <p className="text-xs text-red-500 font-bold mt-5">
            ⚠️ O vídeo pode ser retirado do ar a qualquer momento devido à alta demanda.
          </p>
        </div>
      </main>

      <FooterLegais />
    </div>
  );
}