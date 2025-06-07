import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <Typography>Carregando...</Typography>;

  return (
    <Container sx={{ mt: 2 }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }} />
      <Typography variant="h4">{product.title}</Typography>
      <Typography variant="h6">R${product.price}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="caption">Categoria: {product.category}</Typography>
    </Container>
  );
};

export default ProductDetails;