import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Global.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyClassicEditor from '../components/editor/ClassicEditor';
import { useDispatch } from "react-redux";
import { addBlogDirect } from "../redux/blogs";

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/travel-categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [form, setForm] = useState({
    meta_title: '',
    meta_description: '',
    meta_keyword: '',
    main_heading: '',
    slug: '',
    featured_image: null,
    category_name: '',
    category_slug: '',
    gallery_images: [],
    content_description: '',
    published_date: ''
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => {
    const updatedForm = { ...prev, [name]: value };

    if (name === 'category_name') {
      const selectedCat = categories.find(cat => cat.name === value);
      if (selectedCat) {
        updatedForm.category_slug = selectedCat.category_slug;
      } else {
        updatedForm.category_slug = '';
      }
    }

    return updatedForm;
  });
};


  const handleFileChange = (e) => {
    const { name, files } = e.target;

    const isValidWebP = (file) => {
      if (file.type === 'image/webp') {
        return true;
      }
      alert(`Only .webp images are allowed. "${file.name}" is not a WebP image.`);
      return false;
    };

    if (name === 'featured_image') {
      const file = files[0];
      if (file && isValidWebP(file)) {
        setForm(prev => ({ ...prev, featured_image: file }));
      } else {
        e.target.value = null;
        setForm(prev => ({ ...prev, featured_image: null }));
      }
    } else if (name === 'gallery_images') {
      const validFiles = Array.from(files).filter(isValidWebP);
      if (validFiles.length > 0) {
        setForm(prev => ({ ...prev, gallery_images: [...prev.gallery_images, ...validFiles] }));
      } else if (files.length > 0) {
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.meta_title.trim() || !form.main_heading.trim() || !form.slug.trim()) {
      alert('Please fill in all required fields: Meta Title, Main Heading, and Slug.');
      return;
    }

    const formData = new FormData();
    formData.append('meta_title', form.meta_title);
    formData.append('meta_description', form.meta_description);
    formData.append('meta_keyword', form.meta_keyword);
    formData.append('main_heading', form.main_heading);
    formData.append('slug', form.slug);

    if (form.featured_image) {
      formData.append('featured_image', form.featured_image);
    }

    formData.append('category_name', form.category_name || 'default-category');
    formData.append('category_slug', form.category_slug);
    formData.append('content_description', form.content_description);
    formData.append('published_date', form.published_date);

    form.gallery_images.forEach((file) => {
      formData.append('gallery_image', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/v1/travel-blogs/create', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addBlogDirect(data));
        alert('Blog saved successfully!');
        navigate('/dashboard/blogs/view');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert('Failed to save blog: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('An error occurred while submitting the blog.');
    }
  };


  return (
    <div className="blog-form-container">
      <h2 className="blog-form-header">{id ? 'Edit Blog' : 'Add New Blog'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="blog-form-label required-field">Meta Title</label>
          <input
            name="meta_title"
            value={form.meta_title}
            onChange={handleChange}
            className="blog-form-control"
            required
            placeholder="Enter meta title for SEO"
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Meta Description Req.</label>
          <textarea
            name="meta_description"
            value={form.meta_description}
            onChange={handleChange}
            className="blog-form-control blog-form-textarea"
            placeholder="Enter meta description for SEO"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Meta Keywords</label>
          <input
            name="meta_keyword"
            value={form.meta_keyword}
            onChange={handleChange}
            className="blog-form-control"
            placeholder="Comma separated keywords"
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label required-field">Main Heading</label>
          <textarea
            name="main_heading"
            value={form.main_heading}
            onChange={handleChange}
            className="blog-form-control blog-form-textarea"
            required
            placeholder="Enter the main heading of your blog"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Category</label>
         <select
  name="category_name"
  value={form.category_name}
  onChange={handleChange}
  className="blog-form-control"
  required
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

        </div>

        {/* Auto-filled Slug Field (Read-only) */}
        <div className="mb-4">
          <label className="blog-form-label">Category Slug (auto-filled)</label>
          <input
            name="category_slug"
            value={form.category_slug}
            readOnly
            className="blog-form-control"
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Slug </label>
          <input
            type="text"
            name="slug"
            onChange={handleChange}
            value={form.slug}
            className="blog-form-control"
          />
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Featured Image</label>
          <div className="file-upload-wrapper">
            <label className="file-upload-label">
              <span className="file-upload-icon">
                <i className="fas fa-cloud-upload-alt"></i>
              </span>
              <span className="file-upload-text">
                {form.featured_image ? 'Change featured image' : 'Click to upload featured image'}
              </span>
              <input
                type="file"
                name="featured_image"
                onChange={handleFileChange}
                className="file-upload-input"
                accept="image/webp"
              />
            </label>
          </div>
          {form.featured_image && (
            <div className="image-preview-container">
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(form.featured_image)}
                  alt="Featured Preview"
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => setForm({ ...form, featured_image: null })}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Gallery Images</label>
          <div className="file-upload-wrapper">
            <label className="file-upload-label">
              <span className="file-upload-icon">
                <i className="fas fa-images"></i>
              </span>
              <span className="file-upload-text">
                {form.gallery_images.length > 0
                  ? 'Add more images'
                  : 'Click to upload multiple images'}
              </span>
              <input
                type="file"
                name="gallery_images"
                onChange={handleFileChange}
                className="file-upload-input"
                accept="image/webp"
                multiple
              />
            </label>
          </div>
          {form.gallery_images.length > 0 && (
            <div className="image-preview-container">
              {form.gallery_images.map((img, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Gallery Preview ${index}`}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      const updatedImages = [...form.gallery_images];
                      updatedImages.splice(index, 1);
                      setForm({ ...form, gallery_images: updatedImages });
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="blog-form-label">Content Description</label>
          <MyClassicEditor
            value={form.content_description}
            onChange={handleChange}
            name="content_description"
            placeholder="Write your detailed blog content here..."
          />
        </div>

        <div className="mb-4">
            <label className="blog-form-label">Published Date</label>
            <input
              type="date"
              name="published_date"
              value={form.published_date}
              onChange={handleChange}
              className="blog-form-control"
            />
      </div>
               

        <button type="submit" className="submit-btn">
          {id ? 'Update Blog' : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
