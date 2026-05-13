// Navbar.jsx — REDISEÑO VISUAL · Lógica intacta
import imgLogo from "../../../assets/img/LogoTipo.png";
import { AvatarUser } from "../ui/AvatarUser";

export const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Marca */}
            <div className="navbar-brand">
                <img
                    src={imgLogo}
                    alt="Logo Sistema Bancario"
                    className="navbar-logo"
                />
                <span className="navbar-name">Sistema Bancario</span>
            </div>

            {/* Avatar — componente original sin cambios */}
            <AvatarUser />
        </nav>
    );
};