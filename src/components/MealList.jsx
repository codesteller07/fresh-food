import React, { useState, useEffect, memo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Toolbar,
  IconButton,
  Container,
  Box,
  ListItemSecondaryAction,
  Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchMealsByCategory } from "../services/mealService";
import { useFavorites } from "../context/FavoritesContext";
import AlertSnackbar from "../utils/AlertSnackbar";

const MealList = ({ CategoryByName }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useFavorites();
  const [open, setOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
  useEffect(() => {
    const getMeals = async () => {
      try {
        setLoading(true);
        const meals = await fetchMealsByCategory(CategoryByName);
        setMeals(meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    getMeals();
  }, [CategoryByName]);

  const handleFavoriteToggle = (item) => {
    const isFav = isFavorite(item);
    dispatch({ type: "TOGGLE_FAVORITE", payload: item });
    setAlertMessage(`${item.strMeal} ${isFav ? 'removed from' : 'added to'} favorites`);
    setOpen(true);
  };

  const isFavorite = (item) => {
    return state.favorites.some(fav => fav.idMeal === item.idMeal);
  };

  return (
    <>
    
      <Container>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            marginTop: 4,
          }}
        >
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          <span className="headingCard">  {CategoryByName}  </span> 
           
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Skeleton variant="circular" width={56} height={56} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Skeleton variant="text" width="80%" />}
                    />
                    <ListItemSecondaryAction>
                      <Skeleton variant="circular" width={40} height={40} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < 4 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))
            ) : (
              meals.map((item, index) => (
                <React.Fragment key={item.idMeal}>
                  <ListItem alignItems="center">
                    <ListItemAvatar>
                      <Avatar
                        alt={item.strMeal}
                        src={item.strMealThumb}
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.strMeal}
                      primaryTypographyProps={{ variant: "subtitle1" }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleFavoriteToggle(item)}
                      >
                        {isFavorite(item) ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < meals.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
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

export default memo(MealList);
