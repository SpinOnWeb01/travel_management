"use client";
import Link from "next/link";

export default function ForgetForm() {
  return (
    <>
      <div className="login-container d-flex align-items-center justify-content-center">
        <div className="login-box registerbox row overflow-hidden shadow-lg">
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
            <div className="loginform ">
              <h3 className="fw-bold ">Forgot Password</h3>

              <div className="forgetform registerloginfrom">
                <form>
                  <label className="form-label">Forget Password</label>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>

                  <p className="text-muted fs-small pb-2">
                    Please enter your email in the box above. We will send you a
                    link to access further instructions.
                  </p>

                  <button
                    type="submit"
                    className="btn w-100 btn-gradient border-0"
                  >
                    Reset password
                  </button>
                </form>
              </div>

              <div className="createaccountform d-flex justify-center py-3">
                <Link href="/register">Back to sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
