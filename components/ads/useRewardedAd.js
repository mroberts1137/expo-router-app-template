// import { useCallback, useState } from 'react';
// import {
//   AdEventType,
//   RewardedAd,
//   RewardedAdEventType
// } from 'react-native-google-mobile-ads';
// import { useDispatch } from 'react-redux';
// import { AD_UNIT_IDS } from '@/config';
// import { addTokens } from '@/store/userSlice';
// import { TOKENS_PER_REWARD } from '@/components/tokens/constants';

// export const useRewardedAd = () => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const showAd = useCallback(async () => {
//     setLoading(true);

//     const rewarded = RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED, {
//       requestNonPersonalizedAdsOnly: true,
//       keywords: ['game', 'quiz']
//     });

//     return new Promise((resolve, reject) => {
//       const unsubscribeLoaded = rewarded.addAdEventListener(
//         RewardedAdEventType.LOADED,
//         () => {
//           setLoading(false);
//           rewarded.show();
//         }
//       );

//       const unsubscribeEarned = rewarded.addAdEventListener(
//         RewardedAdEventType.EARNED_REWARD,
//         (reward) => {
//           // console.log(`User earned ${reward.amount} ${reward.type}`);
//           dispatch(addTokens(TOKENS_PER_REWARD));
//           resolve(true);
//           setLoading(false);
//         }
//       );

//       const unsubscribeClosed = rewarded.addAdEventListener(
//         AdEventType.CLOSED,
//         () => {
//           setLoading(false);
//         }
//       );

//       const unsubscribeError = rewarded.addAdEventListener(
//         AdEventType.ERROR,
//         (error) => {
//           console.error('Ad error:', error);
//           setLoading(false);
//           reject(error);
//         }
//       );

//       rewarded.load();

//       // Cleanup function
//       return () => {
//         unsubscribeLoaded();
//         unsubscribeEarned();
//         unsubscribeClosed();
//         unsubscribeError();
//       };
//     });
//   }, [dispatch]);

//   return { showAd, loading };
// };
