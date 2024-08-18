import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLayout from "./layout/DefaultLayout";
import Details from "./pages/Details";
import Search from "./pages/Search";
import { APIProvider } from "@vis.gl/react-google-maps";
import Profile from "./pages/Profile";

function App() {
  return (
    <APIProvider apiKey={"AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<Details />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </APIProvider>
  );
}

export default App;
