import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo || null);

  const contextValue = {
    user
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
