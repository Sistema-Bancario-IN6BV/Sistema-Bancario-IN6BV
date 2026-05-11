import { create } from "zustand";

import {
    getAccounts as getAccountsRequest,
} from "../../../shared/api/admin";

export const useAccountStore = create((set, get) =>({
    accounts: [],
    loading: false,
    error: null,

    getAccounts: async () => {
        try {
            set({
                loading: true,
                error: null
            });
            const response = await getAccountsRequest();
            console.log(response);
            
            set({
                accounts: response.data.accounts,
                loading: false
            })
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener las cuentas",
                loading: false
            })
        }
    }
}))