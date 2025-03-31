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
  lastName: string;
  setLastName: (lastName: string) => void;
  picture: string;
  setPicture: (picture: string) => void;
  id: string | null;
  setId: (id: string) => void;
}

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || "",
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || "",
  );
  const [picture, setPicture] = useState(localStorage.getItem("picture") || "");
  const [id, setId] = useState(localStorage.getItem("id") || null);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    localStorage.setItem("lastName", lastName);
  }, [lastName]);

  useEffect(() => {
    localStorage.setItem("picture", picture);
  }, [picture]);

  useEffect(() => {
    if (id) localStorage.setItem("id", id);
  }, [id]);

  return (
    <authContext.Provider
      value={{
        role,
        setRole,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        picture,
        setPicture,
        id,
        setId,
      }}
    >
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
