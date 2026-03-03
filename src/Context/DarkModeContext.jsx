import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, "isDark");
  function toggleDark() {
    setIsDark((isDark) => !isDark);
  }

  useEffect(function () {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  });

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("The context can not be used outside the provider");
  return context;
}

export { useDarkMode, DarkModeProvider };
DarkModeProvider.propTypes = {
  children: PropTypes.node,
};
