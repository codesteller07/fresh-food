import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchCategories } from "../services/mealService";
import MealList from "./MealList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      marginBottom: "24px",
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "1rem",
    },
  },
});

export default function Menu({ refresh }) {
  const [CategoryByName, setCategoryByName] = useState("");
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      setCategory(categories);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    setCategoryByName("");
  }, [refresh]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategory = (category) => {
    setCategoryByName(category);
  };

  return (
    <>
      <Toolbar />
      {CategoryByName === "" ? (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ mb: 2 }}
            >
              <span className="headingCard"> Categories </span>
            </Typography>
            <Grid container spacing={4}>
              {loading
                ? Array.from(new Array(6)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <Skeleton variant="rectangular" height={140} />
                        <CardContent>
                          <Skeleton width="60%" />
                          <Skeleton width="80%" />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                : Category.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      onClick={() => handleCategory(item.strCategory)}
                    >
                      <Card
                        sx={{
                          transition: "transform 0.2s, background-color 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            backgroundColor: "#f0f0f0",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.strCategoryThumb}
                          alt={item.strCategory}
                          sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            <span className="headingCard">
                              {" "}
                              {item.strCategory}{" "}
                            </span>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.strCategoryDescription.substring(0, 60)}...
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Container>
        </ThemeProvider>
      ) : (
        <MealList CategoryByName={CategoryByName} />
      )}
    </>
  );
}
