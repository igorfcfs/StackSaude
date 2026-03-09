"use client";

import { useState } from 'react';

interface FaqItem {
  pergunta: string;
  resposta: string;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [ativoIndex, setAtivoIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setAtivoIndex(ativoIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-3 my-10">
      {faqs.map((faq, index) => {
        const isOpen = ativoIndex === index;
        return (
          <div key={index} className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.08)]' : 'border-slate-200'}`}>
            <button 
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left cursor-pointer bg-transparent border-none"
            >
              <span className="text-[1.1rem] font-bold text-slate-900">{faq.pergunta}</span>
              {/* Ícone +/- */}
              <div className="relative w-5 h-5 shrink-0">
                <div className={`absolute top-[9px] left-0 w-full h-[2px] bg-sky-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></div>
                <div className={`absolute top-0 left-[9px] w-[2px] h-full bg-sky-500 transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : ''}`}></div>
              </div>
            </button>
            <div 
              className="bg-slate-100 px-6 overflow-hidden transition-all duration-300 ease-out"
              style={{ maxHeight: isOpen ? '300px' : '0', paddingBottom: isOpen ? '25px' : '0', paddingTop: isOpen ? '10px' : '0' }}
            >
              <p className="text-slate-500 text-base leading-relaxed m-0">{faq.resposta}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}