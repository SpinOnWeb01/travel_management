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
    <div className="destiation position-relative ">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-7 text-center text-md-start ">
            <span className="section-subtitle">Best Places for you</span>
            <h2 className="section-title">
              Popular Destinations Outside India
            </h2>
          </div>
          <div className="col-md-5 text-center text-md-end  mb-4 pb-1">
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
       {!loading && destinations.length > 0 && (
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
    spaceBetween={32}
    breakpoints={{
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    }}
  >
    {destinations.map((dest) => (
      <SwiperSlide key={dest.id}>
        <div className="card1 destination-card">
          <Image
            src={`http://127.0.0.1:5000/${dest.image}`}
            alt={dest.name}
            width={500}
            height={300}
            className="card-img-top"
          />
          <div className="card-body">
            <div className="d-flex justify-content-between mb-2 ratting">
              <span>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i> (32)
              </span>
              <span>
                <i className="bi bi-clock text-dark"></i> 11 Days
              </span>
            </div>
            <p className="location mb-1">Delhi</p>
            <Link href={`/category/${dest.category_slug}`}>
              <h2 className="title mb-2 fs-5">{dest.name}</h2>
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <div className="price">
              </div>
              <div className="circle-icon">
               <Link href={`/category/${dest.category_slug}`}> <i className="bi bi-arrow-up-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)}

      </div>
      
    </div>
  );
}
