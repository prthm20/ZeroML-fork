"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
type SessionContextType = {
  sessionId: string;
  setSessionId: (id: string) => void;
};
const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState("");
  return (
    <SessionContext.Provider value={{ sessionId, setSessionId }}>
      {" "}
      {children}{" "}
    </SessionContext.Provider>
  );
};
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
