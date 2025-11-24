import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

/**
 * CheckoutPageHead - HTML Header for Checkout Page
 * 
 * Add your LEAD tracking pixel and any other pixels here.
 * This component is used in the Checkout page component.
 */
export function CheckoutPageHead() {
  useEffect(() => {
    // Wait for Trackdesk script to load, then fire the LEAD pixel
    const checkTrackdesk = setInterval(() => {
      if (typeof window.trackdesk === 'function') {
        clearInterval(checkTrackdesk);
        
        console.log('🎯 Firing LEAD pixel');
        window.trackdesk("directwebinteractive", "conversion", {
          "conversionType": "lead"
        });
      }
    }, 100);

    // Cleanup after 10 seconds
    setTimeout(() => clearInterval(checkTrackdesk), 10000);

    return () => clearInterval(checkTrackdesk);
  }, []);

  return (
    <Helmet>
      {/* Trackdesk tracker begin */}
      <script async src="//cdn.trackdesk.com/tracking.js"></script>
      {/* Trackdesk tracker end */}
    </Helmet>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    trackdesk?: any;
    TrackdeskObject?: string[];
  }
}
