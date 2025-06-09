
"use client";

import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function OfferPost1 () {
  const offers = [
    {
      id: 1,
      image: "/images/post.png",
      category: "INTL Flight",
      terms: "T&C's Apply",
      title: "THE HILLS ARE CALLING YOU:",
      description: "with flight fares starting @1500*.",
      link: "#",
    },
    {
      id: 2,
      image: "/images/post.png",
      category: "INTL Flight",
      terms: "T&C's Apply",
      title: "THE HILLS ARE CALLING YOU:",
      description: "with flight fares starting @1500*.",
      link: "#",
    },
    {
      id: 3,
      image: "/images/post.png",
      category: "INTL Flight",
      terms: "T&C's Apply",
      title: "THE HILLS ARE CALLING YOU:",
      description: "with flight fares starting @1500*.",
      link: "#",
    },
    {
      id: 4,
      image: "/images/post.png",
      category: "INTL Flight",
      terms: "T&C's Apply",
      title: "THE HILLS ARE CALLING YOU:",
      description: "with flight fares starting @1500*.",
      link: "#",
    },

    {
      id: 5,
      image: "/images/post.png",
      category: "INTL Flight",
      terms: "T&C's Apply",
      title: "THE HILLS ARE CALLING YOU:",
      description: "with flight fares starting @1500*.",
      link: "#",
    },
  ];

  return (
    <>
      <div className="exclusive-post">
        <div className="container postbox">
          <div className="row ">
            <div className="col-md-4">
              <div className="title">
                <h2>Exclusive Offers</h2>
              </div>
            </div>
            <div className="col-md-8">
              <div className="Offerbtn">{/* Optional CTA */}</div>
            </div>
          </div>

          <div className="row postboxx pt-5 position-relative">
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
                992: { slidesPerView: 3 },
              }}
            >
              {offers.map((offer) => (
                <SwiperSlide key={offer.id}>
                  <div className="postitem">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      width={300}
                      height={200}
                      className="img-fluid"
                      style={{
                        height: "140px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div className="post-content">
                      <div className="post-info d-flex justify-content-between">
                        <Link href="#">{offer.category}</Link>
                        <Link href="#">{offer.terms}</Link>
                      </div>
                      <div className="title text-center">
                        <h3>
                          <Link href={offer.link}>{offer.title}</Link>
                        </h3>
                      </div>
                      <div className="description">
                        <p>{offer.description}</p>
                      </div>
                      <div className="read-more text-center">
                        <Link href={offer.link}>Book Now</Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-swiper-nav d-flex align-items-center gap-2">
              <div className="custom-prev btn btn-light">
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </div>
              <div className="custom-next btn btn-light">
                <FontAwesomeIcon icon={faArrowRightLong} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
