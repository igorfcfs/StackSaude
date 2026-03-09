"use client";

import { useState, useEffect } from 'react';

export default function BotaoDelay({ url, tempoMinutos }: { url: string, tempoMinutos: number }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    // Converte minutos para milissegundos
    const tempoMs = tempoMinutos * 60 * 1000;
    
    const timer = setTimeout(() => {
      setMostrar(true);
    }, tempoMs);

    // Limpeza de memória caso o usuário saia da página antes do tempo
    return () => clearTimeout(timer);
  }, [tempoMinutos]);

  // Enquanto o tempo não passa, não renderiza nada no lugar do botão
  if (!mostrar) return null;

  return (
    <div className="mt-12 flex justify-center animate-fade-in">
      <a 
        href={url} 
        className="block w-full max-w-md px-8 py-5 bg-green-600 text-white text-xl font-black rounded-xl hover:bg-green-700 transition shadow-2xl shadow-green-600/40 text-center uppercase tracking-wide border-b-4 border-green-800 active:border-b-0 active:mt-1"
      >
        Quero Acessar Agora
      </a>
    </div>
  );
}