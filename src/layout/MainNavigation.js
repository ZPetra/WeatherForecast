import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function SearchAppBar(props) {

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.clickable}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => {navigate("/");}}
          >
            WeatherForecast
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
