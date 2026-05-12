// UserDetailModal.jsx — REDISEÑO VISUAL · Lógica intacta
import { useState } from "react";
import { Spinner } from "../../../shared/components/layouts/Spinner";
import defaultAvatarImg from "../../../assets/img/avatarDefault.png";

const IconX = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
);

const IconAlertCircle = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
    </svg>
);

export const UserDetailModal = ({
    isOpen, onClose, user, currentUserId, onSaveRole, loading,
}) => {
    if (!isOpen || !user) return null;

    /* — Estado y lógica originales intactos — */
    const [role, setRole] = useState(user?.role || "CUSTOMER");

    const avatarSrc = (() => {
        const value = user?.profilePicture?.trim();
        if (!value) return defaultAvatarImg;
        if (value.startsWith("http://") || value.startsWith("https://")) return value;
        const base = import.meta.env.VITE_CLOUDINARY_BASE_URL || "https://res.cloudinary.com/db5rnorf/image/upload/";
        return `${base}${value.replace(/^\/+/, "")}`;
    })();

    const isCurrentUser = currentUserId === user.id;
    const hasChanges    = role !== user.role;

    const handleSave = async () => {
        if (!hasChanges || isCurrentUser) { onClose(); return; }
        await onSaveRole(user, role);
    };

    const roleBadge = {
        PLATFORM_ADMIN:   "badge badge-primary",
        RESTAURANT_ADMIN: "badge badge-warning",
        CUSTOMER:         "badge badge-success",
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                {/* Header */}
                <div className="modal-header-accent">
                    <div className="modal-header-info">
                        <h2 className="modal-title on-dark">Detalle de Usuario</h2>
                        <p className="modal-subtitle on-dark">Consulta información y gestiona el rol</p>
                    </div>
                    <button className="modal-close on-dark" type="button" onClick={onClose} aria-label="Cerrar">
                        <IconX />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">

                    {/* Perfil */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                        <img
                            src={avatarSrc}
                            alt={user.username}
                            className="user-avatar-lg"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatarImg; }}
                        />
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-main)', marginBottom: 2 }}>
                                {[user.name, user.surname].filter(Boolean).join(" ") || "—"}
                            </p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                                @{user.username}
                            </p>
                            <div style={{ marginTop: 6 }}>
                                <span className={roleBadge[user.role] || "badge badge-neutral"}>
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info grid */}
                    <div className="modal-grid-2" style={{ marginBottom: 16 }}>
                        <div className="info-row">
                            <p className="info-row-label">ID</p>
                            <p className="info-row-value" style={{ fontSize: '0.75rem' }}>{user.id}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-row-label">Email</p>
                            <p className="info-row-value">{user.email}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-row-label">Nombre</p>
                            <p className="info-row-value">{user.name || "—"}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-row-label">Apellido</p>
                            <p className="info-row-value">{user.surname || "—"}</p>
                        </div>
                    </div>

                    {/* Rol */}
                    <div className="modal-field">
                        <label className="modal-label">Cambiar rol</label>
                        <select
                            className="modal-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={isCurrentUser}
                        >
                            <option value="PLATFORM_ADMIN">PLATFORM_ADMIN</option>
                            <option value="RESTAURANT_ADMIN">RESTAURANT_ADMIN</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                        </select>
                        {isCurrentUser && (
                            <p className="modal-field-error" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <IconAlertCircle /> No puedes cambiar tu propio rol.
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Cerrar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={loading || !hasChanges || isCurrentUser}
                        className="btn-primary"
                        style={{ width: 'auto', padding: '9px 22px' }}
                    >
                        {loading
                            ? <><span className="spinner" /> Guardando...</>
                            : 'Guardar cambios'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};