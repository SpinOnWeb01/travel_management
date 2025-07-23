import Image from "next/image";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/travel-categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories", error));
  }, []);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(prev => (prev === slug ? null : slug));
  };

  return (
    <div className="col-md-3">
      <div className="sidebar">
        {/* Category Section */}
        <div className="sidebar-item">
          <h5 className="heading">Category</h5>
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className={`category-item${selectedCategory === cat.slug ? ' selected' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '5px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => handleCategoryClick(cat.slug)}
                style={{ accentColor: '#007bff' }}
                onClick={e => e.stopPropagation()}
              />
              <Link href={`/category/${cat.category_slug}`} style={{ color: 'inherit', textDecoration: 'none', flex: 1 }}>
                {cat.name}
              </Link>
            </div>
          ))}
         
          <div className="sidebar-borderbtm"></div>
        </div>
      </div>
    </div>
  );
}
