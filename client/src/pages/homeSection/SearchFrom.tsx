"use client";

import Image from "next/image";
import { useState } from "react";

export default function Searchform({
}) {
  const [fareType, setFareType] = useState("Regular");
  const [tripType, setTripType] = useState("One Way");
  const tripTypes = ["One Way", "Round Trip", "Multi City"];

  const renderFlightsForm = () => (
    <div className="text-dark shadow-lg booking-form">
      <div className="rounded-bottom d-flex justify-content-center">
        {tripTypes.map((type) => (
          <label
            key={type}
            className={`btn btn-sm mx-1 d-flex align-items-center ${
              tripType === type ? "activetrip" : "btn-outline-light border-0"
            }`}
            style={{
              borderRadius: "20px",
              cursor: "pointer",
              gap: "6px",
            }}
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
        <div className="row align-items-center g-0">
          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">From</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/departure.png"
                  width={20}
                  height={20}
                  alt="map"
                  priority 
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

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">To</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/landing.png"
                  width={20}
                  height={20}
                  alt="map"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">Langkawi</p>
            <p className="mb-1 small from-text-place">LGK, Langkawi Malaysia</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Departure Date</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/calendar1.png"
                  width={12}
                  height={12}
                  alt="map"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">
              25 <span>May 2025</span>
            </p>
            <p className="mb-1 small from-text-place">Sunday</p>
            <div className="underline bg-warning mt-1" />
          </div>

          {tripType !== "One Way" && (
            <div className="text-white from-bookfield">
              <div className="from-start d-flex justify-content-between align-items-center">
                <p className="mb-1 from-text">Return Date</p>
                <p className="mb-1 fw-semibold">
                  <Image
                    src="/images/icon/calendar1.png"
                    width={12}
                    height={12}
                    alt="map"
                    priority 
                  />
                </p>
              </div>
              <input
                type="text"
                className="form-control bg-transparent border-0 p-0"
                placeholder=""
              />
              <p className="form-input">
                02 <span>June 2025</span>
              </p>
              <p className="mb-1 small from-text-place">Monday</p>
              <div className="underline bg-warning mt-1" />
            </div>
          )}

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Traveller & Class</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/users.png"
                  width={16}
                  height={16}
                  alt="map"
                  priority 
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
            <p className="mb-1 small from-text-place">Economy</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-center mt-3 mt-md-0 from-bookfield">
            <button className="btn-search text-white">SEARCH</button>
          </div>
        </div>

        <div className="special-fares-container d-flex align-items-center justify-content-between">
          <span className="label-text">Special Fares :-</span>
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
  );

  const renderHotelsForm = () => (
    <div className="text-dark shadow-lg booking-form">
      <div className="booking-banner homepage">
        <div className="row align-items-center g-0">
          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Destination</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/location.png"
                  width={20}
                  height={20}
                  alt="location"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">New York</p>
            <p className="mb-1 small from-text-place">New York, USA</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Check-in</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/calendar1.png"
                  width={12}
                  height={12}
                  alt="calendar"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">
              25 <span>May 2025</span>
            </p>
            <p className="mb-1 small from-text-place">Sunday</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Check-out</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/calendar1.png"
                  width={12}
                  height={12}
                  alt="calendar"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">
              02 <span>June 2025</span>
            </p>
            <p className="mb-1 small from-text-place">Monday</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Rooms & Guests</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/users.png"
                  width={16}
                  height={16}
                  alt="users"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">
              1 <span>Room, 2 Guests</span>
            </p>
            <p className="mb-1 small from-text-place">Standard Room</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-center mt-3 mt-md-0 from-bookfield">
            <button className="btn-search text-white">SEARCH</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultForm = () => (
    <div className="text-dark shadow-lg booking-form">
      <div className="booking-banner homepage">
        <div className="row align-items-center g-0">
          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">From</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/departure.png"
                  width={20}
                  height={20}
                  alt="departure"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">Delhi</p>
            <p className="mb-1 small from-text-place">DEL, India</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">To</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/landing.png"
                  width={20}
                  height={20}
                  alt="landing"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">Mumbai</p>
            <p className="mb-1 small from-text-place">BOM, India</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-white from-bookfield">
            <div className="from-start d-flex justify-content-between align-items-center">
              <p className="mb-1 from-text">Date</p>
              <p className="mb-1 fw-semibold">
                <Image
                  src="/images/icon/calendar1.png"
                  width={12}
                  height={12}
                  alt="calendar"
                  priority 
                />
              </p>
            </div>
            <input
              type="text"
              className="form-control bg-transparent border-0 p-0"
              placeholder=""
            />
            <p className="form-input">
              25 <span>May 2025</span>
            </p>
            <p className="mb-1 small from-text-place">Sunday</p>
            <div className="underline bg-warning mt-1" />
          </div>

          <div className="text-center mt-3 mt-md-0 from-bookfield">
            <button className="btn-search text-white">SEARCH</button>
          </div>
        </div>
      </div>
    </div>
  );

  // switch (activeTabMenu) {
  //   case "Flights":
  //     return renderFlightsForm();
  //   case "Hotels":
  //     return renderHotelsForm();
  //   default:
  //     return renderDefaultForm();
  // }
}
