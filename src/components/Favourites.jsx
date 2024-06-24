import React ,{useState} from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Toolbar,
  Container,
  Box,
  IconButton,
  ListItemSecondaryAction,


} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import AlertSnackbar from '../utils/AlertSnackbar';
const Favorites = () => {
  const { state, dispatch } = useFavorites();
  const [open, setOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');

  const favoriteMeals = state.favorites;

  const handleRemoveFavorite = (item) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: item });
    setAlertMessage(`${item.strMeal} removed from favorites`);
    setOpen(true);
  };

  return (
    <>
   
      <Container>
      <Toolbar />
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
            padding: 2,
            marginTop: 4,
          }}
        >
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          <span className="headingCard"> Favorite Meals  </span> 
             
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {favoriteMeals.length ? (
              favoriteMeals.map((item, index) => (
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
                      primaryTypographyProps={{ variant: "subtitle1"}}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveFavorite(item)}
                      >
                     <FavoriteIcon color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < favoriteMeals.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" style={{display:"flex",alignItems:"center",gap:"5px"}}>
             <RamenDiningIcon />   No favorite meals added.
              </Typography>
            )}
          </List>
        </Box>
      </Container>
      <AlertSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message={alertMessage}
        severity="success"
        duration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />



    </>
  );
};

export default Favorites;
