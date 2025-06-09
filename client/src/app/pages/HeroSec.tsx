'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faPlaneArrival, faPlaneDeparture, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import CSS manually

import Image from 'next/image';
import { useState, useMemo } from 'react';
import '../style.css';

// Prevent FontAwesome from adding CSS automatically to avoid duplicate styles
config.autoAddCss = false;

// Register icons once
library.add(faCalendar, faPlaneArrival, faPlaneDeparture, faUserAlt);

const HeroSec = () => {
  const [tripType, setTripType] = useState('One Way');
  const [activeTab, setActiveTab] = useState('Flights');

  const tabs = useMemo(() => [
    { label: 'Flights', image: '/images/flight.png' },
    { label: 'Hotels', image: '/images/hotel.png' },
    { label: 'Homestays & Villas', image: '/images/homestays.png' },
    { label: 'Holidays Packages', image: '/images/holiday.png' },
    { label: 'Trains', image: '/images/train.png' },
    { label: 'Buses', image: '/images/buses.png' },
    { label: 'Cabs', image: '/images/cab.png' },
    { label: 'Visa', image: '/images/visa.png' },
    { label: 'Travel Insurance', image: '/images/icon-travel.png' }
  ], []);

  const tripTypes = useMemo(() => ['One Way', 'Round Trip', 'Multicity'], []);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    traveller: 1,
    travelClass: 'Economy',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'traveller' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="text-white py-5 hero-sec">
      <div className="container">
        <div className="row">
          <div className="text-center mb-4">
            <h1 className="hero-title" style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}>
              Let your dreams take <span>Flight.</span>
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rounded-top p-2 heroplansearch">
          <div className="d-flex overflow-auto tabLink">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`btn-link text-dark text-decoration-none ${activeTab === tab.label ? " activenav " : ""}`}
                onClick={() => setActiveTab(tab.label)}
              >
                <Image src={tab.image} alt={tab.label} width={50} height={50} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trip Type Selector */}
        <div className="text-dark shadow-lg booking-form">
          <div className="rounded-bottom mb-5 d-flex justify-content-center">
            {tripTypes.map((type) => (
              <label
                key={type}
                className={`btn btn-sm mx-1 d-flex align-items-center ${tripType === type ? "activetrip" : "btn-outline-light border-0"}`}
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

          {/* Search Form */}
          <form className="booking-form2 text-white rounded" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              {/* FROM */}
              <div className="col-md">
                <div className="form-list">
                  <label className="form-label">From</label>
                  <FontAwesomeIcon icon="plane-departure" className="float-end" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Delhi"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                  />
                  <label className="form-label">DEL, Delhi Airport India</label>
                </div>
              </div>

              {/* TO */}
              <div className="col-md">
                <div className="form-list">
                  <label className="form-label">To</label>
                  <FontAwesomeIcon icon="plane-arrival" className="float-end" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Langkawi"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                  />
                  <label className="form-label">LGK, Langkawi Malaysia</label>
                </div>
              </div>

              {/* DEPARTURE */}
              <div className="col-md">
                <div className="form-list">
                  <label className="form-label">Departure Date</label>
                  <FontAwesomeIcon icon="calendar" className="float-end" />
                  <input
                    type="date"
                    className="form-control"
                    name="departure"
                    value={formData.departure}
                    onChange={handleChange}
                  />
                  <label className="form-label">Sunday</label>
                </div>
              </div>

              {/* RETURN */}
              <div className="col-md">
                <div className="form-list">
                  <label className="form-label">Return Date</label>
                  <FontAwesomeIcon icon="calendar" className="float-end" />
                  <input
                    type="date"
                    className="form-control"
                    name="return"
                    value={formData.return}
                    onChange={handleChange}
                  />
                  <label className="form-label">Monday</label>
                </div>
              </div>

              {/* TRAVELLERS */}
              <div className="col-md">
                <div className="form-list">
                  <label className="form-label">Traveller & Class</label>
                  <FontAwesomeIcon icon="user-alt" className="float-end" />
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      min="1"
                      className="form-control"
                      placeholder="Traveller"
                      name="traveller"
                      value={formData.traveller}
                      onChange={handleChange}
                    />
                    <span className="fs-4">Traveller</span>
                  </div>
                  <label className="form-label">Economy</label>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="col-md-auto">
                <button type="submit" className="btn search-btn px-4 py-2 mt-md-4">
                  SEARCH
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
