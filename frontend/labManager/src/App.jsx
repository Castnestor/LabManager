import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { TestsProvider } from "./context/TestContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { ColorModeContext, useMode } from "./themes/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <UserProvider>
      <TestsProvider>
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
      </TestsProvider>
    </UserProvider>
  );
}

export default App;
