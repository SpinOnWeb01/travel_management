'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import IndianFlag from '../../public/images/india-flag.png';
import Cookies from 'js-cookie';
import LoginPage from '@/app/login/Login';
import PasswordPage from '@/app/password/Password';


export default function Header() {
  const [currency, setCurrency] = useState('INDIA');
  const [language, setLanguage] = useState('ENGLISH');
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState<boolean>(false);
   const [username, setUsername] = useState('');
   const [showMenu, setShowMenu] = useState(false);
   const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const storedName = Cookies.get('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);


  useEffect(() => {
 
 // @ts-ignore
 import("bootstrap/dist/js/bootstrap.bundle.min.js");
 }, []);


  const [] = useState(false);

  const toggleLangDropdown = () => {
    setShowLangDropdown(!showLangDropdown);
    setShowCurrencyDropdown(false);
  };

  const toggleCurrencyDropdown = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
    setShowLangDropdown(false);
  };



   const handleMouseEnter = () => {
 // Clear any pending hide timeout so menu stays open
 if (hideTimeoutRef.current !== null) {
 clearTimeout(hideTimeoutRef.current);
 hideTimeoutRef.current = null;
 }
 setShowMenu(true);
 };

 const handleMouseLeave = () => {
 // Clear existing timeout if it exists
 if (hideTimeoutRef.current !== null) {
 clearTimeout(hideTimeoutRef.current);
 hideTimeoutRef.current = null;
 }

 // Set new timeout to hide the menu after 0.5s
 hideTimeoutRef.current = window.setTimeout(() => {
 setShowMenu(false);
 hideTimeoutRef.current = null; // clear ref after execution
 }, 500);
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
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-1">
                {/* Social Icons */}
                <ul className="list-unstyled d-flex mb-0 top-social ">
                  <li>
                    <Link
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/images/icon/top-header.png"
                        width={16}
                        height={16}
                        alt="facebook"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/images/icon/top-header2.png"
                        width={16}
                        height={16}
                        alt="twitter"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/images/icon/top-header3.png"
                        width={16}
                        height={16}
                        alt="instagram"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/images/icon/linkedin.png"
                        width={16}
                        height={16}
                        alt="linkedin"
                      />
                    </Link>
                  </li>
                </ul>

                {/* Contact Info */}
                <div className="top-contact-info">
                  <ul className="pl-0 d-flex flex-row flex-wrap align-items-center gap-0 mb-0">
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
              <div className="d-flex flex-md-row justify-content-center justify-content-md-end align-items-center gap-3">
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
                      className="currancychange position-absolute bg-white text-dark shadow rounded mt-1 end-0"
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
                    <div className="currancychange position-absolute bg-white text-dark shadow rounded mt-1 end-0">
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

          <Link
            href="/"
            className="navbar-brand d-flex align-items-center gap-2 mb-0"
          >
            <Image src="/images/logo.png" alt="Logo" width={180} height={60} />
          </Link>

          {/* User Button */}
          <div className="d-flex align-items-center"
          onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="user-btn position-relative d-flex align-items-center gap-2 px-4 py-2"
              // onClick={() => setLoginShow(true)}
              

              data-bs-toggle="modal"
              data-bs-target="#exampleModalToggle"
              // data-bs-toggle="modal"
              // data-bs-target="#loginfrom"
            >
              <span className="user-icon d-flex align-items-center justify-content-center meri bheno ki rksha kro bs">
                <Image
                  src="/images/loginuser.png"
                  width={18}
                  height={18}
                  alt="user"
                />
              </span>
             <span>
  {username ? <p className='mb-0'>Welcome, {username}</p> : <p className='mb-0'>Login & Sign Up</p>}

</span>

              <span className="dropdown-arrow ms-2"></span>
              
            </button>
{username && (
  <div
 className={`loginNav absolute w-[350px] bg-white shadow-lg rounded z-50 transition-transform duration-500 ease-in-out ${
 showMenu
 ? "translate-y-0 opacity-100 pointer-events-auto"
 : "-translate-y-4 opacity-0 pointer-events-none"
 }`}
 >
 <div className="px-3 py-2 text-sm text-gray-600 border-b">
 You are viewing your personal profile <br />
 <span className="text-black font-medium">
 {username}
 </span>
 </div>

 <Link
 href="/my-profile"
 className="block hover:bg-gray-100 transition loginmenu"
 passHref
 >
 <div className="flex items-start gap-4">
 <i className="bi bi-person"></i>
 <div>
 <p className="text-base font-semibold text-black">
 My Profile
 </p>
 <p className="text-sm text-gray-600">
 Manage your profile, traveller details, login details, and
 password
 </p>
 </div>
 </div>
 </Link>

 <Link
 href="#"
 className="block hover:bg-gray-100 transition loginmenu"
 >
 <div className="flex items-start gap-4">
 <i className="bi bi-briefcase"></i>
 <div>
 <p className="text-base font-semibold text-black">
 My Trips
 </p>
 <p className="text-sm text-gray-600">
 See booking details, print e-ticket, cancel booking, check
 refund status & more.
 </p>
 </div>
 </div>
 </Link>

 <Link
 href="#"
 className="block hover:bg-gray-100 transition loginmenu"
 >
 <div className="flex items-start gap-4">
 <i className="bi bi-wallet"></i>
 <div>
 <p className="text-base font-semibold text-black flex items-center gap-2">
 My Wallet
 <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
 INR 0
 </span>
 </p>
 <p className="text-sm text-gray-600">
 Use your wallet money to avail even greater discounts
 </p>
 </div>
 </div>
 </Link>

 <Link
 href="#"
 className="block hover:bg-gray-100 transition loginmenu"
 >
 <div className="flex items-start gap-4">
 <i className="bi bi-credit-card"></i>
 <div>
 <p className="text-base font-semibold text-black">
 Make a Payment
 </p>
 <p className="text-sm text-gray-600">
 Complete your pending payments here
 </p>
 </div>
 </div>
 </Link>
 </div>
)}

          </div>
        </div>
      </nav>



     {!username && (
<div
  className="modal fade loginPopup"
  id="exampleModalToggle"
  aria-hidden="true"
  aria-labelledby="exampleModalToggleLabel"
  tabIndex={-1}
>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button
          type="button"
          className="btn-close closebtn"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body" style={{ background: "transparent" }}>
        <LoginPage />
        
      </div>
    </div>
  </div>
</div>
)}

      <div
        className="modal fade loginPopup"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close closebtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ background: "transparent" }}>
              <PasswordPage />
            </div>
          </div>
        </div>
      </div>
      {/* <a
        class="btn btn-primary"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Open first modal
      </a> */}

      {/* <ForgetFrom /> */}
    </>
  );
}
