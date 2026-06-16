/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("authToken", serverToken);
    setToken(serverToken);
  };

  const LogoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const userAuthentication = async () => {
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:4000/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.userData);
        }
      } catch (error) {
        console.error("Error during user authentication:", error);
      }
    };

    userAuthentication();
  }, [token]);

  const isLoggedIn = !!token;
  const userRole = user ? user.role : null;

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLocalStorage,
        LogoutUser,
        user,
        token,
        isLoggedIn,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return AuthContextValue;
};
