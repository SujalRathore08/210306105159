import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching product ${productId}:`, error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h2>Product Detail</h2>
      <div>
        <h3>{product.name}</h3>
        <p>Company: {product.company}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Discount: {product.discount}</p>
        <p>Availability: {product.availability ? 'Available' : 'Out of Stock'}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
