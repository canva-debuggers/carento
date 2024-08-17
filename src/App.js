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

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/dashboard" element={<PrivateRouter><Dashboard /></PrivateRouter>} />
            <Route path="/dashboard/:id" element={<PrivateRouter><Details /></PrivateRouter>} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
