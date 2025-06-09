
'use client';
import { } from 'react';

import Link from 'next/link';

import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";




const destinations = [
  { title: 'Jaisalmer', subtitle: '(Rajasthan)', image: '/images/destination-1.jpg' },
  { title: 'Andaman and Nicobar Islands', image: '/images/destination-1.jpg' },
  { title: 'Agra', subtitle: '(Uttar Pradesh)', image: '/images/destination-1.jpg' },
  { title: 'Delhi',  subtitle: '(Mumbai)', image: '/images/destination-1.jpg' },
  { title: 'jaipur',  subtitle: '(Udaipur)', image: '/images/destination-1.jpg' },

];

export default function TopDestination() {
  

  

  return (
    <>
      <div className="top-destination-section">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-6 text-center text-md-start">
              <span className="section-subtitle">Best Places near at you</span>
              <h2 className="section-title">Explore Top Destinations</h2>
            </div>

            <div className="col-md-6">
              <div className="d-flex justify-content-center justify-content-md-end mb-4 gap-2">
                <div className="custom-prev btn btn-light">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
                <div className="custom-next btn btn-light">
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              autoplay={{
                delay: 5000,

                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
            >
              {destinations.map((dest, index) => (
                <SwiperSlide key={index}>
                  <div className="destination-card">
                    <div className="card-inner">
                      <div className="card-image">
                        <Image
                          src={dest.image}
                          alt={dest.title}
                          width={500}
                          height={300}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="card-content d-flex justify-content-between align-items-center mt-2">
                        <div className="content">
                          <h3>
                            <Link href="#">{dest.title}</Link>
                          </h3>
                          {/* {dest.subtitle && (
                            <span className="tour-count">{dest.subtitle}</span>
                          )} */}
                        </div>
                        <Link href="#" className="icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 13.0969L13.0969 2M13.0969 2H2M13.0969 2V13.0969"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
