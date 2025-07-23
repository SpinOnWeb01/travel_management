export async function fetchCategoryWithBlogs(slug: string, baseUrl: string) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/travel-categories/slug/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch category");
    return await res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}
