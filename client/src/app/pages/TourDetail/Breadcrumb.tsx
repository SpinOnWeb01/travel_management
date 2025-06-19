"use client";

import Link from "next/link";

export default function Breadcrumb () { 
    return(
      <>
        <div className="breadcrumb-wrap ">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="breadcrumb-list d-flex align-items-center gap-2 flex-wrap mb-0">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                  </li>
                  <li>
                    <Link href="/">Tour Grid</Link>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>
                  </li>
                  <li className="active">
                    <span>Vatican Museums Sistine Chapel Skip the Line</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}