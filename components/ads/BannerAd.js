// import { useRef } from 'react';
// import { Platform } from 'react-native';
// import {
//   BannerAd,
//   BannerAdSize,
//   useForeground
// } from 'react-native-google-mobile-ads';
// import { AD_UNIT_IDS } from '@/config';
// import ErrorBoundary from 'react-native-error-boundary';

// const CustomBannerAd = () => {
//   const bannerRef = useRef(null);

//   // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
//   // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
//   useForeground(() => {
//     Platform.OS === 'ios' && bannerRef.current?.load();
//   });

//   return (
//     <ErrorBoundary>
//       <BannerAd
//         ref={bannerRef}
//         unitId={AD_UNIT_IDS.BANNER}
//         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//       />
//     </ErrorBoundary>
//   );
// };

// export default CustomBannerAd;
