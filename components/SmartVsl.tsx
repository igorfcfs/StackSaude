"use client";

import { useState, useEffect, useRef } from 'react';

interface SmartVslProps {
  videoId: string;
  tempoDelaySegundos: number; // MUDANÇA: Nome atualizado para deixar claro que é em segundos
  onLiberarConteudo: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function SmartVsl({ videoId, tempoDelaySegundos, onLiberarConteudo }: SmartVslProps) {
  const [mostrarOverlay, setMostrarOverlay] = useState(true);
  const [textoOverlay, setTextoOverlay] = useState("CLIQUE PARA ASSISTIR AO DIAGNÓSTICO");
  const [mostrarEscudo, setMostrarEscudo] = useState(false);
  
  const playerRef = useRef<any>(null);
  const timeTrackerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstPlayRef = useRef(true);
  
  // Nova referência para controlar a UX do botão de play
  const hasPlayedThisSessionRef = useRef(false);

  // LÓGICA DE RETORNO: Verifica se já passou do pitch ou se já liberou a página antes
  useEffect(() => {
    const hasVisited = localStorage.getItem(`vsl_visited_${videoId}`);
    const savedTime = parseFloat(localStorage.getItem(`neuro_reset_video_time_${videoId}`) || '0');
    
    if (hasVisited === 'true' || savedTime >= tempoDelaySegundos) {
      onLiberarConteudo();
      isFirstPlayRef.current = false;
      localStorage.setItem(`vsl_visited_${videoId}`, 'true'); // Garante que a flag esteja salva
    }
  }, [videoId, tempoDelaySegundos, onLiberarConteudo]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initPlayer = () => {
      const savedTime = parseFloat(localStorage.getItem(`neuro_reset_video_time_${videoId}`) || '0');
      if (savedTime > 3) {
        setTextoOverlay("CLIQUE PARA CONTINUAR DE ONDE PAROU");
      }

      playerRef.current = new window.YT.Player(`Youtubeer-${videoId}`, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          controls: 0, 
          modestbranding: 1, 
          rel: 0, 
          fs: 0,
          disablekb: 1,
          start: Math.floor(savedTime), 
        },
        events: {
          onStateChange: onPlayerStateChange
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (timeTrackerRef.current) clearInterval(timeTrackerRef.current);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // ==========================================
  // 5. PAUSA INTELIGENTE (PAGE VISIBILITY API)
  // ==========================================
  useEffect(() => {
    const lidarComVisibilidade = () => {
      // Se a aba ficar oculta (minimizar, trocar de aba, bloquear tela)
      if (document.hidden && playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
    };

    document.addEventListener("visibilitychange", lidarComVisibilidade);

    return () => {
      document.removeEventListener("visibilitychange", lidarComVisibilidade);
    };
  }, []);

  const onPlayerStateChange = (event: any) => {
    const YT = window.YT;
    
    if (event.data === YT.PlayerState.PLAYING) {
      setMostrarOverlay(false);
      setMostrarEscudo(true);
      
      // Marca que o vídeo já rodou pelo menos uma vez nesta sessão
      hasPlayedThisSessionRef.current = true;

      // ATUALIZAÇÃO DO RASTREADOR: Salva o tempo e checa a liberação em tempo real
      timeTrackerRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          localStorage.setItem(`neuro_reset_video_time_${videoId}`, currentTime);
          
          // Libera dinamicamente se bater o tempo em segundos e ainda não foi liberado
          if (isFirstPlayRef.current && currentTime >= tempoDelaySegundos) {
            onLiberarConteudo();
            localStorage.setItem(`vsl_visited_${videoId}`, 'true');
            isFirstPlayRef.current = false;
          }
        }
      }, 1000);

      // MUDANÇA: O setTimeout do fallback agora trabalha com tempoDelaySegundos
      if (isFirstPlayRef.current) {
         const hasVisited = localStorage.getItem(`vsl_visited_${videoId}`);
         if (hasVisited !== 'true') {
           setTimeout(() => {
             // Checagem de segurança dupla
             if (isFirstPlayRef.current) {
               onLiberarConteudo();
               localStorage.setItem(`vsl_visited_${videoId}`, 'true');
               isFirstPlayRef.current = false;
             }
           }, tempoDelaySegundos * 1000); // Segundos convertidos para milissegundos
         }
      }

    } else if (event.data === YT.PlayerState.PAUSED) {
      setMostrarOverlay(true);
      setTextoOverlay("CLIQUE AQUI PARA CONTINUAR");
      setMostrarEscudo(false);
      if (timeTrackerRef.current) clearInterval(timeTrackerRef.current);

    } else if (event.data === YT.PlayerState.ENDED) {
      setMostrarOverlay(true);
      setTextoOverlay("ASSISTIR NOVAMENTE");
      setMostrarEscudo(false);
      hasPlayedThisSessionRef.current = false; // Reseta se o vídeo acabar
      if (timeTrackerRef.current) clearInterval(timeTrackerRef.current);
      localStorage.setItem(`neuro_reset_video_time_${videoId}`, '0');
    }
  };

  const darPlay = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
      // Só exibe "CARREGANDO..." se for o primeiríssimo play
      if (!hasPlayedThisSessionRef.current) {
        setTextoOverlay("CARREGANDO...");
      }
    }
  };

  const darPause = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div className="relative w-full pt-[56.25%] bg-black rounded-xl border border-slate-300 overflow-hidden mb-8 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div id={`Youtubeer-${videoId}`}></div>
      </div>

      {mostrarEscudo && (
         <div 
           className="absolute inset-0 z-10 cursor-pointer" 
           onClick={darPause}
         ></div>
      )}

      {mostrarOverlay && (
        <div 
          className="absolute inset-0 bg-black flex justify-center items-center z-20 cursor-pointer transition-opacity duration-300"
          onClick={darPlay}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-500/80 rounded-full flex justify-center items-center mx-auto mb-4 backdrop-blur-sm border-2 border-white/20 animate-pulse-blue">
              <div className="w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[22px] border-l-white ml-1"></div>
            </div>
            <p className="font-black tracking-widest text-[0.9rem] text-white uppercase">{textoOverlay}</p>
          </div>
        </div>
      )}
    </div>
  );
}