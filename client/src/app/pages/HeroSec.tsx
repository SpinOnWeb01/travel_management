'use client'

import { useState } from 'react';



import Image from 'next/image';
const HeroSec = () => {
  const [fareType, setFareType] = useState("Regular");
  const [activeTab, setActiveTab] = useState("Flights");
   const [tripType, setTripType] = useState('One Way');
   
  const tabs = [
    { label: "Flights", image: "/images/icon/Flight.png" },
    { label: "Hotels", image: "/images/icon/hotel.png" },
    { label: "Homestays & Villas", image: "/images/icon/homestays.png" },
    { label: "Holidays Packages", image: "/images/icon/holiday.png" },
    { label: "Trains", image: "/images/icon/train.png" },
    { label: "Buses", image: "/images/icon/buses.png" },
    { label: "Cabs", image: "/images/icon/cab.png" },
    { label: "Visa", image: "/images/icon/visa.png" },
    { label: "Travel Insurance", image: "/images/icon/travel.png" },
  ]; 
  const tripTypes = ['One Way', 'Round Trip', 'Multicity'];



  return (
    <div className="text-white hero-sec position-relative">
      <div className="container">
        {/* Hero Heading */}
        <div className="row">
          <div className="text-center">
            <h1 className="hero-title">
              Let your dreams take <span>Flight.</span>
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rounded-top  heroplansearch">
          <div className="d-flex overflow-auto tabLink">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`btn-link text-dark text-decoration-none ${
                  activeTab === tab.label ? " activenav " : ""
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                <div className="heroicon">
                  <Image
                    src={tab.image}
                    alt={tab.label}
                    width={50}
                    height={50}
                  />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trip Type Selector */}

        {/* Search Form */}
        <div className="text-dark shadow-lg booking-form">
          <div className=" rounded-bottom d-flex justify-content-center">
            {tripTypes.map((type) => (
              <label
                key={type}
                className={`btn btn-sm mx-1 d-flex align-items-center ${
                  tripType === type
                    ? "activetrip"
                    : "btn-outline-light border-0"
                }`}
                style={{ borderRadius: "20px", cursor: "pointer", gap: "6px" }}
              >
                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                />
                <span> {type}</span>
              </label>
            ))}
          </div>

         
          <div className="booking-banner homepage">
            <div className="row align-items-center g-0 ">
              <div className=" text-white from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text ">From</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/icon/departure.png"
                      width={20}
                      height={20}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">Delhi</p>

                <p className="mb-1 small from-text-place">
                  DEL, Delhi Airport India
                </p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> To</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/icon/landing.png"
                      width={20}
                      height={20}
                      alt="map"
                    />
                  </p>
                </div>

                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0"
                  placeholder=""
                />

                <p className="form-input">Langkawi</p>

                <p className="mb-1 small from-text-place">
                  LGK, Langkawi Malaysia
                </p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Departure Date</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/icon/calendar1.png"
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
                  25 <span> May 2025</span>
                </p>

                <p className="mb-1 small from-text-place">Sunday</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Return Date</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/icon/calendar1.png"
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
                  02 <span> June 2025</span>
                </p>

                <p className="mb-1 small from-text-place">Monday</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-white  from-bookfield">
                <div className="from-start d-flex justify-content-between align-items-center">
                  <p className="mb-1 from-text "> Traveller & Class</p>
                  <p className="mb-1 fw-semibold">
                    <Image
                      src="/images/icon/users.png"
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
                  1 <span>Traveller</span>
                </p>

                <p className="mb-1 small from-text-place ">Economy</p>
                <div className="underline bg-warning mt-1" />
              </div>

              <div className=" text-center mt-3 mt-md-0 from-bookfield">
                <button className="btn-search text-white ">SEARCH</button>
              </div>
            </div>

            <div className="special-fares-container d-flex align-items-center justify-content-between">
              <span className="label-text ">
                Special Fares :-
              </span>

              <div className="d-flex fareoption">
                {["Regular", "Students", "Senior Citizens"].map((type) => (
                  <label
                    key={type}
                    className="fare-option d-flex align-items-center"
                  >
                    <input
                      type="radio"
                      name="fare"
                      value={type}
                      checked={fareType === type}
                      onChange={() => setFareType(type)}
                    />
                    <span className="text-dark">{type}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;