import React, { useState } from "react";
import './login.css'; // Assuming you have a CSS file for styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";



const bgImage = process.env.PUBLIC_URL + "/images/loginpage.avif";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
    console.log("Email:", email, "Password:", password);
  };
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };
    // const handleCheckboxChange = (e) => {
    //     const { checked } = e.target;
    //     // handle checkbox logic here
    //     console.log("Remember Me:", checked);
    // }
    const handleInvalid = (e) => {
        e.preventDefault();
        e.target.classList.add("was-validated");
    }

  



  return (
    <>
      <section className="sign-in-page">
  <div className="container-fluid p-0">
    <div className="row g-0">
      {/* Left side: Form */}
      <div className="col-sm-6 d-flex align-items-center justify-content-center">
        <div className="sign-in-form p-5 animate__animated animate__fadeIn">
          <div className="text-center mb-4">
            <div className="icon-circle bg-primary mb-3 mx-auto">
              <i className="bi bi-person-fill text-white fs-4"></i>
            </div>
            <h1 className="mb-0">Welcome Back</h1>
            <p className="text-white">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            {/* Email */}
            <div className="form-group mb-4 position-relative">
              <label htmlFor="email" className="form-label">Email address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                 <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control border-start-0 ps-3 py-3"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="invalid-feedback">Please provide a valid email.</div>
            </div>

            {/* Password */}
            <div className="form-group mb-4 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <FontAwesomeIcon icon={faLock} className="text-muted" />
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control border-start-0 ps-3 py-3"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInvalid={handleInvalid}
                  onInput={handleInvalid}
                  required
                />
              </div>
              <div className="invalid-feedback">Please provide a password.</div>
            </div>

            {/* Remember Me */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-3 mb-3 shadow-sm animate__animated animate__pulse animate__infinite animate__slower"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Background */}
      <div
        className="col-sm-6 position-relative text-center text-white sign-in-detail enhanced-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.65), rgba(34, 34, 34, 0.65)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.5s ease",
        }}
      >
        <div className="overlay"></div>
        <div className="z-2 glass-card animate__animated animate__fadeInUp">
          <h1 className="glass-heading">Admin</h1>
          <p className="glass-subheading">
            Your small help can make a big difference. Join us in making the world a better place.
          </p>
         
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
}

export default Login;
