"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // Pega a URL atual do navegador
  const pathname = usePathname();

  // Função para checar se o link é a página atual
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/LogoStackSaude.png" 
            alt="Logo Stack Saúde" 
            width={40} 
            height={40} 
            className="rounded-md object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-serif text-2xl font-black text-slate-900 tracking-tight">
            Stack <span className="text-sky-500">Saúde</span>
          </span>
        </Link>

        {/* Links de Navegação (Desktop) com Lógica Active */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
          <Link 
            href="/" 
            className={`transition-colors ${isActive('/') ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}`}
          >
            Home
          </Link>
          <Link 
            href="/protocolos" 
            className={`transition-colors ${isActive('/protocolos') ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}`}
          >
            Protocolos
          </Link>
          <Link 
            href="/metodologia" 
            className={`transition-colors ${isActive('/metodologia') ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}`}
          >
            Metodologia
          </Link>
          <Link 
            href="/blog" 
            className={`transition-colors ${isActive('/blog') ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}`}
          >
            Blog
          </Link>
          <Link 
            href="/contato" 
            className={`transition-colors ${isActive('/contato') ? 'text-sky-500' : 'text-slate-500 hover:text-sky-500'}`}
          >
            Contato
          </Link>
        </nav>

        {/* CTA Cabeçalho */}
        <Link 
          href="https://sua-area-ticto.com.br/login" 
          target="_blank"
          className="hidden md:block px-6 py-2.5 bg-slate-900 text-white font-bold uppercase text-xs rounded-full hover:bg-sky-500 transition-colors shadow-md"
        >
          Área de Membros
        </Link>
      </div>
    </header>
  );
}