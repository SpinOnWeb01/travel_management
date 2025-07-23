import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "../Breadcrumb";
import TourPostInfoWrapper from "./TourPostInfoWrapper";

// ✅ Next.js 15+ compatible type
type PageProps = {
  params: Promise<{ slug: string }>;
};

// --- SEO Metadata function ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/travel-blogs/slug/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        title: "Tour Not Found",
        description: "This tour does not exist.",
      };
    }

    const data = await res.json();
    return {
      title: data.meta_title || "Tour Detail",
      description: data.meta_description || "Tour information and booking.",
    };
  } catch (error) {
    return {
      title: "Tour Detail",
      description: "Tour information and booking.",
    };
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// --- Main Page Component ---
export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/travel-blogs/slug/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      notFound();
    }

    const data = await res.json();

    const tourTitle = data.title ||
      data.name ||
      slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
      <>
        <div className="main_background_blog">
          <Header />
        </div>
        <Breadcrumb title={tourTitle} />
        <TourPostInfoWrapper data={data} />
        <Footer />
      </>
    );
  } catch (error) {
    notFound();
  }
}
