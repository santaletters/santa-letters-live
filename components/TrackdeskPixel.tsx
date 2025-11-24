import { useEffect } from 'react';

export function TrackdeskPixel() {
  useEffect(() => {
    // Capture Trackdesk CID from URL and store it
    const urlParams = new URLSearchParams(window.location.search);
    
    // Trackdesk uses 'tduid' as the click ID parameter
    const tduid = urlParams.get('tduid');
    const cid = urlParams.get('cid'); // Fallback for custom tracking links
    
    const clickId = tduid || cid;
    
    if (clickId) {
      // Store CID in sessionStorage for conversion tracking
      sessionStorage.setItem('trackdesk_cid', clickId);
      console.log('✅ Trackdesk CID captured:', clickId);
    } else {
      // Check if we already have a CID stored
      const storedCid = sessionStorage.getItem('trackdesk_cid');
      if (storedCid) {
        console.log('📊 Trackdesk CID (from session):', storedCid);
      } else {
        console.log('⚠️ No Trackdesk CID found in URL or session');
      }
    }
  }, []);

  return null;
}