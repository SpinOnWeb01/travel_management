"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination({ totalPages = 4 }: { totalPages?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  // Update currentPage from URL
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams?.get("page") || "1", 10);
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  // Navigate to selected page
  const goToPage = (page: number) => {
    const params = new URLSearchParams((searchParams?.toString() ?? ""));
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="row pagination">
      <div className="pagination-container d-flex justify-content-center align-items-center gap-2 my-4">
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous Page
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-page ${page === currentPage ? "active" : ""}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
