"use client";

import Image from 'next/image';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TourDetailForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [tickets, setTickets] = useState({
    adult: 0,
    youth: 0,
    children: 0,
  });

  const [services, setServices] = useState({
    servicePerBooking: false,
    servicePerPerson: false,
  });

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setServices((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleTicketChange = (type: string, value: string) => {
    setTickets((prev) => ({
      ...prev,
      [type]: parseInt(value),
    }));
  };

  return (
    <div className="sidebar position-sticky mt-3">
      <div className="tour-Detail-booking-form">
        <form>
          <h4 className="form-title">Book This Tour</h4>

          {/* Date Picker */}
          <div className="date-picker-wrapper">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control1"
              placeholderText="Date"
              minDate={new Date()}
            />
            <div className="calendar position-relative">
              <span className="calendar-icon">
                <Image
                  src="/images/icon/tour-calendar.png"
                  width={16}
                  height={16}
                  alt="calendar"
                  className="img-fluid"
                />
              </span>
            </div>
          </div>

          {/* Time Selection */}
          <div className="time-selection mb-4 pb-1">
            <span className="time-label me-3">Time</span>
            {["10:00", "12:00", "17:00"].map((time) => (
              <div className="form-check form-check-inline" key={time}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="time"
                  id={`time-${time}`}
                  checked={selectedTime === time}
                  onChange={() => setSelectedTime(time)}
                />
                <label className="form-check-label" htmlFor={`time-${time}`}>
                  {time}
                </label>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Tickets */}
          <div className="mb-3">
            <h6 className="section-title">Tickets:</h6>
            {[
              { type: "adult", label: "Adult (14+ years)" },
              { type: "youth", label: "Youth (13-17 years)" },
              { type: "children", label: "Children (0-12 years)" },
            ].map(({ type, label }) => (
              <div className="ticket-row mb-2" key={type}>
                <div className="ticket-info">
                  <p>{label}</p>
                </div>
                <select
                  className="form-select form-select-sm"
                  value={tickets[type as keyof typeof tickets]}
                  onChange={(e) => handleTicketChange(type, e.target.value)}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={`${type}-${num}`} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Extra Services */}
          <div className="mb-3">
            <h6 className="section-title">Extra services</h6>
            <ul className="list-unstyled mb-0">
              <li className="d-flex justify-content-between align-items-center mb-3 pb-1">
                <div className="checkbox d-flex align-items-center">
                  <input
                    className="form-check-input1 me-2"
                    type="checkbox"
                    id="servicePerBooking"
                    checked={services.servicePerBooking}
                    onChange={handleServiceChange}
                  />
                  <label htmlFor="servicePerBooking" className="form-check-label">
                    Service per booking
                  </label>
                </div>
                <span className="quantity">$30.00</span>
              </li>

              <li className="d-flex justify-content-between align-items-center mb-3 pb-1">
                <div className="checkbox d-flex align-items-center">
                  <input
                    className="form-check-input1 me-2"
                    type="checkbox"
                    id="servicePerPerson"
                    checked={services.servicePerPerson}
                    onChange={handleServiceChange}
                  />
                  <label htmlFor="servicePerPerson" className="form-check-label">
                    Service per person
                  </label>
                </div>
                <span className="quantity">$20.00</span>
              </li>

              <li className="d-flex justify-content-between align-items-center mb-2 pb-1 ps-4 ms-1">
                <span className="adult">Adult:</span>
                <span className="quantity">$15.00</span>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-2 pb-1 ps-4 ms-1">
                <span className="adult">Youth:</span>
                <span className="quantity">$20.00</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="bookingfrom text-center">
            <button type="submit" className="submit-button">
              Book now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
