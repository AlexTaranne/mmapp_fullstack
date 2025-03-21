import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
}

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || "",
  );

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("firstName", firstName);
  }, [firstName]);

  return (
    <authContext.Provider value={{ role, setRole, firstName, setFirstName }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("Le auth context doit exister");
  }
  return context;
}
