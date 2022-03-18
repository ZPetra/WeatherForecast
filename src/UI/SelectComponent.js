import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = (props) => {
  const handleChange = (event) => {
    props.searchWeather(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {props.filterName}
        </InputLabel>
        <Select
          defaultValue="1"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={props.filterName}
          onChange={handleChange}
        >
          {props.items &&
            props.items.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id} name={item.city}>
                  {item.city}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
