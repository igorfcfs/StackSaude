export const produtos = [
  {
    slug: 'protocolo-neuro-reset', // A URL da página
    pixelMetaId: process.env.NEXT_PUBLIC_META_PIXEL_NEURO || '',  // ID do Pixel do Meta Ads (Facebook)
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_NEURO || '', // ID do Google Analytics 4 (GA4)
    
    // 1. Header da VSL
    headlineStart: 'COMO REVERTER A EXAUSTÃO MENTAL E A FALTA DE FOCO EM',
    headlineHighlight: '21 DIAS...',
    subheadline: '...de modo que você recupere o controle da sua mente, consiga focar por horas e pare de desperdiçar sua vida (sem usar estimulantes).',
    
    // 2. VSL e Delay
    videoId: 'FtukH_bCDHg', // ID do YouTube
    delaySegundos: 10, // Tempo exato em que o primeiro CTA aparece (em segundos)
    checkoutUrl: 'https://pay.ticto.app/link-neuro', // Link da Ticto
    
    // 3. Copy (História e Argumentação)
    copySecoes: [
      {
        titulo: 'A Culpa Não É Sua. O Seu Sistema Foi Sequestrado.',
        destaque: false,
        paragrafos: [
          'Eu sei exatamente o que você já tentou. O mercado te diz que você tem preguiça, mas o grande vilão é um modelo de negócios bilionário desenhado para hackear a sua atenção.',
          'Você sente uma névoa mental constante porque o seu cérebro sofre de Dopamine Downregulation. Você está biologicamente intoxicado.'
        ]
      },
      {
        titulo: 'Como eu descobri o código-fonte desse problema',
        destaque: true, // Se true, o fundo dessa seção fica cinza com borda azul
        paragrafos: [
          'Meu nome é Igor. Mergulhando em estudos de neurociência e bioinformática, entendi que a mente humana funciona como um hardware. Testei um protocolo biológico de 21 dias e recuperei meu foco de infância.'
        ]
      }
    ],

    // 4. A Oferta e Preços (O que vai pro Checkout Box)
    oferta: {
      nomeProduto: 'Protocolo Neuro-Reset',
      precoOriginal: '197,00',
      bonus: [
        { nome: 'Nutrição Pró-Dopamina', valor: '97,00' },
        { nome: 'Ritual do Sono', valor: '67,00' }
      ],
      valorTotalFalso: '361,00', // Soma para ancoragem
      parcelas: '12x de R$ 19,78', // O número gigante em verde
      precoVista: 'R$ 197,00'
    },

    // 5. FAQ
    faqs: [
      {
        pergunta: '1. Após efetuar a compra, como receberei acesso?',
        resposta: 'Imediatamente após a aprovação do pagamento, você receberá um e-mail com seus dados de acesso à nossa plataforma exclusiva de membros. O acesso é imediato para pagamentos via PIX ou Cartão.'
      },
      {
        pergunta: '2. Em quanto tempo terei resultados usando o método?',
        resposta: 'A redução na ansiedade é sentida nas primeiras 48h. A dissipação da névoa mental ocorre entre o 7º e 10º dia. O reset biológico completo dos receptores acontece em 21 dias.'
      }
    ]
  }
];