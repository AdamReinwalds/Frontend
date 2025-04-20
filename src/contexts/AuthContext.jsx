import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const apiEndpoint =
    "https://crm-webbapp-cch9asgnhdfba3c6.swedencentral-01.azurewebsites.net/api/auth";

  const defaultValues = {
    accessToken: null,
    role: "admin",
    isAuthenticated: true,
    loading: true,
  };
  const [auth, setAuth] = useState(defaultValues);

  const fetchAuthData = async () => {
    setAuth({ ...defaultValues, loading: false });

    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          "X-API-KEY": import.meta.env.VITE_X_API_KEY,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuth({
          accessToken: data.accessToken,
          role: data.role,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error) {
      setAuth(defaultValues);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};
