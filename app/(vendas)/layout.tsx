import '@/app/globals.css';
import Tracking from '@/components/Tracking';

export const metadata = {
  title: 'Apresentação Especial',
};

export default function VendasLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* PRECONNECT DA TICTO: Resolve o DNS antes do clique, zerando o delay do checkout */}
        <link rel="preconnect" href="https://pay.ticto.app" />
        <link rel="dns-prefetch" href="https://pay.ticto.app" />
      </head>
      
      <body className="bg-slate-50 text-slate-900 font-sans">
        {children}
        
        {<Tracking />}
      </body>
    </html>
  );
}