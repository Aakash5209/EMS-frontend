// 'use client'

// import React, { createContext, useState, ReactNode } from 'react';



// const UserContext = createContext(0);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);
//   // const [user, setUser] = useState<User[] | null>(null);
//   return (
//     <>
//       <UserContext.Provider value={{ user, setUser}}>
//         {children }
//       </UserContext.Provider>
//     </>
//   );
// };

// export default UserContext;


'use client'

import React, { createContext, useState, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dob: string;
  contactNo: string;
  gender: string;
  reporting_manager?: string;
}

// Define the context type
interface UserContextType {
  user: User[] | null; // Or use User | null if it's a single user
  setUser: React.Dispatch<React.SetStateAction<User[] | null>>;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User[] | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
