import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faChevronDown,
  faCircle,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

function Sidebar({ sidebarOpen }) {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [mobileOpen, setMobileOpen] = useState(window.innerWidth > 991);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      setMobileOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    // Set initial state
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside 
        id="sidebar" 
        className={`sidebar bg-dark text-white ${sidebarOpen ? '' : 'collapsed'} ${
          isMobile ? (mobileOpen ? 'mobile-open' : 'mobile-closed') : ''

        }`}
        
      >
        <div className="sidebar-header">
    

          <ul className="sidebar-nav list-unstyled" id="sidebar-nav">
            {/* Dashboard */}
            <li className="nav-item" onClick={handleLinkClick}>
              <Link className="nav-link" to="/dashboard">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                <span>Dashboard</span>
              </Link>
            </li>

           


            {/* Blog Dropdown */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                href="#blog"
                role="button"
                aria-expanded="false"
                aria-controls="blog"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                <span>Blog</span>
                <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
              </a>
              <ul className="collapse list-unstyled ps-3" id="blog" data-bs-parent="#sidebar-nav">
                <li onClick={handleLinkClick}>
                  <Link to="/dashboard/blogs/new" className="nav-link">
                    <FontAwesomeIcon icon={faCircle} className="me-2" />
                    <span>Add Blog</span>
                  </Link>
                </li>
                
                <li onClick={handleLinkClick}>
                  <Link to="/dashboard/blogs/view/" className="nav-link">
                    <FontAwesomeIcon icon={faCircle} className="me-2" />
                    <span>View Blogs</span>
                  </Link>
                </li>

                
              </ul>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                href="#profile"
                role="button"
                aria-expanded="false"
                aria-controls="profile"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon icon={ faFileAlt } className="me-2" />
                <span>Category</span>
                <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
              </a>
              <ul className="collapse list-unstyled ps-3" id="profile" data-bs-parent="#sidebar-nav">
                <li onClick={handleLinkClick}>
                  <Link to="/category" className="nav-link">
                    <FontAwesomeIcon icon={faCircle} className="me-2" />
                    <span>Add Category</span>
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link to="/edit-view" className="nav-link">
                    <FontAwesomeIcon icon={faCircle} className="me-2" />
                    <span>Edit Category</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;