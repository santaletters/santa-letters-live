import { useEffect } from 'react';

/**
 * TrackdeskMaster - Loads Trackdesk script ONCE for entire app
 * Place this at the root level in App.tsx
 */
export function TrackdeskMaster() {
  useEffect(() => {
    // Load Trackdesk script once
    if (!document.querySelector('script[src*="trackdesk.com"]')) {
      const script = document.createElement('script');
      script.src = '//cdn.trackdesk.com/tracking.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        console.log('✅ Trackdesk script loaded globally');
        
        // Initialize Trackdesk
        (function(t: any,d: any,k: any){
          (t[k]=t[k]||[]).push(d);
          t[d]=t[d]||t[k].f||function(){
            (t[d].q=t[d].q||[]).push(arguments)
          }
        })(window,"trackdesk","TrackdeskObject");
      };
    }
  }, []);

  return null; // This component renders nothing
}

// Extend Window interface
declare global {
  interface Window {
    trackdesk?: any;
    TrackdeskObject?: string[];
  }
}
