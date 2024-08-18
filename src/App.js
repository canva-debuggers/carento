import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLayout from "./layout/DefaultLayout";
import AccountProvider from "./context/AccountProvider";
import PrivateRouter from "./components/PrivateRouter";
import { APIProvider } from "@vis.gl/react-google-maps";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
  return (
    <AccountProvider>
      <APIProvider apiKey={"AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRouter>
                  <DefaultLayout />
                </PrivateRouter>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<Details />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </APIProvider>
    </AccountProvider>
  );
}

export default App;
