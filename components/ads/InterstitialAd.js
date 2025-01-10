// import { useEffect, useState } from 'react';
// import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
// import { AD_UNIT_IDS } from '@/config';

// const interstitial = InterstitialAd.createForAdRequest(
//   AD_UNIT_IDS.INTERSTITIAL,
//   {
//     requestNonPersonalizedAdsOnly: true,
//     keywords: ['games', 'educational']
//   }
// );

// export const useInterstitialAd = () => {
//   const [lastShown, setLastShown] = useState(0);
//   const MINIMUM_DELAY_BETWEEN_ADS = 60000;
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const unsubscribeLoaded = interstitial.addAdEventListener(
//       AdEventType.LOADED,
//       () => {
//         setLoaded(true);
//       }
//     );

//     const unsubscribeClosed = interstitial.addAdEventListener(
//       AdEventType.CLOSED,
//       () => {
//         setLoaded(false);
//         // Preload the next ad
//         interstitial.load();
//       }
//     );

//     const unsubscribeError = interstitial.addAdEventListener(
//       AdEventType.ERROR,
//       (error) => {
//         console.error('Interstitial ad error:', error);
//       }
//     );

//     // Load initial ad
//     interstitial.load();

//     // Unsubscribe from events on unmount
//     return () => {
//       unsubscribeLoaded();
//       unsubscribeClosed();
//       unsubscribeError();
//     };
//   }, []);

//   const showAd = async () => {
//     const now = Date.now();
//     if (loaded && now - lastShown >= MINIMUM_DELAY_BETWEEN_ADS) {
//       try {
//         await interstitial.show();
//       } catch (e) {
//         console.error(e);
//       }
//       setLastShown(now);
//     } else {
//       console.log('Interstitial ad not ready yet');
//     }
//   };

//   return { showAd, isLoaded: loaded };
// };
