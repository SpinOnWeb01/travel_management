"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";


const images = [
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",
  "/images/post.png",

];

// Custom arrow components

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
        color:"#fff",
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

export default function GalleryWithModal() {
  const [showGridModal, setShowGridModal] = useState<boolean>(false);
  const [showSliderModal, setShowSliderModal] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

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

  // Custom thumbnail component to replace dots
  const Thumbnail = ({
    onClick,
    active,
    index,
  }: {
    onClick: () => void;
    active: boolean;
    index: number;
  }) => (
    <button
      onClick={onClick}
      className={`mx-1 w-3 h-3 rounded-full transition-all duration-200 ${
        active ? "bg-blue-500 scale-125" : "bg-gray-400 opacity-70"
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  );

  const sliderSettings = {
    initialSlide: currentImage,
    dots: true, // Disable default dots
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
            {images.map((_, i) => (
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


  return (
    <>
      {/* See More Button */}
      <div className="text-center my-4">
        <Button variant="primary" onClick={handleGridShow}>
          See More
        </Button>
      </div>

      {/* Grid Modal */}
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
            {images.map((src, index) => (
              <div
                key={index}
                className="cursor-pointer hover:opacity-80 transition-opacity"
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

      {/* Slider Modal */}


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
            Image {currentImage + 1} of {images.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center justify-center modal-gallery-body">
          <Slider {...sliderSettings} className="w-full max-w-4xl big-slider">
            {images.map((src, index) => (
              <div key={index} className="text-center">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={800}
                  className="mx-auto max-h-[70vh] object-contain rounded "
                />
              </div>
            ))}
          </Slider>
        </Modal.Body>

        <Modal.Footer className=" pb-4  border-0 modalfooter"></Modal.Footer>
      </Modal>
    </>
  );
}
