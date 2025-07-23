"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { useCategoryBlogStore } from "@/store/categoryBlogStore";
import Header from "@/components/Header";

export default function BlogPost() {
  const params = useParams();
  const category_slug = params?.slug as string;

  const [baseUrl, setBaseUrl] = useState("");

  const {
    category,
    loading,
    error,
    fetchCategoryBlogs,
  } = useCategoryBlogStore();

  // ✅ Set baseUrl once
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
    setBaseUrl(url);
  }, []);

  // ✅ Trigger fetch once baseUrl & slug are ready
  useEffect(() => {
    if (!baseUrl || !category_slug) return;

    // We do not include fetchCategoryBlogs in dependency array to avoid re-trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchCategoryBlogs(category_slug, baseUrl);
  }, [category_slug, baseUrl]);


  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-5 text-danger">Error: {error}</div>;

  if (!category)
    return <div className="text-center py-5"></div>;

  return (
    <>
      <div className="main_background_blog">
        <Header />
      </div>
      <div className="container-fluid blog-post">
        <div className="container">
          <div className="row">
            <div className="row blog-box">
              <Sidebar />
              <div className="col-md-9">
                <div className="row ">
                  {category.blogs?.map((blog) => {
                    const featuredImage = blog.featured_image
                      ? `${baseUrl}/${blog.featured_image}`
                      : "/images/blog-post.jpg";

                    return (
                      <div key={blog.id} className="col-md-6 mb-8">
                        <div className="group bg-gray-100 relative h-full flex flex-col overflow-hidden rounded-2xl backdrop-blur-sm shadow-md transition-all duration-500 hover:shadow-3xl  border border-white/100 hover:border-white/30">
                          <div className="relative overflow-hidden rounded-t-2xl">
                            <img
                              src={featuredImage}
                              className="w-full object-fill transition-transform duration-700 "
                              alt={blog.main_heading}
                            />

                            <div className="absolute left-4 top-4 z-10">
                              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black-600 backdrop-blur-sm">
                                {blog.category_name || "Travel"}
                              </span>
                            </div>

                            {/* Glass overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Content with glassmorphism panel */}
                          <div className="relative p-4 backdrop-blur-sm rounded-b-2xl transition-all duration-500 flex flex-col flex-grow">
                            {/* Date */}
                            <div className="mb-4 flex items-center justify-between text-sm">
                              {/* Date with red calendar icon */}
                              <div className="flex items-center text-gray-600">
                                <svg
                                  className="mr-2 h-4 w-4 text-red-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  ></path>
                                </svg>
                                <span>{blog.date || "June 25, 2023"}</span>
                              </div>

                              {/* Author with red user icon  */}
                              <div className="flex items-center text-gray-600">
                                <svg
                                  className="mr-2 h-4 w-4 text-red-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  ></path>
                                </svg>
                                <span>{blog.author || "Admin"}</span>
                              </div>
                            </div>

                            <h3 className="mb-3 text-[22px] font-[800] tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-red-700">
                              <Link
                                href={`/tour/${blog.slug}`}
                                className="transition-colors text-[22px] font-extrabold duration-300 text-black hover:text-red-700"
                                passHref >
                                {blog.main_heading}
                              </Link>
                            </h3>

                            {blog.meta_description && (
                              <p className="mb-6 text-gray-600 line-clamp-3 flex-grow">
                                {blog.meta_description.length > 120
                                  ? `${blog.meta_description.substring(
                                      0,
                                      120
                                    )}...`
                                  : blog.meta_description}
                              </p>
                            )}

                            {/* Glassmorphic read more button - Now at the bottom */}
                            <div className="mt-auto pt-4">
                              <div
                                className="inline-block rounded-full p-[1px] mx-auto"
                                style={{
                                  background:
                                    "linear-gradient(0deg, #ff3535 0%, #ffbe45 100%)",
                                }}
                              >
                                <Link
                                  href={`/tour/${blog.slug}`}
                                  className="flex items-center justify-center rounded-full px-3 py-1 text-lg text-white transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
                                passHref >
                                  Read more
                                  <svg
                                    className="ml-2 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-red-400/50 backdrop-blur-md opacity-50 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110"></div>
                          <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-red-400/50 backdrop-blur-md opacity-50 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-110"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
