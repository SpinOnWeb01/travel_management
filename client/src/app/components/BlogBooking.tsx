
"use client";
import Image from "next/image";


export default function Blog_booking () { 
    return (
      <>
        <section className="booking-banner d-flex align-items-center justify-content-center position-relative">
          <div className="booking-container container bg-white  ">
            <div className="row align-items-center g-0">
              <div className=" text-white from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text ">Where are you going . . .</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/maps.png"
                      width={12}
                      height={12}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">Destinations</p>

                <p className="mb-1 small from-text-place">India</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Check In:</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/calendar-c.png"
                      width={12}
                      height={12}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">
                  14 <span> Jun'25</span>
                </p>

                <p className="mb-1 small from-text-place">Tuesday</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Check Out:</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/calendar-c.png"
                      width={12}
                      height={12}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">
                  17 <span> Jun'25</span>
                </p>

                <p className="mb-1 small from-text-place">Sunday</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Rooms & Guests</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/guest.png"
                      width={16}
                      height={16}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">
                  1 <span>Rooms &</span> 2<span> Guests</span>
                </p>

                <p className="mb-1 small from-text-place opacity-0">Saturday</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-center mt-3 mt-md-0 from-bookfield">
                <button className="btn-search text-white ">SEARCH</button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}