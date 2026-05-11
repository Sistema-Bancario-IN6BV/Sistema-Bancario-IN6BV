import { useEffect, useMemo, useState } from "react";

const baseInput =
  "w-full px-4 py-2 border border-accent/20 bg-bg-page rounded-lg text-text-body focus:outline-none focus:border-accent transition-colors";

export const AccountModal = ({
  mode,
  isOpen,
  initialValues,
  onClose,
  onSubmit,
  loading,
}) => {
  const [form, setForm] = useState({
    externalUserId: "",
    balance: "",
    accountNumber: "",
    status: "ACTIVE",
  });

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
    if (mode === "edit") return "Editar Cuenta";
    return "Cuenta";
  }, [mode]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();

    const balanceNum = form.balance === "" ? 0 : Number(form.balance);
    if (Number.isNaN(balanceNum) || balanceNum < 0) {
      // la vista maneja errores con toast; aquí solo delegamos
      onSubmit?.({
        ok: false,
        error: "Balance inválido",
      });
      return;
    }

    if (mode === "create") {
      if (!form.externalUserId) {
        onSubmit?.({ ok: false, error: "externalUserId requerido" });
        return;
      }
    }

    const payload = {
      externalUserId: form.externalUserId || undefined,
      balance: balanceNum,
      accountNumber: form.accountNumber ? form.accountNumber : undefined,
      status: mode === "edit" ? form.status : undefined,
    };

    onSubmit?.({ ok: true, payload });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{
            background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
              <p className="text-sm text-white/80 mt-1">
                {mode === "create"
                  ? "Crea una cuenta para un cliente"
                  : "Actualiza los datos permitidos por el backend"}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            {mode === "create" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted">
                  Usuario (externalUserId)
                </label>
                <input
                  className={baseInput}
                  value={form.externalUserId}
                  onChange={(e) => setForm((f) => ({ ...f, externalUserId: e.target.value }))}
                  placeholder="Ej: 123456..."
                />
              </div>
            )}

            {mode === "edit" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted">
                  Usuario (solo lectura)
                </label>
                <input
                  className={baseInput}
                  value={form.externalUserId}
                  readOnly
                  disabled
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-muted">
                Número de cuenta (opcional)
              </label>
              <input
                className={baseInput}
                value={form.accountNumber}
                onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))}
                placeholder="Se autogenera si se deja vacío"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-muted">Saldo</label>
              <input
                className={baseInput}
                value={form.balance}
                onChange={(e) => setForm((f) => ({ ...f, balance: e.target.value }))}
                placeholder="0"
                inputMode="decimal"
              />
            </div>

            {mode === "edit" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-muted">Estado</label>
                <select
                  className={baseInput}
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-semibold"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg bg-[#1A4B8C] hover:bg-[#2E6FD4] text-white font-bold transition shadow"
            >
              {loading ? "Procesando..." : mode === "create" ? "Crear" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

