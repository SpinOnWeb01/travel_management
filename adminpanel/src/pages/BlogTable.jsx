import React from "react";
import { Link } from "react-router-dom";

const BlogTable = ({ blogs, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Category</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, index) => (
          <tr key={blog.id}>
            <td>{index + 1}</td>
            <td>{blog.main_heading}</td>
            <td>{blog.meta_keyword}</td>
            <td>{blog.meta_description}</td>
            <td>
              <Link
                to={`/dashboard/blogs/edit/${blog.id}`}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(blog.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;
