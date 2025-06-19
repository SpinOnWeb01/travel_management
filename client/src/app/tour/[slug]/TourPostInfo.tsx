// src/app/tour/[slug]/TourPostInfo.tsx
"use client";

import Image from "next/image";

// Define the type for your tour data
type TourData = {
  id: number;
  main_heading: string;
  featured_image: string;
  gallery_image: string;
  meta_description: string;
  content: string;
  // Add other properties as needed from your API response
};

export default function TourPostInfo({ tour }: { tour: TourData }) {
  if (!tour) {
    return <div className="text-center py-5">Tour not found</div>;
  }

  return (
    <div className="tour-details-area">
      <div className="container">
        <div className="row align-items-end mb-5">
          <div className="col-xl-9 col-lg-8">
            <h1>{tour.main_heading}</h1>
            <div className="tour-details-location-rating d-flex flex-wrap align-items-center gap-3">
              
              <div className="tour-details-ratings d-flex align-items-center">
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <span>
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
                <span className="review-text ms-2">(5 Reviews)</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="tour-details-share text-end d-flex justify-content-end align-items-center">
              <a
                href="#"
                className="share-link d-flex align-items-center pe-3"
              >
                <i className="bi bi-share-fill me-2"></i>
                Share
              </a>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-7">
            <Image
              src={
                tour.featured_image
                  ? `http://127.0.0.1:5000/${tour.featured_image}`
                  : "/images/tour-detailpost.png"
              }
              alt={tour.main_heading}
              width={715}
              height={500}
            />
          </div>
          <div className="col-lg-5">
            <div className="row gx-3">
  {tour.gallery_image &&
    tour.gallery_image
      .split(",")
      .map((img, index) => {
        const imageUrl = `http://127.0.0.1:5000/${img.trim()}`;

        // First image = large banner
        if (index === 0) {
          return (
            <div
              key={index}
              className="col-12 mb-3 position-relative video-main-thumb"
            >
              <Image
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                className="w-100 rounded "
                width={506}
                height={247}
              />
            </div>
          );
        }

        // 2nd and 3rd images = thumbnails
        if (index === 1 || index === 2) {
          return (
            <div key={index} className="col-md-6 mb-3">
              <div className="video-thumb h-100 ">
                <Image
                  src={imageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-100 rounded h-100"
                  width={243}
                  height={237}
                />
              </div>
            </div>
          );
        }

        // Ignore the rest (you can extend this if needed)
        return null;
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
  );
}
