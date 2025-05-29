import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); // Show 10 blogs initially

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    fetch('http://localhost:5000/api/v1/travel-blogs')
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data);
        setVisibleBlogs(data.slice(0, visibleCount));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/travel-blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted successfully!');
        fetchBlogs(); // Refresh blogs
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + 10;
    setVisibleCount(newCount);
    setVisibleBlogs(allBlogs.slice(0, newCount));
  };

  return (
    <div>
      <h2>My Travel Post List</h2>
      <Link to="/blogs/new" className="btn btn-primary mb-3">+ Add Blog</Link>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleBlogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td>{index + 1}</td>
                  <td>{blog.main_heading}</td>
                  <td>{blog.meta_keyword}</td>
                  <td>{blog.meta_description}</td>
                  <td>
                    <Link to={`/blogs/edit/${blog.id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCount < allBlogs.length && (
            <button className="btn btn-secondary" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BlogList;
