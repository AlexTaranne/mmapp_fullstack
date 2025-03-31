import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface MyContextProps {
  children: ReactNode;
}

interface DarkThemeProps {
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
}

const darkThemeContext = createContext(null as null | DarkThemeProps);

export function DarkThemeProvider({ children }: MyContextProps) {
  const [darkTheme, setDarkTheme] = useState(false as boolean);

  return (
    <darkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </darkThemeContext.Provider>
  );
}

export const useDarkTheme = () => {
  const context = useContext(darkThemeContext);
  if (context == null) {
    throw new Error("Un context doit être utilisé");
  }

  return context;
};
