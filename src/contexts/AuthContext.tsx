import React ,{ createContext, useEffect, useCallback, useContext, useState, ReactNode } from "react";
import userMock from "@/mock/user.json";

const AUTH_STORAGE_KEY = "findtalent-user";
const REGISTERED_USERS_KEY = "findtalent-registered-users";


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
    register: (firstname: string, lastname: string, email: string, password: string) => boolean;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
  };

  const AuthContext = createContext<AuthContextType | null>(null);

  const baseUsers = userMock as User[];

  function getRegisteredUsers(): User[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function getAllUsers(): User[] {
    return [...baseUsers, ...getRegisteredUsers()];
  }

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
      const users = getAllUsers();
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
  
    const register = useCallback((firstname: string, lastname: string, email: string, password: string): boolean => {
      const users = getAllUsers();
      const normalizedEmail = email.trim().toLowerCase();
      if (users.some((u) => (u.email || "").toLowerCase() === normalizedEmail)) {
        return false;
      }
      const registered = getRegisteredUsers();
      const nextId = registered.length > 0
        ? Math.max(...registered.map((u) => u.id), 0) + 1
        : (Math.max(0, ...baseUsers.map((u) => u.id)) + 1);
      const newUser: User = {
        id: nextId,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: normalizedEmail,
        password,
        title: "",
        avatar: "",
        company: "",
        location: "",
        phone: "",
        websites: [],
        documents: [],
        savedSearches: [],
        myApplications: [],
        profileContent: [],
        experience: [],
        education: [],
        certificates: [],
        skills: [],
        hobbies: [],
      };
      const updated = [...registered, newUser];
      if (typeof window !== "undefined") {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));
      }
      return true;
    }, []);
  
    const logout = useCallback(() => {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }, []);

    const updateUser = useCallback((updates: Partial<User>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...updates };
        if (typeof window !== "undefined") {
          const { password: _, ...toStore } = next;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(toStore));
        }
        return next;
      });
    }, []);
  
    const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
  }