import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AuthRoutesWrapper from "./routes/auth.routes";
import DashboardRoutesWrapper from "./routes/dashboard.routes";
import { Home } from "./pages";
import { useAppDispatch } from "./hooks/UseAppDispatch";
import { useEffect } from "react";
import { LocalStorage } from "./util";
import { setUser } from "./redux/slices/auth.slice";
import { setTheme } from "./redux/slices/theme.slice";
import { useAppSelector } from "./hooks/UseAppSelector";

function App() {
  const theme = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();
  const user = LocalStorage.get("user");
  const token = LocalStorage.get("token");

  useEffect(() => {
    if (user && token) {
      dispatch(setUser({ user, accessToken: token }));
    }
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") || "system";
    if (savedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch(setTheme(prefersDark ? "dark" : "light"));
    } else {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* site routes */}
        <Route index={true} path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/auth/*" element={<AuthRoutesWrapper />} />

        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<DashboardRoutesWrapper />} />

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="w-full h-screen flex items-center justify-center">
              <h1 className="text-lg">404 Page not found | Not Design yet</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
