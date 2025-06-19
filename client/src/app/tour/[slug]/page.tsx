import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "../Breadcrumb";
import TourPostInfoWrapper from "./TourPostInfoWrapper";
import { generateMetadata } from "./generateMetadata";

export { generateMetadata };

type Props = {
  params: { slug: string };
};

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params; // ✅ FIXED: Removed "await"

  const res = await fetch(`http://localhost:5000/api/v1/travel-blogs/slug/${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <>
      <div className="main_background_blog">
        <Header />
      </div>
      <Breadcrumb />
      <TourPostInfoWrapper data={data} />
      <Footer />
    </>
  );
}
