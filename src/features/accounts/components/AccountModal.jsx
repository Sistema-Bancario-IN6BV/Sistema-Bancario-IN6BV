// AccountModal.jsx — REDISEÑO VISUAL · Lógica intacta
import { useEffect, useMemo, useState } from "react";

const IconX = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
);

const IconUser = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
);

const IconHash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/>
        <line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>
    </svg>
);

const IconDollar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
);

const IconShield = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

export const AccountModal = ({ mode, isOpen, initialValues, onClose, onSubmit, loading }) => {
    const [form, setForm] = useState({
        externalUserId: "",
        balance: "",
        accountNumber: "",
        status: "ACTIVE",
    });

    /* — useEffect original intacto — */
    useEffect(() => {
        if (!isOpen) return;
        setForm({
            externalUserId: initialValues?.externalUserId ?? "",
            balance:
                initialValues?.balance !== undefined && initialValues?.balance !== null
                    ? String(initialValues.balance)
                    : "",
            accountNumber: initialValues?.accountNumber ?? "",
            status: initialValues?.status ?? "ACTIVE",
        });
    }, [isOpen, initialValues]);

    const title = useMemo(() => {
        if (mode === "create") return "Agregar Cuenta";
        if (mode === "edit")   return "Editar Cuenta";
        return "Cuenta";
    }, [mode]);

    if (!isOpen) return null;

    /* — submit original intacto — */
    const submit = (e) => {
        e.preventDefault();
        const balanceNum = form.balance === "" ? 0 : Number(form.balance);
        if (Number.isNaN(balanceNum) || balanceNum < 0) {
            onSubmit?.({ ok: false, error: "Balance inválido" });
            return;
        }
        if (mode === "create" && !form.externalUserId) {
            onSubmit?.({ ok: false, error: "externalUserId requerido" });
            return;
        }
        const payload = {
            externalUserId: form.externalUserId || undefined,
            balance: balanceNum,
            accountNumber: form.accountNumber ? form.accountNumber : undefined,
            status: mode === "edit" ? form.status : undefined,
        };
        onSubmit?.({ ok: true, payload });
    };

    const statusBadge = {
        ACTIVE:  "badge badge-success",
        BLOCKED: "badge badge-warning",
        CLOSED:  "badge badge-neutral",
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                {/* Header */}
                <div className="modal-header-accent">
                    <div className="modal-header-info">
                        <h2 className="modal-title on-dark">{title}</h2>
                        <p className="modal-subtitle on-dark">
                            {mode === "create"
                                ? "Crea una cuenta para un cliente"
                                : "Actualiza los datos permitidos"}
                        </p>
                    </div>
                    <button className="modal-close on-dark" type="button" onClick={onClose} aria-label="Cerrar">
                        <IconX />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={submit}>
                    <div className="modal-body">

                        {/* externalUserId */}
                        {mode === "create" ? (
                            <div className="modal-field">
                                <label className="modal-label"><IconUser /> ID de Usuario</label>
                                <input
                                    className="modal-input"
                                    value={form.externalUserId}
                                    onChange={(e) => setForm((f) => ({ ...f, externalUserId: e.target.value }))}
                                    placeholder="Ej: 123456..."
                                />
                            </div>
                        ) : (
                            <div className="modal-field">
                                <label className="modal-label"><IconUser /> Usuario (solo lectura)</label>
                                <input className="modal-input" value={form.externalUserId} readOnly disabled />
                            </div>
                        )}

                        {/* Número de cuenta */}
                        <div className="modal-field">
                            <label className="modal-label"><IconHash /> Número de cuenta</label>
                            <input
                                className="modal-input"
                                value={form.accountNumber}
                                onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                                placeholder="Se autogenera si se deja vacío"
                            />
                        </div>

                        {/* Saldo */}
                        <div className="modal-field">
                            <label className="modal-label"><IconDollar /> Saldo</label>
                            <input
                                className="modal-input"
                                value={form.balance}
                                onChange={(e) => setForm((f) => ({ ...f, balance: e.target.value }))}
                                placeholder="0.00"
                                inputMode="decimal"
                            />
                        </div>

                        {/* Estado — solo en edición */}
                        {mode === "edit" && (
                            <div className="modal-field">
                                <label className="modal-label"><IconShield /> Estado</label>
                                <select
                                    className="modal-select"
                                    value={form.status}
                                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="BLOCKED">BLOCKED</option>
                                    <option value="CLOSED">CLOSED</option>
                                </select>
                                {/* Preview del badge de estado */}
                                <div style={{ marginTop: 6 }}>
                                    <span className={statusBadge[form.status] || "badge badge-neutral"}>
                                        {form.status}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ width: 'auto', padding: '9px 22px' }}
                        >
                            {loading
                                ? <><span className="spinner" /> Procesando...</>
                                : mode === "create" ? "Crear cuenta" : "Guardar cambios"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};