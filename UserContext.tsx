
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'under18' | 'adult' | 'student' | null;

interface UserProfile {
  userType: UserType;
  name: string;
  email: string;
  hasCompletedOnboarding: boolean;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateUserType: (type: UserType) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateUserType = (type: UserType) => {
    setUserProfile(prev => prev ? { ...prev, userType: type } : null);
  };

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, updateUserType, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
