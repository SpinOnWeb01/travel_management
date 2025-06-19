"use client";

import Image from "next/image";
import Link from "next/link";

import ExploreOther from "./ExploreOther";
import TourDetailForm from "./TourDetailForm";

export default function TourPostInfo () { 

    return (
      <>
        <div className="tour-details-area">
          <div className="container">
            <div className="row align-items-end mb-5">
              <div className="col-xl-9 col-lg-8">
                <h1>Vatican Museums Sistine Chapel Skip the Line</h1>

                <div className="tour-details-location-rating d-flex flex-wrap align-items-center gap-3">
                  <span className="location-text me-4">
                    <i className="bi bi-geo-alt-fill me-1"></i> Street Bintage,
                    Veins City, Italy
                  </span>
                  <div className="tour-details-ratings d-flex align-items-center">
                    <span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                    <span className="review-text ms-2">(5 Reviews)</span>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-4">
                <div className="tour-details-share text-end d-flex justify-content-end align-items-center">
                  <a
                    href="#"
                    className="share-link d-flex align-items-center pe-3"
                  >
                    <i className="bi bi-share-fill me-2"></i>
                    Share
                  </a>
                  <a
                    href="#"
                    className="wishlist-link d-flex align-items-center ps-3"
                  >
                    <i className="bi bi-heart-fill me-2"></i>
                    Add to Wishlist
                  </a>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-7">
                <Image
                  src="/images/tour-detailpost.png"
                  alt="icon"
                  width={715}
                  height={500}
                />
              </div>

              <div className="col-lg-5">
                <div className="row gx-3">
                  {/* Main Video Thumbnail */}
                  <div className="col-12 mb-3 position-relative video-main-thumb">
                    <Image
                      src="/images/tourdetailpost2.png"
                      alt="Main Tour Video"
                      className=" w-100 rounded"
                      width={506}
                      height={247}
                    />
                    <div className="video-play-overlay d-flex justify-content-center align-items-center">
                      <a
                        className="video-play-button"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="30"
                          height="30"
                          fill="currentColor"
                          viewBox="0 0 19 21"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.3616 8.34455C19.0412 9.31425 19.0412 11.7385 17.3616 12.7082L4.13504 20.3445C2.45548 21.3142 0.356021 20.1021 0.356021 18.1627V2.89C0.356022 0.950609 2.45548 -0.261512 4.13504 0.708185L17.3616 8.34455Z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Thumbnail 2 */}
                  <div className="col-md-6 mb-3">
                    <div className="video-thumb">
                      <Image
                        src="/images/tourdetailpost3.png"
                        alt="Video Thumbnail 2"
                        className=" w-100 rounded"
                        width={243}
                        height={237}
                      />
                    </div>
                  </div>

                  {/* Thumbnail 3 */}
                  <div className="col-md-6 mb-3">
                    <div className="video-thumb">
                      <Image
                        src="/images/tourdetailpsot4.png"
                        alt="Video Thumbnail 3"
                        className=" w-100 rounded"
                        width={243}
                        height={237}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tg-tour-details-feature-list-wrap">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="tg-tour-details-video-feature-list">
                    <ul>
                      <li>
                        <span className="icon">
                          <Image
                            src="/images/clock.png"
                            width={20}
                            height={20}
                            alt="clock"
                          />
                        </span>
                        <div>
                          <span className="title">Duration</span>
                          <span className="duration">4 days</span>
                        </div>
                      </li>

                      <li>
                        <span className="icon">
                          <Image
                            src="/images/adventure.png"
                            width={20}
                            height={20}
                            alt="adventure"
                          />
                        </span>
                        <div>
                          <span className="title">Type</span>
                          <span className="duration">Adventure</span>
                        </div>
                      </li>

                      <li>
                        <span className="icon">
                          <Image
                            src="/images/adventure.png"
                            width={20}
                            height={20}
                            alt="adventure"
                          />
                        </span>
                        <div>
                          <span className="title">Group Size</span>
                          <span className="duration">50 People</span>
                        </div>
                      </li>

                      <li>
                        <span className="icon">
                          <Image
                            src="/images/globe.png"
                            width={20}
                            height={20}
                            alt="globe"
                          />
                        </span>
                        <div>
                          <span className="title">Languages</span>
                          <span className="duration">English</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="tg-tour-details-video-feature-price ">
                    <p>
                      From <span>$59.00</span> / Person
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tg-tour-details-area">
              <div className="row">
                <div className="col-md-8">
                  <div className="tour-content">
                    <div className="tour-detailbtn">
                      <ul>
                        <li>
                          <Link className="active" href="#">
                            Overview{" "}
                          </Link>
                        </li>
                        <li>
                          <Link href="#">Tour Plan </Link>
                        </li>
                        <li>
                          <Link href="#">Location </Link>
                        </li>
                        <li>
                          <Link href="#">Reviews </Link>
                        </li>
                      </ul>
                    </div>
                    <h1>About This Tour</h1>
                    <p>
                      isiting Stonehenge, Bath, and Windsor Castle in one day is
                      next to impossible. Designed specifically for lers with
                      limited time in London, this tour allows you to check off
                      a range of southern England‘s are l attractions in just
                      one day by eliminating the hassle of traveling between
                      each one independently. Travel by comfortable coach and
                      witness your guide bring each.
                    </p>
                    <h2>Trip Highlights</h2>
                    <ul>
                      <li>Tour the city with a licensed NYC tour guide, who</li>
                      <li>Tour the city with a licensed NYC tour guide, who</li>
                      <li>history buffs and travelers with limited time</li>
                    </ul>
                    <h3>
                      How do you plan for the perfect trip to any destination?
                    </h3>
                    <p>
                      Travelling is exhilarating - and a little bit intimidating
                      too. You are venturing into the unknown and you really
                      have very little ideas about what things will be like
                      there when you arrive. It's always a massive learning
                      curve when you leap into the new (which is why it's
                      important to thoroughly research a travel destination
                      before you go.) Some of the important things to keep in
                      mind while deciding on a destination to travel are :
                    </p>
                    <ol>
                      <li>
                        Figure out how to travel to a destination, where to stay
                        and what are the things to do amongst other things. Trip
                        Ideas by MakeMyTrip brings you a plethora of knowledge
                        about a destination ranging from images and videos to
                        lists of all the activities
                      </li>

                      <li>
                        Read posts by travel bloggers who have been there and if
                        needed email them
                      </li>
                      <li>
                        Watch documentaries and reach out to people who have
                        been there
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="col-md-4">
                  <TourDetailForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ExploreOther />
        
      </>
    );
}