
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AdminUser {
  email: string;
  role: "admin" | "staff";
}

const AuthContext = createContext<AuthContextType | null>(null);

// Temporary admin credentials
const TEMP_ADMIN = {
  email: "admin@sunriseevents.com",
  password: "Admin@123",
  role: "admin" as const
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Temporary authentication logic
    if (email === TEMP_ADMIN.email && password === TEMP_ADMIN.password) {
      const userData = { email: TEMP_ADMIN.email, role: TEMP_ADMIN.role };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      navigate("/admin");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
