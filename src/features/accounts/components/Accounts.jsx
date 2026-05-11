import { useState, useEffect } from 'react';
import { useAccountStore } from '../store/useAccountStore';

export const Accounts = () => {

    const { accounts = [], getAccounts, loading } = useAccountStore();

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F8FB] p-6">
            {/* HEADER */}
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
                >
                    + Agregar Cuenta
                </button>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {loading ? (
                    <div className="col-span-full text-center py-20 text-[#4A6278] text-lg">
                        Cargando cuentas...
                    </div>

                ) : accounts.length === 0 ? (

                    <div className="col-span-full bg-white rounded-3xl shadow-md border border-[#E7EEF5] p-16 text-center text-[#4A6278]">
                        No hay cuentas registradas
                    </div>
                ) : (
                    accounts.map((account) => (
                        <div
                            key={account._id}
                            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#E7EEF5] hover:-translate-y-1"
                        >
                            {/* TOP */}
                            <div className="bg-gradient-to-r from-[#0A2540] to-[#1A4B8C] px-8 py-8 relative">
                                {/* ICON */}
                                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-3xl text-white shadow-lg">
                                    💳
                                </div>

                                {/* ACCOUNT NUMBER */}
                                <div className="mt-6">
                                    <p className="text-[#AFC8F5]  tracking-wide">
                                        Número de cuenta
                                    </p>

                                    <h2 className="text-2xl font-bold text-white tracking-wider mt-1">
                                        {account.accountNumber}
                                    </h2>
                                </div>

                                {/* STATUS */}
                                <div className="absolute top-6 right-6">
                                    <span
                                        className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
                                            account.status === "ACTIVE"
                                                ? "bg-green-400/20 text-green-100 border border-green-300/30"
                                                : "bg-red-400/20 text-red-100 border border-red-300/30"
                                        }`}
                                    >
                                        {account.status}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-7">

                                {/* BALANCE */}
                                <div className="mb-6">
                                    <p className="text-xl text-[#4A6278] mb-2">
                                        Saldo Disponible
                                    </p>

                                    <h3 className="text-4xl font-bold text-[#0A2540] tracking-tight">
                                        ${account.balance}
                                    </h3>
                                </div>

                                {/* USER */}
                                <div className="bg-[#F5F8FB] rounded-2xl p-4 border border-[#E7EEF5]">
                                    <p className="text-m uppercase tracking-wide text-[#4A6278] mb-1">
                                        Usuario Vinculado
                                    </p>

                                    <p className="text-lg text-[#0A2540] font-semibold">
                                        {account.externalUserId}
                                    </p>
                                </div>

                                {/* BUTTONS */}
                                <div className="flex gap-3 mt-7">
                                    <button
                                        className="flex-1 py-3 rounded-2xl bg-[#1A4B8C] hover:bg-[#2E6FD4] text-white font-medium transition-all duration-300 shadow-sm"
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 shadow-sm"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};