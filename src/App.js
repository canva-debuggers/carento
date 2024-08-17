import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins";
import Dashboard from "./pages/Dashboard";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
