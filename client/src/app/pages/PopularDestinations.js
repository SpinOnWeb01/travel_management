"use client";

import { useEffect, useState } from "react";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

export default function PopularDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 Replace with your real API URL 
    fetch("http://localhost:5000/api/v1/travel-categories")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch destinations", err);
        setLoading(false);
      });
  }, []);

  

  return (
    <div className="destiation position-relative py-5">
      <div className="container">
        <div className="row mb-4 align-items-end">
          <div className="col-md-7 text-center text-md-start mb-3 mb-md-0">
            <span className="section-subtitle">Best Places for you</span>
            <h2 className="section-title">
              Popular Destinations Outside India
            </h2>
          </div>
          <div className="col-md-5 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-2">
              <div className="custom-prev btn btn-light">
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </div>
              <div className="custom-next btn btn-light">
                <FontAwesomeIcon icon={faArrowRightLong} />
              </div>
            </div>
          </div>
        </div>
        {/* Swiper Component */}
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
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              <div className="card destination-card">
                <Image
                  src={`http://127.0.0.1:5000/${dest.image}`}
                  alt={dest.name}
                  width={500}
                  height={300}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between text-muted mb-2 ratting">
                    <span>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <i className="bi bi-star-fill text-warning me-1"></i> (32)
                    </span>
                    <span>
                      <i className="bi bi-clock"></i> 11 Days
                    </span>
                  </div>
                  <p className="location mb-1"></p>
                  <Link href={`/slug/${dest.slug}`}><h2 className="title mb-2 fs-5">{dest.name}</h2></Link>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="price">
                      <span className="main-price me-2">
                        <span className="tag">From</span> 
                      </span>
                      <span className="cutprice text-decoration-line-through">
                       
                      </span>
                    </div>
                    <div className="circle-icon">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
