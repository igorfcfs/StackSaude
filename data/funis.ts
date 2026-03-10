export const funis = [
  {
    slug: 'protocolo-neuro-reset', // A URL da página principal
    produto: 'Protocolo Neuro-Reset',
    descricao: 'Um protocolo de 21 dias...',
    suporteUrl: 'https://wa.me/5511930442308',

    // ==========================================
    // ADVERTORIAL (Pre-sell)
    // ==========================================
    presell: {
      categoria: 'TDAH, Ansiedade, Fadiga Mental',
      titulo: 'Pesquisador revela a causa biológica por trás da fadiga mental constante (e como reverter isso em 21 dias)',
      dataPublicacao: '09 de Março de 2026',
      citacaoDestacada: '"Nós estamos exigindo que o cérebro humano processe em um dia a quantidade de estímulos que nossos ancestrais processavam em um ano", explica o relatório.',
      chamadaCta: 'Assista à apresentação completa do método:',
      paragrafos: [
        'Você já acordou se sentindo exausto, mesmo após dormir 8 horas? Sente que sua capacidade de focar em uma leitura ou no trabalho despencou nos últimos anos? Você não está sozinho.',
        'Um novo alerta na comunidade de biologia comportamental aponta que a dificuldade de concentração que afeta milhões de adultos hoje <strong>não é um problema de falta de disciplina ou preguiça.</strong> É um mecanismo de defesa do seu próprio corpo.',
        'O fenômeno, conhecido nos bastidores da tecnologia como <em>Dopamine Downregulation</em> (regulação para baixo da dopamina), ocorre quando o uso excessivo de telas, redes sociais e vídeos curtos sobrecarrega o sistema de recompensa do cérebro. Para se proteger dessa "overdose" de estímulos rápidos, o cérebro literalmente reduz a sensibilidade dos seus receptores.',
        'O resultado prático na sua rotina? Uma sensação constante de "névoa mental", falta de energia vital e a dependência de viver no piloto automático.',
        'Mas há uma boa notícia. A neuroplasticidade — a capacidade do cérebro de se remodelar — permite que esse dano seja revertido. E não exige o uso de medicamentos estimulantes.',
        'O pesquisador independente Millani, especialista em dependência comportamental, desenvolveu um método de engenharia de ambiente que força o cérebro a restaurar esses receptores de forma mecânica.',
        'Ele gravou um <strong>vídeo curto e explicativo</strong> detalhando exatamente como funciona esse mecanismo e como qualquer pessoa pode aplicar o protocolo de "reset" biológico em 21 dias para recuperar o foco profundo e a energia natural.'
      ]
    },

    // ==========================================
    // SALES PAGE (Página de Vendas Principal)
    // ==========================================
    salespage: {
      pixelMetaId: process.env.NEXT_PUBLIC_META_PIXEL_NEURO || '',  // ID do Pixel do Meta Ads
      googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_NEURO || '', // ID do Google Analytics 4
      
      headlineStart: 'COMO REVERTER A EXAUSTÃO MENTAL E A FALTA DE FOCO EM',
      headlineHighlight: '21 DIAS...',
      subheadline: '...de modo que você recupere o controle da sua mente, consiga focar por horas e pare de desperdiçar sua vida (sem usar estimulantes).',
      
      videoId: 'FtukH_bCDHg', // ID do YouTube
      delaySegundos: 10, // Tempo do Pitch da página principal
      checkoutUrl: 'https://pay.ticto.app/link-neuro', // Link do gateway da oferta principal
      
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
          destaque: true,
          paragrafos: [
            'Meu nome é Igor. Mergulhando em estudos de neurociência e bioinformática, entendi que a mente humana funciona como um hardware. Testei um protocolo biológico de 21 dias e recuperei meu foco de infância.'
          ]
        }
      ],

      oferta: {
        nomeProduto: 'Protocolo Neuro-Reset',
        precoOriginal: '197,00',
        bonus: [
          { nome: 'Nutrição Pró-Dopamina', valor: '97,00' },
          { nome: 'Ritual do Sono', valor: '67,00' }
        ],
        valorTotalFalso: '361,00', 
        parcelas: '12x de R$ 19,78', 
        precoVista: 'R$ 197,00'
      },

      faqs: [
        {
          pergunta: '1. Após efetuar a compra, como receberei acesso?',
          resposta: 'Imediatamente após a aprovação do pagamento, você receberá um e-mail com seus dados de acesso à nossa plataforma exclusiva de membros. O acesso é imediato para pagamentos via PIX ou Cartão.'
        },
        {
          pergunta: '2. Em quanto tempo terei resultados usando o método?',
          resposta: 'A redução na ansiedade é sentida nas primeiras 48h. A dissipação da névoa mental ocorre entre o 7º e 10º dia. O reset biológico completo dos receptores acontece em 21 dias.'
        }
      ],
    },

    // ==========================================
    // UPSELL 1 (Complemento Premium)
    // ==========================================
    upsell1: {
      slug: 'protocolo-neuro-reset-u1', 
      headline: 'Espere! Seu pedido <span class="text-red-600">ainda não está completo...</span>',
      subheadline: 'Você deu o primeiro passo para limpar sua mente. Mas para manter o foco inabalável blindado contra distrações, você precisa deste acelerador biológico exclusivo.',
      videoId: 'FtukH_bCDHg', // Trocar pelo ID do vídeo do Upsell 1
      delaySegundos: 10, 
      tempoTimer: 15,
      textoBotaoSim: 'Sim, Eu Quero Blindar Meu Foco',
      subtextoBotaoSim: 'Adicionar ao meu pedido por apenas R$ 97 (Única Chance)',
      
      // LINK DO GATEWAY (O botão verde compra direto)
      checkoutUrl: 'https://pay.suaplataforma.com.br/one-click-buy-u1',
      
      textoBotaoNao: 'Não, muito obrigado. Eu prefiro continuar no ritmo normal e dispenso essa oferta exclusiva.',
      // ROTA INTERNA (O botão cinza avança no funil sem cobrar)
      downsellUrl: '/oferta-exclusiva/protocolo-neuro-reset-d1',
    },

    // ==========================================
    // DOWNSELL 1 (Oportunidade Facilitada do U1)
    // ==========================================
    downsell1: {
      slug: 'protocolo-neuro-reset-d1', 
      headline: 'Espere! Eu separei <span class="text-red-600">uma última chance para você...</span>',
      subheadline: 'Eu entendo que R$ 97 possa estar fora do seu orçamento hoje. Então eu liberei uma condição especial com 50% de desconto. Não perca essa chance de blindar seus resultados.',
      videoId: 'FtukH_bCDHg', // Trocar pelo ID do vídeo do Downsell 1
      delaySegundos: 10, 
      tempoTimer: 10,
      textoBotaoSim: 'Sim, Eu Quero Aproveitar o Desconto',
      subtextoBotaoSim: 'Adicionar ao meu pedido por apenas R$ 47 (Última Chamada)',
      
      // LINK DO GATEWAY (O botão verde compra direto o produto com desconto)
      checkoutUrl: 'https://pay.suaplataforma.com.br/one-click-buy-d1',
      
      textoBotaoNao: 'Não, entendo as consequências e vou recusar este desconto.',
      // ROTA INTERNA (Vai para o próximo Upsell, caso haja, ou direto para Obrigado)
      downsellUrl: '/oferta-exclusiva/protocolo-neuro-reset-u2',
    },

    // ==========================================
    // UPSELL 2 (Produto Auxiliar / Acelerador)
    // ==========================================
    upsell2: {
      slug: 'protocolo-neuro-reset-u2', 
      headline: 'Atenção: Tenho <span class="text-red-600">um recado final importante...</span>',
      subheadline: 'Agora que você tem as ferramentas para curar sua mente, descubra a rotina de super-hábitos noturnos que multiplica o nível da sua energia vital logo na primeira hora da manhã.',
      videoId: 'FtukH_bCDHg', // Trocar pelo ID do vídeo do Upsell 2
      delaySegundos: 10, 
      tempoTimer: 15,
      textoBotaoSim: 'Sim, Eu Quero o Acelerador Matinal',
      subtextoBotaoSim: 'Adicionar ao meu pedido por apenas R$ 67',
      
      // LINK DO GATEWAY (O botão verde compra direto)
      checkoutUrl: 'https://pay.suaplataforma.com.br/one-click-buy-u2',
      
      textoBotaoNao: 'Não, obrigado. Eu confio apenas na minha rotina atual.',
      // ROTA INTERNA (O botão cinza avança para o último downsell)
      downsellUrl: '/oferta-exclusiva/protocolo-neuro-reset-d2',
    },

    // ==========================================
    // DOWNSELL 2 (Oportunidade Final)
    // ==========================================
    downsell2: {
      slug: 'protocolo-neuro-reset-d2', 
      headline: 'Antes de finalizar... <span class="text-red-600">uma condição secreta.</span>',
      subheadline: 'Você está a um passo de acessar a área de membros. Leve o pacote de super-hábitos com um desconto exclusivo de R$ 30.',
      videoId: 'FtukH_bCDHg', // Trocar pelo ID do vídeo do Downsell 2
      delaySegundos: 10, 
      tempoTimer: 5,
      textoBotaoSim: 'Sim, Eu Aceito o Desconto Final',
      subtextoBotaoSim: 'Adicionar ao meu pedido por apenas R$ 37',
      
      // LINK DO GATEWAY (O botão verde compra direto)
      checkoutUrl: 'https://pay.suaplataforma.com.br/one-click-buy-d2',
      
      textoBotaoNao: 'Não, quero apenas acessar o que já comprei.',
      // ROTA INTERNA (Fim do funil! Leva direto para a Página de Obrigado)
      downsellUrl: '/obrigado/protocolo-neuro-reset',
    }
  }
];
