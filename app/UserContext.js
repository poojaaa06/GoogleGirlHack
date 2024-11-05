// app/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    lastPeriodDate: null,
    cycleLength: 28,
    periodDuration: 5,
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

