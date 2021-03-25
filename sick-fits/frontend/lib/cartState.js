import { useState, useContext, createContext } from 'react';

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  function toggleCart() {
    return setCartOpen(!cartOpen);
  }
  function closeCart() {
    return setCartOpen(false);
  }
  function openCart() {
    return setCartOpen(true);
  }
  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// custom hook for accessing the cart local state
function useCart() {
  // use consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
