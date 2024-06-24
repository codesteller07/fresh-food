import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Skeleton,
  IconButton,
  Toolbar,
} from "@mui/material";
import { fetchRandomMeal } from "../services/mealService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useFavorites } from "../context/FavoritesContext";
import generate from "../assets/images/generate.png";
import AlertSnackbar from "../utils/AlertSnackbar";

const MealGenerator = () => {
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mealCardRef = useRef(null); // Ref for the meal card
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { state, dispatch } = useFavorites();
  
  const handleFavoriteToggle = (item) => {
    const isFav = isFavorite(item);
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });
    setAlertMessage(`${item.strMeal} ${isFav ? 'removed from' : 'added to'} favorites`);
    setOpen(true);
  };
  const isFavorite = (item) => {
    return state.favorites.some((fav) => fav.idMeal === item.idMeal);
  };

  const fetchMeal = async () => {
    setRandomMeal(null);
    setLoading(true);
    setError(null);
    try {
      const meal = await fetchRandomMeal();
      setRandomMeal(meal);
    } catch (error) {
      console.error("Error fetching meal:", error);
      setError("Failed to fetch meal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (randomMeal && mealCardRef.current) {
      mealCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [randomMeal]);

  const renderSkeleton = () => (
    <Card sx={{ mt: 1 }}>
      <CardMedia
        component={Skeleton}
        variant="rectangular"
        height="400"
        animation="wave"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="h6" component="h3">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="h6" component="h3">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="80%" />
        </Typography>
        <Divider />
        <Typography variant="h6" component="h3">
          Ingredients:
        </Typography>
        <List>
          {[1, 2, 3, 4, 5].map((index) => (
            <ListItem key={index}>
              <ListItemText primary={<Skeleton animation="wave" />} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="body2" component="p">
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="body2" component="p">
          <Skeleton animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );

  const renderError = () => (
    <Typography variant="body1" style={{ color: "red" }}>
      {error}
    </Typography>
  );

  const renderMealCard = () => (
    <Card ref={mealCardRef} sx={{ mt: 1, mb: 4 }}>
      <CardMedia
        component="img"
        height="300"
        image={randomMeal.strMealThumb}
        alt={randomMeal.strMeal}
      />
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
  
          <span className="headingCard">         {randomMeal.strMeal}  </span> 
          <IconButton
            edge="end"
            onClick={() => handleFavoriteToggle(randomMeal)}
            sx={{ ml: "auto", float: "right" }} // Align IconButton to the right
          >
            {isFavorite(randomMeal) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {randomMeal.strCategory}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Area: {randomMeal.strArea}
        </Typography>
        <Typography variant="body1" paragraph>
          {randomMeal.strInstructions}
        </Typography>
        <Divider />
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ mt: 2, mb: 0, p: 0 }}
        >
          Ingredients:
        </Typography>
        <List>
          {Object.keys(randomMeal)
            .filter((key) => key.startsWith("strIngredient") && randomMeal[key])
            .map((key, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <Typography variant="body2">
                  {`${randomMeal[key]} - ${
                    randomMeal["strMeasure" + key.slice(13)]
                  }`}
                </Typography>
              </ListItem>
            ))}
        </List>
        <Divider />
        {randomMeal.strTags && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Tags: {randomMeal.strTags}{" "}
            <a
              href={randomMeal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ml: "auto", textDecoration: "none" }}
              style={{
                color: "#1976d2",
                textDecoration: "none",
                float: "right",
              }}
            >
              Watch on YouTube{" "}
              <YouTubeIcon
                style={{
                  color: "red",
                  verticalAlign: "middle",
                  marginLeft: "5px",
                }}
              />
            </a>
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (<>
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Toolbar />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: 1,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            Whoa, Whoa, Whoa <br />
            <span style={{ BorderBottom: "2px solid red" }}>
              Don’t leave so soon! Good food awaits you…
            </span>
          </Typography>

          <img
            src={generate}
            alt="logo"
            className="shadow-img "
            width={"200px"}
          />
          <Button
            variant="contained"
            color="warning"
            onClick={fetchMeal}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Generating Meal..." : randomMeal ? "Generate a new meal" : "Generate Meal"}
          </Button>

          {error && renderError()}
        </CardContent>
      </Card>

      {loading && renderSkeleton()}

      {randomMeal && renderMealCard()}
    </Container>

<AlertSnackbar
open={open}
onClose={() => setOpen(false)}
message={alertMessage}
severity="success"

/>
</>
  );
};

export default MealGenerator;
