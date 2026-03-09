"use client";

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface TrackingProps {
  pixelMetaId?: string;
  googleAnalyticsId?: string; // <--- Nova propriedade para o Google
}

export default function Tracking({ pixelMetaId, googleAnalyticsId }: TrackingProps) {
  const pathname = usePathname();

  // Dispara o PageView do Meta Ads a cada mudança de rota
  useEffect(() => {
    if (pixelMetaId && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname, pixelMetaId]);

  // Se não tiver nenhum dos dois, não renderiza nada
  if (!pixelMetaId && !googleAnalyticsId) return null;

  return (
    <>
      {/* ========================================== */}
      {/* 1. PIXEL DO FACEBOOK / META ADS              */}
      {/* ========================================== */}
      {pixelMetaId && (
        <Script id={`meta-pixel-${pixelMetaId}`} strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${pixelMetaId}'); 
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ========================================== */}
      {/* 2. GOOGLE ANALYTICS (GA4) / GOOGLE ADS       */}
      {/* ========================================== */}
      {googleAnalyticsId && (
        <>
          <Script 
            id={`gtag-src-${googleAnalyticsId}`}
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} 
            strategy="afterInteractive" 
          />
          <Script id={`gtag-init-${googleAnalyticsId}`} strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}