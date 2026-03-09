import Link from 'next/link';
import '@/app/globals.css'; // Certifique-se de que o Tailwind está importado aqui7
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Stack Saúde | Assuma o controle da sua saúde',
  description: 'Ciência, nutrição e suplementação avançada para performance real.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-white-80 font-sans flex flex-col">
        
        <Navbar />

        {/* AQUI É ONDE CADA PÁGINA VAI RENDERIZAR */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ========================================== */}
        {/* RODAPÉ CORPORATIVO OFICIAL                 */}
        {/* ========================================== */}
        <footer className="bg-slate-950 text-slate-400 py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
            
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image src="/LogoStackSaude.png" alt="Logo Stack Saúde" width={32} height={32} className="rounded-md grayscale hover:grayscale-0 transition-all" />
                <span className="font-serif text-xl font-black text-white tracking-tight">Stack Saúde</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm">
                Pesquisa, desenvolvimento e aplicação prática em Biohacking, Nutrição e Neurociência para uma vida de alta performance.
              </p>
              <br></br>
              <p className="text-sm leading-relaxed max-w-sm">
                CNPJ: XX.XXX.XXX/0001-XX
                <br></br>
                Suporte: suporte@stacksaude.com.br
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Links Úteis</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/protocolos" className="hover:text-sky-400 transition-colors">Nossos Protocolos</Link></li>
                <li><Link href="/metodologia" className="hover:text-sky-400 transition-colors">Como Funciona</Link></li>
                <li><Link href="/blog" className="hover:text-sky-400 transition-colors">Blog & Artigos</Link></li>
                <li><Link href="/contato" className="hover:text-sky-400 transition-colors">Contato / Suporte</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/termos-de-uso" className="hover:text-sky-400 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/politica-de-privacidade" className="hover:text-sky-400 transition-colors">Política de Privacidade</Link></li>
                <li><Link href="/aviso-medico" className="hover:text-sky-400 transition-colors">Aviso Médico</Link></li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Stack Saúde. Todos os direitos reservados.</p>
            <p>Ambiente 100% Seguro e Criptografado.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}