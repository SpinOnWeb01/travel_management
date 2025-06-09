"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";



const destinations = [
  {
    id: 1,
    img: "/images/popular-post.png",
    title: "Coastal Bliss: Sun, Sea and Sand Escapades",
    location: "Bryce Canyon National Park, USA",
    price: "$126.65",
    originalPrice: "$149.00",
  },
  {
    id: 2,
    img: "/images/destination-post-2.jpg",
    title: "Mountain Retreat: Alpine Adventures",
    location: "Swiss Alps, Switzerland",
    price: "$156.75",
    originalPrice: "$179.00",
  },
  {
    id: 3,
    img: "/images/destination-post-3.jpg",
    title: "Urban Explorer: City Lights Tour",
    location: "Tokyo, Japan",
    price: "$198.50",
    originalPrice: "$220.00",
  },
  {
    id: 4,
    img: "/images/destination-post-4.jpg",
    title: "Desert Oasis: Sand Dune Experience",
    location: "Dubai, UAE",
    price: "$145.90",
    originalPrice: "$165.00",
  },
  {
    id: 5,
    img: "/images/destination-post-4.jpg",
    title: "Safari Adventure",
    location: "Kenya, Africa",
    price: "$210.00",
    originalPrice: "$245.00",
  },
  {
    id: 6,
    img: "/images/destination-post-4.jpg",
    title: "Desert Thrill Ride",
    location: "Sahara, Morocco",
    price: "$185.00",
    originalPrice: "$210.00",
  },
];

export default function DestinationSlider() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title mb-4">
          Popular Destinations Outside India
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2500, // 2.5 seconds delay
            disableOnInteraction: false, // continues autoplay even after interaction
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              <div className="card destination-card h-100">
                <Image
                  src={dest.img}
                  alt={dest.title}
                  width={500}
                  height={300}
                  className="card-img-top"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between text-muted mb-2 ratting">
                    <span>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="bi bi-star-fill text-warning me-1"
                        ></i>
                      ))}{" "}
                      (32)
                    </span>
                    <span>
                      <i className="bi bi-clock"></i> 11 Days
                    </span>
                  </div>

                  <p className="location mb-1">{dest.location}</p>
                  <h2 className="title mb-2 fs-5">{dest.title}</h2>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="price">
                      <span className="main-price me-2">
                        <span className="tag">From</span> {dest.price}
                      </span>
                      <span className="cutprice text-decoration-line-through">
                        {dest.originalPrice}
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

      <style jsx>{`
        .destination-card {
          border: none;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .circle-icon {
          background: #f1f1f1;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .circle-icon:hover {
          background-color: #343a40;
          color: #fff;
        }
      `}</style>
    </section>
  );
}
