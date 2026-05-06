import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { MainPage } from "../Layouts/MainPage.jsx";
import { UnauthorizedPage } from "../../features/auth/pages/UnauthorizedPage.jsx";
import { VerifyEmailPage } from "../../features/auth/pages/VerifyEmailPage.jsx";
import { Accounts } from "../../features/accounts/components/Accounts.jsx";
import { Transactions } from "../../features/transactions/components/Transactions.jsx";

const Users = () => <div className="p-6"><h2 className="text-2xl font-bold">Usuarios</h2></div>;
const Products = () => <div className="p-6"><h2 className="text-2xl font-bold">Productos</h2></div>;
const Reports = () => <div className="p-6"><h2 className="text-2xl font-bold">Reportes</h2></div>;

export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
 
            {/* RUTAS PROTEGIDAS */}
            <Route
                path="/panel"
                element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Accounts />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="reports" element={<Reports />} />
            </Route>
 
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
 