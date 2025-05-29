import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import Login from './components/Login';
import BlogEdit from './pages/Blogedit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import Layout from './layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import Nav from './routes/route';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

       <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={Nav.LOGIN} element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route element={<ProtectedRoute />}>
            <Route path={Nav.ADMIN_LAYOUT} element={<Layout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>}>
            <Route path={Nav.ADMIN_BLOGS_VIEW} element={<BlogList />} />
            <Route path={Nav.ADMIN_BLOGS_NEW} element={<BlogForm />} />
            <Route path={Nav.ADMIN_BLOGS_EDIT} element={<BlogEdit />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
