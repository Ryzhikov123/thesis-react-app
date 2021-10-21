import { createContext } from 'react';
import { USERS_ENDPOINT } from '../constants/endpoints';
import { useFetch } from '../hooks/useFetch';

export interface IProps {
  children: JSX.Element;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
interface IUsersContext {
  users: IUsers[] | null;
}
export const UsersContext = createContext<IUsersContext>({ users: null });

export const UsersContextProvider = (props: IProps) => {
  const users = useFetch(USERS_ENDPOINT);

  return (
    <UsersContext.Provider value={{ users }}>
      {props.children}
    </UsersContext.Provider>
  );
};
