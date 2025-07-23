// src/lib/api.ts 

export async function fetchDestinationsFromAPI() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/travel-categories");
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
}
