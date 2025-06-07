import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Carregando produtos...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", height: 200 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                  R$ {product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Button onClick={() => navigate(`/products/${product.id}`)}>
                Ver Detalhes
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1, // Adiciona a quantidade necessária
                  })
                }
                sx={{ m: 1 }}
              >
                Adicionar ao carrinho
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
