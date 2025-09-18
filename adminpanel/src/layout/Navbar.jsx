import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import { FaBars, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from "react";
import { ThemeContext } from '../index'; 
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';


function Navbar({ toggleSidebar }) {
  const [search, setSearch] = useState('');
  const { appearance, setAppearance } = useContext(ThemeContext);
  
  const toggleTheme = () => {
    setAppearance(appearance === 'dark' ? 'light' : 'dark');
  };

  return (
     <header className={`
      ${styles.header}
      ${appearance === 'dark' ? styles.darkHeader : styles.lightHeader}
      d-flex align-items-center justify-content-between fixed-top px-3
    `}>
      <div className="d-flex align-items-center">
        <Link to="/" className={`d-flex align-items-center text-decoration-none ${styles.logo}`}>
          <span className={`d-none d-lg-block ${appearance === 'dark' ? styles.darkText : styles.lightText}`}>
            Travel Posts
          </span>
        </Link>

        <button className={`btn btn-sm ms-3 ${styles.btn}`} onClick={toggleSidebar}>
          <FaBars className={`${appearance === 'dark' ? styles.darkIcon : styles.lightIcon}`}/>
        </button>
      </div>

      <div className={`search-bar d-none d-md-block ${styles.searchBar}`}>
        <form className="search-form d-flex align-items-center">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
          <button type="submit" className="btn btn-light ms-2">
            <FaSearch />
          </button>
        </form>
      </div>

      <nav className="header-nav d-flex align-items-center">
        <ul className="d-flex align-items-center list-unstyled mb-0">
          <li className="me-3">
            <button className="btn" onClick={toggleTheme} title="Toggle Theme">
              {appearance === 'dark' ? <SunIcon className={styles.themeIcon} /> :
<MoonIcon className={styles.themeIcon} />}
            </button>
          </li>

          <li className="nav-item d-md-none me-3">
            <Link className={`nav-link ${appearance === 'dark' ? styles.darkText : styles.lightText}`} to="#">
              <FaSearch />
            </Link>
          </li>

          <li className="nav-item dropdown">
            <Link className={`nav-link dropdown-toggle d-flex align-items-center ${appearance === 'dark' ? styles.darkText : styles.lightText}`} to="#" data-bs-toggle="dropdown">
              <img src="/images/profile-img.jpg" alt="Profile" className="rounded-circle" width="32" height="32" />
              <span className="ms-2 d-none d-md-block">Sonu Kumar</span>
            </Link>

            <ul className={`dropdown-menu dropdown-menu-end ${styles.dropdownMenu}`}>
              <li className="dropdown-header text-center">
                <h6>Sonu Kumar</h6>
                <span>Content Writer</span>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li onClick={() => sessionStorage.removeItem('token')}>
                <Link className="dropdown-item" to="/">
                  <FaSignOutAlt className="me-2" />
                  Sign Out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
