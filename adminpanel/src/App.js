import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import Login from './components/Login';
import BlogEdit from './pages/Blogedit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

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

  // Hide sidebar and navbar on login page
  const isLoginPage = location.pathname === '/';

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      {!isLoginPage && <Sidebar isOpen={sidebarOpen} />}
      
       {isLoginPage ? (
        // Login page: no main-content wrapper
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        // Other pages: with main-content wrapper
        <div className="main-content" id="main">
          <Navbar onToggleSidebar={toggleSidebar} />
          <Routes>
            <Route path="/blogs/view" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogForm />} />
            <Route path="/blogs/edit/:id" element={<BlogEdit />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
