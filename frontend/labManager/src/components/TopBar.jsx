import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../themes/theme";
import { InputBase } from "@mui/material";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

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
        <IconButton>
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
