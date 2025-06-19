"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box row overflow-hidden shadow-lg">
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
            <h4 className="title-heading">Login or Create an account</h4>

            <div className=" input-wrapper">
              <input
                type="text"
                className="form-control input-custom"
                placeholder="Email ID or Mobile Number"
              />
            </div>

            <button className="btn w-100 btn-gradient">Continue</button>

            {/* <div className="text-center logintext">Or Login/Signup With</div> */}
            <div className="login-divider">
              <span className="divider-line" />
              <span className="divider-text logintext">
                Or Login/Signup With
              </span>
              <span className="divider-line" />
            </div>

            <div className="login-img d-flex justify-content-center gap-3">
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
  );
}
