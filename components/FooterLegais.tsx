"use client";

import { useState } from 'react';

export default function FooterLegais() {
  const [modalAberto, setModalAberto] = useState<'termos' | 'politicas' | null>(null);

  return (
    <>
      {/* RODAPÉ INVISÍVEL PARA O LEAD, VISÍVEL PARA O ROBÔ DO FB */}
      <footer className="text-center py-8 px-5 text-slate-400 text-[11px] max-w-[800px] mx-auto opacity-70">
        <p className="mb-4 leading-relaxed">
          Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => setModalAberto('termos')} 
            className="underline hover:text-slate-600 cursor-pointer"
          >
            Termos de Uso
          </button> 
          <span>|</span> 
          <button 
            onClick={() => setModalAberto('politicas')} 
            className="underline hover:text-slate-600 cursor-pointer"
          >
            Política de Privacidade
          </button>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} Stack Saúde. Todos os direitos reservados.
        </p>
      </footer>

      {/* O MODAL QUE ABRE POR CIMA DA PÁGINA (CAVALO DE TRÓIA MANTIDO) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900 uppercase">
                {modalAberto === 'termos' ? 'Termos de Uso' : 'Política de Privacidade'}
              </h2>
              <button 
                onClick={() => setModalAberto(null)} 
                className="text-slate-400 hover:text-red-500 font-bold text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Corpo do Texto Jurídico */}
            <div className="p-6 overflow-y-auto text-sm text-slate-600 leading-relaxed space-y-4">
              
              {modalAberto === 'termos' ? (
                <>
                  <p><strong>1. Aceitação dos Termos:</strong> Ao acessar e utilizar os conteúdos e serviços da Stack Saúde, você concorda em cumprir estes Termos de Uso. Se não concordar com alguma parte, não deverá utilizar nossos serviços.</p>
                  
                  <p><strong>2. Isenção de Responsabilidade Médica (Aviso Importante):</strong> A Stack Saúde fornece conteúdos estritamente educacionais e informativos sobre biohacking, neurociência e bem-estar. <strong>Nenhum conteúdo, protocolo ou produto oferecido substitui o diagnóstico, aconselhamento ou tratamento médico profissional.</strong> Consulte sempre um médico ou especialista antes de iniciar qualquer mudança na sua dieta, suplementação ou rotina de saúde.</p>
                  
                  <p><strong>3. Propriedade Intelectual:</strong> Todo o material, vídeos, textos, metodologias e e-books fornecidos são de propriedade exclusiva da Stack Saúde. É terminantemente proibida a cópia, pirataria, revenda ou distribuição não autorizada, sob pena de sanções civis e criminais.</p>
                  
                  <p><strong>4. Resultados e Garantias:</strong> Os resultados relatados em nossas páginas refletem experiências individuais e podem variar de pessoa para pessoa, dependendo do comprometimento biológico e rotina de cada usuário. Oferecemos a garantia incondicional de 7 (sete) dias, conforme o Código de Defesa do Consumidor, com reembolso processado através do nosso gateway de pagamento oficial (Ticto).</p>
                </>
              ) : (
                <>
                  <p><strong>1. Coleta de Dados Pessoais:</strong> A Stack Saúde coleta informações fornecidas ativamente por você (como nome e e-mail no momento da compra) e dados coletados automaticamente (como endereço IP e comportamento de navegação) para melhorar sua experiência, em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
                  
                  <p><strong>2. Uso de Cookies e Pixels:</strong> Utilizamos tecnologias de rastreamento de terceiros, como o Pixel do Meta (Facebook) e Google Analytics, para entender o perfil de nossos visitantes e otimizar nossas campanhas publicitárias. Esses dados são anonimizados e ajudam a exibir conteúdos relevantes para você.</p>
                  
                  <p><strong>3. Compartilhamento de Dados:</strong> Suas informações financeiras são processadas em ambiente seguro e criptografado pela nossa plataforma parceira de pagamentos (Ticto). A Stack Saúde não tem acesso aos dados completos do seu cartão de crédito. Não vendemos ou alugamos seus dados pessoais para terceiros.</p>
                  
                  <p><strong>4. Seus Direitos:</strong> Você tem o direito de solicitar o acesso, a correção ou a exclusão dos seus dados pessoais da nossa base de contatos a qualquer momento. Para exercer esses direitos, basta entrar em contato com nossa equipe de suporte.</p>
                </>
              )}
            </div>

            {/* Rodapé do Modal */}
            <div className="p-4 border-t border-slate-100 text-center">
              <button 
                onClick={() => setModalAberto(null)} 
                className="bg-slate-900 text-white px-8 py-2 rounded-md font-bold uppercase text-sm hover:bg-slate-800 transition-colors"
              >
                Entendi e Concordo
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}