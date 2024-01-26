import { useEffect } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { ColorModeContext, useMode } from "./themes/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from 'axios';

function App() {
  const [theme, colorMode] = useMode();

  useEffect(() => {
    axios.defaults.baseURL =
      "https://labmanagerbackend-production.up.railway.app";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  });

  return (
    <UserProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar />
            <main className="content">
              <TopBar />
              <AppRoutes />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserProvider>
  );
}

export default App;
