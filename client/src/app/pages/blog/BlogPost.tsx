
'use client';

import Image from "next/image";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function BlogPost () {  
    return (
      <>
      <div className="main_background_blog">
        <Header />
        <div className="container-fluid blog-post">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="sidebar">
                  <div className="sidebar-item">
                    <h5 className="heading">Destination</h5>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Australia</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Italy</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">New York</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Switzerland</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Germany</label>
                    </div>
                    <p className="seemorebtn  mb-0">
                      <Image
                        src="/images/icon/plus-sign.png"
                        width={10}
                        height={10}
                        alt="plus"
                      />{" "}
                      See More
                    </p>

                    <div className="sidebar-borderbtm"></div>
                  </div>

                  <div className="sidebar-item">
                    <h5 className="heading">Price By Filter</h5>
                    <div className="d-flex gap-2">
                      <input
                        className="form-control price"
                        placeholder="Min Price"
                      />
                      <span className="price-separator"></span>
                      <input
                        className="form-control price"
                        placeholder="Max Price"
                      />
                    </div>
                    <div className="sidebar-borderbtm"></div>
                  </div>

                  <div className="sidebar-item">
                    <h5 className="heading">Duration</h5>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Up To 1 Hour</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">1 To 4 Hour</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        4 Hour To 1 Day
                      </label>
                    </div>
                    <div className="sidebar-borderbtm"></div>
                  </div>

                  <div className="sidebar-item">
                    <h5 className="heading">Duration</h5>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        Accepts Credit Cards
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Car Parking</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Free Coupons</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Reservations</label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Restaurant</label>
                    </div>
                    <div className="sidebar-borderbtm"></div>
                  </div>

                  <div className="sidebar-item">
                    <h5 className="heading">Top Reviews</h5>
                    {[5, 4, 3, 2, 1].map((star, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                        />
                        <div className="star-group">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${
                                i < star
                                  ? "bi-star-fill text-warning"
                                  : "bi-star text-muted"
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="sidebar-borderbtm"></div>
                  </div>

                  <div className="sidebar-item">
                    <h5 className="heading">Language</h5>
                    {[
                      "English",
                      "Spanish",
                      "Bangla",
                      "Turkish",
                      "Restaurant",
                    ].map((lang, idx) => (
                      <div key={idx} className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                        />
                        <label className="form-check-label">{lang}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-9 blog-box">
                <div className="title-heading">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="heading">3,269 Properties In Europe</h2>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rightside-tag d-flex align-items-center me-1">
                        Sort by:
                        <Image
                          src="/images/swappicon.png"
                          width={16}
                          height={16}
                          alt="icon"
                        />
                      </span>

                      <select
                        className="form-select form-select-sm priceform"
                        style={{
                          width: "199px",
                          backgroundImage:
                            "url('/images/icon/down-arrowblack.png')",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "8px",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <option>Price Low</option>
                        <option>Price High</option>
                      </select>
                      

                      <button className="btn btn-outline-secondary active">
                        <i className="bi bi-grid-fill"></i>
                      </button>
                      <button className="btn btn-outline-secondary">
                        <Image
                          src="/images/bloglist.png"
                          width={20}
                          height={20}
                          alt="icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 pt-2">
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <div key={i} className="col-md-6 blog-box">
                      <div className="card blog-item overflow-hidden">
                        <img
                          src="/images/blog-post.jpg"
                          className="card-img-top"
                          alt="Dubai"
                          style={{ height: "270px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h3 className="heading">
                            When You Visit The Eternal Dubai City
                          </h3>
                          <p className="mb-1">
                            <Image
                              src="/images/blogmap.png"
                              width={14}
                              height={14}
                              alt="icon"
                              className="me-1 img-responsive"
                            />{" "}
                            Dubai, Emirates
                          </p>
                          <p>
                            <Image
                              src="/images/blogclock.png"
                              width={14}
                              height={14}
                              alt="icon"
                              className="me-1 img-responsive"
                            />{" "}
                            5 Days
                          </p>
                          <div className="d-flex justify-content-between align-items-end mt-0">
                            <div className="button-blog">
                              <p>
                                <span className="text-decoration-line-through">$299</span>
                                
                                <span className="price">/$149</span>
                              </p>

                              <span className="person ">Per Person</span>
                            </div>
                            <p className="review">
                              <i className="bi bi-star-fill text-warning"></i>{" "}
                              (5 Reviews)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Pagination />
          </div>
        </div>
        <Footer />
        </div>
      </>
    );
}