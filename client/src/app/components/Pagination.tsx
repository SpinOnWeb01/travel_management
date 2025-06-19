"use client";



export default function Pagination() {
  return (
    <>
      <div className="row pagination">
        <div className="pagination-container d-flex justify-content-center align-items-center gap-2 my-4">
          <button className="pagination-btn">Previous Page</button>

          <button className="pagination-page active">1</button>
          <button className="pagination-page">2</button>
          <button className="pagination-page">3</button>
          <button className="pagination-page">4</button>

          <button className="pagination-btn">Next Page</button>
        </div>
      </div>
      ;
    </>
  );
}
