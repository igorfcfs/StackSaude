import Link from 'next/link';
import '@/app/globals.css'; // Certifique-se de que o Tailwind está importado aqui

export const metadata = {
  title: 'Stack Saúde | Assuma o controle da sua biologia',
  description: 'Ciência, nutrição e suplementação avançada para performance real.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        
        {/* NAVBAR GLOBAL */}
        <header className="w-full bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-2xl font-black tracking-tighter text-blue-700">
              Stack Saúde
            </Link>
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-600">
              <Link href="/sobre" className="hover:text-blue-600 transition">A Marca</Link>
              <Link href="/#solucoes" className="hover:text-blue-600 transition">Soluções</Link>
              <Link href="/contato" className="hover:text-blue-600 transition">Contato</Link>
            </nav>
          </div>
        </header>

        {/* AQUI É ONDE CADA PÁGINA VAI RENDERIZAR */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER GLOBAL */}
        <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900 mt-auto">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8 text-sm">
            <div>
              <div className="text-xl font-black text-white mb-4">Stack Saúde</div>
              <p className="mb-2">CNPJ: 00.000.000/0000-00</p>
              <p>contato@stacksaude.com.br</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Links Úteis</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-white transition">Sobre a Marca</Link></li>
                <li><Link href="/#solucoes" className="hover:text-white transition">Nossos Produtos</Link></li>
                <li><Link href="/contato" className="hover:text-white transition">Suporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Políticas</h4>
              <ul className="space-y-2">
                <li><Link href="/termos" className="hover:text-white transition">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-white transition">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto text-center text-xs text-slate-600 pt-8 border-t border-slate-800">
            <p>© {new Date().getFullYear()} Stack Saúde. Todos os direitos reservados.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}