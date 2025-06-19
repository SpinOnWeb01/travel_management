import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // <-- This is required in mere naresh chacha ki rksha kro Next.js 15+

  try {
    const res = await fetch(`http://localhost:5000/api/v1/travel-blogs/slug/${slug}`, {
      cache: "no-store",
    });
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
