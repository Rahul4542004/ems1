
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, setState] = useState(true);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
