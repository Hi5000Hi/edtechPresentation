import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { Link, Route } from "react-router-dom";
import { auth } from "./firebase";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Tasks } from "./tasks";
import { Equipment } from "./equipment";
import { Users } from "./users";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleMenuClick = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const stopListener = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return stopListener;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            EdTech
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi {user.email}!
          </Typography>
          <Button onClick={handleSignOut} color="inherit">
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={drawer_open} onClose={handleCloseDrawer}>
        <List componet="nav">
          <ListItem button to={"/app/"} component={Link}>
            Tasks
          </ListItem>
          <ListItem button to={"/app/equipment"} component={Link}>
            Equipment
          </ListItem>
          <ListItem button to={"/app/users"} component={Link}>
            Users
          </ListItem>
          <ListItem
            button
            onClick={() => {
              window.open(
                "https://edtech.byu.edu/wiki/index.php/Main_Page",
                "_blank"
              );
            }}
          >
            Wiki
          </ListItem>
          <ListItem
            button
            onClick={() => {
              window.open("http://cristurm.github.io/nyan-cat/", "_blank");
            }}
          />
        </List>
      </Drawer>
      <Route
        exact
        path="/app/"
        render={() => {
          return <Tasks />;
        }}
      />
      <Route
        exact
        path="/app/equipment"
        render={() => {
          return <Equipment />;
        }}
      />
      <Route
        exact
        path="/app/users"
        render={() => {
          return <Users />;
        }}
      />
    </div>
  );
}
