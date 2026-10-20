"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthUser {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: (password: string, email?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_PASSWORDS = ["kare2025", "admin", "admin123", "drjjosephine", "portfolio2025"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("academic_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
        setUser({
          name: "Dr. Josephine Selle Jeyanathan",
          email: "drjjosephine@gmail.com",
          role: "Administrator / Faculty PI",
        });
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (password: string, email?: string): boolean => {
    const trimmed = password.trim();
    if (VALID_PASSWORDS.includes(trimmed.toLowerCase()) || trimmed === "kare2025") {
      setIsAuthenticated(true);
      setUser({
        name: "Dr. Josephine Selle Jeyanathan",
        email: email || "drjjosephine@gmail.com",
        role: "Administrator / Faculty PI",
      });
      try {
        localStorage.setItem("academic_admin_auth", "true");
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem("academic_admin_auth");
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
