import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function DashBoard() {
  const currentUser = useUserContext();
  //checking for the user in currentUser from context
  // console.log(currentUser.currentUser);

  //Sets navigate to useNavigate hook
  const navigate = useNavigate();

  //protects the route from not logged in users
  useEffect(() => {
    if (!currentUser.currentUser.userName) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      fontSize={"5rem"}
    >
      Welcome to Lab Manager
    </Box>
  );
}
