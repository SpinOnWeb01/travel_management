import type { Metadata } from "next";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = await props;
  const { slug } = params;

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
