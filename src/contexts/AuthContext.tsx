import React ,{ createContext, useEffect, useCallback, useContext, useState, ReactNode } from "react";
import userMock from "@/mock/user.json";

const AUTH_STORAGE_KEY = "findtalent-user";


export type User = {
    id: number;
    firstname: string;
    lastname: string;
    title: string;
    avatar: string;
    company: string;
    location: string;
    email: string;
    password?: string;
    phone: string;
    websites: { id: number; name: string; url: string }[];
    documents: { id: number; name: string; url: string }[];
    savedSearches: { id: number; name: string }[];
    myApplications: { id: number; name: string }[];
    profileContent: { id: number; title: string; content: string }[];
    experience?: unknown[];
    education?: unknown[];
    certificates?: { id: number; name: string; description: string; date: string }[];
    skills?: { id: number; name: string; experience: string }[];
    hobbies?: { id: number; name: string }[];
  };

  type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
  };

  const AuthContext = createContext<AuthContextType | null>(null);

  const users = userMock as User[];


  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem(AUTH_STORAGE_KEY) : null;
        if (stored) {
          const parsed = JSON.parse(stored) as User;
          if (parsed?.id && parsed?.email) setUser(parsed);
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    const login = useCallback((email: string, password: string): boolean => {
      const found = users.find(
        (u) => (u.email || "").toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (found) {
        const { password: _, ...rest } = found;
        const toStore = { ...rest } as User;
        setUser(toStore);
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(toStore));
        }
        return true;
      }
      return false;
    }, []);
  
    const logout = useCallback(() => {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }, []);
  
    const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
  }