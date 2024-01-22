import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import { MenuItem } from "react-pro-sidebar";

//Renders each Button for the sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
  //Imports the and colors from the theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Renders with specific colors
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export default Item;