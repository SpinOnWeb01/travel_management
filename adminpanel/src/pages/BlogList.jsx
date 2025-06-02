import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs } from "../redux/blogList";
import { Link } from "react-router-dom";

const BlogTable = lazy(() => import("./BlogTable"));

const BlogList = () => {
  const dispatch = useDispatch();
  const { items: allBlogs, status, error } = useSelector((state) => state.blogs);
  const [visibleCount, setVisibleCount] = useState(10);
  const visibleBlogs = allBlogs.slice(0, visibleCount);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

 const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    dispatch(deleteBlog(id));
  };

  return (
    <div>
      <h2>My Travel Post List</h2>
      <Link to="/dashboard/blogs/new" className="btn btn-primary mb-3">+ Add Blog</Link>

      {status === "loading" ? (
        <p>Loading blogs...</p>
      ) : status === "failed" ? (
        <p>Error: {error}</p>
      ) : (
        <Suspense fallback={<div>Loading blog table...</div>}>
          <BlogTable blogs={visibleBlogs} onDelete={handleDelete} />
          {visibleCount < allBlogs.length && (
            <button className="btn btn-secondary d-block mx-auto mt-3" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default BlogList;
