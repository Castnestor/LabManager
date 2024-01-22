import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import FolderSpecialOutlinedIcon from "@mui/icons-material/FolderSpecialOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { useUserContext } from "../context/UserContext";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Item from "./Item";

const SideBar = (props) => {
  const { currentUser } = useUserContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  console.log(currentUser);

  return (
    <Box
    // styling for the sidebar
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      {/* Functionality to collapse the sidebar menu */}
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Menu Botton and user image */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h2" color={colors.grey[100]}>
                  {/* Dynamically renders the userName and role for each user */}
                  {currentUser.userName}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User information */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  //Same Image for everybody
                  src={
                    "https://i.pinimg.com/736x/ba/d7/86/bad786dfe4f227555be6fa2484b0b9a3.jpg"
                  }
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUser.role}
                </Typography>
                {/* Changing icon and color depending on the role */}
                <Typography variant="h4" color={colors.greenAccent[500]}>
                  {currentUser.role === "admin"
                    ? "General Administrator"
                    : null}
                  {currentUser.role === "manager" ? "Lab Manager" : null}
                  {currentUser.role === "QA" ? "Quality assurence" : null}
                  {currentUser.role === "Reception"
                    ? "Lab Reception Area"
                    : null}
                  {currentUser.role === "Analyst" ? "Laboratory Analist" : null}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu items: I will show a specific menu for each different role */}
          {currentUser.role ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={<ContentPasteOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {/* Conditionals for selective renders */}
          {currentUser.role === "admin" ||
          currentUser.role === "manager" ||
          currentUser.role === "QA" ||
          currentUser.role === "Reception" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Orders"
                to="/orders"
                icon={<ListAltOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {currentUser.role === "admin" ||
          currentUser.role === "manager" ||
          currentUser.role === "Reception" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Add Samples"
                to="/addsamples"
                icon={<AddBoxOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {Object.keys(currentUser).length === 0 ||
          currentUser.role === "default" ? null : (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Samples"
                to="/samples"
                icon={<WaterDropOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          )}
          {currentUser.role === "admin" ||
          currentUser.role === "manager" ||
          currentUser.role === "QA" ||
          currentUser.role === "Reception" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Test List"
                to="/tests"
                icon={<FolderSpecialOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {currentUser.role === "admin" ||
          currentUser.role === "manager" ||
          currentUser.role === "Reception" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Test Report"
                to="/reports"
                icon={<ScienceOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {currentUser.role === "admin" || currentUser.role === "manager" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Users"
                to="/users"
                icon={<PeopleAltOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
          {currentUser.role === "admin" ||
          currentUser.role === "manager" ||
          currentUser.role === "Reception" ? (
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Clients"
                to="/clients"
                icon={<HandshakeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          ) : null}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;