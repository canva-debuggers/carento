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
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<DefaultLayout />}>
              <Route
                index
                element={
                  <PrivateRouter>
                    <Dashboard />
                  </PrivateRouter>
                }
              />
              <Route
                path="detail/:id"
                element={
                  <PrivateRouter>
                    <Details />
                  </PrivateRouter>
                }
              />
              <Route
                path="search"
                element={
                  <PrivateRouter>
                    <Search />
                  </PrivateRouter>
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRouter>
                    <Profile />
                  </PrivateRouter>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </APIProvider>
    </AccountProvider>
  );
}

export default App;
