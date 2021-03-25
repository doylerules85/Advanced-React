import { useState, useContext, createContext } from 'react';

// create the context
const LocalStateContext = createContext();

// add provider and attach context - storing in variable to avoid dot notation component
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // setting up the local state available within provider
  const [cartOpen, setCartOpen] = useState(false);

  // helper function you can add in provider
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
    // passing our values thru value prop
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
