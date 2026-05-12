import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";
import {
    ChartBarIcon,
    BuildingStorefrontIcon,
    UsersIcon,
    ChartPieIcon,
    ShoppingBagIcon,
    BookOpenIcon,
    TableCellsIcon,
    CalendarDaysIcon,
    ReceiptPercentIcon,
    InboxStackIcon,
    BeakerIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";

const menuItemsByRole = {
    // Mapa del dashboard para este sistema bancario.
    // Se mantiene la estructura por rol, pero los labels/rutas deben coincidir con el panel.
    PLATFORM_ADMIN: [
        { label: "Cuentas", to: "/panel", icon: ChartBarIcon },
        { label: "Transacciones", to: "/panel/transactions", icon: TableCellsIcon },
        { label: "Usuarios", to: "/panel/users", icon: UsersIcon },
        { label: "Productos", to: "/panel/products", icon: ShoppingBagIcon },
        { label: "Reportes", to: "/panel/reports", icon: ChartPieIcon },
    ],
    // Segundo rol (según la app). Ajustado para que también apunte a las rutas bancarias.
    RESTAURANT_ADMIN: [
        { label: "Cuentas", to: "/panel", icon: ChartBarIcon },
        { label: "Transacciones", to: "/panel/transactions", icon: TableCellsIcon },
        { label: "Usuarios", to: "/panel/users", icon: UsersIcon },
        { label: "Productos", to: "/panel/products", icon: ShoppingBagIcon },
        { label: "Reportes", to: "/panel/reports", icon: ChartPieIcon },
    ],
    // Customer: si está restringido al panel, usa el mismo set de rutas.
    CUSTOMER: [
        { label: "Cuentas", to: "/panel", icon: HomeIcon },
        { label: "Transacciones", to: "/panel/transactions", icon: TableCellsIcon },
        { label: "Productos", to: "/panel/products", icon: ShoppingBagIcon },
        { label: "Reportes", to: "/panel/reports", icon: ChartPieIcon },
    ],
};


export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const role = user?.role || "CUSTOMER";

    const menuItems = menuItemsByRole[role] || menuItemsByRole.CUSTOMER;

    return (
        <aside className="group w-20 hover:w-64 transition-all duration-300 ease-in-out bg-bg-card border-r border-accent/10 h-[calc(100vh-5rem)] sticky top-20 py-5 px-3 shadow-[4px_0_24px_rgba(0,0,0,0.4)] z-40 overflow-x-hidden overflow-y-auto">
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.to;
                        return (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`flex items-center gap-4 p-3 rounded-xl text-sm transition-all duration-300 tracking-wide font-semibold outline-none ${
                                        active
                                            ? "bg-accent/10 text-accent border border-accent/30 shadow-[inset_0_1px_4px_rgba(245,200,66,0.1)]"
                                            : "text-text-muted hover:text-text-body hover:bg-bg-page border border-transparent"
                                    }`}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </span>
                                    <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
