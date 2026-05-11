import React, { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "../../auth/store/authStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { Spinner } from "../../../shared/components/layouts/Spinner";

import { useAccountStore } from "../store/useAccountStore";

import { AccountModal } from "./AccountModal.jsx";
import { useUIStore } from "../../../shared/components/ui/store/uiStore";
import { AccountConfirmDeleteModal } from "./AccountConfirmDeleteModal.jsx";

export const Accounts = () => {


  const {
    accounts = [],
    loading,
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  } = useAccountStore();

  const { user } = useAuthStore();
  const { openConfirm } = useUIStore();


  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    getAccounts().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canEditSelected = useMemo(() => {
    // Back-end updateAccount: account.externalUserId === req.user.id
    if (!selectedAccount) return false;
    if (!user?.id) return false;
    return selectedAccount.externalUserId === user.id;
  }, [selectedAccount, user?.id]);

  const statusBadgeClass = (status) => {
    if (status === "ACTIVE")
      return "bg-green-400/20 text-green-100 border border-green-300/30";
    if (status === "BLOCKED")
      return "bg-yellow-400/20 text-yellow-100 border border-yellow-300/30";
    if (status === "CLOSED")
      return "bg-red-400/20 text-red-100 border border-red-300/30";

    return "bg-red-400/20 text-red-100 border border-red-300/30";
  };

  const handleCreateSubmit = async ({ ok, payload, error }) => {
    if (!ok) {
      showError(error || "No se pudo crear la cuenta");
      return;
    }

    const res = await createAccount(payload);
    if (res?.success) {
      showSuccess("Cuenta creada correctamente");
      setCreateOpen(false);
      setSelectedAccount(null);
      return;
    }

    showError(res?.error || "Error al crear la cuenta");
  };

  const handleEditSubmit = async ({ ok, payload, error }) => {
    if (!ok) {
      showError(error || "No se pudo actualizar la cuenta");
      return;
    }

    if (!selectedAccount) return;

    // Back-end coherente: updateAccount requiere externalUserId === req.user.id
    if (!canEditSelected) {
      showError("No tienes permiso para editar esta cuenta");
      return;
    }

    const accountId = selectedAccount._id ?? selectedAccount.id;
    if (!accountId) {
      showError("ID de cuenta inválido");
      return;
    }

    const res = await updateAccount(accountId, payload);

    if (res?.success) {
      showSuccess("Cuenta actualizada");
      setEditOpen(false);
      setSelectedAccount(null);
      return;
    }

    showError(res?.error || "Error al actualizar la cuenta");
  };

  const handleOpenCreate = () => {
    setSelectedAccount(null);
    setCreateOpen(true);
  };

  const handleOpenEdit = (account) => {
    setSelectedAccount(account);
    setEditOpen(true);
  };

  const handleDelete = (account) => {
    const accountId = account._id ?? account.id;
    if (!accountId) {
      showError("ID de cuenta inválido");
      return;
    }

    // Back-end: deleteAccount requiere ADMIN_ROLE y además valida permisos
    if (user?.role !== "ADMIN_ROLE") {
      showError("Solo admins pueden desactivar cuentas");
      return;
    }

    openConfirm({
      title: "Desactivar cuenta",
      message:
        "Esta acción desactivará la cuenta (ya no aparecerá en tu lista). ¿Confirmas?",
      onConfirm: async () => {
        const res = await deleteAccount(accountId);
        if (res?.success) {
          showSuccess("Cuenta desactivada correctamente");
        } else {
          showError(res?.error || "Error al desactivar la cuenta");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB] p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#0A2540] tracking-tight">
            Cuentas Bancarias
          </h1>
          <p className="text-[#4A6278] mt-2 text-sm">
            Administra y visualiza las cuentas registradas en el sistema
          </p>
        </div>

        <button
          className="bg-[#1A4B8C] hover:bg-[#2E6FD4] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium"
          onClick={handleOpenCreate}
        >
          + Agregar Cuenta
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : accounts.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md border border-[#E7EEF5] p-16 text-center text-[#4A6278]">
          No hay cuentas registradas
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {accounts.map((account) => {
            const accountId = account._id ?? account.id;
            const allowEdit = user?.id && account.externalUserId === user.id;

            return (
              <div
                key={accountId}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#E7EEF5] hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-[#0A2540] to-[#1A4B8C] px-8 py-8 relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-3xl text-white shadow-lg">
                    💳
                  </div>

                  <div className="mt-6">
                    <p className="text-[#AFC8F5] tracking-wide">Número de cuenta</p>
                    <h2 className="text-2xl font-bold text-white tracking-wider mt-1">
                      {account.accountNumber ?? "-"}
                    </h2>
                  </div>

                  <div className="absolute top-6 right-6">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${statusBadgeClass(
                        account.status
                      )}`}
                    >
                      {account.status ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="mb-6">
                    <p className="text-xl text-[#4A6278] mb-2">Saldo Disponible</p>
                    <h3 className="text-4xl font-bold text-[#0A2540] tracking-tight">
                      ${account.balance ?? 0}
                    </h3>
                  </div>

                  <div className="bg-[#F5F8FB] rounded-2xl p-4 border border-[#E7EEF5]">
                    <p className="text-m uppercase tracking-wide text-[#4A6278] mb-1">
                      Usuario Vinculado
                    </p>
                    <p className="text-lg text-[#0A2540] font-semibold">
                      {account.externalUserId ?? "-"}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button
                      className={`flex-1 py-3 rounded-2xl font-medium transition-all duration-300 shadow-sm ${
                        allowEdit
                          ? "bg-[#1A4B8C] hover:bg-[#2E6FD4] text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => handleOpenEdit(account)}
                      disabled={!allowEdit}
                      title={!allowEdit ? "Solo puedes editar tu propia cuenta" : "Editar"}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(account)}
                      disabled={user?.role !== "ADMIN_ROLE"}
                      title={
                        user?.role !== "ADMIN_ROLE"
                          ? "Solo admins pueden desactivar cuentas"
                          : "Desactivar"
                      }
                    >
                      🚫 Desactivar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AccountModal
        mode="create"
        isOpen={createOpen}
        loading={loading}
        initialValues={null}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <AccountModal
        mode="edit"
        isOpen={editOpen}
        loading={loading}
        initialValues={selectedAccount}
        onClose={() => {
          setEditOpen(false);
          setSelectedAccount(null);
        }}
        onSubmit={handleEditSubmit}
      />

      <AccountConfirmDeleteModal />
    </div>
  );
};

