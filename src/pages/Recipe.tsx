import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../services/api";
import { Recipe as RecipeType } from "../types/recipe";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipe(Number(id));
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!recipe) return <Typography>Recipe not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={recipe.image}
          alt={recipe.name}
          sx={{
            objectFit: "cover",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 4,
            }}
          >
            {recipe.name}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                borderBottom: "2px solid",
                borderColor: "secondary.main",
                pb: 1,
              }}
            >
              Ingredients
            </Typography>
            <ul
              style={{
                paddingLeft: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Typography
                    variant="body1"
                    sx={{
                      py: 0.5,
                      fontSize: "1.1rem",
                    }}
                  >
                    {ingredient}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                borderBottom: "2px solid",
                borderColor: "secondary.main",
                pb: 1,
              }}
            >
              Instructions
            </Typography>
            <ol
              style={{
                paddingLeft: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {recipe.instructions.map((step, index) => (
                <li key={index}>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      py: 0.5,
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {step}
                  </Typography>
                </li>
              ))}
            </ol>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Recipe;
