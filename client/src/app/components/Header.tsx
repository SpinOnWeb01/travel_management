'use client'
import { faFacebookF, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import IndianFlag from '../../../public/images/india-flag.png';
import '../style.css';

export default function Header() {
  const [currency, setCurrency] = useState('INDIA');
  const [language, setLanguage] = useState('ENGLISH');
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState<boolean>(false);

  const toggleLangDropdown = () => {
    setShowLangDropdown(!showLangDropdown);
    setShowCurrencyDropdown(false);
  };

  const toggleCurrencyDropdown = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
    setShowLangDropdown(false);
  };

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  const selectCurrency = (curr: string) => {
    setCurrency(curr);
    setShowCurrencyDropdown(false);
  };

  return (
    <>
      <div className="text-white small top-header">
        <div className="container">
          <div className="row align-items-center border-bottom border-secondary py-3">
            {/* Social & Contact Info */}
            <div className="col-12 col-md-6 mb-3 mb-md-0">
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
                {/* Social Icons */}
                <ul className="list-unstyled d-flex mb-0 top-social gap-3">
                  <li>
                    <Link
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faPinterest} />
                    </Link>
                  </li>
                </ul>

                {/* Contact Info */}
                <div className="top-contact-info">
                  <ul className="pl-0 d-flex flex-row flex-wrap align-items-center gap-2 mb-0">
                    <li>
                      <Link href="#">+91 99999 99999</Link>
                    </li>
                    <li>
                      <Link href="#">Contact@travelide.com</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Language & Currency */}
            <div className="col-12 col-md-6">
              <div className="d-flex flex-md-row justify-content-center justify-content-md-end align-items-center gap-2">
                {/* Language Dropdown */}
                <div className="position-relative">
                  <button
                    className="topbar-right-btn"
                    onClick={toggleLangDropdown}
                  >
                    {language} <i className="bi bi-chevron-down ms-1"></i>
                  </button>
                  {showLangDropdown && (
                    <div
                      className="position-absolute bg-white text-dark shadow rounded mt-1 end-0"
                      style={{ minWidth: "120px", zIndex: 1000 }}
                    >
                      {["ENGLISH", "HINDI", "FRENCH"].map((lang) => (
                        <button
                          key={lang}
                          className={`d-block w-100 text-start px-3 py-2 border-0 bg-transparent ${
                            language === lang ? "text-primary fw-medium" : ""
                          }`}
                          onClick={() => selectLanguage(lang)}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currency Dropdown */}
                <div className="position-relative">
                  <button
                    className="topbar-right-btn d-flex align-items-center gap-2"
                    onClick={toggleCurrencyDropdown}
                  >
                    <Image src={IndianFlag} alt="flag" width={18} height={18} />
                    <span>{currency}</span>
                    <i className="bi bi-chevron-down ms-1"></i>
                  </button>
                  {showCurrencyDropdown && (
                    <div className="position-absolute bg-white text-dark shadow rounded mt-1 end-0">
                      {["INDIA", "USD", "EUR"].map((curr) => (
                        <button
                          key={curr}
                          className={`d-block w-100 text-start px-3 py-2 border-0 bg-transparent ${
                            currency === curr ? "text-primary fw-medium" : ""
                          }`}
                          onClick={() => selectCurrency(curr)}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* header */}

      <nav className="navbar navbar-expand-lg py-3 main_header">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          
            <Link  href="#" className="navbar-brand d-flex align-items-center gap-2 mb-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={180}
                height={60}
              />
            </Link>
          

          {/* User Button */}
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="user-btn position-relative d-flex align-items-center gap-2 px-4 py-2"
            >
              <span className="user-icon d-flex align-items-center justify-content-center">
                <i className="bi bi-person-fill"></i>
              </span>
              <span>Login & Sign Up</span>
              <span className="dropdown-arrow ms-2"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* end header  */}
    </>
  );
}
