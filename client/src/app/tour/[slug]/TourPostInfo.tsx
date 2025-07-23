"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{
        ...style,
        right: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        width: "40px",
        height: "40px",
        background: "rgb(255, 255, 255)",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <i className="bi bi-chevron-right text-2xl text-black"></i>
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{
        ...style,
        left: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        color: "#fff",
        height: "40px",
        background: "rgb(255, 255, 255)",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <i className="bi bi-chevron-left text-2xl text-black"></i>
    </div>
  );
}

type TourData = {
  id: number;
  main_heading: string;
  featured_image: string;
  gallery_image: string;
  meta_description: string;
  content: string;
};

export default function TourPostInfo({ tour }: { tour: TourData }) {
  const [showGridModal, setShowGridModal] = useState<boolean>(false);
  const [showSliderModal, setShowSliderModal] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  const galleryImages = tour.gallery_image
    ? tour.gallery_image.split(",").map((img) => `http://127.0.0.1:5000/${img.trim()}`)
    : [];

  const handleGridShow = () => setShowGridModal(true);
  const handleGridClose = () => setShowGridModal(false);

  const handleSliderShow = (index: number) => {
    setCurrentImage(index);
    setShowSliderModal(true);
    setShowGridModal(false);
  };

  const handleSliderClose = () => {
    setShowSliderModal(false);
    setShowGridModal(true);
  };

  const Thumbnail = ({
    onClick,
    active,
    index,
  }: {
    onClick: () => void;
    active: boolean;
    index: number;
  }) => (
    <div
      onClick={onClick}
      className={`mx-1 cursor-pointer transition-all duration-200 mt-2 ${
        active ? "ring-2 ring-blue-500" : "opacity-70"
      }`}
    >
      <Image
        src={galleryImages[index]}
        alt={`Thumbnail ${index + 1}`}
        width={70}
        height={50}
        className="w-[70px] h-[50px] object-cover rounded thumbnail-image"
      />
    </div>
  );

  const sliderSettings = {
    initialSlide: currentImage,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index: number) => setCurrentImage(index),
    customPaging: (i: number) => (
      <Thumbnail onClick={() => {}} active={i === currentImage} index={i} />
    ),
    appendDots: () => (
      <div className="mt-4">
        <ul className="flex justify-center items-center p-0 m-0">
          {galleryImages.map((_, i) => (
            <li key={i} className="mx-1">
              <Thumbnail
                onClick={() => setCurrentImage(i)}
                active={i === currentImage}
                index={i}
              />
            </li>
          ))}
        </ul>
      </div>
    ),
  };

  if (!tour) {
    return <div className="text-center py-5">Tour not found</div>;
  }

  return (
    <>
      <div className="tour-details-area">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-xl-9 col-lg-8">
              <h1>{tour.main_heading}</h1>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="tour-details-share text-end d-flex justify-content-end align-items-center">
                <a href="#" className="share-link d-flex align-items-center pe-3">
                  <i className="bi bi-share-fill me-2"></i>
                  Share
                </a>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-7">
              <div className="main_gallery position-relative">
                <Image
                  className="FeaturedImage"
                  src={
                    tour.featured_image
                      ? `http://127.0.0.1:5000/${tour.featured_image}`
                      : "/images/tour-detailpost.png"
                  }
                  alt={tour.main_heading}
                  width={715}
                  height={500}
                />
                <button
                  className="modalBTN border-0 btn-transparent bg-white text-decoration-none d-flex align-items-center"
                  onClick={handleGridShow}
                >
                  <i className="bi bi-camera me-1"></i> See all Photos
                </button>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="row gx-3">
                {galleryImages.slice(0, 3).map((img, index) => {
                  if (index === 0) {
                    return (
                      <div key={index} className="col-12 mb-3 position-relative video-main-thumb">
                        <Image
                          src={img}
                          alt={`Gallery Image ${index + 1}`}
                          className="w-100 rounded galleryImageFirst"
                          width={506}
                          height={247}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="video-thumb h-100 position-relative">
                        <Image
                          src={img}
                          alt={`Gallery Image ${index + 1}`}
                          className="w-100 rounded galleryImageSecond"
                          width={243}
                          height={237}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="tg-tour-details-area">
            <div className="row">
              <div className="col-md-12">
                <div className="tour-content">
                  <h1>About This Tour</h1>
                  <p>{tour.meta_description}</p>
                  <div dangerouslySetInnerHTML={{ __html: tour.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showGridModal}
        onHide={handleGridClose}
        centered
        size="xl"
        dialogClassName="modal-gallery-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Image Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <div
                key={index}
                className="cursor-pointer hover:opacity-80 transition-opacity d-flex"
                onClick={() => handleSliderShow(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGridClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSliderModal}
        onHide={handleSliderClose}
        dialogClassName="modal-gallery-custom"
        className="gallery-modal"
        centered
        size="xl"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Image {currentImage + 1} of {galleryImages.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center justify-center modal-gallery-body">
          <Slider {...sliderSettings} className="w-full max-w-4xl big-slider">
            {galleryImages.map((src, index) => (
              <div key={index} className="text-center">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[70vh] object-contain rounded"
                />
              </div>
            ))}
          </Slider>
        </Modal.Body>
        <Modal.Footer className="modalfooter">
          <div className="flex flex-wrap justify-center thumbnail-navigation">
            {galleryImages.map((_, index) => (
              <Thumbnail
                key={index}
                onClick={() => {
                  sliderRef.current?.slickGoTo(index);
                  setCurrentImage(index);
                }}
                active={currentImage === index}
                index={index}
              />
            ))}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
