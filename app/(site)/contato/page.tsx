import Link from 'next/link';

export const metadata = {
  title: 'Contato e Suporte | Stack Saúde',
  description: 'Fale com a nossa equipe. Suporte exclusivo para alunos e atendimento comercial.',
};

export default function ContatoPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans pb-24 min-h-screen">
      
      {/* ========================================== */}
      {/* HERO DA PÁGINA DE CONTATO                  */}
      {/* ========================================== */}
      <section className="bg-white border-b border-slate-200 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sky-500 font-bold uppercase tracking-widest text-sm mb-4 block">
            Central de Atendimento
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Como podemos <span className="text-sky-500">ajudar você?</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Nossa equipe de especialistas está pronta para tirar suas dúvidas sobre os protocolos, acessos à área de membros ou parcerias comerciais.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* GRID DE CONTATO (INFORMAÇÕES + FORMULÁRIO) */}
      {/* ========================================== */}
      <main className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* LADO ESQUERDO: Informações Diretas */}
          <div className="md:col-span-2 space-y-8">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Suporte ao Aluno</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Já é aluno e precisa de ajuda com o acesso à Ticto, senhas ou dúvidas sobre a aplicação dos protocolos?
              </p>
              <div className="flex items-center gap-3 text-sky-600 font-bold">
                <span className="text-2xl">✉️</span>
                <a href="mailto:suporte@stacksaude.com.br" className="hover:text-sky-800 transition-colors">
                  suporte@stacksaude.com.br
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Atendimento Comercial</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Dúvidas antes de comprar? Fale com nosso time de vendas para entender qual é o protocolo ideal para a sua biologia.
              </p>
              <div className="flex items-center gap-3 text-emerald-600 font-bold">
                <span className="text-2xl">💬</span>
                {/* Substitua pelo número real do WhatsApp do seu suporte */}
                <a href="https://wa.me/5511930442308" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800 transition-colors">
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl text-slate-400 text-sm">
              <h3 className="text-white font-bold uppercase tracking-wider mb-4">Horário de Atendimento</h3>
              <p className="mb-2"><strong className="text-slate-200">Segunda a Sexta:</strong> 09h às 18h</p>
              <p><strong className="text-slate-200">Sábados e Domingos:</strong> Plantão reduzido</p>
            </div>

          </div>

          {/* LADO DIREITO: Formulário de Contato */}
          <div className="md:col-span-3 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase">Envie uma mensagem</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-bold text-slate-700">Nome Completo</label>
                  <input 
                    type="text" 
                    id="nome"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="João Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700">E-mail</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="joao@exemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="assunto" className="text-sm font-bold text-slate-700">Assunto</label>
                <select 
                  id="assunto"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all appearance-none"
                  required
                >
                  <option value="" disabled selected>Selecione um assunto...</option>
                  <option value="Dúvida antes da compra">Dúvida antes da compra</option>
                  <option value="Suporte ao Aluno">Suporte ao Aluno (Acesso/Senha)</option>
                  <option value="Parcerias">Parcerias e Imprensa</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="mensagem" className="text-sm font-bold text-slate-700">Mensagem</label>
                <textarea 
                  id="mensagem"
                  rows={5}
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                  placeholder="Como podemos te ajudar hoje?"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-wide rounded-xl hover:bg-sky-500 transition-colors shadow-md"
              >
                Enviar Mensagem
              </button>
              <p className="text-xs text-center text-slate-400 mt-4">
                Ao enviar, você concorda com a nossa Política de Privacidade.
              </p>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}