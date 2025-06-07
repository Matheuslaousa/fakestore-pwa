import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>Produtos</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card onClick={() => navigate(`/produtos/${product.id}`)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: 200, objectFit: 'contain' }} />
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="subtitle1">R${product.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;