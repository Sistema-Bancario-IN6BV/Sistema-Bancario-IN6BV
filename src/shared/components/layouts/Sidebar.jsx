// Sidebar.jsx — REDISEÑO VISUAL · Lógica intacta
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";
import {
    ChartBarIcon,
    UsersIcon,
    ChartPieIcon,
    ShoppingBagIcon,
    TableCellsIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";

/* ── Menú por rol (idéntico al original) ── */
const menuItemsByRole = {
    PLATFORM_ADMIN: [
        { label: "Cuentas",        to: "/panel",               icon: ChartBarIcon   },
        { label: "Transacciones",  to: "/panel/transactions",  icon: TableCellsIcon },
        { label: "Usuarios",       to: "/panel/users",         icon: UsersIcon      },
        { label: "Productos",      to: "/panel/products",      icon: ShoppingBagIcon},
        { label: "Reportes",       to: "/panel/reports",       icon: ChartPieIcon   },
    ],
    RESTAURANT_ADMIN: [
        { label: "Cuentas",        to: "/panel",               icon: ChartBarIcon   },
        { label: "Transacciones",  to: "/panel/transactions",  icon: TableCellsIcon },
        { label: "Usuarios",       to: "/panel/users",         icon: UsersIcon      },
        { label: "Productos",      to: "/panel/products",      icon: ShoppingBagIcon},
        { label: "Reportes",       to: "/panel/reports",       icon: ChartPieIcon   },
    ],
    CUSTOMER: [
        { label: "Cuentas",        to: "/panel",               icon: HomeIcon       },
        { label: "Transacciones",  to: "/panel/transactions",  icon: TableCellsIcon },
        { label: "Productos",      to: "/panel/products",      icon: ShoppingBagIcon},
        { label: "Reportes",       to: "/panel/reports",       icon: ChartPieIcon   },
    ],
};

export const Sidebar = () => {
    const location  = useLocation();
    const user      = useAuthStore((state) => state.user);
    const role      = user?.role || "CUSTOMER";
    const menuItems = menuItemsByRole[role] || menuItemsByRole.CUSTOMER;

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {menuItems.map((item, idx) => {
                    const active = location.pathname === item.to;

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`sidebar-item ${active ? 'active' : ''}`}
                        >
                            <item.icon className="sidebar-item-icon" />
                            <span className="sidebar-item-label">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};