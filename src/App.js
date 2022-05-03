import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Login from "./views/Login";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import PublicRoutes from "./components/auth/PublicRoutes";
import Profile from "./views/Profile";
import NotFound from "./components/content/NotFound";
import TransferMoney from "./views/TransferMoney";
import Clients from "./views/Clients";
import ChangePassword from "./views/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Profile />} />
            <Route path="transfer-money" element={<TransferMoney />} />
            <Route path="clients" element={<Clients />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Universal Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
