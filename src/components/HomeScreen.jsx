import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import favImage from '../assets/images/fav.png'
import generate from '../assets/images/generate.png'
import meal from '../assets/images/meal.png'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Toolbar,
  Typography,
} from "@mui/material";
export default function HomeScreen({setActiveState,refresh,setrefresh}) {
  return (
    <div>
      {" "}
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          
          <Grid item xs={12} md={4} lg={4} onClick={()=>setActiveState("Menu")}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className="shadow-img "

                  image={meal}
                  alt="green iguana"
                  sx={{objectFit:"contain"}}
                  height="200"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"   >
                    
                    <span className="headingCard"> Menu </span> 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    A collection of my most-loved recipes, carefully curated to
                    showcase a variety of dishes that are sure to please even
                    the pickiest of eaters carefully crafted to share with loved
                    ones.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}onClick={()=>setActiveState("My Favourites")}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className="shadow-img "
                  image={favImage}
                  alt="green iguana"
                  sx={{objectFit:"contain"}}
                  height="200"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" >
                    
                    <span className="headingCard">My Favourites </span> 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Each dish is a guarantee of deliciousness and
                    satisfaction.  My most trusted and beloved recipes, refined
                    through years of experimentation and feedback from friends
                    and family. 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4} onClick={()=>setActiveState("Meal Generator")}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  className="shadow-img "
                  image={generate}
                  alt="green iguana"
                  sx={{objectFit:"contain"}}
                  height="200"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"  >
                   <span className="headingCard">Meal Generator </span> 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The Meal Generator is a tool that creates a custom meal plan
                    based on the macros provided. It also provides a grocery
                    list for the week and recipes to help with meal prep.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
