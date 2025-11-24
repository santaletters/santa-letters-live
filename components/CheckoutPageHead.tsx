import { Helmet } from 'react-helmet-async';

/**
 * CheckoutPageHead - HTML Header for Checkout Page
 * 
 * Add your LEAD tracking pixel and any other pixels here.
 * This component is used in the Checkout page component.
 */
export function CheckoutPageHead() {
  return (
    <Helmet>
      {/* Trackdesk tracker begin */}
      <script async src="//cdn.trackdesk.com/tracking.js"></script>
      <script>{`
        (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
        
        trackdesk("directwebinteractive", "conversion", {
          "conversionType": "lead"
        });
      `}</script>
      {/* Trackdesk tracker end */}
    </Helmet>
  );
}
