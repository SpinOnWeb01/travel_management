"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";




export default function RegisterFrom() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const [key, setKey] = useState("email");
    const [selectedCode, setSelectedCode] = useState("");



    const countryCodes = [
      { code: "+93", name: "Afghanistan (AF)" },
      { code: "+355", name: "Albania (AL)" },
      { code: "+213", name: "Algeria (DZ)" },
      { code: "+376", name: "Andorra (AD)" },
      { code: "+244", name: "Angola (AO)" },
      { code: "+54", name: "Argentina (AR)" },
      { code: "+374", name: "Armenia (AM)" },
      { code: "+61", name: "Australia (AU)" },
      { code: "+43", name: "Austria (AT)" },
      { code: "+994", name: "Azerbaijan (AZ)" },
      { code: "+973", name: "Bahrain (BH)" },
      { code: "+880", name: "Bangladesh (BD)" },
      { code: "+375", name: "Belarus (BY)" },
      { code: "+32", name: "Belgium (BE)" },
      { code: "+591", name: "Bolivia (BO)" },
      { code: "+387", name: "Bosnia & Herzegovina (BA)" },
      { code: "+267", name: "Botswana (BW)" },
      { code: "+55", name: "Brazil (BR)" },
      { code: "+359", name: "Bulgaria (BG)" },
      { code: "+226", name: "Burkina Faso (BF)" },
      { code: "+855", name: "Cambodia (KH)" },
      { code: "+237", name: "Cameroon (CM)" },
      { code: "+1", name: "Canada (CA)" },
      { code: "+238", name: "Cape Verde (CV)" },
      { code: "+236", name: "Central African Republic (CF)" },
      { code: "+56", name: "Chile (CL)" },
      { code: "+86", name: "China (CN)" },
      { code: "+57", name: "Colombia (CO)" },
      { code: "+269", name: "Comoros (KM)" },
      { code: "+506", name: "Costa Rica (CR)" },
      { code: "+385", name: "Croatia (HR)" },
      { code: "+53", name: "Cuba (CU)" },
      { code: "+357", name: "Cyprus (CY)" },
      { code: "+420", name: "Czech Republic (CZ)" },
      { code: "+45", name: "Denmark (DK)" },
      { code: "+253", name: "Djibouti (DJ)" },
      { code: "+593", name: "Ecuador (EC)" },
      { code: "+20", name: "Egypt (EG)" },
      { code: "+503", name: "El Salvador (SV)" },
      { code: "+372", name: "Estonia (EE)" },
      { code: "+251", name: "Ethiopia (ET)" },
      { code: "+679", name: "Fiji (FJ)" },
      { code: "+358", name: "Finland (FI)" },
      { code: "+33", name: "France (FR)" },
      { code: "+995", name: "Georgia (GE)" },
      { code: "+49", name: "Germany (DE)" },
      { code: "+233", name: "Ghana (GH)" },
      { code: "+30", name: "Greece (GR)" },
      { code: "+502", name: "Guatemala (GT)" },
      { code: "+592", name: "Guyana (GY)" },
      { code: "+509", name: "Haiti (HT)" },
      { code: "+504", name: "Honduras (HN)" },
      { code: "+36", name: "Hungary (HU)" },
      { code: "+91", name: "India (IN)" },
      { code: "+62", name: "Indonesia (ID)" },
      { code: "+98", name: "Iran (IR)" },
      { code: "+964", name: "Iraq (IQ)" },
      { code: "+353", name: "Ireland (IE)" },
      { code: "+972", name: "Israel (IL)" },
      { code: "+39", name: "Italy (IT)" },
      { code: "+81", name: "Japan (JP)" },
      { code: "+962", name: "Jordan (JO)" },
      { code: "+254", name: "Kenya (KE)" },
      { code: "+965", name: "Kuwait (KW)" },
      { code: "+996", name: "Kyrgyzstan (KG)" },
      { code: "+371", name: "Latvia (LV)" },
      { code: "+961", name: "Lebanon (LB)" },
      { code: "+218", name: "Libya (LY)" },
      { code: "+370", name: "Lithuania (LT)" },
      { code: "+352", name: "Luxembourg (LU)" },
      { code: "+853", name: "Macau (MO)" },
      { code: "+389", name: "North Macedonia (MK)" },
      { code: "+261", name: "Madagascar (MG)" },
      { code: "+60", name: "Malaysia (MY)" },
      { code: "+960", name: "Maldives (MV)" },
      { code: "+223", name: "Mali (ML)" },
      { code: "+356", name: "Malta (MT)" },
      { code: "+212", name: "Morocco (MA)" },
      { code: "+95", name: "Myanmar (MM)" },
      { code: "+977", name: "Nepal (NP)" },
      { code: "+31", name: "Netherlands (NL)" },
      { code: "+64", name: "New Zealand (NZ)" },
      { code: "+505", name: "Nicaragua (NI)" },
      { code: "+234", name: "Nigeria (NG)" },
      { code: "+47", name: "Norway (NO)" },
      { code: "+92", name: "Pakistan (PK)" },
      { code: "+507", name: "Panama (PA)" },
      { code: "+51", name: "Peru (PE)" },
      { code: "+63", name: "Philippines (PH)" },
      { code: "+48", name: "Poland (PL)" },
      { code: "+351", name: "Portugal (PT)" },
      { code: "+974", name: "Qatar (QA)" },
      { code: "+40", name: "Romania (RO)" },
      { code: "+7", name: "Russia (RU)" },
      { code: "+966", name: "Saudi Arabia (SA)" },
      { code: "+221", name: "Senegal (SN)" },
      { code: "+65", name: "Singapore (SG)" },
      { code: "+421", name: "Slovakia (SK)" },
      { code: "+386", name: "Slovenia (SI)" },
      { code: "+27", name: "South Africa (ZA)" },
      { code: "+82", name: "South Korea (KR)" },
      { code: "+34", name: "Spain (ES)" },
      { code: "+94", name: "Sri Lanka (LK)" },
      { code: "+249", name: "Sudan (SD)" },
      { code: "+46", name: "Sweden (SE)" },
      { code: "+41", name: "Switzerland (CH)" },
      { code: "+963", name: "Syria (SY)" },
      { code: "+886", name: "Taiwan (TW)" },
      { code: "+992", name: "Tajikistan (TJ)" },
      { code: "+255", name: "Tanzania (TZ)" },
      { code: "+66", name: "Thailand (TH)" },
      { code: "+216", name: "Tunisia (TN)" },
      { code: "+90", name: "Turkey (TR)" },
      { code: "+993", name: "Turkmenistan (TM)" },
      { code: "+256", name: "Uganda (UG)" },
      { code: "+380", name: "Ukraine (UA)" },
      { code: "+971", name: "United Arab Emirates (AE)" },
      { code: "+44", name: "United Kingdom (GB)" },
      { code: "+1", name: "United States (US)" },
      { code: "+998", name: "Uzbekistan (UZ)" },
      { code: "+58", name: "Venezuela (VE)" },
      { code: "+84", name: "Vietnam (VN)" },
      { code: "+967", name: "Yemen (YE)" },
      { code: "+260", name: "Zambia (ZM)" },
      { code: "+263", name: "Zimbabwe (ZW)" },
    ];
      




    return (
      <>
        <div className="login-container d-flex align-items-center justify-content-center">
          <div className="login-box registerbox row overflow-hidden shadow-lg">
            {/* Left Side */}
            <div
              className="col-md-5 login-left text-white p-0 d-flex flex-column justify-content-center"
              style={{
                backgroundImage: 'url("/images/login-side-bg.jpg")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h2 className="mb-4 pb-2">Get ready to:</h2>
              <ul className="list-unstyled">
                <li>Unlock our member prices and loyalty deals</li>
                <li>Easily pick up your search again from any device</li>
                <li>Save big with price alerts on our app</li>
              </ul>
            </div>

            {/* Right Side */}
            <div className="col-md-7 loginrightf">
              <div className="loginform ">
                <h3 className="fw-bold ">Sign In</h3>
                <p className="text-muted">
                  For security, please sign in to access your information
                </p>

               
                <ul
                  className="nav nav-tabs mb-3 registertab"
                  id="registerTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="email-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#email"
                      type="button"
                      role="tab"
                      aria-controls="email"
                      aria-selected="true"
                    >
                      Email
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="mobile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#mobile"
                      type="button"
                      role="tab"
                      aria-controls="mobile"
                      aria-selected="false"
                    >
                      Mobile
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content" id="registerTabContent">
                  {/* Email Tab */}
                  <div
                    className="tab-pane fade show active"
                    id="email"
                    role="tabpanel"
                    aria-labelledby="email-tab"
                  >
                    <div className="registerloginfrom">
                      <form>
                        <label className="form-label">Email address</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                        </div>

                        <label className="form-label">Password</label>
                        <div className="mb-3 input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control formpassword"
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            className="input-group-text bg-none"
                            onClick={togglePassword}
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className={`bi ${
                                showPassword
                                  ? "bi-eye-slash-fill"
                                  : "bi-eye-fill"
                              }`}
                            ></i>
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="btn w-100 btn-gradient border-0"
                        >
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Mobile Tab */}
                  <div
                    className="tab-pane fade"
                    id="mobile"
                    role="tabpanel"
                    aria-labelledby="mobile-tab"
                  >
                    <div className="registerloginfrom">
                      <form className="mt-4">
                        <div className="row mb-3 g-0">
                          <div className="col-md-4">
                            <label className="form-label">Country</label>
                            <select
                              className="form-select"
                              aria-label="Country code"
                              value={selectedCode}
                              onChange={(e) => setSelectedCode(e.target.value)}
                            >
                              <option value="">Country Code</option>
                              {countryCodes.map((country, index) => (
                                <option key={index} value={country.code}>
                                  {country.code} {country.name}
                                </option>
                              ))}
                            </select>

                           
                          </div>
                          <div className="col-md-8">
                            <label className="form-label">Mobile Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="Enter mobile number"
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control formpassword"
                              placeholder="Enter password"
                            />
                            <button
                              type="button"
                              className="input-group-text bg-none"
                              onClick={togglePassword}
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className={`bi ${
                                  showPassword
                                    ? "bi-eye-slash-fill"
                                    : "bi-eye-fill"
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn w-100 btn-gradient border-0"
                        >
                          Sign in
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="createaccountform d-flex justify-between py-3">
                  <Link href="#"> Create Account</Link>
                  <Link href="/forget">
                    <i className="bi bi-lock me-1"></i>Forgot password?
                  </Link>
                </div>

                {/* <div className="text-center logintext">Or Login/Signup With</div> */}
                <div className="login-divider">
                  <span className="divider-line" />
                  <span className="divider-text logintext">
                    Or Login/Signup With
                  </span>
                  <span className="divider-line" />
                </div>

                <div className="login-img d-flex justify-content-center gap-3 mb-3">
                  <button className="gap-2 ">
                    <Image
                      src="/images/icon/google.png"
                      alt="Google"
                      width={39}
                      height={39}
                      style={{ margin: "0 auto" }}
                    />
                    <p>Google</p>
                  </button>
                  <button className="gap-2 ">
                    <Image
                      src="/images/icon/facebook.png"
                      alt="Facebook"
                      width={39}
                      height={39}
                      style={{ margin: "0 auto" }}
                    />
                    <p>Facebook</p>
                  </button>
                </div>

                <p className="small text-muted p-1s">
                  By logging in, I understand & agree to Travel{" "}
                  <Link href="#" className="text-danger text-decoration-none">
                    terms of use
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-danger text-decoration-none">
                    privacy policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
