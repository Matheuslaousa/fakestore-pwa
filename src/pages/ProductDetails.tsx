import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Carregando produto...
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produto não encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ display: "flex", gap: 4, padding: 2, flexWrap: "wrap" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ width: 250, objectFit: "contain" }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="body1" mt={2}>
            {product.description}
          </Typography>
          <Typography variant="h6" mt={2}>
            R$ {product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1, // necessário para funcionar corretamente
              })
            }
          >
            Adicionar ao carrinho
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
