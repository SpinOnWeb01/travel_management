'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import '../style.css';

import { } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faPlaneArrival, faPlaneDeparture, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const HeroSec = () => {
  const [tripType, setTripType] = useState('One Way');
  const [activeTab, setActiveTab] = useState('Flights');
  const tabs = [
     { label: 'Flights', image: '/images/flight.png' },
  { label: 'Hotels', image: '/images/hotel.png' },
  { label: 'Homestays & Villas', image: '/images/homestays.png' },
  { label: 'Holidays Packages', image: '/images/holiday.png' },
  { label: 'Trains', image: '/images/train.png' },
  { label: 'Buses', image: '/images/buses.png' },
  { label: 'Cabs', image: '/images/cab.png' },
  { label: 'Visa', image: '/images/visa.png' },
  { label: 'Travel Insurance', image: '/images/icon-travel.png' }
  ]; 
  const tripTypes = ['One Way', 'Round Trip', 'Multicity'];



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
    // Submit logic here (API, validation etc.)
  };


  return (
    <div className="text-white py-5 hero-sec">
      <div className="container">
        {/* Hero Heading */}
        <div className="row">
          <div className="text-center mb-4">
            <h1
              className="hero-title"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
            >
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
                className={`btn-link text-dark text-decoration-none ${
                  activeTab === tab.label ? " activenav " : ""
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                <Image src={tab.image} alt={tab.label} width={50} height={50} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trip Type Selector */}

        {/* Search Form */}
        <div className="text-dark shadow-lg booking-form">
          <div className=" rounded-bottom mb-5 d-flex justify-content-center">
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

          <form
            className="booking-form2 text-white rounded"
            onSubmit={handleSubmit}
          >
            <div className="row g-3 align-items-end">
              {/* FROM */}

              <div className="col-md">
                <div className="form-list ">
                  <label className="form-label">From</label>
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    className="float-end"
                  />
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
                <div className="form-list ">
                  <label className="form-label">To</label>
                  <FontAwesomeIcon
                    icon={faPlaneArrival}
                    className="float-end"
                  />
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

              {/* DEPARTURE DATE */}
              <div className="col-md">
                <div className="form-list ">
                  <label className="form-label">Departure Date</label>
                  <FontAwesomeIcon icon={faCalendar} className="float-end" />
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

              {/* RETURN DATE */}
              <div className="col-md">
                <div className="form-list ">
                  <label className="form-label">Return Date</label>
                  <FontAwesomeIcon icon={faCalendar} className="float-end" />
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
                <div className="form-list ">
                  <label className="form-label">Traveller & Class</label>
                  <FontAwesomeIcon icon={faUserAlt} className="float-end" />

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

              {/* SEARCH BUTTON */}
              <div className="col-md-auto">
                <button
                  type="submit"
                  className="btn search-btn px-4 py-2 mt-md-4"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>

          {/* <form onSubmit={handleSearch}>
           
            <div className="row mb-3">
              <div className="col-md-5 position-relative">
                <label className="position-absolute top-0 start-10 translate-middle-y bg-white px-2 small text-muted">
                  From
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-1 d-flex align-items-center justify-content-center">
                <button 
                  type="button" 
                  className="btn btn-warning rounded-circle p-2"
                  style={{ width: '40px', height: '40px' }}
                >
                  <i className="bi bi-arrow-left-right text-white"></i>
                </button>
              </div>
              <div className="col-md-5 position-relative">
                <label className="position-absolute top-0 start-10 translate-middle-y bg-white px-2 small text-muted">
                  To
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            
            <div className="row mb-3">
              <div className="col-md-5 position-relative">
                <label className="position-absolute top-0 start-10 translate-middle-y bg-white px-2 small text-muted">
                  Departure Date
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                {tripType !== 'One Way' && (
                  <div className="position-relative">
                    <label className="position-absolute top-0 start-10 translate-middle-y bg-white px-2 small text-muted">
                      Return Date
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </div>

           
            <div className="row mb-4">
              <div className="col-md-11 position-relative">
                <label className="position-absolute top-0 start-10 translate-middle-y bg-white px-2 small text-muted">
                  Traveler & Class
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            
            <div className="d-flex align-items-center bg-light p-3 rounded mb-4">
              <span className="fw-bold me-3">Special Fares:</span>
              {fareTypes.map(fare => (
                <div className="form-check form-check-inline" key={fare}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="fareType"
                    id={fare}
                    value={fare}
                    checked={formData.fareType === fare}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor={fare}>
                    {fare}
                  </label>
                </div>
              ))}
            </div>
         
            <div className="text-center">
              <button 
                type="submit" 
                className="btn btn-warning btn-lg px-5 py-3 fw-bold"
                style={{ minWidth: '200px' }}
              >
                SEARCH
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSec;