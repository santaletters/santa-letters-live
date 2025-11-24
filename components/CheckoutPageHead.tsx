import { useEffect } from 'react';

/**
 * CheckoutPageHead - Fires LEAD pixel when checkout page loads
 * Assumes TrackdeskMaster has already loaded the script
 */
export function CheckoutPageHead() {
  useEffect(() => {
    console.log('🎯 Checkout page mounted - attempting to fire LEAD pixel');
    
    // Function to fire the pixel
    const fireLeadPixel = () => {
      if (typeof window.trackdesk === 'function') {
        console.log('✅ Trackdesk available - firing LEAD pixel NOW');
        
        try {
          window.trackdesk("directwebinteractive", "conversion", {
            "conversionType": "lead"
          });
          console.log('✅ LEAD pixel fired successfully');
          return true;
        } catch (error) {
          console.error('❌ Error firing LEAD pixel:', error);
          return false;
        }
      }
      return false;
    };

    // Try immediately
    if (fireLeadPixel()) {
      return;
    }

    // If not ready, wait for it with retry logic
    console.log('⏳ Trackdesk not ready yet, waiting...');
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (fireLeadPixel()) {
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('❌ Trackdesk failed to load after 5 seconds');
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []); // Run once on mount

  return null; // This component renders nothing
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    trackdesk?: any;
    TrackdeskObject?: string[];
  }
}
