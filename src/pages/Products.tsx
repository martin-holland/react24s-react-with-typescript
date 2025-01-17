import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import { Product } from "../types/product";

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

function Products({ onAddToCart }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          mt: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Products Page
      </Typography>
      <Grid container spacing={3} sx={{ p: 2 }}>
        {filteredProducts.map((product) => (
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
                <Button size="small" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
                <Button size="small">Learn More</Button>
              </CardActions>
              <Button
                color="inherit"
                component={Link}
                to={`/products/${product.id}`}
                state={{ product }}
              >
                Single Product Page
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Products;
