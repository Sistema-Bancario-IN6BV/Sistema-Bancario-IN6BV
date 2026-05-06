import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/store/authStore";

const icons = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    ),
    accounts: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 15h4" strokeWidth="2" />
        </svg>
    ),
    transfer: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 16V4m0 0L3 8m4-4l4 4" />
            <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
    ),
    history: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8v4l3 3" />
            <path d="M3.05 11a9 9 0 1 0 .5-4" />
            <path d="M3 4v4h4" />
        </svg>
    ),
    deposit: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-4 0v2" />
            <path d="M12 12v4" />
            <path d="M10 14l2 2 2-2" />
        </svg>
    ),
    converter: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9h1.5a1.5 1.5 0 0 1 0 3H9v3h2.5a1.5 1.5 0 0 1 0 3" />
            <path d="M12 7v1m0 8v1" />
        </svg>
    ),
    favorites: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    products: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    ),
    profile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    stats: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="m7 16 4-4 4 4 4-6" />
        </svg>
    ),
    home: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
};

const menuItemsByRole = {
    PLATFORM_ADMIN: [
        { label: "Dashboard", to: "/dashboard", icon: icons.dashboard },
        { label: "Usuarios", to: "/dashboard/users", icon: icons.users },
        { label: "Productos", to: "/dashboard/products", icon: icons.products },
        { label: "Estadísticas", to: "/dashboard/stats", icon: icons.stats },
    ],
    RESTAURANT_ADMIN: [
        { label: "Dashboard", to: "/dashboard", icon: icons.dashboard },
        { label: "Cuentas", to: "/dashboard/accounts", icon: icons.accounts },
        { label: "Transferir", to: "/dashboard/transfer", icon: icons.transfer },
        { label: "Historial", to: "/dashboard/history", icon: icons.history },
        { label: "Depósitos", to: "/dashboard/deposits", icon: icons.deposit },
        { label: "Conversor", to: "/dashboard/converter", icon: icons.converter },
        { label: "Favoritos", to: "/dashboard/favorites", icon: icons.favorites },
        { label: "Productos", to: "/dashboard/products", icon: icons.products },
        { label: "Estadísticas", to: "/dashboard/stats", icon: icons.stats },
    ],
    CUSTOMER: [
        { label: "Inicio", to: "/home", icon: icons.home },
        { label: "Mis Cuentas", to: "/dashboard/accounts", icon: icons.accounts },
        { label: "Transferir", to: "/dashboard/transfer", icon: icons.transfer },
        { label: "Historial", to: "/dashboard/history", icon: icons.history },
        { label: "Conversor", to: "/dashboard/converter", icon: icons.converter },
        { label: "Favoritos", to: "/dashboard/favorites", icon: icons.favorites },
        { label: "Productos", to: "/dashboard/products", icon: icons.products },
        { label: "Mi Perfil", to: "/dashboard/profile", icon: icons.profile },
    ],
};

const customerGroups = [
    { title: "Inicio", keys: [0] },
    { title: "Banca", keys: [1, 2, 3, 4, 5] },
    { title: "Servicios", keys: [6, 7] },
];

export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const role = user?.role || "CUSTOMER";
    const menuItems = menuItemsByRole[role] || menuItemsByRole.CUSTOMER;

    const renderItem = (item) => {
        const active = location.pathname === item.to;
        return (
            <li key={item.to}>
                <Link
                    to={item.to}
                    className={`
            group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
            font-medium tracking-wide transition-all duration-200 outline-none
            ${active
                            ? "bg-accent/15 text-accent border border-accent/30 shadow-[inset_0_1px_0_rgba(245,200,66,0.15)]"
                            : "text-text-muted border border-transparent hover:bg-white/5 hover:text-text-body hover:border-white/10"
                        }
          `}
                >
                    <span
                        className={`
              flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-all duration-200
              ${active
                                ? "bg-accent/20 text-accent"
                                : "bg-white/5 text-text-muted group-hover:bg-white/10 group-hover:text-text-body"
                            }
            `}
                    >
                        <span className="w-4 h-4">{item.icon}</span>
                    </span>
                    <span>{item.label}</span>

                    {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(245,200,66,0.8)]" />
                    )}
                </Link>
            </li>
        );
    };

    return (
        <aside className="w-60 bg-bg-card border-r border-white/5 min-h-[calc(100vh-4.5rem)] flex flex-col z-40 overflow-y-auto overflow-x-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <nav className="flex-1 p-4">
                {/* Menú plano para admin */}
                {role !== "CUSTOMER" ? (
                    <ul className="space-y-1">{menuItems.map(renderItem)}</ul>
                ) : (
                    /* Menú agrupado para cliente */
                    customerGroups.map((group) => (
                        <div key={group.title} className="mb-4">
                            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted/50 select-none">
                                {group.title}
                            </p>
                            <ul className="space-y-1">
                                {group.keys.map((i) => menuItems[i] && renderItem(menuItems[i]))}
                            </ul>
                        </div>
                    ))
                )}
            </nav>

            <div className="m-4 p-3 rounded-xl bg-accent/5 border border-accent/15">
                <p className="text-[10px] text-text-muted/60 uppercase tracking-widest mb-1">Saldo disponible</p>
                <p className="text-accent font-bold text-lg tracking-tight">Q 0.00</p>
                <p className="text-[10px] text-text-muted/50 mt-0.5">Actualizado ahora</p>
            </div>
        </aside>
    );
};