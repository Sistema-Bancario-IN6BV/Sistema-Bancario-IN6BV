// AuthPage.jsx — REDISEÑO VISUAL · Lógica intacta
import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";
import { useAuthStore } from "../store/authStore";

export const AuthPage = () => {
    const [view, setView] = useState("login");
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) return <Navigate to="/panel" replace />;

    return (
        <div className="auth-page">
            {/* ── Panel izquierdo decorativo ── */}
            <div className="auth-panel-left">
                <div className="auth-panel-left-grid" />

                <div className="auth-panel-left-content">
                    {/* Logo */}
                    <div className="auth-panel-logo">
                        <div className="auth-panel-logo-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L22 7V9H2V7L12 2Z" fill="white" fillOpacity="0.9"/>
                                <rect x="4"  y="11" width="3" height="8" rx="0.5" fill="white" fillOpacity="0.7"/>
                                <rect x="9"  y="11" width="3" height="8" rx="0.5" fill="white" fillOpacity="0.7"/>
                                <rect x="14" y="11" width="3" height="8" rx="0.5" fill="white" fillOpacity="0.7"/>
                                <rect x="19" y="11" width="3" height="8" rx="0.5" fill="white" fillOpacity="0.7"/>
                                <rect x="2"  y="20" width="20" height="2" rx="0.5" fill="white"/>
                            </svg>
                        </div>
                        <span className="auth-panel-logo-name">Sistema Bancario</span>
                    </div>

                    {/* Headline */}
                    <h1 className="auth-panel-headline">
                        Banca moderna,<br />
                        <em>simple y segura.</em>
                    </h1>
                    <p className="auth-panel-sub">
                        Gestiona tus cuentas, realiza transferencias y monitorea
                        tus transacciones en tiempo real desde un solo lugar.
                    </p>

                    {/* Stats */}
                    <div className="auth-panel-stats">
                        <div className="auth-panel-stat">
                            <div className="auth-panel-stat-value">99.9%</div>
                            <div className="auth-panel-stat-label">Disponibilidad</div>
                        </div>
                        <div className="auth-panel-stat">
                            <div className="auth-panel-stat-value">256-bit</div>
                            <div className="auth-panel-stat-label">Cifrado SSL</div>
                        </div>
                        <div className="auth-panel-stat">
                            <div className="auth-panel-stat-value">24/7</div>
                            <div className="auth-panel-stat-label">Monitoreo</div>
                        </div>
                        <div className="auth-panel-stat">
                            <div className="auth-panel-stat-value">0 com.</div>
                            <div className="auth-panel-stat-label">Transferencias</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Panel derecho (formularios) ── */}
            <div className="auth-panel-right">
                {view === "register" ? (
                    <RegisterCard onGoLogin={() => setView("login")} />
                ) : (
                    <LoginCard onGoRegister={() => setView("register")} />
                )}
            </div>
        </div>
    );
};