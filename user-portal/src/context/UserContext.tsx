import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState
  } from "react";
  import { User } from "../interfaces/interface";
  export interface UserContextValue {
    users: User[];
    setUserList: Dispatch<SetStateAction<User[]>>;
  }
  
  const defaultState = {
    users: [],
    setUserList: (user: User[]) => {}
  } as UserContextValue;
  
  export const UserContext = createContext(defaultState);
  
  type UserProvideProps = {
    children: React.ReactNode;
  };
  
  export default function UserProvider({ children }: UserProvideProps) {
    const [users, setUserList] = useState<User[]>([]);
    return (
      <UserContext.Provider value={{ users, setUserList }}>
        {children}
      </UserContext.Provider>
    );
  }
  