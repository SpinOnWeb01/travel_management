import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Nav from "./routes/route";

// Lazy-loaded components
const Login = lazy(() => import("./components/Login"));
const Layout = lazy(() => import("./layout/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogForm = lazy(() => import("./pages/BlogForm"));
const BlogEdit = lazy(() => import("./pages/BlogEdit"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`app-container ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <AuthProvider>
        <BrowserRouter>
          <Suspense
            fallback={<div className="text-center mt-5">Loading...</div>}
          >
            <Routes>
              <Route path={Nav.LOGIN} element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route
                  path={Nav.ADMIN_LAYOUT}
                  element={
                    <Layout
                      sidebarOpen={sidebarOpen}
                      toggleSidebar={toggleSidebar}
                    />
                  }
                >
                  <Route path={Nav.ADMIN_DASHBOARD} element={<Dashboard />} />
                  <Route path={Nav.ADMIN_BLOGS_VIEW} element={<BlogList />} />
                  <Route path={Nav.ADMIN_BLOGS_NEW} element={<BlogForm />} />
                  <Route path={Nav.ADMIN_BLOGS_EDIT} element={<BlogEdit />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
