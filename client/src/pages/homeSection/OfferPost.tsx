"use client";



import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; 
import { setTimeout } from "timers";



const OfferPost = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isClient, setIsClient] = useState(false);


  useEffect ( () => {
    setIsClient(true);
  },[])

  const tabs = [
    { key: "all", label: "All Offers" },
    { key: "bank", label: "Bank Offer" },
    { key: "flight", label: "Flight" },
    { key: "hotel", label: "Hotel" },
    { key: "holiday", label: "Holiday" },
    { key: "train", label: "Train" },
  ];

  const offers = useMemo(
    () => [
      {
        id: 1,
        image: "/images/post.png",
        category: "INTL Flight",
        terms: "T&C's Apply",
        title: "Live Now: PAYDAY SALE by Akasa Air!",
        description: "with flight fares starting @1500*.",
        link: "#",
        type: "flight",
      },
      {
        id: 2,
        image: "/images/post.png",
        category: "INTL Flight",
        terms: "T&C's Apply",
        title: "THE HILLS ARE CALLING YOU:",
        description: "Flights to Paris from @₹35,999*.",
        link: "#",
        type: "flight",
      },
      {
        id: 3,
        image: "/images/post.png",
        category: "Hotel Deal",
        terms: "Limited rooms",
        title: "Hotels in Spotlight:",
        description: "5-star hotels at 40% off.",
        link: "#",
        type: "hotel",
      },
      {
        id: 4,
        image: "/images/post.png",
        category: "Bank Offer",
        terms: "Card holders only",
        title: "SPECIAL DISCOUNT:",
        description: "10% extra off with HDFC cards.",
        link: "#",
        type: "bank",
      },
      {
        id: 5,
        image: "/images/post.png",
        category: "Holiday Package",
        terms: "All inclusive",
        title: "BALI VACATION:",
        description: "Flights + stay @₹49,999*.",
        link: "#",
        type: "holiday",
      },
      {
        id: 6,
        image: "/images/post.png",
        category: "Domestic Flight",
        terms: "Limited time offer",
        title: "EXPLORE INDIA:",
        description: "Flights from just ₹1999*.",
        link: "#",
        type: "flight",
      },
      {
        id: 7,
        image: "/images/post.png",
        category: "Hotel Deal",
        terms: "Weekend special",
        title: "WEEKEND GATEWAY:",
        description: "Resorts at 30% discount.",
        link: "#",
        type: "hotel",
      },
      {
        id: 8,
        image: "/images/post.png",
        category: "Train",
        terms: "First class only",
        title: "ROYAL RAJDHANI:",
        description: "Upgrade to 1AC at 20% off.",
        link: "#",
        type: "train",
      },
      {
        id: 9,
        image: "/images/post.png",
        category: "Bank Offer",
        terms: "ICICI cards",
        title: "CASHBACK DEAL:",
        description: "Get ₹2000 back on bookings.",
        link: "#",
        type: "bank",
      },
      {
        id: 10,
        image: "/images/post.png",
        category: "Holiday Package",
        terms: "Family package",
        title: "THAILAND FAMILY TOUR:",
        description: "Kids stay & eat free.",
        link: "#",
        type: "train",
      },
      // Add more offers as needed (total 45)

      {
        id: 11,
        image: "/images/post.png",
        category: "Weekend Getaway",
        terms: "Friday-Sunday",
        title: "QUICK ESCAPE TO GOA:",
        description: "Flights + 2 nights from ₹8,999* per person.",
        link: "#",
        type: "train",
      },
      {
        id: 12,
        image: "/images/post.png",
        category: "Honeymoon",
        terms: "For newlyweds",
        title: "ROMANTIC MALDIVES:",
        description: "Special honeymoon package with private pool villa.",
        link: "#",
        type: "bank",
      },
      {
        id: 13,
        image: "/images/post.png",
        category: "Business Class",
        terms: "Upgrade offer",
        title: "FLY IN STYLE:",
        description: "Business class upgrades from ₹15,000* only.",
        link: "#",
        type: "holiday",
      },
      {
        id: 14,
        image: "/images/post.png",
        category: "Family Vacation",
        terms: "Kids stay free",
        title: "FUN FAMILY HOLIDAY:",
        description: "Special rates for family packages to Thailand.",
        link: "#",
        type: "train",
      },
      {
        id: 15,
        image: "/images/post.png",
        category: "Last Minute",
        terms: "Limited seats",
        title: "LAST MINUTE DEALS:",
        description: "Amazing discounts on unsold inventory!",
        link: "#",
        type: "bank",
      },
      {
        id: 16,
        image: "/images/post.png",
        category: "Luxury Train",
        terms: "All meals included",
        title: "ROYAL RAJASTHAN TOUR:",
        description: "Palace on Wheels starting @₹75,000* per night.",
        link: "#",
        type: "flight",
      },
      {
        id: 17,
        image: "/images/post.png",
        category: "Safari",
        terms: "Expert guide included",
        title: "AFRICAN SAFARI ADVENTURE:",
        description: "Witness the great migration. Book now!",
        link: "#",
        type: "train",
      },
      {
        id: 18,
        image: "/images/post.png",
        category: "Winter Special",
        terms: "Nov-Feb travel",
        title: "SKI VACATION IN SWITZERLAND:",
        description: "All-inclusive packages from ₹1,25,999*.",
        link: "#",
        type: "bank",
      },
      {
        id: 19,
        image: "/images/post.png",
        category: "Summer Special",
        terms: "Apr-Jun travel",
        title: "BEACH HOLIDAY IN PHUKET:",
        description: "Flights + 4 nights from ₹32,999*.",
        link: "#",
        type: "Train",
      },
      {
        id: 20,
        image: "/images/post.png",
        category: "Group Tour",
        terms: "Min 6 people",
        title: "EUROPE GROUP TOUR:",
        description: "7 countries in 12 days @₹1,49,999* only.",
        link: "#",
        type: "holiday",
      },
      {
        id: 21,
        image: "/images/post.png",
        category: "Backpacking",
        terms: "Budget stays",
        title: "SOUTHEAST ASIA ON A BUDGET:",
        description: "30-day itinerary from just ₹50,000* all inclusive.",
        link: "#",
        type: "bank",
      },
      {
        id: 22,
        image: "/images/post.png",
        category: "Wellness",
        terms: "Yoga included",
        title: "AYURVEDA RETREAT:",
        description: "7-day rejuvenation package in Kerala.",
        link: "#",
        type: "bank",
      },
      {
        id: 23,
        image: "/images/post.png",
        category: "Cultural Tour",
        terms: "Expert guides",
        title: "DISCOVER JAPAN:",
        description: "Cherry blossoms & ancient temples tour.",
        link: "#",
        type: "bank",
      },
      {
        id: 24,
        image: "/images/post.png",
        category: "Road Trip",
        terms: "Self-drive",
        title: "LEH-LADAKH BIKE TRIP:",
        description: "Complete biking package with support vehicle.",
        link: "#",
        type: "holiday",
      },
      {
        id: 25,
        image: "/images/post.png",
        category: "Island Hopping",
        terms: "Boat transfers included",
        title: "GREEK ISLANDS TOUR:",
        description: "Visit Santorini, Mykonos & more.",
        link: "#",
        type: "bank",
      },
      {
        id: 26,
        image: "/images/post.png",
        category: "Wildlife",
        terms: "Park fees included",
        title: "AMAZON RAINFOREST EXPEDITION:",
        description: "5-day guided tour with eco-lodge stay.",
        link: "#",
        type: "bank",
      },
      {
        id: 27,
        image: "/images/post.png",
        category: "Shopping Tour",
        terms: "VIP discounts",
        title: "DUBAI SHOPPING FESTIVAL:",
        description: "Flights + 5 nights with shopping vouchers.",
        link: "#",
        type: "bank",
      },
      {
        id: 28,
        image: "/images/post.png",
        category: "Food Tour",
        terms: "Tastings included",
        title: "ITALIAN CULINARY JOURNEY:",
        description: "Pasta, pizza and wine tasting across Italy.",
        link: "#",
        type: "holiday",
      },
      {
        id: 29,
        image: "/images/post.png",
        category: "Photography",
        terms: "Workshop included",
        title: "NORTHERN LIGHTS PHOTO TOUR:",
        description: "Capture auroras in Iceland with experts.",
        link: "#",
        type: "bank",
      },
      {
        id: 30,
        image: "/images/post.png",
        category: "Festival",
        terms: "Limited availability",
        title: "RIO CARNIVAL EXPERIENCE:",
        description: "VIP access to parade & parties.",
        link: "#",
        type: "flight",
      },
      {
        id: 31,
        image: "/images/post.png",
        category: "Diving",
        terms: "Certification available",
        title: "GREAT BARRIER REEF DIVING:",
        description: "5-day liveaboard diving trip.",
        link: "#",
        type: "flight",
      },
      {
        id: 32,
        image: "/images/post.png",
        category: "Volunteer",
        terms: "Minimum 2 weeks",
        title: "VOLUNTEER IN COSTA RICA:",
        description: "Sea turtle conservation program.",
        link: "#",
        type: "flight",
      },
      {
        id: 33,
        image: "/images/post.png",
        category: "Rail Pass",
        terms: "Flexible travel",
        title: "EURORAIL GLOBAL PASS:",
        description: "Unlimited train travel across Europe.",
        link: "#",
        type: "flight",
      },
      {
        id: 34,
        image: "/images/post.png",
        category: "Overland",
        terms: "Camping included",
        title: "AFRICA OVERLAND ADVENTURE:",
        description: "30-day trip from Nairobi to Cape Town.",
        link: "#",
        type: "flight",
      },
      {
        id: 35,
        image: "/images/post.png",
        category: "Pilgrimage",
        terms: "Guided tour",
        title: "CHAR DHAM YATRA:",
        description: "Complete pilgrimage package with flights.",
        link: "#",
        type: "holiday",
      },
      {
        id: 36,
        image: "/images/post.png",
        category: "Luxury",
        terms: "Butler service",
        title: "PRIVATE ISLAND GETAWAY:",
        description: "Exclusive use of luxury island resort.",
        link: "#",
        type: "flight",
      },
      {
        id: 37,
        image: "/images/post.png",
        category: "Student",
        terms: "ISIC required",
        title: "STUDENT TRAVEL DEALS:",
        description: "Special discounts for students worldwide.",
        link: "#",
        type: "flight",
      },
      {
        id: 38,
        image: "/images/post.png",
        category: "Senior",
        terms: "55+ only",
        title: "SENIORS WORLD TOUR:",
        description: "Leisurely paced group tours.",
        link: "#",
        type: "flight",
      },
      {
        id: 39,
        image: "/images/post.png",
        category: "Solo",
        terms: "Single supplement waived",
        title: "SOLO TRAVELER SPECIAL:",
        description: "No single supplement on select tours.",
        link: "#",
        type: "flight",
      },
      {
        id: 40,
        image: "/images/post.png",
        category: "Hiking",
        terms: "Equipment provided",
        title: "ANNAPURNA CIRCUIT TREK:",
        description: "18-day guided trek through Himalayas.",
        link: "#",
        type: "bank",
      },
      {
        id: 41,
        image: "/images/post.png",
        category: "Desert",
        terms: "Camel safari included",
        title: "SAHARA DESERT EXPEDITION:",
        description: "3-day luxury desert camp experience.",
        link: "#",
        type: "bank",
      },
      {
        id: 42,
        image: "/images/post.png",
        category: "River Cruise",
        terms: "All meals included",
        title: "DANUBE RIVER CRUISE:",
        description: "7-night cruise through 4 countries.",
        link: "#",
        type: "bank",
      },
      {
        id: 43,
        image: "/images/post.png",
        category: "Visa Assistance",
        terms: "Document help",
        title: "SCHENGEN VISA PACKAGE:",
        description: "Flights + hotel + visa assistance.",
        link: "#",
        type: "bank",
      },
      {
        id: 44,
        image: "/images/post.png",
        category: "Festival",
        terms: "Early bird",
        title: "OKTOBERFEST PACKAGE:",
        description: "Munich beer festival experience.",
        link: "#",
        type: "bank",
      },
      {
        id: 45,
        image: "/images/post.png",
        category: "Ski",
        terms: "Equipment rental",
        title: "WHISTLER SKI VACATION:",
        description: "5-day ski package with lessons.",
        link: "#",
        type: "bank",
      },

      {
        id: 46,
        image: "/images/post.png",
        category: "Ski",
        terms: "Equipment rental",
        title: "London SKI VACATION:",
        description: "5-day ski package with lessons.",
        link: "#",
        type: "bank",
      }
    ],
    []
  );

  const filteredOffers = useMemo(
    () =>
      activeTab === "all"
        ? offers
        : offers.filter((offer) => offer.type === activeTab),
    [activeTab, offers]
  );


  const groupedOffers = useMemo(() => {
    const result = [];

    if (filteredOffers.length <= 6) {
      
      filteredOffers.forEach((item) => result.push([item]));
    } else {
      
      for (let i = 0; i < filteredOffers.length; i += 2) {
        result.push(filteredOffers.slice(i, i + 2));
      }
    }

    return result;
  }, [filteredOffers]);
  

 useEffect(() => {
  if (swiperInstance) {
    swiperInstance.update?.();

    setTimeout(() => {
      if (swiperInstance.navigation && typeof swiperInstance.navigation.update === "function") {
        swiperInstance.navigation.update();
      }
      swiperInstance.slideTo?.(0);
    }, 300);
  }
}, [activeTab, swiperInstance]);


  return (
    <div className="exclusive-post position-relative">
      <div className="container postbox">
        <div className="row position-relative align-items-center">
          <div className="col-md-4">
            <div className="title">
              <h2>Exclusive Offers</h2>
            </div>
          </div>
          <div className="col-md-8">
            <ul
              className="nav offer-tab nav-tabs justify-content-end gap-2"
              role="tablist"
            >
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.key}>
                  <button
                    className={`nav-link ${
                      activeTab === tab.key ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}

              <li className="view-allbtn">
                <Link href="#"> View All</Link>
              </li>
            </ul>
          </div>
        </div>

        {isClient && (
          <div className="col-lg-11 mx-auto position-relative exclusive-post-item">
            <Swiper
              key={activeTab}
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={3} // or as needed
              spaceBetween={30}
              // centeredSlides={true}

              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              // onInit={(swiper) => {
              //   swiper.navigation.init();
              //   swiper.navigation.update();
              // }}
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 3 },
              }}
            >
              {groupedOffers.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="row exclusivepost-row">
                    {group.map((offer) => (
                      <div className="" key={offer.id}>
                        <div className="postitem">
                          <Image
                            src={offer.image}
                            alt={offer.title}
                            width={300}
                            height={200}
                            priority 
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
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className="custom-swiper-nav"
              style={{
                position: "absolute",
                top: filteredOffers.length > 6 ? "25%" : "50%",
                transform:
                  filteredOffers.length > 6
                    ? "translateY(-25%)"
                    : "translateY(-50%)",
              }}
            >
              <div className="custom-prev" ref={prevRef}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
              </div>
              <div className="custom-next" ref={nextRef}>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default OfferPost;
