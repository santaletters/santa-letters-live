import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * UpsellPageHead - Fires SALE pixel when upsell page loads (after payment)
 * Fetches order amount and fires pixel with transaction value
 */

interface UpsellPageHeadProps {
  orderToken?: string;
}

export function UpsellPageHead({ orderToken }: UpsellPageHeadProps = {}) {
  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [pixelFired, setPixelFired] = useState(false);

  // Fetch order amount from backend
  useEffect(() => {
    console.log('🎯 Upsell page mounted - fetching order amount');
    
    const fetchOrderAmount = async () => {
      let token = orderToken;
      
      if (!token) {
        console.warn('⚠️ No orderToken in props, checking localStorage');
        token = localStorage.getItem('orderAccessToken') || undefined;
      }

      if (!token) {
        console.error('❌ No order token found - cannot fetch amount');
        setOrderAmount(0); // Fire pixel anyway with 0
        return;
      }

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/order/get`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ orderToken: token }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.order && typeof data.order.total === 'number') {
            console.log('✅ Order amount fetched:', data.order.total);
            setOrderAmount(data.order.total);
          } else {
            console.warn('⚠️ Order data found but no total:', data);
            setOrderAmount(0);
          }
        } else {
          console.error('❌ Failed to fetch order:', response.status);
          setOrderAmount(0);
        }
      } catch (error) {
        console.error('❌ Error fetching order amount:', error);
        setOrderAmount(0); // Fire pixel anyway
      }
    };

    fetchOrderAmount();
  }, [orderToken]);

  // Fire SALE pixel when orderAmount is loaded
  useEffect(() => {
    if (orderAmount === null || pixelFired) return;

    console.log('🎯 Order amount ready - attempting to fire SALE pixel');
    
    // Function to fire the pixel
    const fireSalePixel = () => {
      if (typeof window.trackdesk === 'function') {
        console.log('✅ Trackdesk available - firing SALE pixel NOW');
        console.log('💰 Sale amount:', orderAmount);
        
        try {
          window.trackdesk("directwebinteractive", "conversion", {
            "conversionType": "sale",
            "amount": orderAmount
          });
          console.log('✅ SALE pixel fired successfully with amount:', orderAmount);
          setPixelFired(true);
          return true;
        } catch (error) {
          console.error('❌ Error firing SALE pixel:', error);
          return false;
        }
      }
      return false;
    };

    // Try immediately
    if (fireSalePixel()) {
      return;
    }

    // If not ready, wait for it with retry logic
    console.log('⏳ Trackdesk not ready yet, waiting...');
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (fireSalePixel()) {
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.error('❌ Trackdesk failed to load after 5 seconds');
        setPixelFired(true); // Mark as attempted
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, [orderAmount, pixelFired]);

  return null; // This component renders nothing
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    trackdesk?: any;
    TrackdeskObject?: string[];
  }
}
