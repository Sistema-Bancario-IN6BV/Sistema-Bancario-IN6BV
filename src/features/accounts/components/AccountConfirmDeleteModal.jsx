import { useMemo } from "react";
import { useUIStore } from "../../../shared/components/ui/store/uiStore";

export const AccountConfirmDeleteModal = () => {
  const { confirmModal, closeConfirm } = useUIStore();

  const title = confirmModal.title || "Confirmar";
  const message = confirmModal.message || "¿Estás seguro?";

  const dangerGradient = useMemo(
    () =>
      "linear-gradient(90deg, rgba(220,38,38,1) 0%, rgba(239,68,68,1) 100%)",
    []
  );

  if (!confirmModal.isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md flex flex-col overflow-hidden">
        <div
          className="p-4 sm:p-5 text-white sticky top-0 z-10"
          style={{ background: dangerGradient }}
        >
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-gray-700 text-center mb-6">{message}</p>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <button
              onClick={closeConfirm}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>

            <button
              onClick={() => {
                confirmModal.onConfirm?.();
                closeConfirm();
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition shadow"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

