"use client";

import { use, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { funis } from '@/data/funis';

function ObrigadoConteudo({ slug }: { slug: string }) {
  // Como o último downsell joga para "/obrigado/protocolo-neuro-reset", 
  // o nosso slug aqui é exatamente o slug raiz do funil.
  const funilAtual = funis.find((f) => f.slug === slug);

  if (!funilAtual) {
    notFound();
  }

  // ==========================================
  // LINKS FIXOS DA MARCA (Hardcoded)
  // ==========================================
  const linkMembros = 'https://membros.stacksaude.com.br'; // Altere para o link real
  const redes = {
    instagram: 'https://instagram.com/stacksaude',
    facebook: 'https://facebook.com/stacksaude',
    tiktok: 'https://tiktok.com/@stacksaude',
    youtube: 'https://youtube.com/@stacksaude',
    blog: 'https://stacksaude.com.br'
  };

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center animate-fade-in">
      
      {/* Ícone de Sucesso com Pulso */}
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse">
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
        Parabéns! Seu pedido foi <span className="text-emerald-600">aprovado.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 font-medium mb-12">
        Você tomou a decisão certa. O seu acesso ao <strong className="text-slate-900">{funilAtual.produto}</strong> (e todas as atualizações que você adicionou) já foi liberado.
      </p>

      {/* Caixa de Instruções (Reduz Chargeback e Suporte) */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-left mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span>📦</span> Seus próximos passos:
        </h2>
        
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0 mt-1">1</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Abra o seu e-mail</h3>
              <p className="text-slate-600 mt-1">Nós acabamos de enviar o seu link de acesso exclusivo para o e-mail que você cadastrou no momento da compra.</p>
            </div>
          </li>
          
          <li className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0 mt-1">2</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Procure pelo remetente da Plataforma</h3>
              <p className="text-slate-600 mt-1">O e-mail pode chegar em nome da <strong className="text-slate-800">Ticto</strong>. Se não encontrar na caixa de entrada, verifique sua pasta de Spam ou Promoções.</p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center shrink-0 mt-1">3</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Crie sua senha e acesse</h3>
              <p className="text-slate-600 mt-1">Basta clicar no link seguro dentro do e-mail, definir sua senha pessoal e você já estará dentro da nossa Área de Membros.</p>
            </div>
          </li>
        </ul>
        
        {/* NOVO: Botão de Acesso Direto inserido logo abaixo das instruções */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <a 
            href={linkMembros} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-md transition-all hover:-translate-y-1 group"
          >
            <span className="text-xl">💻</span>
            <span className="text-lg font-bold uppercase tracking-wide">Acessar Área de Membros Agora</span>
          </a>
        </div>
      </div>

      {/* Bloco de Suporte de Alta Confiança */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center mb-12">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Ainda não recebeu o e-mail?</h3>
        <p className="text-slate-500 mb-6 text-center max-w-lg">
          Pode levar até 5 minutos para o sistema disparar o acesso. Se passar desse tempo e você não encontrar, nossa equipe está pronta para te ajudar.
        </p>
        
        <a 
          href={funilAtual.linkSuporte || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg"
        >
          {/* Ícone vetorizado do WhatsApp */}
          <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.031 2.007a9.982 9.982 0 0110.038 9.919c0 5.485-4.437 9.943-9.92 10.037h-.062a9.916 9.916 0 01-5.1-1.403L2 22l1.494-4.881a9.928 9.928 0 01-1.396-5.111C2.098 6.52 6.544 2.067 12.031 2.007zm0 1.674c-4.568.05-8.258 3.758-8.258 8.328 0 1.488.397 2.87 1.08 4.053l-.936 3.06 3.125-.947a8.236 8.236 0 004.988 1.637v.001c4.567-.078 8.246-3.791 8.246-8.358 0-4.582-3.69-8.312-8.245-8.374zm4.493 11.233c-.247-.123-1.46-.723-1.685-.805-.226-.084-.39-.124-.555.123-.164.248-.636.806-.78 9.7-.144.164-.287.185-.534.062-.246-.123-1.042-.385-1.986-1.226-.735-.654-1.231-1.464-1.375-1.71-.144-.247-.015-.38.107-.504.11-.11.246-.288.37-.432.122-.144.164-.247.246-.412.083-.164.041-.309-.02-.432-.062-.124-.555-1.339-.76-1.834-.201-.482-.405-.417-.555-.425-.143-.008-.308-.008-.472-.008a.908.908 0 00-.658.309c-.226.247-.863.844-.863 2.059 0 1.216.883 2.392 1.007 2.557.123.165 1.743 2.66 4.223 3.729.59.255 1.05.407 1.408.521.593.189 1.133.162 1.558.098.475-.072 1.46-.597 1.666-1.174.205-.576.205-1.07.143-1.174-.061-.103-.226-.165-.472-.288z" clipRule="evenodd" />
          </svg>
          Chamar Suporte no WhatsApp
        </a>
      </div>

      {/* ECOSSISTEMA DA MARCA: REDES SOCIAIS */}
      <div className="w-full pt-10 border-t border-slate-200 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Faça parte da nossa comunidade</h3>
        <p className="text-slate-500 mb-6 text-sm">Siga nossos canais oficiais para receber conteúdos exclusivos todos os dias.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {/* Instagram */}
          <a href={redes.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* Facebook */}
          <a href={redes.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>

          {/* TikTok */}
          <a href={redes.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
              <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href={redes.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Site/Blog */}
          <a href={redes.blog} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors" title="Site Oficial">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </a>
        </div>
      </div>

    </main>
  );
}

export default function ObrigadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-100 selection:text-sky-900">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Processando seu acesso...</div>}>
        <ObrigadoConteudo slug={slug} />
      </Suspense>
    </div>
  );
}