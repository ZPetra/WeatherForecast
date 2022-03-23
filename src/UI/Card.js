import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Card = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        p: 2,
        bgcolor: "background.default",
        "& > :not(style)": {
          m: 2,
          width: props.width,
          //height: 400,
        },
      }}
    >
      <Paper elevation={10}>
          {props.children}
      </Paper>
    </Box>
  );
};

export default Card;
