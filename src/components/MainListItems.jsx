import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const listItemsData = [
  {
    text: "Home",
    icon: <HomeIcon />,
  },
  {
    text: "Menu",
    icon: <MenuBookIcon />,
  },
  {
    text: "My Favourites",
    icon: <FavoriteIcon />,
  },
  {
    text: "Meal Generator",
    icon: <LocalDiningIcon />,
  },
  {
    text: "About Me",
    icon: <ManageAccountsIcon />,
  },
];

const MainListItems = ({ activeState, setActiveState }) => {
  return (
    <React.Fragment>
      {listItemsData.map((item, index) => (
        <ListItemButton
          key={index}
          onClick={() => setActiveState(item.text)}
          sx={{
            bgcolor:
              activeState === item.text ? "rgba(0, 0, 0, 0.2)" : "transparent",
            color: activeState === item.text ? "black" : "",
            pl: 3,
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export default MainListItems;
