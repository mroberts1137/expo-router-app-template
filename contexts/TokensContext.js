import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRewardedAd } from '@/components/ads/useRewardedAd';
import { replenishDailyTokens, consumeToken } from '@/store/userSlice';

// interface TokenContextType {
//   tokens: number;
//   useToken: () => boolean;
//   earnTokens: () => Promise<boolean>;
//   loading: boolean;
// }

const TokenContext = createContext(undefined);

export const TokenProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { tokens } = useSelector(
    (state) => state.user.userInfo || { tokens: { count: 0 } }
  );
  const { showAd, loading } = useRewardedAd();
  const [isEarningTokens, setIsEarningTokens] = useState(false);

  useEffect(() => {
    // Check for daily replenishment
    dispatch(replenishDailyTokens());
  }, [dispatch]);

  const earnTokens = async () => {
    setIsEarningTokens(true);
    try {
      await showAd();
      return true; // Tokens were successfully earned
    } catch (error) {
      console.error('Failed to show ad:', error);
      return false;
    } finally {
      setIsEarningTokens(false);
    }
  };

  const contextValue = {
    tokens: tokens.count,
    consumeToken: () => {
      if (tokens.count > 0) {
        dispatch(consumeToken());
        return true;
      }
      return false;
    },
    earnTokens,
    loading: loading || isEarningTokens
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};
