

'use client';

import { faFacebookF, faLinkedinIn, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import IndianFlag from '../../../public/images/india-flag.png';
import ftrlogo from '../../../public/images/logo.png';






export default function Footer() { 
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setOpen(!open);

    const handleSelect = (country: string) => {
        console.log("Selected country:", country);
        setOpen(false);
        // You can store this value in state, cookies, or localStorage
    };

    return (
      <>
        <footer className="footer-section text-white">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-3">
                <div className="d-flex align-items-center mb-3">
                  <Image src={ftrlogo} alt="Logo" className="img-fluid " />
                </div>

                <div className="dropdown " ref={dropdownRef}>
                  <button
                    className="btn  country-ftr d-flex  dropdown-toggle"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    <Image
                      src={IndianFlag}
                      alt="flag"
                      className="me-2"
                      width={18}
                      height={18}
                    />
                    India
                    <span className="countryicon">
                      <i className="bi bi-chevron-down ms-1"></i>
                    </span>
                  </button>

                  {open && (
                    <ul className="dropdown-menu show">
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => handleSelect("USA")}
                        >
                          🇺🇸 USA
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => handleSelect("Germany")}
                        >
                          🇩🇪 Germany
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => handleSelect("UK")}
                        >
                          🇬🇧 UK
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-lg-9 col-md-9">
                <div className=" d-flex gap-3 justify-content-center justify-content-md-end">
                  <div className="ftr-social">
                    <FontAwesomeIcon icon={faFacebookF} className="me-1 " />
                    <FontAwesomeIcon icon={faTwitter} className="me-1 " />
                    <FontAwesomeIcon icon={faPinterest} className="me-1 " />
                    <FontAwesomeIcon icon={faLinkedinIn} className="me-1 " />
                  </div>
                </div>
              </div>
            </div>

            <div className="row ftr-nav">
              <div className="col-lg-6 col-md-6">
                <div className="row">
                  <div className="col-6">
                    <ul className="footer-links">
                      <h4>Our Offerings</h4>
                      <li>
                        <a href="#">Quick Links</a>
                      </li>
                      <li>
                        <a href="#">Popular Destinations</a>
                      </li>
                      <li>
                        <a href="#">International Destinations</a>
                      </li>
                      <li>
                        <a href="#">Company</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="footer-links">
                      <h4>Help</h4>
                      <li>
                        <a href="#">Learn How We Work</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="#">Legal Information</a>
                      </li>
                      <li>
                        <a href="#">Privacy Notice</a>
                      </li>
                      <li>
                        <a href="#">Cybersecurity</a>
                      </li>
                      <li>
                        <a href="#">Vulnerability Disclosure Programme</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3 email-title">
                  <h2>
                    Get exclusive inspiration for your next stay – subscribe to
                    our newsletter.
                  </h2>
                </div>
                <div className="d-flex flex-column flex-sm-row">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="form-control mb-2 mb-sm-0 me-sm-2 email-input"
                  />
                  <button className="btn subscribe-btn">Subscribe</button>
                </div>
                <p className="copyright mt-3">
                  travel, Kesselstraße 5 – 7, 40221 Düsseldorf, Germany <br />
                  Copyright 2025 travel | All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
}