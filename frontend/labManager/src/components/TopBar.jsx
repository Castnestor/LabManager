import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../themes/theme";
import { InputBase } from "@mui/material";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const TopBar = (props) => {
  const { currentUser, handleUpdateUser } = useUserContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [menuMode, setMenuMode] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setMenuMode(event.currentTarget)
  }

  const handleMenuClose = () => {
    handleUpdateUser({});
    setMenuMode(null);
    navigate("/login");
  }

  return (
    <Box display="flex" justifyContent={"space-between"} p={2}>
      <Box
        display={"flex"}
        backgroundColor={colors.primary[400]}
        borderRadius={"3px"}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display={"flex"}>
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon/>
            ) : (
                <WbIncandescentOutlinedIcon/>
            )}
        </IconButton>
        <IconButton>
          <NotificationsActiveOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsSuggestOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <Menu 
        anchorEl={menuMode}
        open={Boolean(menuMode)}
        onClose={handleMenuClose}
        >
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TopBar;
