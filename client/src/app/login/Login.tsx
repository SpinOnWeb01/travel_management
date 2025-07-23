'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useAuthStore from '../../store/authStore'; // OR '@/store/authStore' if alias works




declare global {
  interface Window {
    bootstrap?: any;
  }
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const login = useAuthStore((state) => state.login); // ✅ Zustand login function

  useEffect(() => {
    const token = searchParams?.get("token");
    const username = searchParams?.get("username");

    if (token && username) {
      Cookies.set("token", token, { expires: 7, path: '/' });
      Cookies.set("username", username, { expires: 7, path: '/' });

      // ✅ Zustand state set karo
      login({ id: "1", name: username, email: "" }, token);

      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  }, [searchParams, login]);

  const handleGoogleLogin = () => {
    setLoading(true);
    setAuthError(null);
    const backendUrl = "http://localhost:5000";
    try {
      window.location.href = `${backendUrl}/api/v1/beckend-auth/google`;
    } catch (error) {
      console.error("Redirect failed:", error);
      setAuthError("Login redirect failed. Please try again.");
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!mobile || !password) {
      setAuthError("Please enter both mobile number and password.");
      return;
    }

    setLoading(true);
    setAuthError(null);

    try {
      const response = await fetch("http://localhost:5000/api/v1/beckend-auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: mobile,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 7, path: "/" });
        Cookies.set("username", data.username || mobile, { expires: 7, path: "/" });

        // ✅ Zustand login state set
        login(
          {
            id: data.id || "1",
            name: data.username || mobile,
            email: data.email || "",
          },
          data.token
        );

        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        setAuthError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    const modalElement = document.getElementById("exampleModalToggle");
    if (modalElement && typeof window !== "undefined" && window.bootstrap) {
      const modalInstance =
        window.bootstrap.Modal.getInstance(modalElement) ||
        new window.bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box row overflow-hidden shadow-lg">
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

        <div className="col-md-7 loginrightf">
          <div className="loginform">
            <h4 className="title-heading">Login or Create an account</h4>

            {authError && (
              <div className="alert alert-danger">{authError}</div>
            )}

            <div className="input-wrapper mb-3">
              <input
                type="text"
                className="form-control input-custom"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="input-wrapper mb-3">
              <input
                type="password"
                className="form-control input-custom"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn w-100 btn-gradient"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Continue"}
            </button>

            <div className="login-divider">
              <span className="divider-line" />
              <span className="divider-text logintext">
                Or Login/Signup With
              </span>
              <span className="divider-line" />
            </div>

            <div className="login-img d-flex justify-content-center gap-3">
              <button onClick={handleGoogleLogin} disabled={loading}>
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <Image
                      src="/images/icon/google.png"
                      alt="Google"
                      width={39}
                      height={39}
                    />
                    <p>Google</p>
                  </>
                )}
              </button>

              <button>
                <Image
                  src="/images/icon/facebook.png"
                  alt="Facebook"
                  width={39}
                  height={39}
                />
                <p>Facebook</p>
              </button>
            </div>

            <div className="login-divider">
              <span className="divider-line" />
              <span className="divider-text logintext">
                Other way to sign in
              </span>
              <span className="divider-line" />
            </div>

            <Link href="/register">
              <button
                className="call-login-btn mx-auto mb-4"
                style={{ display: "flex", justifyContent: "center" }}
                onClick={handleNavigate}
              >
                <span className="icon-box">
                  <i className="bi bi-telephone-fill"></i>
                </span>
              </button>
            </Link>

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
  );
}
