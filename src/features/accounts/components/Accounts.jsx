import React, { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "../../auth/store/authStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { Spinner } from "../../../shared/components/layouts/Spinner";

import { useAccountStore } from "../store/useAccountStore";
import { useUserManagmentStore } from "../../users/store/useUserManagmentStore";

import { AccountModal } from "./AccountModal.jsx";
import { useUIStore } from "../../../shared/components/ui/store/uiStore";
import { AccountConfirmDeleteModal } from "./AccountConfirmDeleteModal.jsx";
import "../../../styles/credit-card.css";
import { CreditCardItem } from "./CreditCardItem.jsx";
import { PencilSquareIcon, NoSymbolIcon } from "@heroicons/react/24/outline";

export const Accounts = () => {


  const {
    accounts = [],
    loading,
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  } = useAccountStore();

  const { users = [], fetchUsers } = useUserManagmentStore();

  const { user } = useAuthStore();
  const { openConfirm } = useUIStore();


  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    getAccounts().catch(() => {});
    fetchUsers().catch(() => {});
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
            const accountOwner = users.find(u => u.uid === account.externalUserId || u.id === account.externalUserId);

            return (
              <div
                key={accountId}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#E7EEF5] hover:-translate-y-1"
              >
                <div className="flex justify-center pt-8 pb-4" onClick={() => handleOpenEdit(account)} style={{ cursor: 'pointer' }}>
                  <CreditCardItem account={account} accountOwner={accountOwner} statusBadgeClass={statusBadgeClass} />
                </div>

                <div className="p-7">
                  <div className="flex gap-4">
                    <button
                      className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        allowEdit
                          ? "bg-[#F8FAFC] text-[#1A4B8C] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]"
                          : "bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed"
                      }`}
                      onClick={() => handleOpenEdit(account)}
                      disabled={!allowEdit}
                      title={!allowEdit ? "Solo puedes editar tu propia cuenta" : "Editar"}
                    >
                      <PencilSquareIcon className="w-5 h-5" strokeWidth={2} />
                      Editar
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(account)}
                      disabled={user?.role !== "ADMIN_ROLE"}
                      title={
                        user?.role !== "ADMIN_ROLE"
                          ? "Solo admins pueden desactivar cuentas"
                          : "Desactivar"
                      }
                    >
                      <NoSymbolIcon className="w-5 h-5" strokeWidth={2} />
                      Desactivar
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
        users={users}
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

