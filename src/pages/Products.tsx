import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Products Page
      </Typography>
      <Grid container spacing={3} sx={{ p: 2 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: "contain",
                  p: 2,
                  backgroundColor: "background.paper",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Products;
