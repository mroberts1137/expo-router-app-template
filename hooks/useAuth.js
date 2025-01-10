import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  const isAuthenticated = isLoggedIn && userInfo !== null;
  const isPremium = isAuthenticated && userInfo.accountType === 'PREMIUM';
  const isAdmin = isAuthenticated && userInfo.accountType === 'ADMIN';

  return {
    isAuthenticated,
    isPremium,
    isAdmin,
    user: userInfo
  };
};
