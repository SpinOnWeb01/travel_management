'use client';

import Image from "next/image";
import Pagination from "@/app/components/Pagination";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Blog = {
  id: string | number;
  featured_image?: string;
  main_heading: string;
  slug: string;
  meta_description: string;
  location?: string;
  duration?: string;
};

type Category = {
  blogs?: Blog[];
};

export default function BlogPost() {
  const params = useParams();
  const category_slug = params?.slug as string; // Updated to support App Router correctly

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000');
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!category_slug || !baseUrl) return;

      try {
        setLoading(true);
        const res = await fetch(
          `${baseUrl}/api/v1/travel-categories/slug/${category_slug}`
        );
        const data = await res.json();

        if (res.ok) {
          setCategory(data);
        } else {
          throw new Error(data.message || "Failed to fetch category");
        }
      } catch (err) {
        setError(
          err && typeof err === "object" && "message" in err
            ? (err as { message: string }).message
            : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [category_slug, baseUrl]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
  if (!category) return <div className="text-center py-5">Category not found</div>;

  return (
    <>
      <div className="main_background_blog">
        <Header />
      </div>
      <div className="container-fluid blog-post">
        <div className="container">
          <div className="row">
            <div className="col-md-12 blog-box">
              <div className="row mt-4 pt-2">
                {category.blogs?.map((blog) => {
                  const featuredImage = blog.featured_image
                    ? `${baseUrl}/${blog.featured_image}`
                    : "/images/blog-post.jpg";

                  return (
                    <div key={blog.id} className="col-md-4 blog-box mb-4">
                      <div className="card blog-item overflow-hidden h-100">
                        <img
                          src={featuredImage}
                          className="card-img-top"
                          alt={blog.main_heading}
                          style={{ height: "270px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <Link href={`/tour/${blog.slug}`}>
                            <h3 className="heading">{blog.main_heading}</h3>
                          </Link>
                          {blog.meta_description && (
                            <p className="card-text mt-3 mb-4">
                              {blog.meta_description.length > 100
                                ? `${blog.meta_description.substring(0, 100)}...`
                                : blog.meta_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
