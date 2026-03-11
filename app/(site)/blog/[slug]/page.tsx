import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-10';

async function getArtigoDoSanity(slug: string) {
  const query = encodeURIComponent(`
    *[_type == "artigo" && slug.current == "${slug}"][0] {
      titulo,
      resumo,
      categoria,
      tempoLeitura,
      "capaUrl": capa.asset->url,
      conteudo,
      dataPublicacao
    }
  `);

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, { cache: 'no-store' }); 
    if (!res.ok) return null;
    const data = await res.json();
    return data.result; 
  } catch (error) {
    return null;
  }
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = await getArtigoDoSanity(slug);

  if (!artigo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Artigo não encontrado</h1>
        <p className="text-slate-500 mb-8">O conteúdo que você procura não existe ou não foi publicado no Sanity.</p>
        <Link href="/blog" className="px-6 py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600">Voltar para o Blog</Link>
      </div>
    );
  }

  const dataFormatada = artigo.dataPublicacao 
    ? new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Publicação Recente';

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-100 selection:text-sky-900 pb-20">
      
      <header className="w-full bg-slate-900 text-white py-6 px-4 mb-8 md:mb-12 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="text-2xl font-black tracking-tight text-white hover:text-sky-400 transition-colors">
            STACK <span className="text-sky-500">SAÚDE</span>
          </Link>
          <Link href="/protocolos" className="text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
            Conhecer Protocolos
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="bg-sky-100 text-sky-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Central de Inteligência</span>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-1">{dataFormatada}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">{artigo.titulo}</h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">{artigo.resumo}</p>
        </header>

        {artigo.capaUrl && (
          <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-lg mb-12 border border-slate-200 bg-slate-200">
            <Image src={artigo.capaUrl} alt={artigo.titulo} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-800 prose-a:text-sky-600 prose-a:font-bold prose-strong:text-slate-900 prose-img:rounded-xl">
          <PortableText value={artigo.conteudo} />
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-500 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <span className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-2 block">
              Próximo Passo Recomendado
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Chega de Névoa Mental.
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto text-lg">
              Descubra o protocolo biológico de 21 dias para reverter a fadiga mental e recuperar o seu foco profundo.
            </p>
            <Link 
              href="/protocolo-neuro-reset" 
              className="inline-block w-full md:w-auto py-5 px-10 bg-sky-500 hover:bg-sky-400 text-white rounded-xl shadow-[0_8px_30px_rgb(14,165,233,0.3)] transition-all hover:-translate-y-1 font-black text-xl uppercase tracking-wide"
            >
              Assistir à Apresentação
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}