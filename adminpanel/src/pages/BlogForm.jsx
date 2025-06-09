import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Global.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    meta_title: '',
    meta_description: '',
    meta_keyword: '', 
    main_heading: '',
    slug: '',
    featured_image: null,
    category_name: '', 
    gallery_images: [],
    content_description:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'featured_image') {
      setForm(prev => ({ ...prev, featured_image: files[0] }));
    } else if (name === 'gallery_images') {
      setForm(prev => ({ ...prev, gallery_images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
    
    formData.append('content_description', form.content_description);

    form.gallery_images.forEach((file) => {
      formData.append('gallery_image', file); // Adjust key if your API expects differently
    });

    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/travel-blogs/create', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Blog created:', data);
        alert('Blog saved successfully!');
        navigate('/dashboard/blogs/view'); // Adjust route as needed
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
    {/* Meta Title */}
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

    {/* Meta Description */}
    <div className="mb-4">
      <label className="blog-form-label">Meta Description</label>
      <textarea
        name="meta_description"
        value={form.meta_description}
        onChange={handleChange}
        className="blog-form-control blog-form-textarea"
        placeholder="Enter meta description for SEO"
        rows={3}
      />
    </div>

    {/* Meta Keywords */}
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

    {/* Main Heading */}
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

    {/* Slug */}
    <div className="mb-4">
      <label className="blog-form-label required-field">Slug</label>
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        className="blog-form-control"
        required
        placeholder="URL-friendly slug"
      />
    </div>

    {/* Featured Image */}
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
            accept="image/*"
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
              onClick={() => setForm({...form, featured_image: null})}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Category Name */}
   <div className="mb-4">
  <label className="blog-form-label">Category Name</label>  
  <select
    name="category_name"
    value={form.category_name}
    onChange={handleChange}
    className="blog-form-control"
  >
    <option value="">Select a category</option>
    <option value="technology">Technology</option>
    <option value="health">Health</option>
    <option value="education">Education</option>
    <option value="lifestyle">Lifestyle</option>
    <option value="business">Business</option>
    {/* Add more options as needed */}
  </select>
</div>

      
      

    {/* Gallery Images */}
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
            accept="image/*"
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
                  setForm({...form, gallery_images: updatedImages});
                }}
              >
               <FontAwesomeIcon icon={ faTimes } className="" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="mb-4">
      <label className="blog-form-label">Content Description</label>
      <textarea
        name="content_description"
        value={form.content_description}
        onChange={handleChange}
        className="blog-form-control blog-form-textarea"
        placeholder="Enter meta description for SEO"
        rows={3}
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
