import { useState } from "react";
import { AuthContext } from "./authContext";
import { useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();

        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, actionLoading, setActionLoading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};